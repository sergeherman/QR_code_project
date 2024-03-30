// Import the 'inquirer' package to get user input
import inquirer from 'inquirer';

// Import the 'qr-image' package to create QR code images
import qr from "qr-image";

// Import the 'fs' module to work with the file system
import fs from "fs";

// Use inquirer to prompt the user for input
inquirer
  .prompt([
    // Pass your questions in here
    {message: "Type in your URL:", 
    name: "URL"}
  ])
  .then((answers) => {
    // Use user input
    const url = answers.URL;

    // Generate a QR code image from the user-entered URL
    var qr_svg = qr.image(url, { type: 'png' });

    // Pipe the QR code image to a writable stream to save it to a file
    qr_svg.pipe(fs.createWriteStream('qr_img.png'));

    // Write the user-entered URL to a text file
    fs.writeFile('URL.txt', url, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    }); 
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
