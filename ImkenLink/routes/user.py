from fastapi import APIRouter, Form, Header, HTTPException, status
from fastapi.responses import RedirectResponse

from ..constants import permission
from ..database import Setting, User
from ..interfaces import TokenResponse, User as UserInterface
from ..tools.crypt import (
    create_access_token,
    get_password_hash,
    get_token_data,
    verify_password,
)

router = APIRouter(prefix="/user")


@router.post("/login")
async def login(username: str = Form(), password: str = Form()) -> TokenResponse:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        user = User.get(username=username)
        if not verify_password(password, user.password):
            raise credentials_exception
    except User.DoesNotExist:
        raise credentials_exception
    return TokenResponse(token=create_access_token({"user_id": user.id}))


@router.post("/password")
async def change_password(
    authorization: str = Header(),
    old_password: str = Form(),
    new_password: str = Form(),
) -> UserInterface:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate old password",
    )
    user_id = get_token_data(authorization.split(" ")[1]).user_id
    user = User.get_by_id(user_id)
    if not verify_password(old_password, user.password):
        raise credentials_exception
    user.password = get_password_hash(new_password)
    user.save()
    return UserInterface(id=user.id, username=user.username, permission=user.permission)


@router.get("/me")
async def get_user_data(
    authorization: str = Header(),
) -> UserInterface:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate old password",
    )
    user_id = get_token_data(authorization.split(" ")[1]).user_id
    user = User.get_by_id(user_id)
    return UserInterface(id=user.id, username=user.username, permission=user.permission)


@router.post("/setup")
async def setup_create_super_user(
    username: str = Form(), password: str = Form(), setup_key: str = Form()
) -> UserInterface:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Setup key is invalid",
    )
    # check setup key
    real_setup_key = Setting.get(key="SETUP_KEY").value
    if setup_key != real_setup_key and real_setup_key != "=":
        raise credentials_exception
    user = User.create(
        username=username,
        password=get_password_hash(password),
        permission=permission.ADMIN_PERMISSION,
    )
    setup_key_obj = Setting.get(key="SETUP_KEY")
    setup_key_obj.value = "="
    setup_key_obj.save()
    return UserInterface(id=user.id, username=user.username, permission=user.permission)


@router.get("/getSetupKey")
async def get_setup_key_in_console():
    print("The Setup Key is:", Setting.get(key="SETUP_KEY").value)
    return "ok"
