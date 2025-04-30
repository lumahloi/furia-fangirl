import requests, sqlite3, json

def extractData():
    session = requests.Session()
    session.headers.update({
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
    })
    
    url = "https://liquipedia.net/counterstrike/api.php"
    params = {
        'action': 'parse',
        'page': 'FURIA',
        'format': 'json',
        'prop': 'text|modules|jsconfigvars',
        'disabletoc': '1',
        'disableeditsection': '1',
        'disablelimitreport': '1',
        'formatversion': '2' 
    }
    
    try:
        response = session.get(url, params=params)
    
        if response.status_code == 200:
            print('Requisição feita com sucesso')
            data = response.json()
            
            # connection = sqlite3.connect("./database/extracted_data.db")
            # cursor = connection.cursor()
            
            # cursor.execute("""
            #     CREATE TABLE IF NOT EXISTS tb_extracted_data (
            #         id INTEGER PRIMARY KEY AUTOINCREMENT,
            #         data_text TEXT,
            #         full_json TEXT,
            #         timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
            #     )
            # """)
            
            # cursor.execute(
            #     "INSERT INTO tb_extracted_data (data_text, full_json) VALUES (?, ?)", 
            #     (str(data.get('parse', {}).get('text', {}).get('*', '')), json.dumps(data))
            # )
            
            # connection.commit()
            
            # cursor.execute("SELECT * FROM tb_extracted_data")
            # results = cursor.fetchall()
            
            # print("Dados armazenados:")
            # for row in results:
            #     print(row)
                
            # connection.close()
            
            print(data['parse']['text'])
        else:
            print(f'Houve erro na requisição: {response.status_code}')
            
    except Exception as e:
        print(f'Erro durante a operação: {str(e)}')
        return None

extractData()