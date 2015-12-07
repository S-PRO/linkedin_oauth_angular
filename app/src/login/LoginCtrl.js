/**
 * Created by codestack on 07.12.15.
 */
angular.module('login', [
    'general.config'
]).controller('LoginCtrl', function($scope, LINKED_IN_CONFIG) {

    $scope.login = function(){
        var redirect_url = LINKED_IN_CONFIG.URL+'?';
        for(var key in LINKED_IN_CONFIG.OAUTH2_PARAMS){
            redirect_url+='&'+key+'='+LINKED_IN_CONFIG.OAUTH2_PARAMS[key];
        }
        window.location.href = redirect_url;
    }

});