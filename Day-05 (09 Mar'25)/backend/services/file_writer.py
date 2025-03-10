from fastapi import UploadFile

def write_file(file_path: str, file_obj: UploadFile):
    with open(file_path, "wb") as f:
        f.write(file_obj.file.read())
    return {"message": "File uploaded successfully"}
    