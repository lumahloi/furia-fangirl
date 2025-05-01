from scripts.create_db_data import create_db_data
from scripts.data_preprocessor import DataPreprocessor
from scripts.chatgpt_query import chatgpt_query

def run():
    preprocessor = DataPreprocessor()
    
    try:
        # create_db_data()
        question = "Quantas vezes o time feminino da FURIA perdeu para a equipe 9P.F?"
        context = preprocessor.preprocess_for_question(question)
        # response = chatgpt_query(question, context)
        # print(f"Resposta: {response}")
        
    finally:
        preprocessor.close()

if __name__ == "__main__":
    run()