from data import db_session
from models.date import Date


def get_date(date):
    session = db_session.create_session()
    return session.query(Date).get(Date.data == date)