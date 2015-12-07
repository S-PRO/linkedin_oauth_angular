/**
 * Created by codestack on 07.12.15.
 */

angular.module('oauth2login.resource', [ //adding login postfix to avoid similar module names
    'ngResource',
    'general.config'
])
.factory('OAuth2LoginResource', function($resource, API_CONFIG){
    return $resource(API_CONFIG.API_URL + 'oauth2/:type', {
        type: '@type'
    });
});