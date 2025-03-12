from fastapi import APIRouter
from backend.services.file_reader import FileReader
from backend.services.functionFinder import functionFinder
from backend.services.funcUnderClass import funcUnderClass
import os

router = APIRouter(
    prefix = "/functions",
    tags = ["function_operation"]
)

uploaded_dir = './db'

if not os.path.isdir(uploaded_dir):
    os.makedirs(uploaded_dir)


# all classes
@router.get("/function_finder")
async def function_finder(filename: str):
    content = FileReader(filename, uploaded_dir)
    functions = functionFinder(content)
    return {"functions": functions}

# functions under class
@router.get("/functions_under_classes")
async def function_under_classes(filename: str):
    content = FileReader(filename, uploaded_dir)
    functions = funcUnderClass(content)
    return {"functions": functions}