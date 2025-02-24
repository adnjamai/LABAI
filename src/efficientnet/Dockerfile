FROM python:3.9
WORKDIR /app
COPY . /app
RUN pip install torch torchvision fastapi uvicorn numpy timm transformers
CMD ["uvicorn", "efficientnet_model:app", "--host", "0.0.0.0", "--port", "8003"]