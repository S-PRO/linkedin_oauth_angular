/**
 * Created by codestack on 07.12.15.
 */
angular.module('oauth2_linkedin.routes', [
    'oauth2_linkedin',
    'angularSpinner'
])
.config(function ($stateProvider) {
    $stateProvider
        .state('oauth2linkedin', {
            url: '/oauth2/linkedin?code&state&error&error_description',
            templateUrl: 'src/oauth2/linkedin/oauth2_linkedin.html',
            controller: 'Oauth2LiknedinCtrl',
            resolve: {
                loader: function(usSpinnerService){
                    usSpinnerService.spin('spinner-1');
                }
            }
        });
});