from ast import Pass
from fastapi import FastAPI, HTTPException, APIRouter

router = APIRouter(
    prefix="/register",
    tags=["register_operations"]
)

@router.get("/root")
async def register_api_testing():
    return {"message": "Register api working..."}

@router.post("/register_api")
async def register():
    Pass

