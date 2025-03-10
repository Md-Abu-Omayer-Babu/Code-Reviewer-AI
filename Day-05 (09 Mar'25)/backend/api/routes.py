import os
from fastapi import APIRouter, File, UploadFile, HTTPException
from pathlib import Path
from backend.services.classFinder import classFinder
from backend.services.python_file_validation_check import isPythonFile
from backend.services.file_path_finder import PathFinder
from backend.services.file_reader import FileReader

router = APIRouter()

uploaded_dir = './db'

if not os.path.isdir(uploaded_dir):
    os.makedirs(uploaded_dir)

@router.get("/files")
async def api_testing():
    return "apis.routes is working....."

# file upload
@router.post("/upload")
async def upload_file(file : UploadFile = File(...)):
    if isPythonFile(file.filename):
        file_path = PathFinder(file.filename, uploaded_dir)
        with open(file_path, "wb") as f:
            f.write(await file.read())
        return {"message": "File uploaded successfully"}
    else:
        raise HTTPException(status_code=400, detail="File is not a python file")
    
# file content
@router.get("/content/{file}")
async def file_content(file_name: str):
    return {"content": FileReader(file_name, uploaded_dir)}

# class finder 
@router.get("/class_finder")
async def class_finder(filename: str):
    content = FileReader(filename, uploaded_dir)
    classes = classFinder(content)
    return {"classes": classes}