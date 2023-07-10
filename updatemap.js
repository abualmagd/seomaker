//update mape in server 
const ssh = require('ssh2');
const conn = new ssh.Client();
const password = process.env.SSH_PASSWORD;

const storeMapUpdater = () => {
    // Access the SSH password from the environment variable
    conn.on('error', err => {
        console.log(`SSH connection error: ${err}`);
        conn.end();
    });


    conn.connect({
        host: '153.92.6.229',
        username: 'u917118114',
        privateKey: require('fs').readFileSync('C:/Users/ismai/.ssh/id_rsa.pup')
    });

    conn.on('ready', () => {
        console.log('SSH connection successful');
        conn.exec('php public_html/sitemaper.php', (err, stream) => {
            if (err) {
                console.log(`Error executing command: ${err}`);
                return conn.end();
            }
            stream.on('close', (code, signal) => {
                console.log(`Command execution complete with code ${code} and signal ${signal}`);
                conn.end();
            })
                .on('data', data => {
                    console.log(`Command output: ${data}`);
                })
                .stderr.on('data', data => {
                    console.log(`Command error output: ${data}`);
                    conn.end();
                });
        });
    });
}



const blogMapUpdater = () => {

    conn.connect({
        host: '153.92.6.229',
        port: '65002',
        username: 'u917118114',
        password: password
    });

    conn.on('ready', () => {
        console.log('SSH connection successful');
        conn.exec('php public_html/blogsitemaper.php', (err, stream) => {
            if (err) {
                console.log(`Error executing command: ${err}`);
                return conn.end();

            }
            stream.on('close', (code, signal) => {
                console.log(`Command execution complete with code ${code} and signal ${signal}`);
                conn.end();
            })
                .on('data', data => {
                    console.log(`Command output: ${data}`);
                })
                .stderr.on('data', data => {
                    console.log(`Command error output: ${data}`);
                    conn.end();
                });
        });
    });
}


module.exports = {
    blogMapUpdater,
    storeMapUpdater
}