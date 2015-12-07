/**
 * Created by codestack on 07.12.15.
 */
(function () {
    var
        config_data = {
            GENERAL_CONFIG: {
                APP_NAME: 'myapp',
                APP_VERSION: '0.1'
            },
            API_CONFIG: {
                API_URL: "http://localhost:3001/"              // for testing with local backend
            },
            LINKED_IN_CONFIG: {
                URL: 'https://www.linkedin.com/uas/oauth2/authorization',
                OAUTH2_PARAMS: {
                    response_type: 'code',
                    client_id: '77umk3dqqraozh',
                    //redirect_uri: 'http://testlinedin.we-app.com/oauth2/linkedin',
                    redirect_uri: 'http://localhost:9000/oauth2/linkedin',
                    state: 'DCEeFWf45A53sdfKef424',
                    scope: 'r_basicprofile'
                }
            }
        },
        config_module = angular.module('general.config', []);

    angular.forEach(config_data, function (key, value) {
        config_module.constant(value, key);
    });

}());