
function initMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
            alert(position.coords.latitude)
            geocodeLatLng(position.coords);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function geocodeLatLng(latlngObj) {
    var geocoder = new google.maps.Geocoder;
//  var input = document.getElementById('latlng').value;
//  var latlngStr = input.split(',', 2);
    var latlng = {lat: parseFloat(latlngObj.latitude), lng: parseFloat(latlngObj.longitude)};
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
}

(function ($) {
    $(function() {/* off-canvas sidebar toggle */
        
        
        var myDataRef = new Firebase('https://onetime.firebaseio.com/');
        
        myDataRef.authWithOAuthPopup("facebook", function(error, authData) {
            if (error) {
                alert("Login Failed!");
            } else {
                alert("Authenticated successfully with payload:");
            }
        });
//        myDataRef.set({GeoLocation: "name", Pictures: []});
        myDataRef.child("Pictures").push({Image:'', User: "userID"})
        
        $('[data-toggle=offcanvas]').click(function() {
            $(this).toggleClass('visible-xs text-center');
            $(this).find(' ti').toggleClass('glyphicon-chevron-right glyphicon-chevron-left');
            $('.row-offcanvas').toggleClass('active');
            $('#lg-menu').toggleClass('hidden-xs').toggleClass('visible-xs');
            $('#xs-menu').toggleClass('visible-xs').toggleClass('hidden-xs');
            $('#btnShow').toggle();
        });
    });
})(jQuery);