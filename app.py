from flask import Flask, request, jsonify
import json
import requests
import req_api as req
from data.data_base_requests import *
from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
DEFAULT_DATE = None


def initialize_db():
    global DEFAULT_DATE

    r = requests.get('https://olimp.miet.ru/ppo_it_final/date', headers={'X-Auth-Token': 'ppo_11_30020'}).json()
    for i in r['message']:
        date = i.split('-')
        date_data = requests.get(f'https://olimp.miet.ru/ppo_it_final?day={date[0]}&month={date[1]}&year={date[2]}',
                                 headers={'X-Auth-Token': 'ppo_11_30020'}).json()
        date_data['message']['date']['data'] = i
        if DEFAULT_DATE is None:
            DEFAULT_DATE = i
        if get_date(i) is None:
            add(i, str(date_data).replace(' ', '').replace("True", "1").replace(
                "False", "0").replace("'", '"'))


@app.route('/')
@cross_origin()
def index():
    # 25-01-23 - default
    date = request.args.get('date', DEFAULT_DATE)
    date = date.split('-')[2] + '-' + date.split('-')[1] + '-' + date.split('-')[0][2:4]
    print(date)
    return jsonify(req.json_processing(json.loads(get_date(date).values)))


@app.route('/post', methods=['POST'])
def post():
    info = request.json()
    print(info)


if __name__ == '__main__':
    db_session.global_init("data/data.db")
    initialize_db()
    print(json_processing(json.loads(get_date('25-01-23').values)))
    app.run(debug=True, port=5000)
