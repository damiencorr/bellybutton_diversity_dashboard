
function buildCharts(id) {
  // Get the samples data using ASYNC .then() call
  d3.json("samples.json").then((data) => {
    // Assemble the parts for and then build the chart
    var samples = data.samples;
    var resultArray = samples.filter((sampleObj) => sampleObj.id == id);
    result = resultArray[0];
    console.log("Build Charts - " + typeof result, result);
    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;
    console.log("Build Charts OTUs- " + otu_ids, otu_labels, sample_values);

    barChart(otu_ids, otu_labels, sample_values);
    bubbleChart(otu_ids, otu_labels, sample_values);

  });
}



function buildGauge1(wfreq){

  // pie chart converted to gauge chart
  console.log("Pie chart convert to guage: " + wfreq)
  let traceGauge = {
    type: 'pie',
    showlegend: false,
    hole: 0.4,
    rotation: 90,
    values: [180/9, 180/9, 180/9, 180/9, 180/9, 180/9, 180/9, 180/9, 180/9, 180],
    text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
    direction: 'clockwise',
    textinfo: 'text',
    textposition: 'inside',
    marker: {
      colors: ['#F8F3EC','#F4F1E5','#E9E6CA','#E2E4B1','#D5E49D','#B7CC92','#8CBF88','#8ABB8F','#85B48A','white'],
      labels: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9',''],
      hoverinfo: "label"
    },
    hoverinfo: "skip"
  }

  // the dot where the needle "originates"
  let dot = {
    type: 'scatter',
    x: [0],
    y: [0],
    marker: {
      size: 14,
      color:'#850000'
    },
    showlegend: false,
    hoverinfo: "skip"
  }

  // the needle (triangular version)

    // add weights to the degrees to correct needle
  let weight = 0;
  if (wfreq == 2 || wfreq == 3){
    weight = 3;
  } else if (wfreq == 4){
    weight = 1;
  } else if (wfreq == 5){
    weight = -.5;
  } else if (wfreq == 6){
    weight = -2;
  } else if (wfreq == 7){
    weight = -3;
  }

  let degrees = 180-(20 * wfreq + weight); // 20 degrees for each of the 9 gauge sections
  let radius = .5;
  let radians = degrees * Math.PI / 180;
  let aX = 0.025 * Math.cos((radians) * Math.PI / 180);
  let aY = 0.025 * Math.sin((radians) * Math.PI / 180);
  let bX = -0.025 * Math.cos((radians) * Math.PI / 180);
  let bY = -0.025 * Math.sin((radians) * Math.PI / 180);
  let cX = radius * Math.cos(radians);
  let cY = radius * Math.sin(radians);

  // draw the triangle
  let path = 'M ' + aX + ' ' + aY +
            ' L ' + bX + ' ' + bY +
            ' L ' + cX + ' ' + cY +
            ' Z';

  let gaugeLayout = {
    title: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
    shapes:[{
        type: 'path',
        path: path,
        fillcolor: '#850000',
        line: {
          color: '#850000'
        }
      }],
    xaxis: {zeroline:false, 
            showticklabels:false,
            showgrid: false, 
            range: [-1, 1],
            fixedrange: true
          },
    yaxis: {zeroline:false, 
            showticklabels:false,
            showgrid: false, 
            range: [-1, 1],
            fixedrange: true
          }
  };

  Plotly.newPlot("gauge", [traceGauge, dot], gaugeLayout);
}














