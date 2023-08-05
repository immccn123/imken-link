from fastapi import APIRouter, Form, Header, HTTPException, status, Path
from fastapi.responses import RedirectResponse

from ..constants import permission
from ..database import User, Link
from ..tools.crypt import get_token_data
from ..tools.rand import random_str

credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
)

permisson_exception = HTTPException(
    status_code=status.HTTP_403_FORBIDDEN,
    detail="You are not allowed to do this action",
)

notfound_exception = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail="Not Found",
)

router = APIRouter()


@router.post("/link/add")
async def add_link(
    authorization: str = Header(),
    target_link: str = Form(),
    shorten_link: str | None = Form(default=None),
) -> str:
    try:
        user_id = get_token_data(authorization.split(" ")[1]).user_id
    except IndexError:
        raise credentials_exception
    user = User.get_by_id(user_id)
    if user.permission & permission.Normal.CUSTOMIZE_LINK and shorten_link is not None:
        raise permisson_exception
    if shorten_link is None:
        shorten_link = random_str(8)
    link = Link.create(user=User, shorten_link=shorten_link, target_link=target_link)
    return link.shorten_link


@router.get("/{shorten_link}")
async def jump_link(shorten_link: str = Path()):
    try:
        link = Link.get(shorten_link=shorten_link)
    except Link.DoesNotExist:
        raise notfound_exception
    return RedirectResponse(link.target_link, status_code=301)
