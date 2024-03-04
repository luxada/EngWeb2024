var http = require('http')
var fs = require('fs')
var url = require('url')
var axios = require('axios')

var fimHTML = `
            </div>
            <footer>
                <h5>TPC3::EngWeb2024::a88220</h5>
            </footer>
        </div>
    </body>
</html>
`


function geraHTML(title){
    var html = `
<!DOCTYPE html>
<html>
    <body>
        <div>
            <header>
                <h1>${title}</h1>
            </header>
    `
    
    return html
}    




http.createServer((req, res) => {

    var movie = /^\/filmes\/\w+$/
    var genre = /^\/genero\/[a-zA-Z%20]+$/
    var actor = /^\/atores\/.*$/ 


    var link = url.parse(req.url, true)

    //se for para ir para a main page
    if(link.pathname == '/'){

        //falta criar o ficheiro html da main page
        fs.readFile('main.html', (err, data) => {
            if (err) {
                // If an error occurs, log it and send a 500 Internal Server Error response
                console.error('Error reading file:', err);
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Internal Server Error');
            } else {
                // If the file is successfully read, serve it with a 200 OK response
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                res.end();
            }
        });

    //se for para ir para a pagina da lista de filmes
    } else if(link.pathname == '/filmes'){

        axios.get('http://localhost:3000/filmes').then(dados => {

            filmes = dados.data

            html = geraHTML("Filmes")

            //gera html para lista de filmes
            filmes.forEach( filme => {
                html += `
                    <li><a href='/filmes/${filme._id.$oid}'>${filme.title}</a></li>
                    `
            });

            html += fimHTML

            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(html)
            res.end()

        }).catch(error => {

            res.writeHead(500, {'Content-Type': 'text/html'})
            res.write("<pre>" + error + "</pre>")
            res.end()
        })

    //se for para ir para a pagina da lista de generos
    } else if(link.pathname == '/generos'){

        axios.get('http://localhost:3000/generos').then(dados => {

            generos = dados.data

            html = geraHTML("Generos")

            //gera html para lista de generos
            generos.forEach(g => {
                html += `<li><a href="/genero/${g.genero}">${g.genero}</a></li>`;
            });

            html += fimHTML

            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(html)
            res.end()

        }).catch(error => {

            res.writeHead(500, {'Content-Type': 'text/html'})
            res.write("<pre>" + error + "</pre>")
            res.end()
        })

    //se for para ir para a pagina da lista de atores
    } else if(link.pathname == '/atores'){

        axios.get('http://localhost:3000/atores').then(dados => {

            atores = dados.data

            html = geraHTML("Atores")

            //gera html de lista de atores
            atores.forEach(a => {
                html += `<li><a href="/atores/${a.ator}">${a.ator}</a></li>`;
            });
            
            html += fimHTML

            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(html)
            res.end()

        }).catch(error => {

            res.writeHead(500, {'Content-Type': 'text/html'})
            res.write("<pre>" + error + "</pre>")
            res.end()
        })

    //gera a pagina de um filme        
    } else if(movie.test(link.pathname)){

        axios.get('http://localhost:3000/filmes').then(dados => {

            content = dados.data

            //id do filme
            id = link.pathname.substring(8)

            //encontra um filme pelo seu id
            var filme = content.find(f => f._id.$oid == id)

            html = geraHTML(filme.title)
            
            html += `
            <div>
                            <p><b>Ano:</b> ${filme.year}</p>
            `

            html += "<p><b>Genero:</b></p>"

            filme.genres.forEach(genre => {
                html += `
                <li><a href="/genero/${genre}">${genre}</a></li>
            `;
            })

            
            html += "<p><b>Actores:</b></p>"
            filme.cast.forEach(ator => {
                html += `
                    <li><a href="/atores/${ator}">${decodeURIComponent(ator)}</a></li>
                `;
            });

            html += fimHTML

            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(html)
            res.end()

        }).catch(error => {

            res.writeHead(500, {'Content-Type': 'text/html'})
            res.write("<pre>" + error + "</pre>")
            res.end()
        })

    //gera a pagina de um genero
    } else if(genre.test(link.pathname)){

        axios.get('http://localhost:3000/generos').then(dados => {

            content = dados.data

            //id do genero
            id = decodeURIComponent(link.pathname.substring(8))

            html = geraHTML(id)

            //gera html para lista de filmes de um genero
            content.forEach(g => {
                if(g.genero == id){
                    g.filmes.forEach(f => {
                        html += `<li><a href="/filmes/${f.id}">${f.titulo}</a></li>`;
                    });
                }
            });

            html += fimHTML

            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(html)
            res.end()

        }).catch(error => {

            res.writeHead(500, {'Content-Type': 'text/html'})
            res.write("<pre>" + error + "</pre>")
            res.end()
        })

    //gera a pagina de um ator
    } else if(actor.test(link.pathname)){

        axios.get('http://localhost:3000/atores').then(dados => {

            content = dados.data

            //id do ator
            id = decodeURIComponent(link.pathname.substring(8))


            html = geraHTML(id)

            //gera html para lista de filmes de um ator
            content.forEach(a => {
                if(a.ator == id){
                    a.filmes.forEach(f => {
                        html += `<li><a href="/filmes/${f.id}">${f.titulo}</a></li>`;
                    });
                }
            });

            html += fimHTML

            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(html)
            res.end()

        }).catch(error => {

            res.writeHead(500, {'Content-Type': 'text/html'})
            res.write("<pre>" + error + "</pre>")
            res.end()
        })

    //gera a pagina de erro de pedido
    } else{
    
        res.writeHead(400, {'Content-Type': 'text/html; charset=utf-8'})
        res.write('<p>Erro: pedido não suportado.</p>')
        res.write('<pre>' + link.pathname + '</pre>')
        res.end()
    }

    //debug print url na consola
    console.log(link.pathname)

}).listen(42069)

