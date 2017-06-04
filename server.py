from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/')
def hello_world():
    markers = [{
        'name': 'Sicara',
        'title': 'Sicara',
        'position': {
            'lat': 48.8828993,
            'lng': 29.320023
        },
    }]
    return jsonify(markers)


if __name__ == '__main__':
    app.run()
