from fastapi import FastAPI, UploadFile, File
import requests

app = FastAPI()

@app.post("/process")
async def process_image(file: UploadFile = File(...), patient_id: str = "12345"):
    detect_response = requests.post("http://yolo:8001/detect", files={"file": file.file}).json()
    segment_response = requests.post("http://unet:8002/segment", files={"file": file.file}).json()
    classify_response = requests.post("http://efficientnet:8003/classify", files={"file": file.file}).json()
    return {"detection": detect_response, "segmentation": segment_response, "classification": classify_response}
