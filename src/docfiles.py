import os

# Créer les répertoires s'ils n'existent pas
os.makedirs('src/backend', exist_ok=True)
os.makedirs('src/yolo', exist_ok=True)
os.makedirs('src/unet', exist_ok=True)
os.makedirs('src/efficientnet', exist_ok=True)

# Dockerfile pour backend
with open('src/backend/Dockerfile', 'w') as f:
    f.write('''FROM python:3.9
WORKDIR /app
COPY . /app
RUN pip install --default-timeout=100 \
    torch==2.0.0 \
    torchvision==0.15.0 \
    fastapi \
    uvicorn \
    requests
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]''')

# Dockerfile pour YOLO
with open('src/yolo/Dockerfile', 'w') as f:
    f.write('''FROM python:3.9
WORKDIR /app
COPY . /app
RUN pip install \
    --default-timeout=300 \
    --retries 10 \
    torch==2.0.0 \
    torchvision==0.15.0 \
    ultralytics \
    fastapi \
    uvicorn \
    numpy \
    opencv-python
CMD ["uvicorn", "yolo_model:app", "--host", "0.0.0.0", "--port", "8001"]''')

# Dockerfile pour UNet
with open('src/unet/Dockerfile', 'w') as f:
    f.write('''FROM python:3.9
WORKDIR /app
COPY . /app
RUN pip install \
    --default-timeout=300 \
    --retries 10 \
    torch==2.0.0 \
    torchvision==0.15.0 \
    fastapi \
    uvicorn \
    numpy \
    segmentation_models_pytorch
CMD ["uvicorn", "unet_model:app", "--host", "0.0.0.0", "--port", "8002"]''')

# Dockerfile pour EfficientNet
with open('src/efficientnet/Dockerfile', 'w') as f:
    f.write('''FROM python:3.9
WORKDIR /app
COPY . /app
RUN pip install \
    --default-timeout=300 \
    --retries 10 \
    torch==2.0.0 \
    torchvision==0.15.0 \
    fastapi \
    uvicorn \
    numpy \
    timm \
    transformers
CMD ["uvicorn", "efficientnet_model:app", "--host", "0.0.0.0", "--port", "8003"]''')

print("Dockerfiles créés avec succès !")
