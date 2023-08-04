from fastapi import FastAPI
from .routes import user, links


app = FastAPI()
app.include_router(user.router)
app.include_router(links.router)
