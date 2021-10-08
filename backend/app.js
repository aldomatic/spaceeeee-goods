// const path = require('path'), fs = require('fs'), readline = require('readline');
import path from 'path';
import fs from 'fs';
import readline from 'readline';
import { formatDate, downloadImagesFromApi } from './helper.js';

const regex = new RegExp(/(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)(?:-| )(\d{1,2})(?:-|,)(?: |)(\d{4})|(\d{2})\/(\d{2})\/(\d{2})/g);
const datesArray = [], apiURl = "https://api.nasa.gov/planetary/apod?api_key=iagHhDKxsJJZ78haOJ7uaqvF2hiqY0azAEqSL0d2"

const parseFile = (pathToFile) => {
  // Here we read the file line by line and run the regex to find dates.
  const file = readline.createInterface({
    input: fs.createReadStream(pathToFile),
    output: process.stdout,
    terminal: false
  });
  file.on('line', (line) => {
    let result = line.match(regex);
    if(result){
      //datesArray.push(formatDate(result[0]));
      const earthDate = formatDate(result[0]);
      downloadImagesFromApi(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${earthDate}}&api_key=iagHhDKxsJJZ78haOJ7uaqvF2hiqY0azAEqSL0d2`, earthDate, () => {
        console.log('Done Downloading Images!')
      })
    }
  }).on('close', () => {
    console.log('closed')
  });
}

// Kick things off.. fetch images by dates 
parseFile(path.resolve("dates.txt"));
