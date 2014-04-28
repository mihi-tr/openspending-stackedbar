
var OpenSpending = OpenSpending || {};


OpenSpending.stackedbar= function(config) {
    var width=800
    var height=600
    margin= { "left": 20,
      "right":20,
      "top": 20,
      "bottom": 20
    }
  
  var transition=function(c,svg) {
    var ds=(height/c.length)*0.6;
    var dh=(height-ds*c.length)/(c.length*1.0)
    c=_.sortBy(c,function(d) { return -d.amount });
    scale=d3.scale.linear()
      .domain([0,c[0].amount])
      .range([0,width]);

    _.each(c, function(d,i) {
      d.dy=(dh+ds)*i;
      d.dx=0;
      d.dh=dh;
      d.dw=scale(d.amount);
      })
    // paint graphs.
    
    svg.selectAll("g.bar").remove();

    var groups=svg.selectAll("g.bar")
      .data(c)
      .enter()
      .append("g")
      .attr("class","bar")
      .append("rect")
      .attr("x",function(d) { return d.x })
      .attr("y",function(d) { return d.y })
      .attr("width",function(d) { return d.width })
      .attr("height",function(d) { return d.height });
    
    groups.transition()
      .attr("height",function(d) { return d.dh })
      .transition()
      .attr("y", function(d) {return d.dy })
      .transition()
      .attr("x",function(d) { return d.dx })
      .transition()
      .attr("width", function(d) { return d.dw });
    
    setTimeout(function() { draw(c,svg) },2000);
    }

  var draw=function(c,svg) {
    c=_.sortBy(c,function(d) { return -d.amount });
    
    svg.selectAll("g").remove();
    var bs=(height/c.length)*0.6;
    var bh=(height-bs*c.length)/(c.length*1.0);
    
    var scale=d3.scale.linear()
      .domain([0,c[0].amount])
      .range([0,width]);

    _.each(c,function(d,i) {
      var y=(bh+bs)*i;
      var x=0;
      var height=bh;
      console.log(d.children.length);
      if (d.children.length === 0 ) {
        d.children = [d]
        } 
      _.each(d.children,function(d) {
        d.x=x;
        d.y=y;
        d.height=height;
        d.width=scale(d.amount);
        x=x+d.width;
        })
      })
     
     var pp=d3.format(",f");

      

     var groups=svg.selectAll("g.bar")
      .data(c)
      .enter()
      .append("g")
      .attr("class","bar")
      .on("click",function(d) { transition(d.children,svg) });
    
     var stackedbars=groups.selectAll("rect")
      .data(function(d) { return d.children })
      .enter()
      .append("rect")
      .attr("x",function(d) { return d.x })
      .attr("y",function(d) { return d.y })
      .attr("width", function(d) { return d.width })
      .attr("height", function(d) { return d.height })
      .append("title")
      .text(function(d) { return d.label+" "+pp(d.amount)+d.currency });

    var labels=groups.append("text")
      .text(function(d) { return d.label + " "+pp(d.amount)+d.currency })
      .attr("x",0)
      .attr("y",function(d,i) {return (bh+bs)*i })
      .attr("text-anchor","top");
    }

  this.callback=function (tree) {
     var svg = d3.select("#chart").append("svg")
       .attr("width", width+margin.left+margin.right)
       .attr("height", height+margin.top+margin.bottom)
       .append("g")
       .attr("transform","translate("+margin.left+","+margin.top+")");
    this.currency=tree.currency;
    draw(tree.children,svg);
    }

  config.callback=this.callback;
  
  OpenSpending.Aggregator(config);
  }
