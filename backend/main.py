from pymongo import MongoClient
import os
from dotenv import load_dotenv
from pathlib import Path
import threading

path=Path("./config/config.env")
load_dotenv(dotenv_path=path)




client=MongoClient("mongodb+srv://BSK:12345@baba.x0bogmz.mongodb.net/")

db=client["Events"]
collection=db["events"]
events= collection.find()
evies=[]
for i in events:
    obj={"url":i['url'],"text":i['Text']}
    evies.append(obj)

# print(abous)

db=client["Spark"]
collection=db["events"]

collection.insert_many(evies)
