const { createClient } = require('@supabase/supabase-js');




const apiKey = process.env.APP_API_KEY;
const urlKey = process.env.APP_URL_KEY;

const mybase = createClient('https://pqfiwahrarbivadfpoix.supabase.co', apiKey);

module.exports = mybase;