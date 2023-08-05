def has_permission(user_permission: int, target_permission: int) -> bool:
    return (user_permission & target_permission) == target_permission
