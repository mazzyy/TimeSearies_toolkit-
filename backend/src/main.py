# to run the file  uvicorn main:app --reload
import pandas as pd
import numpy as np
from dataProcessor.DataProcessor import DataProcessor
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Request
import json

app = FastAPI()

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
    data = await request.json()
    # print(data)
    return "success"


@app.get("/")
async def read_root():
    return {"world is": "blind"}
