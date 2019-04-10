function drawHorizontalBarChart(rawData) {
      // Create the data table.
      var data = [];
      data.push(['Site', 'Cases']);

      // loop through the raw data to fill this in
      for(var index in rawData) {
          data.push([rawData[index].label, rawData[index].value]);
      }

      var data2 = google.visualization.arrayToDataTable(data);

      var options = {
        title: 'Cases By Histologies',
        chartArea: {width: '50%', top:20},
        bar: {groupWidth: "95%"},
        legend: { position: "none" },
/*        height: 400,
        hAxis: {
          title: 'Total Cases',
          minValue: 0,
        },
        vAxis: {
          title: 'Histologies'
        }*/
      };

      var bchart = new google.visualization.BarChart(document.getElementById('columnchart_material'));

      bchart.draw(data2, options);
}

function drawBarChart(rawData, ititle, elementId) {
 var data = [];
      data.push(['Site', 'Cases',{ role: "style" }]);

      //var color = '#' + Math.floor(Math.random()*16777215).toString(16);  // random color generator
      var color = '#4c5eb0';
      // loop through the raw data to fill this in
      for(var index in rawData) {
          data.push([rawData[index].label, rawData[index].value, color]);
      }

      var data2 = google.visualization.arrayToDataTable(data);

      var view = new google.visualization.DataView(data2);
      view.setColumns([0, 1,
                       { calc: "stringify",
                         sourceColumn: 1,
                         type: "string",
                         role: "annotation" },
                       2]);

      var options = {
        title: ititle,
        width: "100%",
        height: "100%",
        bar: {groupWidth: "95%"},
        legend: { position: "none" },
      };
      var chart = new google.visualization.ColumnChart(document.getElementById(elementId));
      chart.draw(view, options);
}

function drawOverviewPieChart(rawData) {

      // Create the data table.
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Site');
      data.addColumn('number', 'Value');

      // loop through the raw data to fill this in
      for(var index in rawData) {
          data.addRow([rawData[index].label, rawData[index].value]);
      }

      // Set chart options
      var options = {title:'Overview of Cancer Types',
                     chartArea: {
                      //width: 450, //'100%',
                      height: '100%',
                      top:20,
                      bottom:10
                     }
                   };

      // Instantiate and draw our chart, passing in some options.
      var chart = new google.visualization.PieChart(document.getElementById('overview-chart'));
      chart.draw(data, options);

      google.visualization.events.addListener(chart, 'select', selectHandler); 

      function selectHandler(e)     {   
        var ctype = data.getValue(chart.getSelection()[0].row, 0);
        document.getElementById('search-input').value = 'disease_category:"' + ctype + '"'
        document.getElementById('search-btn').click();
        //alert(data.getValue(chart.getSelection()[0].row, 0));
      }

}

function drawPieChart(rawData, ititle, elementId) {

      // Create the data table.
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Site');
      data.addColumn('number', 'Value');

      // loop through the raw data to fill this in
      for(var index in rawData) {
          data.addRow([rawData[index].label, rawData[index].value]);
      }

      // Set chart options
      var options = {title: ititle,
                     chartArea: {
                      width:'100%',
                      height:'100%',
                      top:20,
                      bottom:0
                     }
                   };

      // Instantiate and draw our chart, passing in some options.
      var chart = new google.visualization.PieChart(document.getElementById(elementId));
      chart.draw(data, options);

}

