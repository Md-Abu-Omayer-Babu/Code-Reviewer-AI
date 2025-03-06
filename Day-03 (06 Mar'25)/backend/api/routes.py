from models.files import PythonFile
import os
from pathlib import Path
from services.classFinder import classFinder
from fastapi import HTTPException
from fastapi import UploadFile, File
from fastapi import APIRouter
from models.files import PythonFile

router = APIRouter()

# upload a python file
@router.post("/upload")
async def upload(file: UploadFile = File(...)):
    if file.filename.endswith(".py"):
        file_location = Path(file.filename)
        with open(file_location, "wb") as f:
            f.write(await file.read())
        return {"message": "File uploaded successfully"}
    else:
        return {"message": "File is not a python file"}


# get the python files location
DIRECTORY = "."  # Change this to the folder where Python files are stored

@router.get("/files")
async def files():
    files = [f for f in os.listdir(DIRECTORY) if f.endswith(".py") and f != "main.py" and f != "class_finder.py"]
    return {"files": files}

# get the file content
@router.get("/files/{file}")
async def file_content(file: str):
    file_path = Path(file)
    if not file_path.is_file() or not file_path.suffix == ".py":
        return {"error": "Invalid file"}
    with open(file_path, "r") as f:
        return {"content": f.read()}

# delete a file
@router.delete("/files/{file}")
async def delete_file(file: str):
    file_path = Path(file)
    if not file_path.is_file() or not file_path.suffix == ".py":
        return {"error": "Invalid file"}
    os.remove(file_path)
    return {"message": "File deleted successfully"}

# find classes in a python file
# @router.post("/class_finder")
# async def class_finder(python_file: PythonFile):
#     try:
#         classes = classFinder(python_file.content)
#         return {"file_name": python_file.file_name, "classes": classes}
#     except Exception as e:
#         raise HTTPException(status_code=400, detail=str(e))

@router.post("/class_finder")
async def class_finder(python_file: PythonFile):
    try:
        classes = classFinder(python_file.content)  # Pass the content directly
        return {"file_name": python_file.file_name, "classes": classes}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))