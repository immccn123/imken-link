from fastapi import APIRouter, Form, Header, HTTPException, Path, Query, status
from fastapi.responses import HTMLResponse, RedirectResponse

from ..constants import permission
from ..database import Link, User
from ..interfaces import Link as LinkInterface, Operation
from ..tools.crypt import get_token_data, get_user
from ..tools.rand import random_str
from ..tools.permission import has_permission

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
    detail="Link not found",
)

web_panel_html = open("static/index.html", encoding="utf-8").read()

router = APIRouter()


@router.post("/link/add")
async def add_link(
    authorization: str = Header(),
    target_link: str = Form(),
    shorten_link: str | None = Form(default=None),
) -> LinkInterface:
    user = get_user(authorization)
    if (
        not has_permission(user.permission, permission.Normal.CUSTOMIZE_LINK)
        and shorten_link is not None
    ):
        raise permisson_exception
    if shorten_link is None:
        shorten_link = random_str(8)
    link = Link.create(owner=user, shorten_link=shorten_link, target_link=target_link)
    return LinkInterface(
        id=link.id,
        owner_name=user.username,
        shorten_link=shorten_link,
        target_link=target_link,
    )


@router.get("/link/list")
async def get_link_list(
    authorization: str = Header(), is_own: int = Query(), page: int = Query()
) -> list[LinkInterface]:
    per_page = 50
    user = get_user(authorization)
    if (
        not has_permission(user.permission, permission.Admin.MANAGE_LINK)
        and is_own == 0
    ):
        raise permisson_exception
    query = Link.select()
    if is_own:
        query = query.where(Link.owner == user)
    query = query.offset(page * per_page).limit(per_page)
    result = [
        LinkInterface(
            id=link.id,
            target_link=link.target_link,
            shorten_link=link.shorten_link,
            owner_name=link.owner.username,
        )
        for link in query
    ]
    return result


@router.get("/link/count")
async def get_link_count(authorization: str = Header(), is_own: int = Query()) -> int:
    user = get_user(authorization)
    if (
        not has_permission(user.permission, permission.Admin.MANAGE_LINK)
        and is_own == 0
    ):
        raise permisson_exception
    query = Link.select()
    if is_own:
        query = query.where(Link.owner == user)
    return query.count()


@router.delete("/link/{link_id}")
async def delete_link(
    authorization: str = Header(), link_id: int = Path()
) -> Operation:
    user = get_user(authorization)
    link: Link
    try:
        link = Link.get_by_id(link_id)
    except Link.DoesNotExist:
        raise notfound_exception
    if (
        not has_permission(user.permission, permission.Admin.MANAGE_LINK)
        and link.owner != user
    ):
        raise permisson_exception
    Link.delete_by_id(link_id)
    return Operation(status="ok")


@router.get("/{shorten_link}")
async def jump_link(shorten_link: str = Path()):
    try:
        link = Link.get(shorten_link=shorten_link)
    except Link.DoesNotExist:
        raise notfound_exception
    return RedirectResponse(link.target_link, status_code=301)


@router.get("/")
async def web_panel():
    return HTMLResponse(web_panel_html)
