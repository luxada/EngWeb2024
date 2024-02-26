const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer((req, res) => {

    const q = url.parse(req.url, true).pathname.slice(1) 

    if (q === '') {
        fs.readFile('html/index.html', (err, data) => {
            if (err) {
                handleError(res);
            } else {
                respondWithData(res, 'text/html; charset=utf-8', data)
            }
        })
    } else {
        //para quando se vem do index
        fs.readFile('html/' + q, (err, data) => {
            if (err) {
                //para quando se vai de uma pagina de uma cidade para outra
                fs.readFile(q, (err, data) =>{
                    if(err){
                        handleError(res);
                    } else {
                        respondWithData(res, 'text/html; charset=utf-8', data)
                    }
                })
            } else {
                respondWithData(res, 'text/html; charset=utf-8', data)
            }
        });
    }
}).listen(42069);

function respondWithData(res, contentType, data) {
    res.writeHead(200, {'Content-Type': contentType})
    res.write(data)
    res.end()
}

function handleError(res) {
    res.writeHead(404, {'Content-Type': 'text/plain'})
    res.write('404 Not Found')
    res.end()
}