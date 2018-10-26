// this is the first commentary, try to commit & push
var data = undefined;
var margin = {top: 20, right: 20, bottom: 20, left: 20};
var rayon_C = 180;
var height_SVG = 420;
var width_SVG = 420;
var origin_C = [height_SVG / 2, width_SVG / 2];
var nb_A_soc = 0;
var nb_A_eco = 0;
var nb_A_ani = 0;
var color_cust = ["red", "yellow", "green"];


function legend(element, keys, z) {
    var legendRectSize = 15;
    var svg = d3.select('#' + element).append('svg')
        .attr('width', 400)
        .attr('height', 30);

    var legend = svg.selectAll('.legend')
        .data(keys)
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', function (d, i) {
            var horz = 0 + i * 110 + 10;
            var vert = 0;
            return 'translate(' + horz + ',' + vert + ')';
        });

    legend.append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .style('fill', function (d) {
            return z(d)
        })
        .style('stroke', function (d) {
            return z(d)
        });

    legend.append('text')
        .attr('x', legendRectSize + 5)
        .attr('y', 15)
        .text(function (d) {
            return d;
        });
}

function draw_circle(element, x_coord, y_coord, rayon) {

    var svg = d3.select("#" + element).append("svg").attr("width", 420).attr("height", 420);
    var width = +svg.attr("width") - margin.left - margin.right;
    var height = +svg.attr("height") - margin.top - margin.bottom;
    var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    g.append("circle")
        .attr("cx", x_coord)
        .attr("cy", y_coord)
        .attr("r", rayon)
        .attr("fill", "#F8F8FF");


}

