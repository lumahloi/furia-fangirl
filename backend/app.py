from flask import Flask, jsonify, request
from services import helpers
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {
    "origins": "https://furia-fangirl.vercel.app",
    "allow_headers": "Content-Type", 
    "allow_methods": ["GET", "POST", "OPTIONS", "PUT", "DELETE", "PATCH"]
}})

@app.route('/api/query', methods=['POST', 'OPTIONS'])
def handle_query():
    try:
        if request.method == 'OPTIONS':
            response = jsonify({'message': 'Preflight request accepted'})
            response.headers.add('Access-Control-Allow-Origin', 'https://furia-fangirl.vercel.app')
            response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
            response.headers.add('Access-Control-Allow-Methods', 'POST')
            return response
        
        if not request.is_json:
            return jsonify({'error': 'Content-Type tem que ser application/json.'}), 415
        
        data = request.get_json()
        if not data or 'input' not in data:
            return jsonify({'error': 'Obrigatório ter o campo "input".'}), 400
        
        user_question = data.get('input')
        answer_context = helpers.find_page(user_question)
        if not answer_context:
            return jsonify({'error': 'Não foi possível encontrar a página apropriada.'}), 404
        
        context = helpers.get_context(answer_context)
        if not context:
            return jsonify({'error': 'Não foi possível recuperar o contexto.'}), 404
        
        answer_user_question = helpers.get_answer(context, user_question)
        if not answer_user_question:
            return jsonify({'error': 'Não foi possível gerar a mensagem.'}), 500
        
        response = jsonify({'response': answer_user_question})
        response.headers.add('Access-Control-Allow-Origin', 'https://furia-fangirl.vercel.app')
        return response
    
    except Exception as e:
        print(f"Error processing request: {str(e)}")
        return jsonify({'error': 'Erro interno do servidor.'}), 500
    
if __name__ == '__main__':
    app.run(debug=True)