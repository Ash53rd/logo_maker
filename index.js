const fs = require('fs');
const inquirer = require('inquirer');
const { Circle, Triangle, Square } = require('./lib/shapes');

function promptUser() {
  return inquirer
    .prompt([
      {
        type: 'input',
        name: 'text',
        message: 'Enter the text for the logo (up to 3 characters):',
        validate: (input) => input.length <= 3,
      },
      {
        type: 'input',
        name: 'textColor',
        message: 'Enter the color for the text (keyword or hexadecimal):',
      },
      {
        type: 'list',
        name: 'shape',
        message: 'Select a shape for the logo:',
        choices: ['circle', 'triangle', 'square'],
      },
      {
        type: 'input',
        name: 'shapeColor',
        message: 'Enter the color for the shape (keyword or hexadecimal):',
      },
    ])
    .then((answers) => {
      const { text, textColor, shape, shapeColor } = answers;
      let shapeInstance;

      switch (shape) {
        case 'circle':
          shapeInstance = new Circle();
          break;
        case 'triangle':
          shapeInstance = new Triangle();
          break;
        case 'square':
          shapeInstance = new Square();
          break;
      }

      shapeInstance.setColor(shapeColor);

      return {
        text,
        textColor,
        shape: shapeInstance.render(),
      };
    });
}

function generateLogo(answers) {
  const { text, textColor, shape } = answers;

  const svgCode = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
    ${shape}
    <text x="150" y="125" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>
  </svg>`;

  fs.writeFile('logo.svg', svgCode, (err) => {
    if (err) {
      console.error('Error saving the SVG file:', err);
    } else {
      console.log('Generated logo.svg');
    }
  });
}

promptUser()
  .then((answers) => {
    generateLogo(answers);
  })
  .catch((error) => {
    console.error('An error occurred:', error);
  });