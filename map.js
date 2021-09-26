function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 43.2316655, lng: -79.8572081 },
    zoom: 12,
  });

  infowindow = new google.maps.InfoWindow();
  // geocoder service object
  geocoder = new google.maps.Geocoder();
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

// Locate Me
function showPosition(position) {
  let lat = position.coords.latitude;
  let lng = position.coords.longitude;

  ownPosition = { lat: lat, lng: lng };

  positionMarker = new google.maps.Marker({
    position: ownPosition,
    title: "My Location",
    icon: "http://maps.google.com/mapfiles/kml/shapes/poi.png",
  });

  positionMarker.setMap(map);
  // map.setCenter(ownPosition);
}

function searchLocation() {
  initMap();
  document.getElementById("infoDesk").innerText = "";
  address = document.getElementById("searchFiled").value;

  geocoder.geocode({ address: address }, function (results, status) {
    if (status == "OK") {
      ownPosition = results[0].geometry.location;
      positionMarker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location,
        icon: "http://maps.google.com/mapfiles/kml/shapes/poi.png",
      });
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}

function allShops() {
  document.getElementById("infoDesk").innerText = "";
  initMap();
  positionMarker.setMap(map);
  marker_clicked = function () {
    infowindow.close();
    infowindow.setContent(
      `<strong>${this.NAME}</strong>'s top feedback<br/><br/>` +
        this.COMMENTS +
        " <br/> <br/>" +
        `<a href=${this.WEBSITE} target='_blank'> Website </a>`
    );
    destinationAddress = this.ADDRESS;
    infowindow.open(map, this);
    removePreviousDirection();
  };

  for (i = 0; i < pizza.length; i++) {
    new_marker = new google.maps.Marker({
      position: {
        lat: pizza[i].LATITUDE,
        lng: pizza[i].LONGITUDE,
      },
      title: pizza[i].NAME,
    });

    new_marker.setMap(map);
    new_marker.NAME = pizza[i].NAME;
    new_marker.ADDRESS = pizza[i].ADDRESS;
    new_marker.COMMENTS = pizza[i].COMMENTS;
    new_marker.WEBSITE = pizza[i].WEBSITE;
    new_marker.addListener("click", marker_clicked);
  }
}

function showPizza() {
  document.getElementById("infoDesk").innerText = "";
  initMap();
  positionMarker.setMap(map);
  marker_clicked = function () {
    infowindow.close();
    infowindow.setContent(
      `<strong>${this.NAME}</strong>'s top feedback<br/><br/>` +
        this.COMMENTS +
        " <br/> <br/>" +
        `<a href=${this.WEBSITE} target='_blank'> Website </a>`
    );
    destinationAddress = this.ADDRESS;
    infowindow.open(map, this);
    removePreviousDirection();
  };

  for (i = 0; i < pizza.length; i++) {
    if (pizza[i].TYPE === "Pizza") {
      new_marker = new google.maps.Marker({
        position: {
          lat: pizza[i].LATITUDE,
          lng: pizza[i].LONGITUDE,
        },
        title: pizza[i].NAME,
      });

      new_marker.setMap(map);
      new_marker.NAME = pizza[i].NAME;
      new_marker.ADDRESS = pizza[i].ADDRESS;
      new_marker.COMMENTS = pizza[i].COMMENTS;
      new_marker.WEBSITE = pizza[i].WEBSITE;
      new_marker.addListener("click", marker_clicked);
    }
  }
}

function onlyIndian() {
  document.getElementById("infoDesk").innerText = "";
  initMap();
  positionMarker.setMap(map);
  marker_clicked = function () {
    infowindow.close();
    infowindow.setContent(
      `<strong>${this.NAME}</strong>'s top feedback<br/><br/>` +
        this.COMMENTS +
        " <br/> <br/>" +
        `<a href=${this.WEBSITE} target='_blank'> Website </a>`
    );
    destinationAddress = this.ADDRESS;
    infowindow.open(map, this);
    removePreviousDirection();
  };

  for (i = 0; i < pizza.length; i++) {
    if (pizza[i].TYPE === "Indian") {
      new_marker = new google.maps.Marker({
        position: {
          lat: pizza[i].LATITUDE,
          lng: pizza[i].LONGITUDE,
        },
        title: pizza[i].NAME,
      });

      new_marker.setMap(map);
      new_marker.NAME = pizza[i].NAME;
      new_marker.ADDRESS = pizza[i].ADDRESS;
      new_marker.COMMENTS = pizza[i].COMMENTS;
      new_marker.WEBSITE = pizza[i].WEBSITE;
      new_marker.addListener("click", marker_clicked);
    }
  }
}

function removeMarkers() {
  positionMarker.setMap(null);
}

function removePreviousDirection() {
  directionsRenderer.setMap(null);
  positionMarker.setMap(map);
}

function getDirection() {
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  request = {
    origin: ownPosition,
    destination: destinationAddress,
    travelMode: "DRIVING",
  };
  directionsService.route(request, function (result, status) {
    if (status == "OK") {
      removeMarkers();
      directionsRenderer.setDirections(result);
      document.getElementById("infoDesk").innerText =
        "You will arrive in " + result.routes[0].legs[0].duration.text;
    }
  });

  directionsRenderer.setMap(map);
}

document.getElementById("allShops").onclick = allShops;
document.getElementById("pizzaShops").onclick = showPizza;
document.getElementById("IndianR").onclick = onlyIndian;
document.getElementById("getDirection").onclick = getDirection;
document.getElementById("yourLocation").onclick = getLocation;
document.getElementById("searchBtn").onclick = searchLocation;
