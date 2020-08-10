# Belly Button Diversity Dashboard 
Module 12 Challenge

Please see the Github Pages live demo here - https://damiencorr.github.io/bellybutton_diversity_dashboard/

## Overview
This is a demonstration of building an interactive dashboard using interactive charts provided by Plotly for Javascript.
This arrangement of utilizing native web technologies illustrates the relative ease with which interactive data visualitions can be made available and shared with non-technical end-users.
- Based on sample data showing bacteria types and counts found in the belly button of members of a sample population, the dashboard utilizes several graph types to visualize the data.
- A panel - showing demographics for the selected anonymous individual
- A bar chart - shows the top ten by count of bacteria types in the belly button of the select individual
- A Bubble chart - shows all the types of bacteria found in the individual's belly button, with counts represnted as sized bubbles
- A guage with a needle indicating the individual's frequency of washing per week
The user is presented by default with the dashboard summary for the first individual of the sample population. The user can select to see the summary for any individual by clicking and scroilling through the dropdown list of available members.

## CHALLENGE
### Objectives
The goals of this challenge:
- Create a bar chart of the top ten bacterial species in a volunteer’s navel. Use JavaScript to select only the most populous species.
- Create a bubble chart to visualize the relative frequency of all the bacterial species found in a volunteer’s navel.
- Complete the demographic information panel

### Instructions
- Use the samples.json dataset
- When an individual’s ID is selected, the top 10 bacterial species (OTUs) should be visualized with a bar chart.
  - Create a horizontal bar chart to display the top 10 OTUs found in that individual.
  - Use sample_values as the values for the bar chart.
  - Use otu_ids as the labels for the bar chart.
  - Use otu_labels as the hover text for the chart.
- In the Demographics Info panel, display all the key-value pairs of the selected individual’s demographic data. 
- Create a bubble chart that displays each sample:
  - Use otu_ids for the x-axis values.
  - Use sample_values for the y-axis values.
  - Use sample_values for the marker size.
  - Use otu_ids for the marker colors.
  - Use otu_labels for the text values.
- When the dashboard is first opened in a browser, ID 940’s data should be displayed in the dashboard. In other words, the dashboard should not be blank when a user opens it in a browser.
- When a new ID number is selected from the dropdown menu, all the plots and the info panel should be updated.
- Customize the layout to create an attractive dashboard. Use your imagination!
- The completed project should resemble the following dashboard, though should not be identical.

### Extension
- Adapt the gauge chart from Plotly documentation to plot the weekly washing frequency of the individual. 
- You will need to modify the example gauge code to account for values ranging from 0 through 9. 
- Update the chart whenever a new sample is selected. Your gauge chart should look like this:
