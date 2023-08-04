class Normal:
    LOGIN = 1 << 0
    MANAGE_LINK = 1 << 1
    CUSTOMIZE_LINK = 1 << 2


class Admin:
    MANAGE_API_KEY = 1 << 3
    MANAGE_LINK = 1 << 4
    MANAGE_USER = 1 << 5

ADMIN_PERMISSION = (1 << 6) - 1
USER_PERMISSION = (1 << 3) - 1
