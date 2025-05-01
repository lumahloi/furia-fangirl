import scripts.utils as utils, os
from scripts.create_db_data import create_db_data
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

CORS(app, resources={
    r"/api/*": {
        "origins": [os.getenv('MY_FRONTEND')],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

@app.route('/', defaults={'path': ''})

@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists("frontend/build/" + path):
        return send_from_directory('frontend/build', path)
    else:
        return send_from_directory('frontend/build', 'index.html')

@app.route('/api/<path:path>', methods=['OPTIONS'])
def options_handler(path):
    response = jsonify()
    response.headers.add("Access-Control-Allow-Origin", os.getenv('MY_FRONTEND'))
    response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization")
    return response

@app.route('/api/query', methods=['POST'])
def handle_query():
    try: 
        # [1] EXTRAIR DADOS DA LIQUIPEDIA
        if utils.check_database_exists('liquipedia_data') == False:
            create_db_data()
            
        # [2] RECEBER PERGUNTA DO FRONT
        data = request.get_json()
        if not data or 'input' not in data:
            return jsonify({'error': 'Input field is required'}), 400
        user_question = data.get('input')
            
        # [3] PERGUNTAR QUAL A PÁGINA MAIS IDEAL
        answer_context = utils.find_page(user_question)
        if not answer_context:
            return jsonify({'error': 'Could not find appropriate page'}), 404
        
        # [4] RESGATAR CONTEXTO DA PÁGINA IDEAL
        context = utils.get_context(answer_context)
        if not context:
            return jsonify({'error': 'Could not retrieve page context'}), 404
        
        # [5] RECEBER RESPOSTA PARA O USUARIO
        answer_user_question = utils.get_answer(context, user_question)
        if not answer_user_question:
            return jsonify({'error': 'Could not generate answer'}), 500
        
        # [6] RETORNAR AO FRONT
        return jsonify({'response': answer_user_question})
    
    except Exception as e:
        print(f"Error processing request: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500
    
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)