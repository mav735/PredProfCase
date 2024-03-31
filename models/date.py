import sqlalchemy

from data.db_session import SqlAlchemyBase


class Date(SqlAlchemyBase):
    __tablename__ = 'date'

    id = sqlalchemy.Column(sqlalchemy.Integer,
                               primary_key=True,
                               autoincrement=True)
    data = sqlalchemy.Column(sqlalchemy.String, nullable=True)
    values = sqlalchemy.Column(sqlalchemy.String, nullable=True)