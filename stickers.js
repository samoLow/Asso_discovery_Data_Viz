function initMap() {

  var data = undefined;

  var URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRUOWie9576SmVNBFZ9CoWoApZ7j_QKkWR-850CfF4jS-ONk4GKRPjfQdm2CzUmUGx8hqW3MS4knaol";
  URL += "/pub?single=true&output=csv";

  d3.csv(URL, function (d) {
    data = d;
    data.forEach(function (d) {
      d.latitude = +d.latitude;
      d.longitude = +d.longitude;
      d.Taille = +d.Taille;
      d.Temps = +d.Temps;
      d.Creation = +d.Creation;

    });
    console.log(data);

  });

  map = new GMaps({
    div: '#map',
    lat: 45.757230,
    lng: 4.831791,
    zoom: 14
  });
}

/*
  function Markers(index, size){

    var markers_data = [];

    var icon = {
      url: "uploads/" + stickers[index].image,
      size: new google.maps.Size(size,size), 
      scaledSize: new google.maps.Size(size,size),
      origin: new google.maps.Point(0,0),
      anchor: new google.maps.Point((size/2), (size/2))
    };
    markers_data.push({
      lat: stickers[index].lat,
      lng: stickers[index].lng,
      title: stickers[index].title,
      icon: icon,
      infoWindow: {
        content: 
        '<div id="content" style="margin: 0 auto;text-align:center;">'+
        '<h1 style="font-size:1.5em;" class="firstHeading"><span style="color:#2AB3CC;">['+ stickers[index].tag +'] </span>'+ stickers[index].title +'</h1>'+
        '<img style="width:200px;" src="uploads/'+ stickers[index].image +'" alt="' + stickers[index].title +'"/>'+
        '<p><span style="font-weight:bold;">Auteur : </span><span style="font-style:italic;">'+ stickers[index].username +'</span></p>'+
        '<p><span style="font-weight:bold;">Date : </span><span style="font-style:italic;">'+ stickers[index].stickerdate +'</span></p>'+
        '<div style="width:300px;" id="bodyContent">'+
        '<p><span style="font-weight:bold;font-style:italic;">Description : </span>'+ stickers[index].content +'</p>'+
        '<p><span style="font-weight:bold;font-style:italic;">Context : </span>'+ stickers[index].context +'</p>'+
        '<p><span style="font-weight:bold;font-style:italic;">Materiau : </span>'+ stickers[index].material +'</p>'+
        '</div>'+
        '</div>'
      }
    });
    map.addMarkers(markers_data);
  }


  for (i in stickers) {
    Markers(i, 25);
  }


  map.addListener('zoom_changed', function() {
    zoomValue = map.getZoom();
    console.log(zoomValue);

    if (zoomValue < 16) { 
      map.removeMarkers();
      for (i in stickers) {
        Markers(i, 25);        
      }
    }else if(zoomValue >= 16 && zoomValue < 19) {
      map.removeMarkers();
      for (i in stickers) {
        Markers(i, 35);
      }
    }else {
      map.removeMarkers();
      for (i in stickers) {
        Markers(i, 45);        
      }
    }

  }); // End Map Listener


  }); // End JSON


} // End Init Map
*/
