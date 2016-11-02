(function() { 

	"use strict";

	angular
		.module("ngClassifieds")
		.controller("classifiedsCtrl", function($scope, $state, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) {

			var vm = this;
			vm.categories;
			vm.classified;
			vm.classifieds;
			vm.closeSidebar = closeSidebar;
			vm.deleteClassified = deleteClassified;
			vm.editing;
			vm.editClassified = editClassified;
			vm.openSidebar = openSidebar;
			vm.saveClassified = saveClassified;

			vm.classifieds = classifiedsFactory.ref;
			vm.classifieds.$loaded().then(function(classifieds){
				vm.categories = getCategories(classifieds);
			});

			// classifiedsFactory.getClassifieds().then(function(classifieds) {
			// 	vm.classifieds = classifieds.data;
			// 	vm.categories = getCategories(vm.classifieds);
			// 	//console.log(data);
			// });



			$scope.$on('newClassified', function(event, classified){
				vm.classifieds.$add(classified);
				showToast('Classified saved!');
			});

			$scope.$on('editSaved', function(event, message) {
				showToast(message);
			});

			var contact = {
				name: "Daniel Goncalves", 
				phone: "(555) 555-5555",
				email: "danielgoncalvesti@gmail.com"
			}

			function openSidebar() {
				vm.editing = false;
				vm.classified = {};
				$state.go('classifieds.new');
			}

			function closeSidebar() {
				vm.editing = false;
				vm.classified = {};
				$mdSidenav('left').close();
			}
			
			function saveClassified(classified) {
				if(classified) {
					classified.contact = contact;
 					vm.classifieds.push(classified);
 					vm.classified = {};
 					vm.closeSidebar();
 					showToast("Classidied saved!");
				}
			}

			function editClassified(classified) {
				// vm.editing = false;
				// vm.classified = classified;
				$state.go('classifieds.edit', { 
					id: classified.$id,
					classified: classified
				});
			}

			// function saveEdit() {
			// 	vm.editing = false;
			// 	vm.classified = {};
			// 	closeSidebar();
			// 	showToast("Edit saved!");
			// }
			


			function deleteClassified(event, classifiedDeleting) {
				var confirm = $mdDialog.confirm()
					.title(	'Are you sure you want to delete ' + classifiedDeleting.title + '?')
					.ok('Yes')
					.cancel('No')
					.targetEvent(event);

				$mdDialog.show(confirm).then(function(){
					var index = vm.classifieds.indexOf(classifiedDeleting);
					vm.classifieds.splice(index, 1);
				}, function(){

				});
			}

			function showToast(message) {
				$mdToast.show(
					$mdToast.simple()
						.content(message)
						.position('bottom center')
						.hideDelay(3000)
				);
			}

			function getCategories(classifieds) {
				var categories = [];
				angular.forEach(classifieds, function(item) {
					angular.forEach(item.categories, function(category){
						categories.push(category);
					});
				});
				return _.uniq(categories);
			}

			var data = 
			[
			  {
			    "id":"1",
			    "title":"20 Foot Equipment",
			    "description":"2013 rainbow trailer 20 feet x 82 inch deck area, two 5,000 lb axels, electric brakes, two pull out ramps, break away box, spare tire.",
			    "price":6000,
			    "posted":"2015-10-24",
			    "contact": {
			      "name":"John Doe",
			      "phone":"(555) 555-5555",
			      "email":"johndoe@gmail.com"
			    },
			    "categories":[
			      "Vehicles",
			      "Parts and Accessories"
			    ],
			    "image": "http://www.louisianasportsman.com/classifieds/pics/p1358549934434943.jpg",
			    "views":213
			  },
			  {
			    "id":"2",
			    "title":"Canada Goose Jacket",
			    "description":"Red woman's Canada Goose Montebello jacket. It was used for two seasons. This jacket retails for $745. The jacket has been professionally cleaned since it was last worn by anyone.",
			    "price": 500,
			    "posted": "2015-10-28",
			    "contact": {
			      "name": "Jane Doe",
			      "phone": "(555) 555-5555",
			      "email": "janedoe@gmail.com"
			    },
			    "categories": [
			      "Clothing"
			    ],
			    "image":"http://canadagoose-jacket.weebly.com/uploads/9/2/3/3/9233177/9087323_orig.jpg",
			    "views": 422
			  },
			  {
			    "id":"3",
			    "title":"Baby Crib and Matress",
			    "description":"Good condition.",
			    "price":50,
			    "posted":"2015-10-27",
			    "contact": {
			      "name":"Jane Doe",
			      "phone":"(555) 555-5555",
			      "email":"janedoe@gmail.com"
			    },
			    "categories":[
			      "Furniture"
			    ],
			    "image":"http://images.landofnod.com/is/image/LandOfNod/Crib_Anderson_Nat_V1/$web_setitem$/1308310657/andersen-crib-maple.jpg",
			    "views":23
			  },
			  {
			    "id":"4",
			    "title":"Leather Sofa",
			    "description":"Brown leather sofa for sale.  Good condition but small tear on one cushion.",
			    "price":250,
			    "posted":"2015-11-01",
			    "contact": {
			      "name":"John Doe",
			      "phone":"(555) 555-5555",
			      "email":"johndoe@gmail.com"
			    },
			    "categories":[
			      "Furniture"
			    ],
			    "image":"http://www.casasbahia-imagens.com.br/Moveis/SaladeEstar/Sofas/3050794/43285962/Sofa-3-Lugares-Linoforte-Larissa-em-Suede-3050794.jpg",
			    "views":77
			  },
			  {
			    "id":"5",
			    "title":"MacBook Air",
			    "description":"2013 MacBook Air. Great condition, but a few scratches.",
			    "price":1150,
			    "posted":"2015-11-02",
			    "contact": {
			      "name":"John Doe",
			      "phone":"(555) 555-5555",
			      "email":"johndoe@gmail.com"
			    },
			    "categories":[
			      "Electronics",
			      "Computer Parts and Accessories"
			    ],
			    "image":"http://cdn.macrumors.com/article-new/2014/11/macbook_air_yosemite-800x450.jpg?retina",
			    "views":889
			  },
			  {
			    "id":"6",
			    "title":"2008 Dodge Caliber",
			    "description":"Battery blanket and block heater installed. Winter tires, good tread left are on the car currently. Car comes with 4 summer tires with also good treads left. Hydraulic power steering fluid line installed so this won't break on you in the cold Yellowknife winters! Synthetic oil used, good for 1000+ more KMs. AC/Sunroof/power doors/steering, CD player/radio. Red accented dash and upolstry.",
			    "price":4800,
			    "posted":"2015-11-03",
			    "contact": {
			      "name":"John Doe",
			      "phone":"(555) 555-5555",
			      "email":"johndoe@gmail.com"
			    },
			    "categories":[
			      "Vehicles",
			      "Cars"
			    ],
			    "image":"http://images.buysellsearch.com/image/orig/8dfc4f6c5d411130d19dedd28d61bc2b/2009-dodge-caliber-se.jpg",
			    "views":423
			  }
			]	

			var firebase = classifiedsFactory.ref;

			// angular.forEach(data, function(item) {
			// 	firebase.$add(item);
			// });



			
		});
})();
