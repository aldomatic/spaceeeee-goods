// config.js
import dotenv from "dotenv";
import path from 'path';
import fs from 'fs';
import readline from 'readline';
import { formatDate, downloadImagesFromApi, regex } from './helper.js';
dotenv.config();

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
      const earthDate = formatDate(result[0]);
      downloadImagesFromApi(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${earthDate}&api_key=${process.env.api_key}`, earthDate );
    }
  }).on('close', () => {
    console.log('Done reading dates file...')
  });
}

// Kick things off.. fetch images by dates 
parseFile(path.resolve("dates.txt"));
