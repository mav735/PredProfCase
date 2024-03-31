from flask import Flask, request, jsonify
import json
import requests
import req_api as req
from data.data_base_requests import *
app = Flask(__name__)
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
def index():
    # 25-01-23 - default
    date = request.args.get('date', DEFAULT_DATE)

    return jsonify(req.json_processing(json.loads(get_date(date).values)))


if __name__ == '__main__':
    db_session.global_init("data/data.db")
    initialize_db()
    app.run(debug=True, port=5000)
