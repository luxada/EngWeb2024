import os
import json


#funcao para gerar o codgido html do indice
def index():

    inicioHTML = """
    <!DOCTYPE html>
    <html>
        <head>
            <title>Cidades de Portugal</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="w3.css">
            <meta charset="utf-8"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-pale-red">
                    <h3>Cidades de Portugal</h3>
                </header>
                <div class="w3-container">
                    <ul class="w3-ul w3-card-4" style="width:50%">
    """

    fimHTLM = """
                    </ul>
                </div>
                <footer class="w3-container w3-pale-red">
                    <h5>TPC2::EngWeb2024::a88220</h5>
                </footer>            
            </div>
        </body>
    </html> 
    """


    conteudo = ""

    #guardar a lista das cidades
    with open("mapa-virtual.json", encoding='utf-8') as file:
        dados = json.load(file)
        
        #organizar a lista
        cidades = sorted(dados['cidades'], key=lambda x: x['nome'])
        
        for cidade in cidades:

            #criar corpo html
            conteudo += f"""
                            <li>
                                <a href='./{cidade['id']}.html'>{cidade['nome']}
                            </a></li>
                """

    file.close()

    #concatenar html final
    html = inicioHTML + conteudo + fimHTLM

    #criar (se necessario) a diretoria para os htmls de cada pagina
    if not os.path.exists('html'):
        os.makedirs('html')

    with open("./html/index.html",'w',encoding='utf-8') as file:
        file.write(html)
    file.close()






#funcao que cria as paginas de cada cidade
def paginas():

    with open("mapa-virtual.json", encoding='utf-8') as file:
        dados = json.load(file)

        #organizar a lista
        cidades = sorted(dados['cidades'], key=lambda x: x['nome'])

        for cidade in cidades:

            with open('html/' + cidade['id'] + '.html', 'w', encoding='utf-8') as f:

                #corpo do html da pagina da cidade
                html = f"""<!DOCTYPE html>
                <html>
                <head>
                    <title>{cidade['nome']}</title>
                </head>
    
                <body>
    
                    <h1>{cidade['nome']}</h1>
                    <p>ID: {cidade['id']}</p>
                    <p>Descrição: {cidade['descrição']}</p>
                    <p>População: {cidade['população']}</p>
                    
                    <h2>Ligações</h2>
                    
                    
                    """
                
                #procurar as ligacoes que partem da cidade
                for ligacao in dados['ligacoes']:
                    
                    if ligacao['origem'] == cidade['id']:

                        index = int(ligacao['destino'][1:])

                        if index < len(dados['cidades']):

                            html += f"""
                            <a href="../html/{str(ligacao['destino'])}.html">{dados['cidades'][index]['nome']}</a>
                            <i>{ligacao['distância']} km</i>
                            <br>
                            """

                html += f"""
                    <li><a href=\"index.html\">Voltar</a></li>
                    <footer class="w3-container w3-pale-red">
                        <h5>TPC2::EngWeb2024::a88220</h5>
                    </footer>  
                    </body>
                    </html>
                """
                
                f.write(html)
                
            f.close()

    file.close()            





def main():
    index()
    paginas()

if __name__ == "__main__":
    main()


