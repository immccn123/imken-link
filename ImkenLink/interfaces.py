from pydantic import BaseModel
from typing import Union


class TokenData(BaseModel):
    user_id: Union[int, None] = None


class TokenResponse(BaseModel):
    token: str = ""


class User(BaseModel):
    id: int = 0
    username: str = ""
    permission: int = 0


class Link(BaseModel):
    id: int = 0
    target_link: str = ""
    shorten_link: str = ""
    owner_name: str | None = ""


class Operation(BaseModel):
    status: str = "ok"
