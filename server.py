import os
import csv

import requests
from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'uploads')
ALLOWED_EXTENSIONS = set(['csv'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
CORS(app)


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/upload', methods=['POST'])
def upload_file():
    # check if the post request has the file part
    if 'file' not in request.files:
        return 'No file part', 403

    file = request.files['file']
    # if user does not select file, browser also
    # submit a empty part without filename
    if not file or file.filename == '':
        return 'No selected file', 403

    if not allowed_file(file.filename):
        return 'File extension is not allowed', 403

    filename = secure_filename(file.filename)
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    return 'Ok', 200


@app.route('/markers/<filename>')
def markers_info(filename):
    with open('%s/%s' % (UPLOAD_FOLDER, filename), 'r') as csvfile:
        dialect = csv.Sniffer().sniff(csvfile.read(1024))
        csvfile.seek(0)
        reader = csv.reader(csvfile, dialect)
        data = list(reader)[1:]

    processed_places = []
    for row in data:
        google_places_results = requests.get(
            'https://maps.googleapis.com/maps/api/place/textsearch/json?' +
            'query=%s&key=AIzaSyB3ULd090KTq_JT3_KYxqcD6bNYkLBdUOM' % row[1]
            ).json()

        try:
            location_best_guess = google_places_results['results'][0]['geometry']['location']
            position_best_guess = {
                'lat': location_best_guess['lat'],
                'lng': location_best_guess['lng'],
            }

            place = {
                'name': row[0],
                'position': position_best_guess
            }

            processed_places.append(place)
        except (KeyError, IndexError):
            pass

    return jsonify(processed_places)


if __name__ == '__main__':
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    app.run()
