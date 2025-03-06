from pydantic import BaseModel

class PythonFile(BaseModel):
    file_name: str
    content: str
