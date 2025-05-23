from ast import Pass
from fastapi import APIRouter, Form
from typing import Annotated
from pydantic import BaseModel
from ...services.email_validation_check import isValidEmail

router = APIRouter(
    prefix="/register",
    tags=["register_operations"]
)

class FormData(BaseModel):
    name: str
    email: str
    password: str
    
@router.get("/root")
async def register_api_testing():
    return {"message": "Register api working..."}

@router.post("/register_api")
async def register(data: Annotated[FormData, Form()]):
    if isValidEmail(data.email):
        return data
    return {"message": "Invalid email"}

