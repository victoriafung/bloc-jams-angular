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
				controller: 'LandingCtrl as landing',
				templateUrl: '/templates/landing.html'
			})
			.state('album', {
				url: '/album',
				templateUrl: '/template/album.html'
			})
			.state('collection', {
				url: '/',
				controller: 'CollectionCtrl as collection',
				templateUrl: '/templates/collection.html'
			});
	}
	angular
		.module('blocJams', ['ui.router'])
		.config(config);
})();


