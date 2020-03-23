const http = require('http')
const fs = require('fs')
const PATH = './requests.json'

http.createServer((request, response) => {
    const status = 'OK'
    const method = request.method
    const url = request.url
    const data = {
        status,
        method,
        url,
        time: Date.now()
    }

    addJson(data, response)

    response.writeHead(200, {'Content-type': 'application/json'})
    response.end(JSON.stringify({status}))
}).listen(8081)

const addJson = (data, response) => {
    let parsed = {logs: []}

    if (fs.existsSync(PATH)) {
        const requestInfoFile = fs.readFileSync(PATH);
        if (requestInfoFile.length) {
            parsed = JSON.parse(requestInfoFile);
            if (!parsed.logs) {
                parsed.logs = [];
            }
        }
    }
    
    parsed.logs.push(data);

    parsed = JSON.stringify(parsed, null, 4);
    fs.writeFileSync(PATH, parsed,  'utf8');
}