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
