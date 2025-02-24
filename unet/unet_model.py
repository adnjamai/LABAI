from fastapi import FastAPI, UploadFile, File
import torch
import numpy as np
import cv2
from segmentation_models_pytorch import Unet

app = FastAPI()
model = Unet(encoder_name="resnet34", encoder_weights="imagenet", in_channels=3, classes=1)
model.eval()

@app.post("/segment")
async def segment_image(file: UploadFile = File(...)):
    image = np.frombuffer(file.file.read(), np.uint8)
    image = cv2.imdecode(image, cv2.IMREAD_COLOR)
    image = cv2.resize(image, (256, 256))
    image = torch.tensor(image.transpose(2, 0, 1) / 255.0, dtype=torch.float32).unsqueeze(0)
    with torch.no_grad():
        prediction = model(image)
    return {"segmented_image": prediction.numpy().tolist()}
