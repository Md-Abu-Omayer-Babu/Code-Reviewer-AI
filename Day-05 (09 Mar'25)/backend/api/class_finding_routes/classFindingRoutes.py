from fastapi import APIRouter
from backend.services.classFinder import classFinder
from backend.services.file_reader import FileReader
import os

router = APIRouter(
    prefix="/class_finding",
    tags=["class_finding_operations"],
)

uploaded_dir = './db'

if not os.path.isdir(uploaded_dir):
    os.makedirs(uploaded_dir)

@router.get("/")
async def class_finding_testing():
    return "class_finding is working....."

# class finder
@router.get("/class_finder")
async def class_finder(filename: str):
    content = FileReader(filename, uploaded_dir)
    classes = classFinder(content)
    return {"classes": classes}


