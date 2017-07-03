import os
import csv

from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = '/tmp/dataviz-kiss'
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
        markers = [{
            'name': row[0],
            'title': row[1],
            'position': {
                'lat': row[2],
                'lng': row[3]
            },
        } for index, row in enumerate(reader) if index > 0]

    return jsonify(markers)


if __name__ == '__main__':
    app.run()
