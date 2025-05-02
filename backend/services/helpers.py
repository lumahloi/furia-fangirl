from .openai_service import query_openai
import os, sqlite3

def check_database_exists(db_name):
    try:
        current_dir = os.path.dirname(os.path.abspath(__file__))
        project_root = os.path.abspath(os.path.join(current_dir, '..', '..'))
        db_path = os.path.join(project_root, 'src', 'data', 'databases', f'{db_name}.db')

        if os.path.exists(db_path) and os.path.isfile(db_path):
            print(f"Arquivo encontrado: {db_path}")
            return True
        else:
            print(f"Arquivo não encontrado: {db_path}")
            return False
    except Exception as e:
        print(f"Erro ao verificar a existência do banco de dados {db_name}: {str(e)}")
        return False
    
def find_page(question):
    try:
        print(f"Procurando página relevante para a pergunta: {question}")
        
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
        
        response = query_openai(prompt_relevant_page)
        
        if not response:
            print(f"Não foi possível encontrar uma resposta relevante para a pergunta: {question}")
            return None
        
        print(f"Página relevante encontrada: {response}")
        return response
    
    except Exception as e:
        print(f"Erro ao encontrar a página para a pergunta '{question}': {str(e)}")
        return None

def get_context(answer_context):
    try:
        print(f"Buscando contexto para a página: {answer_context}")
        base_dir = os.path.dirname(os.path.abspath(__file__))
        project_root = os.path.abspath(os.path.join(base_dir, '..'))
        db_path = os.path.join(project_root, 'databases', 'liquipedia_data.db')
        connection = sqlite3.connect(db_path)
        cursor = connection.cursor()
        
        print("Conexão com o banco de dados estabelecida.")
        
        cursor.execute("SELECT content FROM extracted_pages WHERE page_title = ?", (answer_context,))
        context = cursor.fetchone()

        if not context:
            print(f"Nenhum contexto encontrado para a página: {answer_context}")
            return None
        
        print(f"Contexto encontrado para a página {answer_context}.")
        return context[0]
    
    except sqlite3.Error as e:
        print(f"Erro ao acessar o banco de dados: {str(e)}")
        return None
    except Exception as e:
        print(f"Erro ao buscar contexto para a página '{answer_context}': {str(e)}")
        return None


def get_answer(context, user_question):
    try:
        print(f"Gerando resposta para a pergunta: '{user_question}' usando o contexto.")
        
        prompt_answer_user_question = (f"""
            Analise este contexto sobre a FURIA no CS:GO: {context}
            Responda de forma DIRETA e OBJETIVA esta pergunta: {user_question}
            Regras: Seja extremamente conciso (máx. 3 frases); Responda APENAS com fatos do contexto; Formate datas/resultados claramente; Se não souber, diga apenas 'Não há dados suficientes'.
        """)
        
        response = query_openai(prompt_answer_user_question)
        
        if not response:
            print(f"Não foi possível gerar uma resposta para a pergunta: '{user_question}'")
            return None
        
        print(f"Resposta gerada: {response}")
        return response
    
    except Exception as e:
        print(f"Erro ao gerar resposta para a pergunta '{user_question}': {str(e)}")
        return None
