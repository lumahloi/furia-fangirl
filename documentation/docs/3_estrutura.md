---
sidebar_position: 3
---

# Estrutura do projeto
A estrutura de pastas do projeto é organizada da seguinte maneira:
```bash
    furia-fangirl/
    ├── documentation/                → documentação
    │   └── ...
    ├── backend/                      → código Flask
    │   ├── data/
    │   │   └── databases/
    │   │       └── ...               → banco de dados
    │   ├── services/
    │   │   └── ...
    │   ├── app.py
    │   ├── Procfile
    │   └── requirements.txt
    ├── frontend/                     → código React
    │   ├── public/
    │   │   └── ...
    │   ├── src/
    │   │   ├── components/
    │   │   │   └── ...
    │   │   ├── config/
    │   │   │   └── ...
    │   │   ├── hooks/
    │   │   │   └── ...
    │   │   ├── styles/
    │   │   │   └── ...
    │   │   ├── types/
    │   │   │   └── ...
    │   │   ├── App.tsx
    │   │   └── index.tsx
    │   ├── package.json
    │   └── tsconfig.json
    ├── .env.example
    ├── .gitignore
    └── README.md
```
