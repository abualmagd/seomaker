const fs = require('fs');

const mybase = require('./client.js');
const addnewArticlesToSitemap = async () => {


    const sitemapPath = 'myshots/sitemap.xml';
    const sitemapXml = fs.readFileSync(sitemapPath, 'utf8');

    const newUrls = [];

    const existingUrls = new Set(sitemapXml.match(/<loc>(.*?)<\/loc>/g).map(match => match.slice(5, -6)));

    const getTools = async () => {

        const { data, error } = await mybase.from('articles').select('short_title').limit(10);
        if (error) throw error;
        return data;
    }

    const titles = await getTools();
    if (titles) {
        console.log(titles);
        for (i = 0; i < titles.length; i++) {
            const newUrl = 'https://www.solutrend.com/blog/' + titles[i].short_title;
            console.log(newUrl);
            if (!existingUrls.has(newUrl)) {
                const newLine = `<url><loc>${newUrl}</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`;
                newUrls.push(newLine);
            }
        }

        try {


            const updatedSitemapXml = sitemapXml.replace('</urlset>', newUrls.join('') + '</urlset>');

            fs.writeFileSync('myshots/sitemap.xml', updatedSitemapXml);

        } catch (error) {
            console.log(error);
            throw error;
        }

    } else {
        console.log('Error occurred while fetching tools');
    }





}




module.exports = addnewArticlesToSitemap;