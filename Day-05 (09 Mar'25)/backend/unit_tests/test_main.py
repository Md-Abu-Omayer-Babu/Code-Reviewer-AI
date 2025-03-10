from fastapi import status
from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

# test the root endpoint
def test_root():
    response = client.get("/")
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {"message": "Welcome to Code Reviewer AI"}