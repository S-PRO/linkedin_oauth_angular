/**
 * Created by codestack on 07.12.15.
 */
angular.module('oauth2_linkedin', [
    'oauth2login.resource',
    'angularSpinner'
]).controller('Oauth2LiknedinCtrl', function($scope, $stateParams, OAuth2LoginResource, usSpinnerService) {

    /**
     * the most simple way just to give signal that login is success
     * Normally we would use UserService and directive to display data
     */
    $scope.userDemoData = false;
    $scope.apiDemoError = false;

    var showError = function(error){
        $scope.apiDemoError = error ? error : 'error';
    },
    showUser = function(userData){
        $scope.userDemoData = userData;
    };


    /**
     * Linked In success
     */
    if($stateParams.code){

        /**
         * we use resource directly just for demo. Normally we add some additional services in the middle for additional validation
         */
        OAuth2LoginResource.save({
            type: 'linkedin',
            code: $stateParams.code
        }).$promise.then(function(data){

            console.info('data', data);
            usSpinnerService.stop('spinner-1');

            showUser(data);

            //alert('Login success');

        }, function(error){

            console.warn('oauth2 linkedin error', error);

            usSpinnerService.stop('spinner-1');


            /**
             * handle all cases with error response format
             */
            try{
                showError(error.data.error_description);
            }catch(e){
                showError('error');
            }

        });

    }else{
        /**
         * LinkedIn error handling
         */
        var error_description = 'something went wrong';
        if($stateParams.error && $stateParams.error_description){
            error_description = $stateParams.error_description;
        }

        console.warn('oauth2 linkedin error', error_description);
        usSpinnerService.stop('spinner-1');
        showError(error_description);

    }


});