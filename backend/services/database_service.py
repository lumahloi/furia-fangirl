import requests, sqlite3, time, re
from bs4 import BeautifulSoup

PAGES = [
    "FURIA", "FURIA/Results", "FURIA/Matches",
    "FURIA_Academy", "FURIA_Academy/Results", "FURIA_Academy/Matches",
    "FURIA_Female", "FURIA_Female/Results", "FURIA_Female/Matches"
]

def setup_database():
    connection = sqlite3.connect('./databases/liquipedia_data.db')
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
    if not raw_html:
        return ""
    
    try:
        soup = BeautifulSoup(raw_html, 'html.parser')
        
        for element_id in ["main-nav", "wiki-nav", "footer", "sidebar-toc-column"]:
            for element in soup.find_all(id=element_id):
                element.decompose()
        
        for class_name in ["tabs-static", "reflist columns references-column-count references-column-count-2"]:
            for element in soup.find_all(class_=class_name):
                element.decompose()
        
        for element in soup(['script', 'style']):
            element.decompose()
        
        text = soup.get_text(' ', strip=True)
        text = ' '.join(text.split()) 
        
        return re.sub(r'\s+', ' ', text).strip() 
    
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
        response = session.get(api_url, params=params)
        if response.status_code == 200:
            data = response.json()
            raw_html = data.get('parse', {}).get('text', {}).get('*', '')
            if raw_html:
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
        return False
    except Exception as e:
        print(f"Erro ao processar {page_title}: {str(e)}")
        return False

def create_db_data():
    print("Extraindo dados da liquipedia...")
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
