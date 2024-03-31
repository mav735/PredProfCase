from flask import Flask, jsonify
import requests

import request
from data.data_base_requests import *

app = Flask(__name__)


def initialize_db():
    r = requests.get('https://olimp.miet.ru/ppo_it_final/date', headers={'X-Auth-Token': 'ppo_11_30020'}).json()
    for i in r['message']:
        date = i.split('-')
        date_data = requests.get(f'https://olimp.miet.ru/ppo_it_final?day={date[0]}&month={date[1]}&year={date[2]}',
                                 headers={'X-Auth-Token': 'ppo_11_30020'}).json()
        date_data['message']['date']['data'] = i
        print(date_data)


@app.route('/')
def index():
    date_data = requests.get("https://olimp.miet.ru/ppo_it_final?day=25&month=01&year=23", headers={'X-Auth-Token': 'ppo_11_30020'}).json()['message']
    return jsonify(request.json_processing(date_data))


if __name__ == '__main__':
    # initialize_db()
    app.run(debug=True, port=5000)
