# Use an official Python image as the base image
FROM python:3.9

# Set the working directory in the container
WORKDIR /app

# Copy your Python backend code and requirements to the container
COPY . .

# Install Python dependencies
RUN pip install -r requirements.txt

# Expose the port on which your Python backend will run (e.g., 8000)
EXPOSE 8000

# Define the command to start your Python backend
CMD [ "sh", "-c", "uvicorn src.main:app --reload --port=8000 --host=0.0.0.0" ]
