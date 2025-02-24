FROM python:3.9
WORKDIR /app
COPY . /app
RUN pip install torch torchvision fastapi uvicorn numpy segmentation_models_pytorch
CMD ["uvicorn", "unet_model:app", "--host", "0.0.0.0", "--port", "8002"]