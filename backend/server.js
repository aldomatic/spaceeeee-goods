import express from 'express';
import  serveIndex from 'serve-index';
const PORT = 3000;
const app = express()
app.use('/', express.static('images'), serveIndex('images', {'icons': true}))
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});