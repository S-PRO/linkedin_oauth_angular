/**
 * Created by codestack on 07.12.15.
 */
angular.module('login.routes', [
    'login'
])
.config(function ($stateProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'src/login/login.html',
            controller: 'LoginCtrl'
        });
});