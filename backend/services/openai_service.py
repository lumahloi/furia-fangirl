from dotenv import load_dotenv
from openai import OpenAI
import os

load_dotenv()

def query_openai(prompt):
    try:
        client = OpenAI(api_key=os.environ['OPENAI_KEY'])

        response = client.chat.completions.create(
            model="gpt-4-turbo-preview",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3,
            max_tokens=200,
        )

        return response.choices[0].message.content.strip()

    except Exception as e:
        print(f"Erro OpenAI: {e}")
        return "Erro ao processar. Tente reformular sua pergunta."
