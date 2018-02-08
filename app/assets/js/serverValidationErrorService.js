angular.module('OrchidApp')
    .factory('serverValidationErrorService', function (Notification) {
        return {
            display: function (errorArray) {
                for (var error in errorArray) {
                    for (var i = 0; i < errorArray[error].length; i++) {
                        Notification.error(errorArray[error][i]);
                    }
                }
            }
        };
    });
