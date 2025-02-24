from fastapi import FastAPI, UploadFile, File
import torch
import cv2
import numpy as np
from ultralytics import YOLO

app = FastAPI()
model = YOLO("yolov8-custom.pt")

@app.post("/detect")
async def detect_anomalies(file: UploadFile = File(...)):
    image = np.frombuffer(file.file.read(), np.uint8)
    image = cv2.imdecode(image, cv2.IMREAD_COLOR)
    results = model(image)
    return {"detections": results.pandas().xyxy[0].to_dict(orient="records")}
