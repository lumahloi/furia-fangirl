import os
from openai import OpenAI
from dotenv import load_dotenv

def chatgpt_query(question, context):
    load_dotenv()
    
    try:
        print("Conectado com sucesso ao OPENAI...")
        client = OpenAI(api_key=os.getenv('OPENAI_KEY'))
        
        prompt = (
            f"Analise este contexto sobre a FURIA no CS:GO:\n\n"
            f"{context}\n\n"
            f"Responda de forma DIRETA e OBJETIVA esta pergunta:\n"
            f"{question}\n\n"
            f"Regras:\n"
            f"- Seja extremamente conciso (máx. 3 frases)\n"
            f"- Responda APENAS com fatos do contexto\n"
            f"- Formate datas/resultados claramente\n"
            f"- Se não souber, diga apenas 'Não há dados suficientes'\n"
        )
        
        response = client.chat.completions.create(
            model="gpt-4-turbo-preview",  # 30% mais rápido que gpt-4
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3,  # Menos criatividade = mais precisão
            max_tokens=200,    # Limita o tamanho da resposta
        )
        
        print(prompt)
        
        return response.choices[0].message.content.strip()
        
    except Exception as e:
        print(f"Erro OpenAI: {e}")
        return "Erro ao processar. Tente reformular sua pergunta."