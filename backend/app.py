from flask import Flask, jsonify, request
from services import helpers
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["furia-fangirl.vercel.app"])

@app.route('/api/query', methods=['POST'])
def handle_query():
    try:
        data = request.get_json()
        if not data or 'input' not in data:
            return jsonify({'error': 'Input field is required'}), 400
        
        user_question = data.get('input')
        answer_context = helpers.find_page(user_question)
        if not answer_context:
            return jsonify({'error': 'Could not find appropriate page'}), 404
        
        context = helpers.get_context(answer_context)
        if not context:
            return jsonify({'error': 'Could not retrieve page context'}), 404
        
        answer_user_question = helpers.get_answer(context, user_question)
        if not answer_user_question:
            return jsonify({'error': 'Could not generate answer'}), 500
        
        return jsonify({'response': answer_user_question})
    
    except Exception as e:
        print(f"Error processing request: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500