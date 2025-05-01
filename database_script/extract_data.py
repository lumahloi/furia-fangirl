import requests, sqlite3, json, time, re
from bs4 import BeautifulSoup

PAGES = [
    "FURIA",
    "FURIA/Results",
    "FURIA/Matches",
    "FURIA_Academy",
    "FURIA_Academy/Results",
    "FURIA_Academy/Matches",
    "FURIA_Female",
    "FURIA_Female/Results",
    "FURIA_Female/Matches"
]

def setup_database():
    connection = sqlite3.connect('./database/liquipedia_data.db')
    cursor = connection.cursor()
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS extracted_pages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            page_title TEXT NOT NULL UNIQUE,
            content TEXT NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )'''
    )
    
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_page_title ON extracted_pages(page_title)')
    connection.commit()
    
    return connection

def clean_html(raw_html):
    """
    Limpa o HTML removendo:
    - Elementos especificados (scripts, imagens, menus etc.)
    - Atributos de todas as tags
    - Quebras de linha desnecessárias
    - Preserva outras tags como <p>, <div>, etc.
    """
    if not raw_html:
        return ""
    
    try:
        soup = BeautifulSoup(raw_html, 'html.parser')
        
        # Remove elementos não desejados
        if soup.head:
            soup.head.decompose()
        
        for element in soup(['script', 'style', 'img', 'link', 'meta', 'noscript', 'i']):
            element.decompose()
        
        for element_id in ["main-nav", "wiki-nav", "footer", "sidebar-toc-column"]:
            element = soup.find(id=element_id)
            if element:
                element.decompose()
        
        for class_name in ["tabs-static", "reflist columns references-column-count references-column-count-2"]:
            for element in soup.find_all(class_=class_name):
                element.decompose()
        
        # Remove todos os atributos de todas as tags
        for tag in soup.find_all(True):
            tag.attrs = {}
        
        # Remove nós de texto vazios (usando 'string' em vez de 'text' para evitar warning)
        for element in soup.find_all(string=True):
            if element.strip() == '':
                element.extract()
        
        # Converte de volta para string HTML limpa
        cleaned_html = str(soup)
        
        # Remove espaços em branco extras entre tags
        cleaned_html = ' '.join(cleaned_html.split())
        cleaned_html = cleaned_html.replace('> <', '><')  # Remove espaços entre tags
        
        return cleaned_html
    
    except Exception as e:
        print(f"Erro ao limpar HTML: {str(e)}")
        return raw_html
    
def extract_page_data(session, page_title, connection):
    api_url = "https://liquipedia.net/counterstrike/api.php"
        
    params = {
        'action': 'parse',
        'page': page_title,
        'format': 'json',
        'prop': 'text',
        'disabletoc': '1',
        'disableeditsection': '1',
        'disablelimitreport': '1',
        'formatversion': '2'
    }
    
    try:
        print(f"Extraindo: {page_title}")
        response = session.get(api_url, params=params)
    
        if response.status_code == 200:
            print('Requisição feita com sucesso')
            data = response.json()
            
            if not isinstance(data, dict):
                print(f"Resposta não é um dicionário válido para {page_title}")
                return None
                
            if 'error' in data:
                print(f"Erro na página {page_title}: {data.get('error', {}).get('info', 'Erro desconhecido')}")
                return None
            
            parse_data = data.get('parse', {})
            if not parse_data:
                print(f"Dados parse vazios para {page_title}")
                return None
                
            if isinstance(parse_data.get('text'), dict):
                raw_html = parse_data['text'].get('*', '')
            elif isinstance(parse_data.get('text'), str):
                raw_html = parse_data['text']
            else:
                print(f"Formato de texto inválido para {page_title}")
                print(f"Estrutura recebida: {type(parse_data.get('text'))}")
                return None
            
            if not raw_html:
                print(f"Conteúdo vazio para {page_title}")
                return None
            
            cleaned_content = clean_html(raw_html)
            
            cursor = connection.cursor()
            cursor.execute('''
                INSERT OR REPLACE INTO extracted_pages 
                (page_title, content) 
                VALUES (?, ?)''', 
                (page_title, cleaned_content)
            )
            
            connection.commit()
            print(f"Página {page_title} extraída e armazenada com sucesso!")
            return True
        else:
            print(f"Erro HTTP {response.status_code} para {page_title}")
            return False
            
    except json.JSONDecodeError as e:
        print(f"Erro ao decodificar JSON para {page_title}: {str(e)}")
        return False
    except Exception as e:
        print(f"Erro ao processar {page_title}: {str(e)}")
        return False

def main():
    session = requests.Session()
    session.headers.update({
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
    })
    
    connection = setup_database()
    
    for page in PAGES:
        extract_page_data(session, page, connection)
        time.sleep(2)
        
    connection.close()
    
    print("Extração de todas as páginas concluída!")
    
if __name__ == "__main__":
    main()