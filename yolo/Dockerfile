FROM python:3.9
WORKDIR /app
COPY . /app
RUN pip install torch torchvision ultralytics fastapi uvicorn numpy opencv-python
CMD ["uvicorn", "yolo_model:app", "--host", "0.0.0.0", "--port", "8001"]
