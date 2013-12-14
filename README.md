Stackedbar charts for for OpenSpending
================================

This is a d3 based visualizations of Stacked Bar Charts OpenSpending.

How to do
---------

Add the following to your html page:

```
  <div id="chart"></div>
  <script src="js/vendor/d3.v3.min.js"></script>
  <script src="js/vendor/underscore-min.js"></script>
  <script src="js/vendor/jquery.js"></script>
  <script src="js/vendor/openspending/aggregator.js"></script>
  <script src="js/os-stackedbar.js"></script>
```

Then add the config (example):

```
  var config={
    siteUrl: 'http://openspending.org',
    dataset: 'de-bund',
    drilldowns: ['hauptfunktion','oberfunktion'],
    cuts: ['year:2010'],
    rootNodeLabel: 'Total',
    measure: 'amount',
    processEntry: function(e) { return e; },
    callback: function (tree) {data=tree}
  };
```

Finally call 

```
  OpenSpending.stackedbar(config)
```


