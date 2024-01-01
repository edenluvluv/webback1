const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const emoji = require('node-emoji');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/bmiCalculator.html');
});

app.post('/calculate', (req, res) => {
  const weight = parseFloat(req.body.weight);
  const height = parseFloat(req.body.height);
  const age = parseInt(req.body.age);
  const gender = req.body.gender;
  const unit = req.body.unit;

  if (isNaN(weight) || isNaN(height) || height === 0) {
    res.send('Invalid input. Please enter valid weight and height.');
    return;
  }

  console.log(chalk.blue(`Received BMI calculation request with inputs:`));
  console.log(chalk.blue(`Weight: ${weight} ${unit === 'imperial' ? 'lbs' : 'kg'}`));
  console.log(chalk.blue(`Height: ${height} ${unit === 'imperial' ? 'inches' : 'cm'}`));
  console.log(chalk.blue(`Age: ${age}`));
  console.log(chalk.blue(`Gender: ${gender}`));

  if (unit === 'imperial') {
    const weightInKg = weight * 0.453592; 
    const heightInCm = height * 2.54; 
    const bmi = weightInKg / Math.pow(heightInCm / 100, 2);
    const interpretation = interpretBMI(bmi);
    let resultHTML = `<p style="text-align: center;">Your BMI is: <span style="color: #007bff; font-weight: bold; display: block;">${bmi.toFixed(2)}</span> (${interpretation})</p>`;

    if (interpretation === 'Underweight') {
      resultHTML += `<p style="color: #dc3545;text-align: center;">${emoji.get(':disappointed:')}</p>`;
    } else if (interpretation === 'Obese') {
      resultHTML += `<p style="color: #dc3545;text-align: center;">${emoji.get(':disappointed_relieved:')} </p>`;
    } else if (interpretation === 'Overweight') {
      resultHTML += `<p style="color: #ffc107;text-align: center;">${emoji.get(':neutral_face:')} </p>`;
    } else {
      resultHTML += `<p style="color: #28a745;text-align: center;">${emoji.get(':smiley:')}  </p>`;
    }
  
    res.send(resultHTML);

    if (interpretation === 'Underweight') {
      console.log(chalk.red(`BMI calculated for ${weight} lbs, ${height} inches. Result: ${bmi.toFixed(2)} - ${interpretation} ${emoji.get(':disappointed:')}`));
    } else if (interpretation === 'Obese') {
      console.log(chalk.red(`BMI calculated for ${weight} lbs, ${height} inches. Result: ${bmi.toFixed(2)} - ${interpretation} ${emoji.get(':disappointed_relieved:')}`));
    } else if (interpretation === 'Overweight') {
      console.log(chalk.yellow(`BMI calculated for ${weight} lbs, ${height} inches. Result: ${bmi.toFixed(2)} - ${interpretation} ${emoji.get(':neutral_face:')}`));
    } else {
      console.log(chalk.green(`BMI calculated for ${weight} lbs, ${height} inches. Result: ${bmi.toFixed(2)} - ${interpretation} ${emoji.get(':smiley:')}`));
    }

    console.log(chalk.blue(`Sent BMI calculation response.`));
  } else {
    const bmi = weight / Math.pow(height / 100, 2);
    const interpretation = interpretBMI(bmi);
    let resultHTML = `<p style="text-align: center;">Your BMI is: <span style="color: #007bff; font-weight: bold; display: block; text-align: center;">${bmi.toFixed(2)}</span> (${interpretation})</p>`;

    if (interpretation === 'Underweight') {
      resultHTML += `<p style="color: #dc3545;text-align: center;">${emoji.get(':disappointed:')}</p>`;
    } else if (interpretation === 'Obese') {
      resultHTML += `<p style="color: #dc3545;text-align: center;">${emoji.get(':disappointed_relieved:')}</p>`;
    } else if (interpretation === 'Overweight') {
      resultHTML += `<p style="color: #ffc107;text-align: center;">${emoji.get(':neutral_face:')}</p>`;
    } else {
      resultHTML += `<p style="color: #28a745;text-align: center;">${emoji.get(':smiley:')}</p>`;
    }
  
    res.send(resultHTML);

    if (interpretation === 'Underweight') {
      console.log(chalk.red(`BMI calculated for ${weight} kg, ${height} cm. Result: ${bmi.toFixed(2)} - ${interpretation} ${emoji.get(':disappointed:')}`));
    } else if (interpretation === 'Obese') {
      console.log(chalk.red(`BMI calculated for ${weight} kg, ${height} cm. Result: ${bmi.toFixed(2)} - ${interpretation} ${emoji.get(':disappointed_relieved:')}`));
    } else if (interpretation === 'Overweight') {
      console.log(chalk.yellow(`BMI calculated for ${weight} kg, ${height} cm. Result: ${bmi.toFixed(2)} - ${interpretation} ${emoji.get(':neutral_face:')}`));
    } else {
      console.log(chalk.green(`BMI calculated for ${weight} kg, ${height} cm. Result: ${bmi.toFixed(2)} - ${interpretation} ${emoji.get(':smiley:')}`));
    }

    console.log(chalk.blue(`Sent BMI calculation response.`));
  }
});

function interpretBMI(bmi) {
  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi < 24.9) {
    return 'Normal Weight';
  } else if (bmi < 29.9) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
}

app.listen(port, () => {
  console.log(chalk.blue(`Server is running at http://localhost:${port} ${emoji.get(':rocket:')}`));
});
