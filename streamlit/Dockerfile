# Use an official Python image as the base image
FROM python:3.9

# Set the working directory in the container
WORKDIR /app

# Copy your Streamlit Python code and requirements to the container
COPY . .

# Install Python dependencies
RUN pip install -r requirements.txt

# Expose the port on which your Streamlit app will run (e.g., 8501)
EXPOSE 8501

# Define the command to start your Streamlit app
CMD ["streamlit", "run", "streamlit_app.py"]
