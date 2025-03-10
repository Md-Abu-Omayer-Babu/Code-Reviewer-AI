import os
from fastapi import APIRouter, File, UploadFile, HTTPException
from pathlib import Path
from backend.services.classFinder import classFinder

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
    if file.filename.endswith(".py"):
        file_path = Path(uploaded_dir) / file.filename
        with open(file_path, "wb") as f:
            f.write(await file.read())
        return {"message": "File uploaded successfully"}
    else:
        raise HTTPException(status_code=400, detail="File is not a python file")
    
# file content
@router.get("/content/{file}")
async def file_content(file_name: str):
    file_path = Path(uploaded_dir) / file_name
    if not file_path.is_file():
        raise HTTPException(status_code=404, detail="File is not exists!")
    if not file_path.suffix == ".py":
        raise HTTPException(status_code=400, detail="File is not a python file")
    
    with open(file_path, "r") as f:
        return {"content": f.read()}

# class finder 
@router.get("/class_finder")
async def class_finder(filename: str):
    file_path = Path(uploaded_dir) / filename
    if not file_path.is_file():
        raise HTTPException(status_code=404, detail="File is not exists!")
    if not file_path.suffix == ".py":
        raise HTTPException(status_code=400, detail="File is not a python file")
    with open(file_path, "r") as f:
        content = f.read()
        classes = classFinder(content)
        return {"classes": classes}