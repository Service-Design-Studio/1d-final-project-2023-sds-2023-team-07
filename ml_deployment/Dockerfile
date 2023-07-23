# Use the official Python image as the base image
FROM python:3.8-slim

# Set the working directory in the container
WORKDIR /app

# Copy the application files to the container's working directory
COPY . .

# Install required dependencies and ffmpeg
RUN apt-get update && apt-get install -y ffmpeg && rm -rf /var/lib/apt/lists/* \
    && pip install --no-cache-dir -r requirements.txt

# Expose the port your Flask app is listening on (assuming it's port 8080)
EXPOSE 8080

# Define the command to run your Flask app when the container starts
CMD ["python", "app.py"]
