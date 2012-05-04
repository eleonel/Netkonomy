$(document).ready(function() {
  if (GBrowserIsCompatible()) {
    Drupal.settings.gmaplocation.map = new GMap2(document.getElementById("gmaplocation_map"));
		
    Drupal.settings.gmaplocation.map.addControl(new GMapTypeControl());
    Drupal.settings.gmaplocation.map.addControl(new GSmallMapControl());        

    var geocoder = new GClientGeocoder();
    var admin = Drupal.settings.gmaplocation.admin;
    target_point = new GLatLng(Drupal.settings.gmaplocation.lat, Drupal.settings.gmaplocation.lng); 
    address = Drupal.settings.gmaplocation.address;
    description = Drupal.settings.gmaplocation.info;
    Drupal.settings.gmaplocation.map.setCenter(target_point, parseInt(Drupal.settings.gmaplocation.zoom));
    Drupal.settings.gmaplocation.marker = new GMarker(target_point, {draggable: (admin == true)});
    Drupal.settings.gmaplocation.map.addOverlay(Drupal.settings.gmaplocation.marker);
		Drupal.settings.gmaplocation.map.setMapType(eval(Drupal.settings.gmaplocation.type));

    GEvent.addListener(Drupal.settings.gmaplocation.marker, "click", function() {
      Drupal.settings.gmaplocation.marker.openInfoWindowHtml(description);
    });
    // allow fine tuning marker position in admin mode
    if (admin) {
	    GEvent.addListener(Drupal.settings.gmaplocation.marker, "dragstart", function() {
	      Drupal.settings.gmaplocation.map.closeInfoWindow();
	      });
      GEvent.addListener(Drupal.settings.gmaplocation.marker, "dragend", function() {
        Drupal.settings.gmaplocation.marker.openInfoWindowHtml(description);
				latlng = Drupal.settings.gmaplocation.marker.getLatLng();
				$('#edit-gmaplocation-lat').val(latlng.lat());
				$('#edit-gmaplocation-lng').val(latlng.lng());
        });
			GEvent.addListener(Drupal.settings.gmaplocation.map, "zoomend", function() {
				$('#edit-gmaplocation-zoom').val(Drupal.settings.gmaplocation.map.getZoom());
			});
    }

		$("#gmaplocation-in-place-edit-form").bind('submit', function() {
			$("#gmaplocation-in-place-edit-form :input").removeAttr("disabled");
		});
  }
});
