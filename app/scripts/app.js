(function() {
	function config($stateProvider, $locationProvider){
		$locationProvider
			.html5Mode({
				enable: true,
				requireBase: false
		});
		
		$stateProvider
			.state('landing', {
				url: '/',
				templateUrl: '/templates/landing.html'
			})
			.state('album', {
				url: '/album',
				templateUrl: '/template/album.html'
			})
			.state('collection', {
				url: '/',
				templateUrl: '/templates/collection.html'
			});
	}
	angular
		.module('blocJams', ['ui.router'])
		.config(config);
})();