function buildGauge2(wfreq){

  // pie chart converted to gauge chart
  let traceGauge = {
    type: 'pie',
    showlegend: false,
    hole: 0.4,
    rotation: 90,
    values: [180/9, 180/9, 180/9, 180/9, 180/9, 180/9, 180/9, 180/9, 180/9, 180],
    text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
    direction: 'clockwise',
    textinfo: 'text',
    textposition: 'inside',
    marker: {
      colors: ['#F8F3EC','#F4F1E5','#E9E6CA','#E2E4B1','#D5E49D','#B7CC92','#8CBF88','#8ABB8F','#85B48A','white'],
      labels: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9',''],
      hoverinfo: "label"
    },
    hoverinfo: "skip"
  }

  // the dot where the needle "originates"
  let dot = {
    type: 'scatter',
    x: [0],
    y: [0],
    marker: {
      size: 14,
      color:'#850000'
    },
    showlegend: false,
    hoverinfo: "skip"
  }

  // the needle (triangular version)

    // add weights to the degrees to correct needle
  let weight = 0;
  if (wfreq == 2 || wfreq == 3){
    weight = 3;
  } else if (wfreq == 4){
    weight = 1;
  } else if (wfreq == 5){
    weight = -.5;
  } else if (wfreq == 6){
    weight = -2;
  } else if (wfreq == 7){
    weight = -3;
  }

  let degrees = 180-(20 * wfreq + weight); // 20 degrees for each of the 9 gauge sections
  let radius = .5;
  let radians = degrees * Math.PI / 180;
  let aX = 0.025 * Math.cos((radians) * Math.PI / 180);
  let aY = 0.025 * Math.sin((radians) * Math.PI / 180);
  let bX = -0.025 * Math.cos((radians) * Math.PI / 180);
  let bY = -0.025 * Math.sin((radians) * Math.PI / 180);
  let cX = radius * Math.cos(radians);
  let cY = radius * Math.sin(radians);

  // draw the triangle
  let path = 'M ' + aX + ' ' + aY +
            ' L ' + bX + ' ' + bY +
            ' L ' + cX + ' ' + cY +
            ' Z';

  let gaugeLayout = {
    title: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
    shapes:[{
        type: 'path',
        path: path,
        fillcolor: '#850000',
        line: {
          color: '#850000'
        }
      }],
    xaxis: {zeroline:false, 
            showticklabels:false,
            showgrid: false, 
            range: [-1, 1],
            fixedrange: true
          },
    yaxis: {zeroline:false, 
            showticklabels:false,
            showgrid: false, 
            range: [-1, 1],
            fixedrange: true
          }
  };

  Plotly.newPlot("gauge", [traceGauge, dot], gaugeLayout);
}









function guageChart() {
  // A radial gauge chart has a circular arc, which displays a single value to estimate progress toward a goal.
  // The bar shows the target value, and the shading represents the progress toward that goal.
  // Gauge charts, known as speedometer charts as well.
  // This chart type is usually used to illustrate key business indicators.
  // The following examples include "steps" attribute shown as shading inside the radial arc, "delta"
  // which is the difference of the value and goal (reference - value),
  // and "threshold" to determine boundaries that visually alert you if the value cross a defined threshold.

  var data = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: 2,
      title: { text: "Belly Button washing Frequency" },
      type: "indicator",
      mode: "gauge",
      gauge: {
        axis: { range: [null, 10] },
      },
    },
  ];

  var layout = { margin: { t: 0, b: 0 } };
  Plotly.newPlot("gauge", data, layout);
}






function bubbleChart(otu_ids, otu_labels, sample_values) {
  console.log("bubbleChart " + otu_ids, otu_labels, sample_values);
  // Trace1 for the OTU data bubble chart
  var trace1 = {
    x: otu_ids,
    y: sample_values,
    text: otu_labels,
    mode: "markers",
    marker: {
      // Size the bubbles using the sample values
      size: sample_values,
      // Color the bubbles using https://plotly.com/javascript/colorscales/#earth-colorscale
      color: otu_ids,
      colorscale: "Earth",
    },
  };

  var data = [trace1];
  var layout = {
    showlegend: false
  };

  Plotly.newPlot("bubble", data, layout);
}

function barChart(otu_ids, otu_labels, sample_values) {
  // Slice the first 10 objects for plotting
  sample_values = sample_values.slice(0, 10);
  otu_ids = result.otu_ids.slice(0, 10);
  otu_labels = result.otu_labels.slice(0, 10);
  console.log("barChart SLICE " + otu_ids, otu_labels, sample_values);

  // Convert IDs to strings to represent as axis labels
  sample_values = sample_values.map((row) => row.toString());

  // Prefix data with identifying label
  otu_ids = otu_ids.map((row) => "OTU " + row);

  // Values seems to already be in sorted order
  // Reverse the arrays due to Plotly's defaults
  otu_ids = otu_ids.reverse();
  otu_labels = otu_labels.reverse();
  sample_values = sample_values.reverse();
  console.log("barChart REVERSE " + otu_ids, otu_labels, sample_values);

  // Trace1 for the OTU data bar chart
  var trace1 = {
    x: sample_values,
    y: otu_ids,
    text: otu_labels,
    name: "OTU",
    type: "bar",
    orientation: "h",
  };

  // data
  var data = [trace1];

  // Apply the group bar mode to the layout
  var layout = {
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 100,
    },
  };

  // Render the plot to the div tag with id "bar"
  Plotly.newPlot("bar", data, layout);
}
