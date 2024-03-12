xports.composerFormEditPage = function(c, d){
    return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Composer Edit</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-teal">
                    <h2>Composer Form</h2>
                    <a href="/compositores">Return</a>
                </header>
            
                <form class="w3-container" method="POST">
                <fieldset>
                    <legend>Metadata</legend>
                    <label>ID</label>
                    <input class="w3-input w3-round" type="text" name="id" readonly value='${c.id}'/>
                    <label>Nome</label>
                    <input class="w3-input w3-round" type="text" name="nome" value='${c.nome}'/>
                    <label>Bio</label>
                    <input class="w3-input w3-round" type="textarea" name="bio" value='${c.bio}'/>
                    <labal>Data de Nascimento</label>
                    <input class="w3-input w3-round" type="date" name="dataNasc" value='${c.dataNasc}'/>
                    <label>Date de Morte</label>
                    <input class="w3-input w3-round" type="date" name="dataObito" value='${c.dataObito}'/>
                    <label>Periodo</label>
                    <input class="w3-input w3-round" type="text" name="periodo" value='${c.periodo.nome}'/>
                </fieldset>
                    <br/>
                    <button class="w3-btn w3-teal w3-mb-2" type="Submit">Edit</button>
                </form>

                <footer class="w3-container w3-teal">
                    <h5>TPC3::EngWeb2024::a88220::${d}</h5>
                </footer>
            </div>
    `
}

exports.composerFormPage = function(d){
    return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Composer Add</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-teal">
                    <h2>Composer Form</h2>
                    <a href="/compositores">Return</a>
                </header>
            
                <form class="w3-container" method="POST">
                    <fieldset>
                        <legend>Metadata</legend>
                        <label>ID</label>
                        <input class="w3-input w3-round" type="text" name="id"/>
                        <label>Nome</label>
                        <input class="w3-input w3-round" type="text" name="nome"/>
                        <label>Bio</label>
                        <input class="w3-input w3-round" type="textarea" name="bio"/>
                        <label>Date de Nascimento</label>
                        <input class="w3-input w3-round" type="date" name="dataNasc"/>
                        <label>Date de Morte</label>
                        <input class="w3-input w3-round" type="date" name="dataObito"/>
                        <label>Periodo</label>
                        <input class="w3-input w3-round" type="text" name="periodo"/>
                    </fieldset>
                    <br/>
                    <button class="w3-btn w3-teal w3-mb-2" type="Submit">Register</button>
                </form>

                <footer class="w3-container w3-teal">
                    <h5>TPC3::EngWeb2024::a88220::${d}</h5>
                </footer>
            
            </div>
    `
}

exports.composersListPage = function(clist, d){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Composers</title>
        </head>
        <body>
            <div class="w3-card-4">

                <header class="w3-container w3-teal">
                    <h1>Lista de Compositores
                    <a class="w3-btn w3-round w3-grey" href="/compositores/registo">+</a>
                    </h1>
                    <a href="/">Home Page</a>
                    
                </header>
        
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>ID</th><th>Nome</th><th>Data de Nascimento</th>
                            <th>Data de Obito</th><th>Periodo</th><th>Actions</th>
                        </tr>
                `
    for(let i=0; i < clist.length ; i++){
        pagHTML += `
                <tr>
                    <td>${clist[i].id}</td>
                    <td>
                        <a href="/compositores/${clist[i].id}">
                            ${clist[i].nome}
                        </a>
                    </td>
                    <td>${clist[i].dataNasc}</td>
                    <td>${clist[i].dataObito}</td>
                    <td>${clist[i].periodo}</td>
                    <td>
                        [<a href="/compositores/edit/${clist[i].id}">Edit</a>][<a href="/compositores/delete/${clist[i].id}">Delete</a>]
                    </td>
                </tr>
        `
    }

    pagHTML += `
            </table>
            </div>
                <footer class="w3-container w3-teal">
                    <h5>TPC3::EngWeb2024::a88220::${d}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}


exports.compositoresPorPeriodoListPage = function(clist, pInfo,d){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Compositores por Período</title>
        </head>
        <body>
            <div class="w3-card-4">

                <header class="w3-container w3-teal">
                    <h1>Lista de compositores do período
                    <a class="w3-btn w3-round w3-grey" href="/compositores/registo">+</a>
                    </h1>
                    <a href="/">Home Page</a>
                    
                </header>
        
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Id</th><th>Nome</th><th>Periodo</th>
                            <th>Actions</th>
                        </tr>
                `
    for(let i=0; i < clist.length ; i++){
        pagHTML += `
                <tr>
                    <td>${clist[i].id}</td>
                    <td>
                        <a href="/compositores/${clist[i].id}">
                            ${clist[i].nome}
                        </a>
                    </td>
                    <td>${pInfo.nome}</td>
                    <td>
                        [<a href="/compositores/edit/${clist[i].id}">Edit</a>] [<a href="/compositores/delete/${clist[i].id}">Delete</a>]
                    </td>
                </tr>
        `
    }

    pagHTML += `
            </table>
            </div>
                <footer class="w3-container w3-teal">
                    <h5>TPC3::EngWeb2024::a88220::${d}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}



