
function buildGauge(wfreq) {
  // pie chart converted to gauge chart
  // Based in part on https://code.tutsplus.com/tutorials/create-interactive-charts-using-plotlyjs-pie-and-gauge-charts--cms-29216
  console.log("buildGuage1: " + wfreq);
  let traceGauge = {
    type: "pie",
    showlegend: false,
    hole: 0.4,
    rotation: 90, // Chart not drawn from default 12 o'clock position
    values: [180 / 9,180 / 9,180 / 9,180 / 9,180 / 9,180 / 9,180 / 9,180 / 9,180 / 9,180], // 10 slices visible, bottom slice half of pie to be hidden
    text: ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8", "8-9"], //Text displayed in each slice
    direction: "clockwise", // read from left to right
    textinfo: "text",
    textposition: "inside",
    marker: {
      colors: ["#F8F3EC","#F4F1E5","#E9E6CA","#E2E4B1","#D5E49D","#B7CC92","#8CBF88","#8ABB8F","#85B48A","white",], // Colors for each slice, white for hidden half
      labels: ["0-1","1-2","2-3","3-4","4-5","5-6","6-7","7-8","8-9","",], // Slice labels for hoverover text, last slice hidden with no text
      hoverinfo: "label",
    },
    hoverinfo: "label",
  };

  // Define the dot where the needle "originates"
  let dot = {
    type: "scatter",
    x: [0],
    y: [0],
    marker: {
      size: 14,
      color: "#850000",
    },
    showlegend: false,
    hoverinfo: "skip",
  };

  // Add weights to the degrees to correct needle
  let weight = 0;
  if (wfreq == 2 || wfreq == 3) {
    weight = 3;
  } else if (wfreq == 4) {
    weight = 1;
  } else if (wfreq == 5) {
    weight = -0.5;
  } else if (wfreq == 6) {
    weight = -2;
  } else if (wfreq == 7) {
    weight = -3;
  }

  // Allow 20 degrees of 180 for each of the 9 visible gauge sections
  let degrees = 180 - (20 * wfreq + weight); 
  let radius = 0.5;
  let radians = (degrees * Math.PI) / 180;
  let aX = 0.025 * Math.cos((radians * Math.PI) / 180);
  let aY = 0.025 * Math.sin((radians * Math.PI) / 180);
  let bX = -0.025 * Math.cos((radians * Math.PI) / 180);
  let bY = -0.025 * Math.sin((radians * Math.PI) / 180);
  let cX = radius * Math.cos(radians);
  let cY = radius * Math.sin(radians);

  /* Draw the needle as a triangle. The value for the degrees variable will determine the angle 
  at which the needle is drawn. the "wfreq" value will determine the degrees. 
  The radius variable determines the length of the needle. 
  The attributes x0 and y0 are used to set the starting point of our line. The attributes x1 and y1 
  are used to set the ending point of our line. */

  // Use SVG Path to draw the triangle
  let path = "M " + aX + " " + aY + " L " + bX + " " + bY + " L " + cX + " " + cY + " Z";

  let gaugeLayout = {
    title: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
    shapes: [{
        type: "path",
        path: path,
        fillcolor: "#850000",
        line: {color: "#850000"}},
    ],
    xaxis: {
      zeroline: false,
      showticklabels: false,
      showgrid: false,
      range: [-1, 1],
      fixedrange: true,
    },
    yaxis: {
      zeroline: false,
      showticklabels: false,
      showgrid: false,
      range: [-1, 1],
      fixedrange: true,
    },
  };

  Plotly.newPlot("gauge", [traceGauge, dot], gaugeLayout);
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
    showlegend: false,
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
    autosize: false,
    width: 500,
    height: 500,
    margin: {
      l: 100,
      r: 100,
      t: 10,
      b: 80,
    },
  };
  var config = {responsive: true}
  // Render the plot to the div tag with id "bar"
  Plotly.newPlot("bar", data, layout, config);
}

function optionChanged(individualID) {
  buildMetadata(individualID);
  buildCharts(individualID);
}

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

function buildMetadata(id) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter((sampleObj) => sampleObj.id == id);
    var result = resultArray[0];
    console.log(result);
    var PANEL = d3.select("#sample-metadata");

    PANEL.html("");
    PANEL.append("h6").text("id: " + result.id);
    PANEL.append("h6").text("ethnicity: " + result.ethnicity);
    PANEL.append("h6").text("gender: " + result.gender);
    PANEL.append("h6").text("age: " + result.age);
    PANEL.append("h6").text("location: " + result.location);
    PANEL.append("h6").text("bbtype: " + result.bbtype);
    PANEL.append("h6").text("wfreq: " + result.wfreq);

    // Build guage
    buildGauge(result.wfreq);
  });
}

/* Inside init(), the d3.select() method is used to select the dropdown menu, which has an id of #selDataset. 
The dropdown menu is assigned to the variable selector. The d3.json() method is used to read the data from samples.json. 
The data from the entire JSON file is assigned the (arbitrary) argument name data.
Inside the data object, the names array, as seen from console.log(data), contains the ID numbers of all the study participants. 
The variable sampleNames is assigned to this array. Open the browser console to examine the names array. As expected, it is an array of ID numbers. */
function init() {
  var selector = d3.select("#selDataset");

  d3.json("samples.json").then((data) => {
    console.log(data);
    var sampleNames = data.names;
    /* In this code, note that the forEach() method is called on the sampleNames array. 
    For each element in the array, a dropdown menu option is appended. 
    The text of each dropdown menu option is the ID. Its value property is also assigned the ID.
    For example, ID "940" is the first element of the sampleNames array. 
    As the forEach() method iterates over the first element of the array, a menu option is appended to the dropdown menu. 
    It is then given the text (the text seen in the dropdown menu) "940", and its property is also assigned "940". 
    The forEach() method will perform the same tasks for the next element of the array, "941".*/
    sampleNames.forEach((sample) => {
      selector.append("option").text(sample).property("value", sample);
    });

    // Use the first sample retrieved from the list and build the initial plots,
    // which will be shown to the user on initial page load
    const firstSample = sampleNames[0];
    console.log(firstSample);
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();
