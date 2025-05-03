---
sidebar_position: 4
---

# APIs
A seguir, uma lista de todos os endpoints disponíveis.

## Mandar mensagem
### URL
```bash
POST /api/query/
```

### Cabeçalho da requisição
```bash
Content-Type: application/json
```

### Corpo da requisição
```bash
{
  "input": "qual o squad atual da FURIA?"
}
```

### Exemplo de resposta
```bash
{
  "response": "O squad atual da FURIA no CS:GO \u00e9 composto por Yuri \"yuurih\" Boian, Kaike 
  \"KSCERATO\" Cerato, Gabriel \"FalleN\" Toledo, Danil \"molodoy\" Golubenko e Mareks \"YEKINDAR\"
  Ga\u013cinskis (este \u00faltimo como stand-in). Sidnei \"sidde\" Macedo atua como t\u00e9cnico da 
  equipe."
}
```