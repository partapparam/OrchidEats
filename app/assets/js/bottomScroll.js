(function () {
    'use strict';
    angular.module('OrchidApp').directive('bottomScroll', function () {
        return {
            vm: {
                bottomScroll: "="
            },
            link: function (scope, element) {
                scope.$watchCollection('bottomScroll', function (newValue) {
                    if (newValue)
                    {
                        $(element).scrollTop($(element)[0].scrollHeight);
                    }
                });
            }
        }
    })
})();