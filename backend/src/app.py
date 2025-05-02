from flask import Flask, jsonify, request, send_from_directory
from services import database_service, helpers
from dotenv import load_dotenv
from flask_cors import CORS
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

@app.route('/api/query', methods=['POST'])
def handle_query():
    try:
        if helpers.check_database_exists('liquipedia_data') == False:
            database_service.create_db_data()
        
        data = request.get_json()
        if not data or 'input' not in data:
            return jsonify({'error': 'Input field is required'}), 400
        
        user_question = data.get('input')
        # answer_context = helpers.find_page(user_question)
        # if not answer_context:
        #     return jsonify({'error': 'Could not find appropriate page'}), 404
        
        # context = helpers.get_context(answer_context)
        # if not context:
        #     return jsonify({'error': 'Could not retrieve page context'}), 404
        
        # answer_user_question = helpers.get_answer(context, user_question)
        # if not answer_user_question:
        #     return jsonify({'error': 'Could not generate answer'}), 500
        
        # return jsonify({'response': answer_user_question})
        
        return jsonify({'response': 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'})
    
    except Exception as e:
        print(f"Error processing request: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/')
def serve_react():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static_file(path):
    return send_from_directory(app.static_folder, path)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)
