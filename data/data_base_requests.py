from data import db_session
from models.date import *


def get_date(date):
    session = db_session.create_session()
    dat = session.query(Date).filter(Date.data == date).first()
    session.close()
    return dat


def add(date, info):
    session = db_session.create_session()
    date1 = Date(
        data=date,
        values=info
    )
    session.add(date1)
    session.commit()
    session.close()


def put(date, info):
    session = db_session.create_session()
    date0 = get_date(date)
    setattr(date0, 'values', info)
    session.commit()
