angular.module('meanhotel', ['ngRoute', 'angular-jwt']).config(config).run(run);

function config($httpProvider, $routeProvider){
	$httpProvider.interceptors.push('AuthInterceptor');
	$routeProvider
		.when('/', {
			templateUrl : 'angular-app/main/main.html',
			access : {
				restricted : false
			}
		})
		.when('/hotels', {
			templateUrl : 'angular-app/hotel-list/hotels.html',
			controller : HotelsController,
			controllerAs : 'vm',
			access : {
				restricted : false
			}
		})
		.when('/hotel/:id', {
			templateUrl :'angular-app/hotel-display/hotel.html',
			controller: HotelController,
			controllerAs: 'vm',
			access : {
				restricted : false
			}
		})
		.when('/register', {
			templateUrl : 'angular-app/register/register.html',
			controller : RegisterController, 
			controllerAs : 'vm',
			access : {
				restricted : false
			}
		})
		.when('/profile', {
			templateUrl : 'angular-app/profile/profile.html',
			controller : ProfileController,
			controllerAs : 'vm',
			access : {
				restricted : true
			}
		})
		.otherwise({
			redirectTo : '/'
		});
}

//this function doesn't allow clever people to hit an access point like profile without an access token
function run($rootScope, $location, $window, AuthFactory){
	$rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoue){
		if(nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !AuthFactory.isLoggedIn){
			event.preventDefault();
			$location.path('/');
		}
	});
}











