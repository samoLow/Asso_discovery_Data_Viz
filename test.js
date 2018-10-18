var data = undefined;
var margin = {top: 20, right: 20, bottom: 30, left: 40};
var rayon_C = 180;
var height_SVG = 400;
var width_SVG = 400;
var origin_C = [height_SVG/2, width_SVG/2];
var nb_A_soc = 0;
var nb_A_eco = 0;
var nb_A_ani = 0;

$(function () {
    console.log("READY");

    var URL = "https://docs.google.com/spreadsheets/d/1kWMkDglBeO6uUuCnJWu9_-r9IeKE4EID160i2CGhV8M";
    URL += "/pub?single=true&output=csv";

// Feel free to change or delete any of the code you see in this editor!
var svg = d3.select("body").append("svg")
    .attr("width", 960)
    .attr("height", 500)
    .append("g")
    .attr("transform",
        "translate(" + 30 + "," + 30 + "),rotate(0), scale(1.0)");

var chart_height = 200;
var chart_width = 800;

    d3.csv(URL, function (d) {
        data = d;
        data.forEach(function (d) {
            d.taille = +d.taille;
            if (d.cause == "écologie"){
                nb_A_eco = nb_A_eco +1;
            }
            else if (d.cause == "sociale"){
                nb_A_soc  = nb_A_soc +1;
            }
            else if (d.cause == "animale"){
                nb_A_ani = nb_A_ani +1;
            };
        });
        console.log(nb_A_eco);
        console.log(nb_A_ani);
        console.log(nb_A_soc);
        console.log(d);

    });


  /*  var y = d3.scaleLinear().domain([0, d3.max(data, function(d){return d.prix;})]).range([chart_height, 0]);
    var y2 = d3.scaleLinear().domain([0, d3.max(data, function(d){return d.poids;})]).range([chart_height, 0]);
    var x = d3.scaleBand()
        .range([0, chart_width])
        .padding(0.1)
        .domain(data.map(function(d) { return d.fruit; }));
    var c = d3.scaleOrdinal(d3.schemeCategory20);

    // define the line
    var totoline = d3.line()
        .x(function(d) { return x(d.fruit) + x.bandwidth()/2; })
        .y(function(d) { return y2(d.poids); })
        .curve(d3.curveMonotoneX)

    var tatarea = d3.area()
        .x(function(d) { return x(d.fruit) + x.bandwidth()/2; })
        .y1(function(d) { return y2(d.poids); })
        .curve(d3.curveMonotoneX)

    var toto = svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d,i){return x(d.fruit);})
        .attr("y", function(d){return y(d.prix);})
        .attr("width", x.bandwidth())
        .attr("height", function(d){return chart_height - y(d.prix)})
        .attr("fill", function(d){ return c(d.fruit)})
        .attr("class", "rect2")
        .on("mouseover", function(d){
            d3.select(".tooltip")
                .style("display", "block")
                .style("top", y(d.prix) + 0 + "px")
                .style("left", x(d.fruit) + 30 + "px")
                .text(d.prix + " €");
            d3.select(this)
                .transition().duration(100)
                .attr("fill", "black")
                .attr("y", y(d.prix) - 10)
        })
        .on("mouseout", function(d){
            d3.select(".tooltip")
                .style("display", "none");
            d3.select(this).attr("fill", c(d.fruit));
            d3.select(this)
                .transition().duration(100)
                .attr("fill", c(d.fruit))
                .attr("y", y(d.prix))
        })
    svg.append("g")
        .attr("transform", "translate(0," + chart_height + ")")
        .call(d3.axisBottom(x));
    // add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y));


    // Add a line chart
    svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", totoline);

    tatarea.y0(y(0));
    // Add a line chart
    svg.append("path")
        .datum(data)
        .attr("class", "area")
        .attr("d", tatarea);

    // add some points
    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function(d){return x(d.fruit) + x.bandwidth()/2;})
        .attr("cy", function(d){return y2(d.poids);})
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
        */
});