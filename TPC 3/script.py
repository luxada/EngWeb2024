import os
import json




def normalizer():
    dataset = 'filmes.json'
    
    jsonCorrigido = 'formated-filmes.json'
    
    filmes = []
    
    with open(dataset, 'r', encoding='utf-8') as file:
        for linha in file.readlines():
            filme = json.loads(linha)
            filmes.append(filme)
    
    dataFormat = {'filmes': filmes}
    
    with open(jsonCorrigido, 'w', encoding='utf-8') as jsonOutput:
        json.dump(dataFormat, jsonOutput, indent=2)





def read_json(file):
    data = None

    try:
        with open(file, 'r') as f:
            data = json.load(f)
    except FileNotFoundError:
        print('\nArquivo não encontrado\n')
    except Exception as e:
        print('\nErro desconhecido:\n', e)
    
    return data

def write_json(data, file):
    try:
        with open(file, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=4)
    except Exception as e:
        print('\nErro desconhecido:\n', e)

def get_cast(data):
    cast = []
    for i in data['filmes']:
        for actor in i['cast']:
            existing_actor = next((c for c in cast if c['ator'] == actor), None)
            if existing_actor:
                existing_actor['filmes'].append({
                    "id": i['_id']['$oid'],
                    "titulo": i['title']
                })
            else:
                cast.append({
                    "ator": actor,
                    "filmes": [{
                        "id": i['_id']['$oid'],
                        "titulo": i['title']
                    }]
                })
    return cast

def get_genres(data):
    genres = []
    for i in data['filmes']:
        if 'genres' in i:
            for genre in i['genres']:
                existing_genre = next((g for g in genres if g['genero'] == genre), None)
                if existing_genre:
                    existing_genre['filmes'].append({
                        "id": i['_id']['$oid'],
                        "titulo": i['title']
                    })
                else:
                    genres.append({
                        "genero": genre,
                        "filmes": [{
                            "id": i['_id']['$oid'],
                            "titulo": i['title']
                        }]
                    })
    return genres   

file = 'formated-filmes.json'

normalizer()
bd = read_json(file)
cast = get_cast(bd)
genres = get_genres(bd)
novaDB = ({
    "filmes": bd['filmes'],
    "atores": cast,
    "generos": genres
    })

write_json(novaDB, 'final-filmes.json')