var asso_arr =[];
var url_site_ad = "https://www.assodiscovery.fr";
var png_ad_ani = "https://www.assodiscovery.fr/wp-content/uploads/2018/11/coeur-01.png";
var png_ad_soc = "https://www.assodiscovery.fr/wp-content/uploads/2018/11/coeur-01.png";
var png_ad_eco = "https://www.assodiscovery.fr/wp-content/uploads/2018/11/coeur-01.png";
var png_ani = "https://www.assodiscovery.fr/wp-content/uploads/2018/11/coeur-01.png";
var png_soc = "https://www.assodiscovery.fr/wp-content/uploads/2018/11/coeur-01.png";
var png_eco = "https://www.assodiscovery.fr/wp-content/uploads/2018/11/coeur-01.png";
var image_test = "src/dot_eco-01.png"
var data = undefined;
var URL = "https://docs.google.com/spreadsheets/d/1kWMkDglBeO6uUuCnJWu9_-r9IeKE4EID160i2CGhV8M";
URL += "/pub?single=true&output=csv";
var color_cust = ["red", "#FDA900", "green"];

function initMap() {


    d3.csv(URL, function (error, data) {
        //1. load data and throw error if there is one
        if (error) throw error;
        data.forEach(function (d) {
            d.latitude = +d.latitude;
            d.longitude = +d.longitude;
            d.taille = +d.taille;
            d.temps = +d.temps;
            d.creation = +d.creation;
            var asso = {
                nom: d.nom,
                date: d.creation,
                description: d.description,
                type: d.cause,
                taille: d.taille,
                id_temps: d.temps,
                url_site: d.lien_site,
                lien_ass_d: d.lien_ass_d,
                latitude: d.latitude,
                longitude: d.longitude,
                adresse: d.adresse,
                visite: d.visite
            };
            asso_arr.push(asso);
        });

        //2. define reset and draw functions

        //default to location - declare variables, reset_data and draw charts


        new_draw_map(data);

        function new_draw_map(data) {

            //1. Set the list title
            //document.getElementById('map_title').innerHTML = "Map for selected " + search_opt.toUpperCase();

            //2. Apply filters

            var my_data = data.filter(function(d){
                return !isNaN(d.taille);
            }).filter(function(d){
                return !isNaN(d.latitude);
            });
            var r = d3.scaleLinear().domain([0, 2000]).range([5, 15]);

            var bound = new google.maps.LatLngBounds();
            var long;
            var lat;
            for (var m in my_data) {
                long = +my_data[m].longitude;
                lat = +my_data[m].latitude;
                if (isNaN(my_data[m].longitude)) {
                    //my_data.splice(m, 1)
                } else {
                    bound.extend(new google.maps.LatLng(lat, long));
                }
            }
            var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

            d3.selectAll('#map')
                .attr("width", width - 200);

            // Create the Google Map w/o poi
            var map = new google.maps.Map(d3.select("#map").node(), {
                zoom: 14,
                center: new google.maps.LatLng(45.7642037, 4.8376517),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles: [
                    {
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#f5f5f5"
                            }
                        ]
                    },
                    {
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#616161"
                            }
                        ]
                    },
                    {
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "color": "#f5f5f5"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative",
                        "stylers": [
                            {
                                "color": "#323333"
                            },
                            {
                                "weight": 0.5
                            }
                        ]
                    },
                    {
                        "featureType": "administrative.land_parcel",
                        "elementType": "labels",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative.land_parcel",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#bdbdbd"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative.locality",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative.locality",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative.neighborhood",
                        "stylers": [
                            {
                                "visibility": "simplified"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative.neighborhood",
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative.neighborhood",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#606b75"
                            }
                        ]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "color": "#660000"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#eeeeee"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "labels.text",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#757575"
                            }
                        ]
                    },
                    {
                        "featureType": "poi.attraction",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "poi.business",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "poi.government",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "poi.medical",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "poi.park",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#e5e5e5"
                            }
                        ]
                    },
                    {
                        "featureType": "poi.park",
                        "elementType": "labels.text",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "poi.park",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#9e9e9e"
                            }
                        ]
                    },
                    {
                        "featureType": "poi.place_of_worship",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "poi.school",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "poi.sports_complex",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#757575"
                            },
                            {
                                "visibility": "simplified"
                            }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "color": "#cbced3"
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#dadada"
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#616161"
                            }
                        ]
                    },
                    {
                        "featureType": "road.local",
                        "elementType": "labels",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "road.local",
                        "elementType": "labels.text",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "road.local",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#9e9e9e"
                            },
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "transit.line",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#e5e5e5"
                            }
                        ]
                    },
                    {
                        "featureType": "transit.station",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#eeeeee"
                            }
                        ]
                    },
                    {
                        "featureType": "transit.station.airport",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "transit.station.bus",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#c9c9c9"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#f4f4f4"
                            }
                        ]
                    }
                ]
            });


            //map.fitBounds(bound);

            var overlay = new google.maps.OverlayView();

            // Add the container when the overlay is added to the map.
            overlay.onAdd = function () {
                var layer = d3.select(this.getPanes().overlayMouseTarget).append("div")
                    .attr("class", "effective");

                // Draw each marker as a separate SVG element.
                // We could use a single SVG, but what size would it have?
                overlay.draw = function () {
                    var projection = this.getProjection(),
                        padding = 5;

                    var tooltip = d3.select("body")
                        .append("div")
                        .attr("class", "tooltip_map")
                        .html("");

                    var marker = layer.selectAll("svg")
                        .data(my_data, function (d) {
                            return d.nom;
                        })
                        .each(transform) // update existing markers
                        .enter().append("svg")
                        .attr("id", function (d, i) {
                            return "marker_" + i;
                        })
                        .attr("class", "marker")
                        .each(transform);


                    // Add a circle.
                    marker.append("circle")
                        .attr("r", function (d) {
                            //console.log(d.taille);
                            return r(d.taille);
                        })
                        .attr("fill", function (d) {
                            if (d.cause === "ecologie") {
                                return color_cust[2];
                            } else if (d.cause === "sociale") {
                                return color_cust[0];
                            } else if (d.cause == "animale") {
                                return color_cust[1];
                            }
                        })
                        .attr("cx", padding + 5)
                        .attr("cy", padding + 5)
                        .on("mouseover", function (d) {
                            //sets tooltip.  t_text = content in html
                            tooltip.style("visibility", "hidden");
                            t_text = d.nom;
                            tooltip.html(t_text);
                            d3.select(this).style("cursor", "pointer");
                            tooltip.style("visibility", "visible");
                            tooltip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px");
                        })
                        .on("mousemove", function () {

                        })
                        .on("mouseout", function () {
                            tooltip.style("visibility", "hidden");
                            d3.select(this).style("cursor", "default");


                        })
                        .on("click", function (d) {
                            writte_info()




                        });

                    //.style("stroke", "none")
                    function transform(d) {
                        d = new google.maps.LatLng(+d.latitude, +d.longitude);
                        d = projection.fromLatLngToDivPixel(d);
                        return d3.select(this)
                            .style("left", (d.x - padding) + "px")
                            .style("top", (d.y - padding) + "px");
                    }
                };
            };

            // Bind our overlay to the map
            overlay.setMap(map);


        }


        d3.selectAll(".marker")
            .filter(function () {
                if (nfilter === 0) {
                    return true;
                }
            }).select("circle").transition().duration(1000).attr("r", 6);

        d3.selectAll(".marker")
            .filter(function (d) {
                var nmatch = 0;
                $.each(all_options, function (k) {
                    if (all_options[k].contains(d[k])) {
                        nmatch += 1;
                    }
                });
                if (nmatch === nfilter && nfilter > 0) {
                    return true
                }
            }).select("circle").transition().duration(1000).attr("r", 9);

        d3.selectAll(".marker")
            .filter(function (d) {
                var nmatch = 0;
                $.each(all_options, function (k) {
                    if (all_options[k].contains(d[k])) {
                        nmatch += 1;
                    }
                });
                if (nmatch !== nfilter && nfilter > 0) {
                    return true
                }
            }).select("circle").transition().duration(1000).attr("r", 0);


        d3.selectAll(".marker")
            .filter(function (d) {
                if (nfilter === 0) {
                    return 0;
                } else {
                    var nmatch = 0;
                    $.each(all_options, function (k) {
                        if (all_options[k].contains(d[k])) {
                            nmatch += 1;
                        }
                    });
                    return nmatch === nfilter;
                }
            })
            .raise();


    })
    ;

}
function writte_info(id_element, property){
    $("#" + id_element).html("");

    $("#" + id_element).append(property);
}
    /*
    var lyon = {lat: 45.757230, lng: 4.831791};

    /* var map = new google.maps.Map(
         d3.select("#map").node(), {zoom: 13, center: lyon,  mapTypeId: google.maps.MapTypeId.TERRAIN
         });
     /*map = new GMaps({
         div: '#map',
         lat: 45.757230,
         lng: 4.831791,
         zoom: 13
     });

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: new google.maps.LatLng(45.757230, 4.831791)
    });
    d3.csv(URL, function (d) {
        data = d;

        var overlay = new google.maps.OverlayView();

        // Add the container when the overlay is added to the map.
        overlay.onAdd = function () {
            var layer = d3.select(this.getPanes().overlayLayer).append("div")
                .attr("class", "stations");

            // Draw each marker as a separate SVG element.
            // We could use a single SVG, but what size would it have?
            overlay.draw = function () {
                var projection = this.getProjection(),
                    padding = 10;

                var marker = layer.selectAll("svg")
                    .data(d3.entries(data))
                    .each(transform) // update existing markers
                    .enter().append("svg")
                    .each(transform)
                    .attr("class", "marker");

                // Add a circle.
                marker.append("circle")
                    .attr("r", 4.5)
                    .attr("cx", padding)
                    .attr("cy", padding);

                // Add a label.
                marker.append("text")
                    .attr("x", padding + 7)
                    .attr("y", padding)
                    .attr("dy", ".31em")
                    .text(function (d) {
                        return d.key;
                    });

                function transform(d) {
                    d = new google.maps.LatLng(d.latitude, d.longitude);
                    d = projection.fromLatLngToDivPixel(d);
                    return d3.select(this)
                        .style("left", (d.x - padding) + "px")
                        .style("top", (d.y - padding) + "px");
                }
            };
        };

        // Bind our overlay to the map…
        overlay.setMap(map);


    });
}
    /*
    var overlay = new google.maps.OverlayView();




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
                id_temps: d.temps,
                url_site: d.lien_site,
                lien_ass_d: d.lien_ass_d,
                latitude: d.latitude,
                longitude: d.longitude,
                adresse: d.adresse,
                visite: d.visite
            };
            asso_arr.push(asso);
//            console.log(asso);

        });
        var bound = new google.maps.LatLngBounds();
        var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

        for (var m in asso_arr) {
            long = +asso_arr[m].longitude;
            lat = +asso_arr[m].latitude;

                bound.extend(new google.maps.LatLng(lat, long));


        }
        d3.selectAll('#map')
            .attr("width", width - 200);
        //setMarkers(map);
// Create the Google Map w/o poi
        var map = new google.maps.Map(d3.select("#map").node(), {
            zoom: 14,
            center: new google.maps.LatLng(45.7642037, 4.8376517),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [
                {
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#f5f5f5"
                        }
                    ]
                },
                {
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#616161"
                        }
                    ]
                },
                {
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#f5f5f5"
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "stylers": [
                        {
                            "color": "#323333"
                        },
                        {
                            "weight": 0.5
                        }
                    ]
                },
                {
                    "featureType": "administrative.land_parcel",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "administrative.land_parcel",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#bdbdbd"
                        }
                    ]
                },
                {
                    "featureType": "administrative.locality",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "administrative.locality",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "administrative.neighborhood",
                    "stylers": [
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "administrative.neighborhood",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "administrative.neighborhood",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#606b75"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#660000"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#eeeeee"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.text",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#757575"
                        }
                    ]
                },
                {
                    "featureType": "poi.attraction",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi.business",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi.government",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi.medical",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#e5e5e5"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "labels.text",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#9e9e9e"
                        }
                    ]
                },
                {
                    "featureType": "poi.place_of_worship",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi.school",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi.sports_complex",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#757575"
                        },
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#cbced3"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#dadada"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#616161"
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "labels.text",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#9e9e9e"
                        },
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "transit.line",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#e5e5e5"
                        }
                    ]
                },
                {
                    "featureType": "transit.station",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#eeeeee"
                        }
                    ]
                },
                {
                    "featureType": "transit.station.airport",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "transit.station.bus",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#c9c9c9"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#f4f4f4"
                        }
                    ]
                }
            ]
        });

        var overlay = new google.maps.OverlayView();

        // Add the container when the overlay is added to the map.
        overlay.onAdd = function () {
            var layer = d3.select(this.getPanes().overlayMouseTarget).append("div")
                .attr("class", "effective");

            overlay.draw = function () {
                var projection = this.getProjection(),
                    padding = 5;
                var marker = layer.selectAll("svg")
                    .data(asso_arr, function (d) {
                        return d.nom;
                    })
                    .each(transform) // update existing markers
                    .enter().append("svg")
                    .attr("id", function (d, i) {
                        return "marker_" + i;
                    })
                    .attr("class", "marker")
                    .each(transform);


                // Add a circle.
                marker.append("circle")
                    .attr("r", 7)
                    .attr("cx", padding + 5)
                    .attr("cy", padding + 5)

                //.style("stroke", "none")


                function transform(d) {
                    d = new google.maps.LatLng(+d.latitude, +d.longitude);
                    d = projection.fromLatLngToDivPixel(d);
                    return d3.select(this)
                        .style("left", (d.x - padding) + "px")
                        .style("top", (d.y - padding) + "px");
                }
            };
        };
        overlay.setMap(map);


    });
}


function setMarkers(map) {



    var shape = {
        coords: [1, 1, 1, 20, 18, 20, 18, 1],
        type: 'poly'
    };


    for (var i = 0; i < asso_arr.length; i++) {
        var asso = asso_arr[i];
        console.log(asso);
        var marker = new google.maps.Marker({
            position: {lat: asso.latitude, lng: asso.longitude},
            map: map,
            icon: new google.maps.MarkerImage(image_test),
            title: asso.nom

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