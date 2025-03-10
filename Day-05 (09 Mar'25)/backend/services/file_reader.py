from fastapi import HTTPException
from backend.services.python_file_validation_check import isPythonFile
from backend.services.file_path_finder import PathFinder

def FileReader(filename: str, uploaded_dir: str):
    file_path = PathFinder(filename, uploaded_dir)
    if not isPythonFile(filename):
        raise HTTPException(status_code=400, detail="File is not a python file")
    if not file_path.is_file():
        raise HTTPException(status_code=404, detail="File is not exists!")
    with open(file_path, "r") as f:
        content = f.read()
        return content