// Converts from degrees to radians.
Math.radians = function (degrees) {
    return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
Math.degrees = function (radians) {
    return radians * 180 / Math.PI;
};

/*
 .attr("cx", function (d) {
            if (d.cause === "ecologie") {
                return x((Math.random() * rayon_C) * Math.cos((Math.random() * (120)) * (120) - 60));
            } else if (d.cause === "sociale") {
                return x((Math.random() * rayon_C) * Math.cos((Math.random() * 180) + 60));
            }
            else if (d.cause == "animale") {
                return x((Math.random() * rayon_C) * Math.cos((Math.random() * 360) - 60))
            );
 */
function getRandomInt(min, max) {
    return Math.floor((Math.random() * (max - min)) + min);
}

function draw_circle_chart(element, x_coord, y_coord, rayon) {

    var svg = d3.select("#" + element).append("svg").attr("width", 420).attr("height", 420);
    var width = +svg.attr("width") - margin.left - margin.right;
    var height = +svg.attr("height") - margin.top - margin.bottom;
    var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var x = d3.scaleLinear().domain([0, width_SVG]).range([0, width_SVG]);
    var y = d3.scaleLinear().domain([0, height_SVG]).range([height_SVG, 0]);
    var r = d3.scaleLinear().domain([0, 2000]).range([5, 15]);

    var rng_radius = d3.randomUniform(30, rayon-20);
    var rng_angle1 = d3.randomUniform(-60, 60);
    var rng_angle2 = d3.randomUniform(60, 180);
    var rng_angle3 = d3.randomUniform(180, 300);

    var data_f = data.filter(function(d){
        return !isNaN(d.taille);
    });
    g.append("circle")
        .attr("cx", x_coord)
        .attr("cy", y_coord)
        .attr("r", rayon)
        .attr("fill", "#F8F8FF");

    console.log(data_f.map(function(d){
        return d.cause;
    }));
    g.selectAll("circle")
        .data(data_f)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
            if (d.cause === "ecologie") {
                return x_coord + Math.cos(Math.radians(rng_angle1())) * rng_radius();
            } else if (d.cause === "sociale") {
                return x_coord + Math.cos(Math.radians(rng_angle2())) * rng_radius();
            } else if (d.cause === "animale") {
                return x_coord + Math.cos(Math.radians(rng_angle3())) * rng_radius();
            }
        })
        .attr("cy", function (d) {
            if (d.cause === "ecologie") {
                return y_coord + Math.sin(Math.radians(rng_angle1())) * rng_radius();
            } else if (d.cause === "sociale") {
                return y_coord + Math.sin(Math.radians(rng_angle2())) * rng_radius();
            } else if (d.cause === "animale") {
                return y_coord + Math.sin(Math.radians(rng_angle3())) * rng_radius();
            }
        })
        .attr("r", function (d) {
            console.log(d.taille);
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
        .on("mouseover", function(d) {
            d3.select(this)
                .transition().duration(100)
                .attr("r", function (d) {
                    return r(d.taille *2);
                })
        })
        .on("mouseout", function(d) {
            d3.select(this)
                .transition().duration(100)
                .attr("r", function (d) {
                    return r(d.taille);
                })
        });






}


function bar_chart(element, property) {
    $("#" + element).html("");
    var svg = d3.select("#" + element).append("svg").attr("width", 300).attr("height", 300);
    var width = +svg.attr("width") - margin.left - margin.right;
    var height = +svg.attr("height") - margin.top - margin.bottom;
    var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var nested_data = d3.nest()
        .key(function (d) {
            return d[property];
        })
        .rollup(function (d) {
            return {
                size: d.length, total_time: d3.sum(d, function (d) {
                    return d.time;
                })
            };
        })
        .entries(data);

    nested_data = nested_data.sort(function (a, b) {
        return d3.ascending(a.key, b.key)
    });


    console.log("BARCHART DATA");
    console.log(nested_data);
    if (property === "time") {
        var x = d3.scaleLinear()
            .rangeRound([0, width]);

    }
    else {
        x = d3.scaleBand()
            .rangeRound([0, width])
            .paddingInner(0.1);
    }
    var y = d3.scaleLinear()
        .rangeRound([height, 0]);
// custom colors are used here
    var z = d3.scaleOrdinal(custom_colors);

    if (property === "time") {
        x.domain([0, d3.max(nested_data.map(function (d) {
            return +d.key;
        })) + 1]);
    } else {
        x.domain(nested_data.map(function (d) {
            return d.key;
        }));

    }

    y.domain([0, d3.max(nested_data, function (d) {
        return d.value.size;
    })]);
    z.domain(nested_data.map(function (d) {
        return d.key;
    }));

    g.selectAll(".bar")
        .data(nested_data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
            return x(d.key)
        })
        .attr("y", function (d) {
            return y(d.value.size)
        })
        .attr("height", function (d) {
            return height - y(d.value.size);
        })
        .attr("width", function (d) {
            if (property === "time") {
                return (x(1) - x(0)) * 0.9;
            } else {
                return x.bandwidth();
            }
        })
        .style("fill", function (d) {
            return z(d.key)
        })
        .on("mouseover", function (d) {
            d3.select(this)
                .transition().duration(500)
                .attr("y", y(d.value.size) - 15)

                .attr("height", function (d) {
                    return height - y(d.value.size) + 10;
                })
                .attr("width", function (d) {
                    if (property === "time") {
                        return (x(1) - x(0)) * 1.1;
                    } else {
                        return x.bandwidth() + 10;
                    }
                })
                .attr("x", function (d) {
                    if (property !== "time") {
                        return x(d.key) - 5;
                    } else {
                        return x(d.key) - 2;

                    }
                })

        })
        .on("mouseout", function (d) {
            d3.select(this)
                .transition().duration(500)
                .attr("y", y(d.value.size))

                .attr("height", function (d) {
                    return height - y(d.value.size);
                })
                .attr("width", function (d) {
                    if (property === "time") {
                        return (x(1) - x(0)) * 0.9;
                    } else {
                        return x.bandwidth();
                    }
                })

                .attr("x", function (d) {

                    return x(d.key)
                })

        })


    ;

    g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))

    g.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y).ticks(null, "s"))


}


$(function () {
    console.log("READY");

    var URL = "https://docs.google.com/spreadsheets/d/1kWMkDglBeO6uUuCnJWu9_-r9IeKE4EID160i2CGhV8M";
    URL += "/pub?single=true&output=csv";


    d3.csv(URL, function (d) {
        data = d;
        data.forEach(function (d) {
            d.taille = +d.taille;
            if (d.cause == "ecologie") {
                nb_A_eco = nb_A_eco + 1;
            }
            else if (d.cause == "sociale") {
                nb_A_soc = nb_A_soc + 1;
            }
            else if (d.cause == "animale") {
                nb_A_ani = nb_A_ani + 1;
            }
            //console.log("nb_A_eco :" + nb_A_eco);
            //console.log("nb_A_ani :" + nb_A_ani);
            //console.log("nb_A_soc :" + nb_A_soc);
            //console.log("next step");
        });
        //draw_circle("empty_chart", origin_C[0],origin_C[1], rayon_C);
        draw_circle_chart("empty_chart", origin_C[0], origin_C[1], rayon_C);

        console.log(d);

    })
})
