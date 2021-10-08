// config.js
import dotenv from "dotenv";
import path from 'path';
import fs from 'fs';
import readline from 'readline';
import { formatDate, downloadImagesFromApi } from './helper.js';
dotenv.config();

const regex = new RegExp(/(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)(?:-| )(\d{1,2})(?:-|,)(?: |)(\d{4})|(\d{2})\/(\d{2})\/(\d{2})/g);

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
