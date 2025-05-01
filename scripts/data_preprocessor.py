import sqlite3, re, numpy as np, os
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from transformers import pipeline
from pathlib import Path

# Configurações iniciais
BASE_DIR = Path(__file__).resolve().parent.parent  # Sobe dois níveis a partir do arquivo atual
DB_PATH = os.path.join(BASE_DIR, 'databases', 'liquipedia_data.db')
EMBEDDING_MODEL = 'all-MiniLM-L6-v2'  # Modelo leve para embeddings
SUMMARY_MODEL = 'facebook/bart-large-cnn'  # Modelo para sumarização

class DataPreprocessor:
    def __init__(self, db_path=DB_PATH):
        # Garante que o diretório existe
        os.makedirs(os.path.dirname(db_path), exist_ok=True)
        
        try:
            self.embedding_model = SentenceTransformer(EMBEDDING_MODEL)
            self.summarizer = pipeline("summarization", model=SUMMARY_MODEL)
            self.conn = sqlite3.connect(db_path)
        except Exception as e:
            print(f"Erro ao conectar ao banco de dados: {str(e)}")
            raise
    
    def get_relevant_page(self, question):
        """Identifica a página mais relevante baseada na pergunta"""
        question_keywords = {
            'resultados': ['result', 'resultado', 'performance', 'histórico'],
            'jogos': ['match', 'jogo', 'partida', 'confronto'],
            'equipe': ['time', 'roster', 'jogadores', 'equipe'],
            'academy': ['academy', 'equipe b', 'segundo time'],
            'feminino': ['female', 'feminino', 'mulheres']
        }
        
        # Determina o contexto da pergunta
        question_lower = question.lower()
        page_suffix = None
        
        for key, keywords in question_keywords.items():
            if any(kw in question_lower for kw in keywords):
                page_suffix = key
                break
        
        # Mapeia para os nomes de páginas no banco
        page_map = {
            'resultados': '/Results',
            'jogos': '/Matches',
            'equipe': '',
            'academy': '_Academy',
            'feminino': '_Female'
        }
        
        base_page = 'FURIA'
        if page_suffix in page_map:
            return base_page + page_map[page_suffix]
        return base_page
    
    def fetch_page_content(self, page_title):
        """Busca conteúdo do banco de dados"""
        cursor = self.conn.cursor()
        cursor.execute("SELECT content FROM extracted_pages WHERE page_title = ?", (page_title,))
        result = cursor.fetchone()
        return result[0] if result else None
    
    def chunk_text(self, text, chunk_size=500):
        """Divide o texto em chunks semânticos"""
        sentences = re.split(r'(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s', text)
        chunks = []
        current_chunk = ""
        
        for sentence in sentences:
            if len(current_chunk) + len(sentence) < chunk_size:
                current_chunk += sentence + " "
            else:
                chunks.append(current_chunk.strip())
                current_chunk = sentence + " "
        
        if current_chunk:
            chunks.append(current_chunk.strip())
            
        return chunks
    
    def get_relevant_chunks(self, text, question, top_n=3):
        """Encontra os chunks mais relevantes para a pergunta"""
        chunks = self.chunk_text(text)
        if not chunks:
            return []
        
        # Gera embeddings
        question_embedding = self.embedding_model.encode([question])
        chunk_embeddings = self.embedding_model.encode(chunks)
        
        # Calcula similaridade
        similarities = cosine_similarity(question_embedding, chunk_embeddings)[0]
        top_indices = np.argsort(similarities)[-top_n:][::-1]
        
        return [chunks[i] for i in top_indices]
    
    def summarize_text(self, text, max_length=150):
        """Resume o texto usando modelo local"""
        if len(text.split()) < 50:  # Não resume textos muito curtos
            return text
            
        try:
            summary = self.summarizer(text, max_length=max_length, min_length=30, do_sample=False)
            return summary[0]['summary_text']
        except:
            return text[:max_length] + "..."  # Fallback simples
    
    def preprocess_for_question(self, question):
        """Pipeline completo de pré-processamento"""
        # Passo 1: Identifica a página mais relevante
        page_title = self.get_relevant_page(question)
        
        # Passo 2: Busca o conteúdo
        content = self.fetch_page_content(page_title)
        if not content:
            return "Não encontrei dados sobre este tópico no banco de dados."
        
        # Passo 3: Encontra trechos relevantes
        relevant_chunks = self.get_relevant_chunks(content, question)
        context = "\n".join(relevant_chunks)
        
        # # Passo 4: Resume se necessário
        # if len(context.split()) > 300:  # Só resume se for muito longo
        #     context = self.summarize_text(context)
        
        return context
    
    def close(self):
        """Fecha conexões"""
        self.conn.close()