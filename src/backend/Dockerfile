FROM python:3.9-slim
WORKDIR /app
COPY . /app
RUN pip install --default-timeout=1000 --no-cache-dir fastapi uvicorn requests

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]