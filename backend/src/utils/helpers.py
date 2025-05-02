import os, sqlite3
from backend.src.services.ai.openai_service import query_openai

def check_database_exists(db_name):
    db_path = f"./databases/{db_name}.db"
    if os.path.exists(db_path) and os.path.isfile(db_path):
        return True
    else:
        return False
    
def find_page(question):
    prompt_relevant_page = (f"""
        Analise este contexto sobre páginas que contém informações da FURIA no CS:GO e CS2:
            
        [FURIA]: informações gerais sobre a equipe e time masculino, como composição do time em tempos específicos, membros passados, timeline; 
        [FURIA/Results]: performance do time masculino em todos os campeonatos que participou. inclui data, placement/posição no campeonato, raking/tier, modalidade/tipo, jogo (csgo ou cs2), nome do campeonato, resultado, prêmio em dinheiro; 
        [FURIA/Matches]: todos os jogos que o time masculino participou. inclui data e hora, ranking/tier, modalidade/tipo, nome do campeonato, resultado (a partir disso dá pra concluir logicamente a vitória e derrota), time adversário, jogo (csgo ou cs2);
        [FURIA_Academy]: informações gerais sobre a equipe e time academy, como composição do time em tempos específicos, membros passados, timeline; 
        [FURIA_Academy/Results]: performance do time academy em todos os campeonatos que participou. inclui data, placement/posição no campeonato, raking/tier, modalidade/tipo, jogo (csgo ou cs2), nome do campeonato, resultado, prêmio em dinheiro; 
        [FURIA_Academy/Matches]: todos os jogos que o time academy participou. inclui data e hora, ranking/tier, modalidade/tipo, nome do campeonato, resultado (a partir disso dá pra concluir logicamente a vitória e derrota), time adversário, jogo (csgo ou cs2);
        [FURIA_Female]: informações gerais sobre a equipe e time feminino, como composição do time em tempos específicos, membros passados, timeline;
        [FURIA_Female/Results]: performance do time feminino em todos os campeonatos que participou. inclui data, placement/posição no campeonato, raking/tier, modalidade/tipo, jogo (csgo ou cs2), nome do campeonato, resultado, prêmio em dinheiro; 
        [FURIA_Female/Matches]: todos os jogos que o time feminino participou. inclui data e hora, ranking/tier, modalidade/tipo, nome do campeonato, resultado (a partir disso dá pra concluir logicamente a vitória e derrota), time adversário, jogo (csgo ou cs2);
            
        Dada a pergunta: {question}
        Responda qual a página mais provável de conter as informações para sanar a dúvida da pergunta.
        Regras: responda apenas com o nome da página; se não souber, responda 'FURIA'.
    """)
        
    return query_openai(prompt_relevant_page)

def get_context(answer_context):
    connection = sqlite3.connect('./databases/liquipedia_data.db')
    cursor = connection.cursor()
    cursor.execute("SELECT content FROM extracted_pages WHERE page_title = ?", (answer_context,))
    context = cursor.fetchone()
    
    return context

def get_answer(context, user_question):
    prompt_answer_user_question = (f"""
        Analise este contexto sobre a FURIA no CS:GO: {context}
        Responda de forma DIRETA e OBJETIVA esta pergunta: {user_question}
        Regras: Seja extremamente conciso (máx. 3 frases); Responda APENAS com fatos do contexto; Formate datas/resultados claramente; Se não souber, diga apenas 'Não há dados suficientes'.
    """)
    
    answer_user_question = query_openai(prompt_answer_user_question)
    
    return answer_user_question