var app = angular.module('node-adventure', ['ngOpenFB']);

app.controller('LoginCtrl', function ($scope, ngFB) {
	ngFB.init({appId: '1518322408478202'});

	$scope.fbLogin = function () {
	    ngFB.login({scope: 'email,public_profile'}).then(
	        function (response) {
	            if (response.status === 'connected') {
	            	console.log(response);
	                console.log('Facebook login succeeded');
				    ngFB.api({
				        path: '/me',
				        params: {fields: 'name,email'}
				    }).then(
				        function (user) {
				            $scope.name = user.name;
				            $scope.email = user.email;
				        },
				        function (error) {
				            alert('Facebook error: ' + error.error_description);
				        });


	            } else {
	                alert('Facebook login failed');
	            }
	        });
	};	
});