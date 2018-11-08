var asso_arr =[];
var url_site_ad = "https://www.assodiscovery.fr";
var mark_svg = "https://www.assodiscovery.fr/wp-content/uploads/2018/11/coeur-01.png";
function initMap() {

    var lyon = {lat: 45.757230, lng: 4.831791};

    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 13, center: lyon});
    /*map = new GMaps({
        div: '#map',
        lat: 45.757230,
        lng: 4.831791,
        zoom: 13
    });
    */

    var data = undefined;

    var URL = "https://docs.google.com/spreadsheets/d/1kWMkDglBeO6uUuCnJWu9_-r9IeKE4EID160i2CGhV8M";
    URL += "/pub?single=true&output=csv";

    d3.csv(URL, function (d) {
        data = d;
        data.forEach(function (d) {
            d.latitude = +d.latitude;
            d.longitude = +d.longitude;
            d.Taille = +d.Taille;
            d.Temps = +d.Temps;
            d.Creation = +d.Creation;
            var asso = {
                nom: d.nom,
                date: d.creation,
                description: d.description,
                type: d.cause,
                taille: d.taille,
                id_temps:d.temps,
                url_site:d.lien_site,
                lien_ass_d:d.lien_ass_d,
                latitude:d.latitude,
                longitude: d.longitude,
                adresse : d.adresse,
                visite: d.visite
            };
            asso_arr.push(asso);
//            console.log(asso);
        });
        setMarkers(map);

    });



}


function setMarkers(map) {



    var shape = {
        coords: [1, 1, 1, 20, 18, 20, 18, 1],
        type: 'poly'
    };

    var icon = {
        url: mark_svg,
        size: new google.maps.Size(20, 32),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 32)
    };
    for (var i = 0; i < asso_arr.length; i++) {
        var asso = asso_arr[i];
        console.log(asso);

        var marker = new google.maps.Marker({
            position: {lat: asso.latitude, lng: asso.longitude},
            map: map,
            icon: icon,
            title: asso.nom,

        });
    }
}
 /* markers_data.push({
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

});// End Map Listener


 // End JSON


} // End Init Map

*/