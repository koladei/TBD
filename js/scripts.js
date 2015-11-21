
function initMap() {
//  var map = new google.maps.Map(document.getElementById('map'), {
//    zoom: 8,
//    center: {lat: 40.731, lng: -73.997}
//  });
//  var geocoder = new google.maps.Geocoder;
//  var infowindow = new google.maps.InfoWindow;
//
//  document.getElementById('submit').addEventListener('click', function() {
//    geocodeLatLng(geocoder, map, infowindow);
//  });
    
    alert("Geocode loaded")
}

function geocodeLatLng(geocoder, map, infowindow) {
  var input = document.getElementById('latlng').value;
  var latlngStr = input.split(',', 2);
  var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
  geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        map.setZoom(11);
        var marker = new google.maps.Marker({
          position: latlng,
          map: map
        });
        infowindow.setContent(results[1].formatted_address);
        infowindow.open(map, marker);
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