exports.composerPage = function(compositor, d ){
    var pagHTML = `
    <html>
    <head>
        <title>${compositor.id}</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h1>Compositor ${compositor.nome}</h1>
                <a href="javascript:history.back()">Voltar</a>
            </header>

            <div class="w3-container">
                <ul class="w3-ul w3-card-4" style="width:100%">
                    <li><b>Nome: </b> ${compositor.nome}</li>
                    <li><b>Número: </b> ${compositor.id}</li>
                    <li><b>Biografia: </b> ${compositor.bio}</li>
                    <li><b>Data de Nascimento: </b> ${compositor.dataNasc}</li>
                    <li><b>Data de Óbito: </b> ${compositor.dataObito}</li>
                    <li><b>Periodo: </b> <a href='/periodos/${compositor.periodo.id}'>${compositor.periodo.nome}</a></li>
                </ul>
            </div>
            <footer class="w3-container w3-teal">
                <h5>TPC3::EngWeb2024::a88220::${d}</h5>
            </footer>
        </div>
    </body>
    </html>
    `
    return pagHTML
}


exports.periodsListPage = function(plist, d){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Períodos</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-teal">
                <h1>Lista de Períodos
                <a class="w3-btn w3-round w3-grey" href="/periodos/registo">+</a>
                </h1>
                <a href="/">Home Page</a>
                </header>
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Id</th><th>Nome</th>
                            <th>Actions</th>
                        </tr>
                `
    for(let i=0; i < plist.length ; i++){
        pagHTML += `
                <tr>
                    <td>${plist[i].id}</td>
                    <td>
                        <a href="/periodos/${plist[i].id}">
                            ${plist[i].nome}
                        </a>
                    </td>
                    <td>
                        [<a href="/periodos/edit/${plist[i].id}">Edit</a>] [<a href="/periodos/delete/${plist[i].id}">Delete</a>]
                    </td>
                </tr>
        `
    }

    pagHTML += `
            </table>
            </div>
                <footer class="w3-container w3-teal">
                    <h5>TPC3::EngWeb2024::a88220::${d}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}



exports.periodFormPage = function(d){
    return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Period </title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-teal">
                    <h2>Period Form</h2>
                    <a href="javascript:history.back()">Voltar</a>
                </header>
            
                <form class="w3-container" method="POST">
                    <fieldset>
                        <legend>Metadata</legend>
                        <label>id</label>
                        <input class="w3-input w3-round" type="text" name="id"/>
                        <label>Nome</label>
                        <input class="w3-input w3-round" type="text" name="nome"/>
                    </fieldset>
                    <br/>
                    <button class="w3-btn w3-teal w3-mb-2" type="submit">Register</button>
                </form>

                <footer class="w3-container w3-teal">
                    <h5>TPC3::EngWeb2024::a88220::${d}</h5>
                </footer>
            
            </div>
    `
}


exports.periodFormEditPage = function(p, d){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Period </title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-teal">
                    <h2>Period Form</h2>
                    <a href="javascript:history.back()">Voltar</a>
                </header>
            
                <form class="w3-container" method="POST">
                <fieldset>
                    <legend>Metadata</legend>
                    <label>id</label>
                    <input class="w3-input w3-round" type="text" name="id" readonly value='${p.id}'/>
                    <label>Nome</label>
                    <input class="w3-input w3-round" type="text" name="nome" value='${p.nome}'/>
                </fieldset>
                <button class="w3-btn w3-teal w3-mb-2" type="Submit">Edit</button>
                </form>

                <footer class="w3-container w3-teal">
                    <h5>TPC3::EngWeb2024::a88220::${d}</h5>
                </footer>
            
            </div>
    `
    return pagHTML
}




exports.homePage = function(d){
    return `
    <!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="favicon.png" />
        <link rel="stylesheet" href="w3.css" />
        <title>Home Page - TPC4</title>
    </head>
    
    <body>
        <div class="w3-card-4">
    
            <header class="w3-container w3-teal">
                <h1>TPC4</h1>
    
            </header>
    
            <div class="w3-container">
                <ul class="w3-ul">
                    <li><a href="/compositores">Compositores</a></li>
                    <li><a href="/periodos">Periodos</a></li>
                </ul>
            </div>
            <footer class="w3-container w3-teal">
                <h5>TPC3::EngWeb2024::a88220::${d}</h5>
            </footer>
        </div>
    </body>
    
    </html>
    `
}



exports.errorPage = function(errorMessage, d){
    
    return `
    <!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="favicon.png" />
        <link rel="stylesheet" href="w3.css" />
        <title>Error Page</title>
    </head>
    
    <body>
        <div class="w3-card-4">
    
            <header class="w3-container w3-teal">
                <h1>Error Page</h1>
    
            </header>
    
            <div class="w3-container">
                <p>${d}: Error: ${errorMessage}</p>
            </div>
            <footer class="w3-container w3-teal">
                <h5>TPC3::EngWeb2024::a88220::${d}</h5>
            </footer>
        </div>
    </body>
    
    </html>
    `
}