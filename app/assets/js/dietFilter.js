(function () {
    'use strict';

        angular.module('OrchidApp').filter("dietFilter", function(){

        return function(listings, dietArray){

            var addListing;
            var selectedListing = [];
            for(var i = 0; i < listings.length; i++){

                addListing = false;

                for(var j = 0; j < listings[i].diets.length; j++){
                    if(listings[i].diets[j].diet === dietArray){
                        addListing = true;
                    }
                }

                if (addListing){
                    selectedListing.push(listings[i]);
                }
            }

            return selectedListing;
        };

    });

})();