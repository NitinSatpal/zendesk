//Controller for the homepage
var app = angular.module('myApp', []);

app.controller('zendeskController', ['$scope', '$http', function($scope,$http) {
	var vm = this;
	vm.ticketSerialNumbers = [];
	vm.createTicket = function () {
		$http.post('/api/zendesk/ticket/create/', vm.ticket).success(function(response) {
			alert(response);
			location.reload();
		}).error(function (err) {
			alert(err)
		});
	}

	vm.fetchTickets = function () {
		vm.tickets = [];
		$http.get('/api/zendesk/ticket/fetch/').success(function(response) {
			console.log(response);
			for (var index = 0; index < response.length; index++) {
				for (var innerIndex = 0; innerIndex < vm.ticketSerialNumbers.length; innerIndex++) {
					console.log(vm.ticketSerialNumbers[innerIndex]);
					console.log(response[index].external_id);
					if(vm.ticketSerialNumbers[innerIndex] == response[index].external_id) {
						vm.tickets.push(response[index]);
					}
				}
			}
			
			console.log(JSON.stringify(vm.tickets));
		}).error(function (err) {
			alert(err)
		});
	}
}]);

