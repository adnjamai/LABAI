from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
import torch

app = FastAPI()

@app.get("/health")
async def health_check():
    return {"status": "healthy", "model": "yolo"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        # TODO: Implement YOLO prediction logic
        return JSONResponse(content={"message": "YOLO prediction endpoint"}, status_code=200)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)