import sqlalchemy
from flask_login import UserMixin
from sqlalchemy_serializer import SerializerMixin

from data.db_session import SqlAlchemyBase


class Floor(SqlAlchemyBase, UserMixin, SerializerMixin):
    __tablename__ = 'floors'

    id = sqlalchemy.Column(sqlalchemy.Integer,
                               primary_key=True,
                               autoincrement=True)
    list_windows = sqlalchemy.Column(sqlalchemy.String, nullable=True)
    count_floors = sqlalchemy.Column(sqlalchemy.Integer, nullable=True)
    id_floors = sqlalchemy.Column(sqlalchemy.ClauseList, nullable=True)