import pytest
import sys
import requests
import json
from req_api import json_processing
from data.data_base_requests import get_date
from data import db_session


def test_all_dates():
    key = True
    r = requests.get('https://olimp.miet.ru/ppo_it_final/date', headers={'X-Auth-Token': 'ppo_11_30020'}).json()
    for i in r['message']:
        date = i.split('-')
        db_session.global_init("data/data.db")
        datu = json_processing(json.loads(get_date(i).values))
        ma = {'data': {'count': len(datu[-1]), 'rooms': datu[-1]}, "date": i}
        r = requests.post('https://olimp.miet.ru/ppo_it_final', headers={'X-Auth-Token': 'ppo_11_30020'}, json=ma).json()
        if r['message'] != 'correct answer':
            key = False
    assert key
