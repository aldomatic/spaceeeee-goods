import fs from 'fs';
import fetch from 'node-fetch';
import path from 'path';

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

const downloadImageLocally = (remoteUrl, folder) =>{
    console.log(path.basename(remoteUrl), folder);
}

// Here we call the nasa api and download the images locally
export const downloadImagesFromApi = async (url, earth_date, callback) => {
    // create directory if not created
    createDir(earth_date);

    const response = await fetch(url);
    const data = await response.json();

    if(data && data.hasOwnProperty('photos')){
        data.photos.forEach((photo) => {
           downloadImageLocally(photo.img_src, `./images/${earth_date}`);
        });
    }

}