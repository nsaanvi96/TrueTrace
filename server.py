from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # enable CORS for all routes

# deepfake analysis endpoint
@app.route('/analyze-deepfake', methods=['POST'])
def analyze_deepfake():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    
    file = request.files['file']
    if not file.filename.endswith(('.jpg', '.jpeg', '.png')):
        return jsonify({'error': 'Invalid file type, please upload JPEG or PNG'}), 400

    # Mock response
    return jsonify({
        'result': 'Deepfake detected',
        'confidence': 0.85
    })

# phishing analysis endpoints
@app.route('/analyze-phishing', methods=['POST'])
def analyze_phishing():
    data = request.get_json()
    if not data or 'url' not in data:
        return jsonify({'error': 'No URL provided'}), 400

    url = data['url']
    # Mock response 
    return jsonify({
        'result': 'Phishing risk: High'
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)