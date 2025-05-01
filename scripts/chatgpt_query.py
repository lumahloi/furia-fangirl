import os
from openai import OpenAI
from dotenv import load_dotenv

def chatgpt_query(question, context):
    load_dotenv()
    
    try:
        client = OpenAI(api_key=os.getenv('OPENAI_KEY'))
        
        messages = [
            {
                "role": "system",
                "content": "Você é um assistente especializado em Counter-Strike e na equipe FURIA. "
                          "Responda apenas com base nas informações fornecidas no contexto."
            },
            {
                "role": "user",
                "content": f"Contexto:\n{context}\n\nPergunta: {question}"
            }
        ]
        
        response = client.chat.completions.create(
            model="gpt-4-turbo",  # Modelo mais atual e econômico
            messages=messages,
            temperature=0.7,  # Balanceia criatividade e precisão
            max_tokens=500,    # Limita o tamanho da resposta
        )
        
        return response.choices[0].message.content
        
    except Exception as e:
        print(f"Erro ao consultar OpenAI: {str(e)}")
        return "Desculpe, ocorreu um erro ao processar sua pergunta."