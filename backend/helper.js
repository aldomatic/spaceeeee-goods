import fs from 'fs';
import fetch from 'node-fetch';
import path from 'path';

export const regex = new RegExp(/(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)(?:-| )(\d{1,2})(?:-|,)(?: |)(\d{4})|(\d{2})\/(\d{2})\/(\d{2})/g);

// Helper function to format dates as YYYY-MM-DD
export const formatDate = (date) => {
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

const createDir = (folderName) =>{
    fs.mkdirSync(`./images/${folderName}`, { recursive: true })
}

const downloadImageLocally = (remoteUrl, fileName, folder) =>{

    fetch(remoteUrl)
	.then(res => {
        try {
            if (!fs.existsSync(`${folder}/${fileName}`)) {
                const stream = fs.createWriteStream(`${folder}/${fileName}`);
                res.body.pipe(stream);
                stream.on('finish', function(){
                    console.log('Finished downloading to ', `${folder}/${fileName}`);
                });
            }
          } catch(err) {
            console.error(err)
          }
        }
	)
}

// Here we call the nasa api and download the images locally
export const downloadImagesFromApi = async (url, earth_date, callback) => {
    // create directory if not created
    createDir(earth_date);

    const response = await fetch(url);
    const data = await response.json();

    if(data && data.hasOwnProperty('photos')){
        console.log('Begin downloading images..')
        data.photos.slice(0, 10).forEach((photo) => {
          const result =  downloadImageLocally(photo.img_src, path.basename(photo.img_src),`./images/${earth_date}`);
        });
    }

}