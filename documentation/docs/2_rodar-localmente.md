---
sidebar_position: 2
---

# Como rodar localmente
A seguir, o passo a passo de reproduzir a aplicação localmente em sua máquina.

## Pré-requisitos
- **Git**: instale a versão mais recente no site oficial clicando [aqui](https://git-scm.com/downloads);
- **Node.js**: instale a versão mais recente no site oficial clicando [aqui](https://nodejs.org/pt/download);
- **Python**: instale a versão mais recente no site oficial clicando [aqui](https://www.python.org/downloads/);

## Instalação
Primeiro, clone o repositório.
```bash
git clone https://github.com/lumahloi/furia-fangirl/
```

Navegue ao diretório ```frontend```.
```bash
cd frontend
```

Instale suas dependências.
```bash
npm install
```

Navegue ao diretório ```backend```.
```bash
cd ../backend
```

Instale suas dependências.
```bash
pip install -r requirements.txt
```

## Variáveis de ambiente
No arquivo ```.env.example``` é possível visualizar as variáveis de ambiente utilizadas pelo projeto.
- Crie o arquivo ```.env``` em ```frontend``` e atribua o valor da variável ```REACT_APP_API_URL```;
- Crie o arquivo ```.env``` em ```backend``` e atribua o valor da variável ```OPENAI_KEY```.

## Rodando localmente
Abra um terminal e execute o servidor ```frontend``` no diretório ```frontend```.
```bash
npm run start
```

Abra outro terminal e execute o servidor ```backend``` no diretório ```backend```.
```bash
python app.py
```