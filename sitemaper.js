
const fs = require('fs');
const Sitemap = require('sitemap');

const addnewUrlToSitemap = (newUrl) => {

    //TODO:change this to manually adding url 

    const sitemapPath = 'myshots/sitemap.xml';
    const sitemapXml = fs.readFileSync(sitemapPath, 'utf8');

    const existingUrls = new Set(sitemapXml.match(/<loc>(.*?)<\/loc>/g).map(match => match.slice(5, -6)));



    console.log(newUrl);
    if (!existingUrls.has(newUrl)) {
        const newLine = `<url><loc>${newUrl}</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`;
        const updatedSitemapXml = sitemapXml.replace('</urlset>', newLine + '</urlset>');
        fs.writeFileSync('sitemap.xml', updatedSitemapXml);
    }



}




module.exports = addnewUrlToSitemap;