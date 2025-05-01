import scripts.utils as utils
from scripts.create_db_data import create_db_data

def run():
    # [1] EXTRAIR DADOS DA LIQUIPEDIA
    if utils.check_database_exists('liquipedia_data') == False:
        create_db_data()
        
    # [2] RECEBER PERGUNTA DO FRONT
    user_question = "qual foi o último jogo da furia academy?"
        
    # [3] PERGUNTAR QUAL A PÁGINA MAIS IDEAL
    answer_context = utils.find_page(user_question)
    
    # [4] RESGATAR CONTEXTO DA PÁGINA IDEAL
    context = utils.get_context(answer_context)
    
    # [5] RECEBER RESPOSTA PARA O USUARIO
    answer_user_question = utils.get_answer(context, user_question)
    print(f"Resposta: {answer_user_question}")

if __name__ == "__main__":
    run()