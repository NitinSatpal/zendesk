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
		if ((!vm.ticketSerialNumbers || vm.ticketSerialNumbers.length == 0) && !vm.ticketStatus) {
			alert('Please select at least one option');
			return false;
		}

		console.log(vm.ticketStatus);
		var status = '';
		if (!vm.ticketStatus) 
			status = 'All'
		else
			status = vm.ticketStatus;

		vm.tickets = [];
		$http.get('/api/zendesk/ticket/fetch/' +status).success(function(response) {
			if (response.length == 0) {
				vm.noTickets = true;
			} else {
				vm.noTickets = false;
				if (!vm.ticketSerialNumbers || vm.ticketSerialNumbers.length == 0) {
					vm.tickets = response;
				} else {
					for (var index = 0; index < response.length; index++) {
						for (var innerIndex = 0; innerIndex < vm.ticketSerialNumbers.length; innerIndex++) {
							if(vm.ticketSerialNumbers[innerIndex] == response[index].external_id) {
								vm.tickets.push(response[index]);
							}
						}
					}
				}
			}
			console.log(JSON.stringify(response));
		}).error(function (err) {
			alert(err)
		});
	}
}]);

