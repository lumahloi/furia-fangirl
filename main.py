from scripts.create_db_data import create_db_data
from scripts.data_preprocessor import DataPreprocessor
from scripts.chatgpt_query import chatgpt_query

def main():
    preprocessor = DataPreprocessor()
    
    try:
        question = "Quais foram os últimos resultados da FURIA?"
        context = preprocessor.preprocess_for_question(question)
        response = chatgpt_query(question, context)
        print(response)
        
    finally:
        preprocessor.close()

if __name__ == "__main__":
    main()