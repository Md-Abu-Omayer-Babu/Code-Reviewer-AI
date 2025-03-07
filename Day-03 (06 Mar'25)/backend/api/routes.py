from models.files import PythonFile
import os
from pathlib import Path
from services.classFinder import classFinder
from fastapi import HTTPException
from fastapi import UploadFile, File
from fastapi import APIRouter
from models.files import PythonFile

router = APIRouter()

UPLOAD_DIRECTORY = "./uploaded_python_file_storage" 

os.makedirs(UPLOAD_DIRECTORY, exist_ok=True)

# upload a python file
@router.post("/upload")
async def upload(file: UploadFile = File(...)):
    if file.filename.endswith(".py"):
        file_location = Path(UPLOAD_DIRECTORY) / file.filename
        with open(file_location, "wb") as f:
            f.write(await file.read())
        return {"message": "File uploaded successfully"}
    else:
        return {"message": "File is not a python file"}

@router.get("/files")
async def files():
    files = [f for f in os.listdir(UPLOAD_DIRECTORY) if f.endswith(".py") and f != "main.py" and f != "class_finder.py" and f != "__init__.py"]
    return {"files": files}

# get the file content
@router.get("/files/{file}")
async def file_content(file: str):
    file_path = Path(UPLOAD_DIRECTORY) / file
    if not file_path.is_file() or not file_path.suffix == ".py":
        return {"error": "Invalid file"}
    with open(file_path, "r") as f:
        return {"content": f.read()}

# delete a file
@router.delete("/files/{file}")
async def delete_file(file: str):
    file_path = Path(UPLOAD_DIRECTORY) / file
    if not file_path.is_file() or not file_path.suffix == ".py":
        return {"error": "Invalid file"}
    os.remove(file_path)
    return {"message": "File deleted successfully"}

# get the class names
@router.post("/class_finder")
async def class_finder(python_file: PythonFile):
    classes = classFinder(python_file.content)
    
    if not classes:
        raise HTTPException(status_code=404, detail="No classes found.")
    
    return {"classes": classes}