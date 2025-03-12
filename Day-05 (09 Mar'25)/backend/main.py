from fastapi import FastAPI
from .api.routes import router
from .api.class_finding_routes.classFindingRoutes import router as class_finding_router
from .api.function_finder.function_finder import router as function_finding_router


app = FastAPI()

app.include_router(router)
app.include_router(class_finding_router)
app.include_router(function_finding_router)

@app.get("/")
async def root():
    return {"message": "Welcome to Code Reviewer AI"}
