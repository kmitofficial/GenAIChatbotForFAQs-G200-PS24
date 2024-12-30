from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer
import re

app = Flask(__name__)
model = SentenceTransformer('all-MiniLM-L6-v2')  # Load the NLP model

# Preprocessing Function
def preprocess_text(text):
    text = text.lower().strip()  # Lowercasing and trimming
    text = re.sub(r'[^\w\s]', '', text)  # Remove special characters
    return text

@app.route('/embed', methods=['POST'])
def embed_query():
    try:
        # Parse JSON Request
        data = request.json
        query = data.get("query", "").strip()

        if not query:
            return jsonify({"error": "Query cannot be empty"}), 400

        # Preprocess Query
        processed_query = preprocess_text(query)

        # Generate Embedding
        embedding = model.encode(processed_query).tolist()
        return jsonify({"embedding": embedding})
    except Exception as e:
        return jsonify({"error": "An error occurred", "details": str(e)}), 500

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=4000, debug=True)
