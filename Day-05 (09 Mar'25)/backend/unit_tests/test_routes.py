from fastapi import status
from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_files():
    response = client.get("/files")
    assert response.status_code == status.HTTP_200_OK
    # assert response.text == "apis.routes is working....."
    
def test_upload_file():
    response = client.post("/files/upload", files={"file": ("test.py", "print('Hello World')")})
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {"message": "File uploaded successfully"}

def test_file_content():
    response = client.get("/files/content/test.py")
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {"content": "print('Hello World')"}
    
def test_class_finder():
    response = client.get("/class_finding/class_finder?filename=test.py")
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {"classes": []}
    
# def test_function_under_classes():
#     response = client.get("/class_finding/functions_under_classes?filename=test.py")
#     assert response.status_code == status.HTTP_200_OK
#     assert response.json() == {'functions': {'Global_Functions': []}}