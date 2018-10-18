// this is the foirst commentary, try to commit & push
var data = undefined;
var margin = {top: 20, right: 20, bottom: 30, left: 40};


function legend(element, keys, z) {
    var legendRectSize = 15;
    var svg = d3.select('#'+element).append('svg')
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

function treemap(element) {

function bubble_chart(element, property){
    $("#" + element).html("");
    var svg = d3.select("#" + element).append("svg").attr("width", 300).attr("height", 300);
    var width = +svg.attr("width") - margin.left - margin.right;
    var height = +svg.attr("height") - margin.top - margin.bottom;
    var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var color = d3.scaleOrdinal(d3.schemeCategory10);


    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function(d){return x(d.fruit) + x.bandwidth()/2;})
        .attr("cy", function(d){return y2(Math.log(d.taille));})
        .attr("r", function(d){return d.poids})
        .attr("fill", function(d){return c(d.fruit);})
        .on("mouseover", function(d){
            d3.select(this)
                .transition().duration(100)
                .attr("fill", "black")
                .attr("r", d.poids*2.0);
            d3.select(".tooltip")
                .style("display", "block")
                .style("top", y2(d.poids) + 5 + "px")
                .style("left", x(d.fruit) + 25 + "px")
                .text(d.poids);
        })
        .on("mouseout", function(d){
            d3.select(this)
                .transition().duration(100)
                .attr("fill", c(d.fruit))
                .attr("r", d.poids);
            d3.select(".tooltip")
                .style("display", "none");
        })

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

    var x = d3.scaleBand()
        .rangeRound([0, width])
        .paddingInner(0.1);

    var y = d3.scaleLinear()
        .rangeRound([height, 0]);

    var z = d3.scaleOrdinal(d3.schemeCategory10);

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
            return x.bandwidth();
        })
        .style("fill", function (d) {
            return z(d.key)
        });

    g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

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
            d.latitude = +d.latitude;
        });



    });
    consol.log(data);
});