import sqlalchemy
from flask_login import UserMixin
from sqlalchemy_serializer import SerializerMixin

from data.db_session import SqlAlchemyBase


class Date(SqlAlchemyBase, UserMixin, SerializerMixin):
    __tablename__ = 'date'

    id = sqlalchemy.Column(sqlalchemy.Integer,
                               primary_key=True,
                               autoincrement=True)
    date = sqlalchemy.Column(sqlalchemy.Integer, nullable=True)
    count_floors = sqlalchemy.Column(sqlalchemy.Integer, nullable=True)
    id_floors = sqlalchemy.Column(sqlalchemy.String, nullable=True)
    description = sqlalchemy.Column(sqlalchemy.String, nullable=True)