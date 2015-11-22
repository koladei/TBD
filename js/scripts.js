
function SelfController($scope){
    $scope.myDataRef = new Firebase('https://onetime.firebaseio.com/');
    $scope.SignedIn = false;    
    $scope.Login = function(provider){        
        $scope.myDataRef.authWithOAuthRedirect(provider, function(error, authData) {
            if (error) {
                alert("Login Failed!");
            } else {
                alert("Authenticated successfully with payload:");
            }
        });
    }
    $scope.SignedIn = false;
    (function ($, $scope) {
        $(function() {/* off-canvas sidebar toggle */
            

            var authData = $scope.myDataRef.getAuth();
            if(authData){
                $scope.SignedIn = true;
            } else {
                $scope.SignedIn = false;
            }
            $scope.myDataRef.child("Pictures").push({Image:'', User: "userID"});

            
            function GetLocationCoordinates() {
                var d = $.Deferred();
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position){
                        d.done(position);
                    });
                } else {
                    alert("Geolocation is not supported by this browser.");
                }
                return d;
            }

            function GetLocationName(latlngObj) {
                var d = $.Deferred();
                var geocoder = new google.maps.Geocoder();
                var latlng = {
                  lat: parseFloat(latlngObj.latitude), 
                  lng: parseFloat(latlngObj.longitude)
                };
                
                geocoder.geocode({'location': latlng}, function(results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                      if (results[0]) {
                        alert("You are at: "+results[0].formatted_address)
                      } else {
                        window.alert('No results found');
                      }
                    } else {
                      window.alert('Geocoder failed due to: ' + status);
                    }
                });
                return d;
            }

            $('[data-toggle=offcanvas]').click(function() {
                $(this).toggleClass('visible-xs text-center');
                $(this).find(' ti').toggleClass('glyphicon-chevron-right glyphicon-chevron-left');
                $('.row-offcanvas').toggleClass('active');
                $('#lg-menu').toggleClass('hidden-xs').toggleClass('visible-xs');
                $('#xs-menu').toggleClass('visible-xs').toggleClass('hidden-xs');
                $('#btnShow').toggle();
            });
        });
    })(jQuery, $scope);
}
                                 
SelfController.$injector = [];

var SelfyApp = angular.module("SelfyApp",[]);
SelfyApp.controller("SelfyController", SelfController);