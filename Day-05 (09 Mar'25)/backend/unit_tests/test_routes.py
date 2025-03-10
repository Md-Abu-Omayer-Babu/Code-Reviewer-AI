from fastapi import status
from fastapi.testclient import TestClient
from backend.api.routes import router

client = TestClient(router)

def test_files():
    response = client.get("/files")
    assert response.status_code == status.HTTP_200_OK
    # assert response.text == "apis.routes is working....."
    
def test_upload_file():
    response = client.post("/upload", files={"file": ("test.py", "print('Hello World')")})
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {"message": "File uploaded successfully"}
    
def test_file_content():
    response = client.get("/class_finder?filename=test.py")
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {"classes": []}