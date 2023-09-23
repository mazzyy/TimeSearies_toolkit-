# to run the file  uvicorn main:app --reload
# Note you should first cd into src folder
import pandas as pd
import numpy as np

# from dataProcessor.DataProcessor import DataProcessor
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Request
import json

app = FastAPI()
stored_data = None

origins = [
    "http://localhost:3000",
    "http://localhost:3000/excel",
    "http://127.0.0.1:3000/excel",
    "http://127.0.0.1:3000/",
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/test2")
async def read_data1(request: Request):
    global stored_data
    data = await request.json()
    stored_data = data  # Store the data in a global variable
    return data

@app.get("/test2")
async def get_stored_data():
    global stored_data
    if stored_data:
        return stored_data
    else:
        return {"message": "No data available"}

@app.get("/")
async def read_root():
    return {"world is": "blind"}
