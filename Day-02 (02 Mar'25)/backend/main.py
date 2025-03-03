from fastapi import FastAPI, UploadFile, File
import os
from pathlib import Path

app = FastAPI()

# Allow frontend to access the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow only Next.js frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# check api
@app.get("/")
async def root():
    return {"message": "Welcome to Code Reviewer AI"}


# upload a python file
@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    if file.filename.endswith(".py"):
        file_location = Path(file.filename)
        with open(file_location, "wb") as f:
            f.write(await file.read())
        return {"message": "File uploaded successfully"}
    else:
        return {"message": "File is not a python file"}


# get the python files location
@app.get("/files")
async def files():
    files = [f for f in os.listdir() if f.endswith(".py")]
    return {"files": files}

# get the file content
@app.get("/files/{file}")
async def file_content(file: str):
    file_path = Path(file)
    if not file_path.is_file() or not file_path.suffix == ".py":
        return {"error": "Invalid file"}
    with open(file_path, "r") as f:
        return {"content": f.read()}
    
# delete a file
@app.delete("/files/{file}")
async def delete_file(file: str):
    file_path = Path(file)
    if not file_path.is_file() or not file_path.suffix == ".py":
        return {"error": "Invalid file"}
    os.remove(file_path)
    return {"message": "File deleted successfully"}
