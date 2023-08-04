import os

from peewee import Model, CharField, PostgresqlDatabase, IntegerField
from ..tools.rand import random_str

PGSQL_URL = os.getenv("PGSQL_URL")

assert PGSQL_URL

db = PostgresqlDatabase(PGSQL_URL, thread_safe=True)


class User(Model):
    username = CharField(max_length=255, unique=True)
    password = CharField(max_length=384)
    permission = IntegerField(default=0)

    class Meta:
        database = db


class Setting(Model):
    key = CharField(max_length=63, unique=True)
    value = CharField(max_length=384)

    class Meta:
        database = db


class Link(Model):
    owner = User()
    target_link = CharField()
    shorten_link = CharField(unique=True)

    class Meta:
        database = db


if not User.table_exists():
    User.create_table(True)

if not Link.table_exists():
    Link.create_table(True)

if not Setting.table_exists():
    Setting.create_table(True)
    setup_key_obj = Setting.create(
        key="SETUP_KEY", value=os.getenv("SETUP_KEY", random_str(16))
    )
    print("It looks like you are creating a new instance.")
    print("[Important] Your setup code is", setup_key_obj.value)
    print("You can visit <server_url>/user/getSetupKey to get this code in console.")
