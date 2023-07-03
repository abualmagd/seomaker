
const express = require('express');
const screenShot = require('./puppt.js');
const shotArticle = require('./pupptBlog.js');
const render = require('./render.js');

const app = express();
let headers = new Headers();
app.use(express.static('public'))
headers.append('GET', 'POST', 'OPTIONS');





app.get('/', (req, res) => {

    res.send('hello');
});


app.get('/render/:url(*)', async (req, res) => {
    try {
        const url = req.params.url.startsWith('http') ? req.params.url : 'http://' + req.params.url;
        console.log(url);
        const html = await render(url);
        res.send(html);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/puppt', async (req, res) => {

    try {
        await screenShot();
        res.send('Screenshot captured');
    } catch (error) {
        res.status(500).send('Oops! Something went wrong.' + error);
    }



});




app.get('/puppt/blog/:title', async (req, res) => {

    const title = req.params.title;

    try {
        await shotArticle(title);
        res.send('Screenshot captured');
    } catch (error) {
        res.status(500).send('Oops! Something went wrong.' + error);
    }



})





app.listen(5000, () => {
    console.log('server listening in 5000');
})