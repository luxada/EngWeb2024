import json
import re

def validar(compositor):
    required_keys = ["id", "nome", "bio", "dataNasc", "dataObito", "periodo"]
    return all(key in compositor for key in required_keys)


def validator():
    
    with open('compositores.json', 'r', encoding='utf-8') as file:
        data = json.load(file)
    
    compositores_validos = [compositor for compositor in data["compositores"] if validar(compositor)]
    
    novo_json = {"compositores": compositores_validos}
    
    with open('compositores-validos.json', 'w', encoding='utf-8') as file:
        json.dump(novo_json, file, indent=2)


def pertence(periodo, periodos):
    for p in periodos:
        if p['nome'] == periodo:
            return True
    return False

def getPeriodoName(periodo, periodos):
    for p in periodos:
        if p['nome'] == periodo:
            return p['id']

def parseComps(compositores, periodos):
    for compositor in compositores:
        if 'periodo' not in compositor: continue
        compositor['periodo'] = {'id': getPeriodoName(compositor['periodo'], periodos), 'nome': compositor['periodo']}
    return compositores

def main():

    validator()

    with open('compositores-validos.json', 'r', encoding='utf-8') as file:
        data = json.load(file)
        regex = r"(C)\d+"

        periodos = []

        for compositor in data['compositores']:
            if re.match(regex, compositor['id']):
                periodo = compositor['periodo']
                if pertence(periodo, periodos):
                    for p in periodos:
                        if p['nome'] == periodo:
                            p['compositores'].append({'id': compositor['id'], 'nome': compositor['nome']})
                else:
                    periodos.append({'id': 'P' + str(len(periodos) + 1), 'nome': periodo, 'compositores': [{'id': compositor['id'], 'nome': compositor['nome']}]})
            else: continue
            
        newData = {
            'compositores': parseComps(data['compositores'], periodos),
            'periodos': periodos
        }

        with open('final-compositores.json', 'w', encoding='utf-8') as file:
            json.dump(newData, file, indent=4, ensure_ascii=False)

if __name__ == '__main__':
    main()