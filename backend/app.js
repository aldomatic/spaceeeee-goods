const fs = require('fs');
const readline = require('readline');
const regex = new RegExp(/(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)(?:-| )(\d{1,2})(?:-|,)(?: |)(\d{4})|(\d{2})\/(\d{2})\/(\d{2})/g);
const datesArray = []; 

// Helper function to format dates as YYYY-MM-DD
const formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

// Here we read the file line by line and run the regex to find dates.
const file = readline.createInterface({
    input: fs.createReadStream('dates.txt'),
    output: process.stdout,
    terminal: false
});
file.on('line', (line) => {
  let result = line.match(regex);
  if(result){
    datesArray.push(formatDate(result[0]));
  }
}).on('close', () => {
  console.log(datesArray);
});
