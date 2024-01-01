# BMI Calculator

Overview

This BMI calculator introduces an additional file, root.js, to further organize and modularize the server setup. The project structure now includes root.js, bmiCalculator.js,bmiCalculator.html and bmiRoutes.js.




!Files




1.root.js


Utilizes Express for handling routes and middleware.

Includes body-parser for parsing form data.

Serves static files from the 'public' directory.

Listens on port 3000.


2.bmiCalculator.js


Router module handling BMI calculation logic.

Provides a POST endpoint '/calculate' for BMI calculation.

Parses weight and height in 2 units(metric and imperial) from the request body and calculates BMI.

Sends the BMI result as a response.


3.public/bmiCalculator.html


HTML file for the client-side interface with the BMI calculator form.

Utilizes Bootstrap for styling.

Dynamically displays the BMI result on the page.


4.routes/bmiRoutes.js

Stores history of calculated BMI results.

Handles routes of the program.







!Setup Instructions




Ensure you have Node.js installed on your machine.

Run npm install to install the required dependencies (Express, body-parser,chalk,node-emoji).

Execute node bmiCalculator.js to start the server.

Open your browser and visit http://localhost:3000 to access the BMI calculator.






!Usage




Enter your weight,height and age in the form.

Select your gender and unit measurements.

Click on the "Calculate BMI" button.

View your BMI result on the page.





!Notes
----
