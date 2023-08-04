from random import choice


def random_str(len: int):
    return "".join(
        [
            choice("1234567890poiuytrewqasdfghjklmnbvcxzQWERTYUIOPLKJHGFDSAZXCVBNM")
            for _ in range(len)
        ]
    )
