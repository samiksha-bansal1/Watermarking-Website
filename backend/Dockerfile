# Use Python 3.10 base image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy app files into container
COPY . .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Start the app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
