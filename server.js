
require('dotenv').config();
const express = require('express');
const screenShot = require('./puppt.js');
const shotArticle = require('./pupptBlog.js');
const render = require('./render.js');
const app = express();
const addnewAppsToSitemap = require('./sitemapmaker.js');
const addnewArticlesToSitemap = require('./blogmapmaker.js');
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





//update sitemap 
app.get('/sitemap/apps', async (req, res) => {

    try {

        await addnewAppsToSitemap();
        res.send('sitemap updated');
    } catch (error) {
        res.status(500).send('Oops! Something went wrong.' + error);
    }



});





//update sitemap for articles
app.get('/sitemap/articles', async (req, res) => {

    try {

        await addnewArticlesToSitemap();
        res.send('sitemap updated');
    } catch (error) {
        res.status(500).send('Oops! Something went wrong.' + error);
    }



});



//create screenshot from any tool added to my site 
app.get('/puppt/:tool', async (req, res) => {

    try {
        const tool = req.params.tool;
        await screenShot(tool);
        res.send('Screenshot captured');
    } catch (error) {
        res.status(500).send('Oops! Something went wrong.' + error);
    }



});



//create screen shot from article by short_title 
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