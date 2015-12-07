/**
 * Created by codestack on 07.12.15.
 */
angular.module('myApp', [
    'ngResource',
    'ui.router',
    'ui.bootstrap',
    'templates',
    'angularSpinner',
    'general.config',
    'login.routes',
    'oauth2_linkedin.routes'
]).config(function($locationProvider, $urlRouterProvider) {

    //$locationProvider.html5Mode({
    //    enabled: true,
    //    requireBase: false
    //});

    $urlRouterProvider.otherwise('/login');
});