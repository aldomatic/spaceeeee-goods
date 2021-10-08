import express from 'express';
import  serveIndex from 'serve-index';
const app = express()
app.use('/', express.static('images'), serveIndex('images', {'icons': true}))
app.listen(3000, () => {
    console.log('Listening on port 3000')
});