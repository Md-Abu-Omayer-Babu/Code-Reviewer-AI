from fastapi import FastAPI
import os

app = FastAPI()

# check api
@app.get("/")
async def root():
    return {"message": "Welcome to Code Reviewer AI"}


# upload a python file
@app.post("/upload")
async def upload(file):
    if(file.name.endswith(".py")):
        with open(file.name, "w") as f:
            f.write(file.read())
        return {"message": "File uploaded successfully"}
    else:
        return {"message": "File is not a python file"}

# get the python files location
@app.get("/files")
async def files():
    files = os.listdir()
    return {"files": files}

# get the file content
@app.get("/files/{file}")
async def file_content(file):
    with open(file, "r") as f:
        return {"content": f.read()}
    
# delete a file
@app.delete("/files/{file}")
async def delete_file(file):
    os.remove(file)
    return {"message": "File deleted successfully"}
