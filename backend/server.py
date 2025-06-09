from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import uvicorn 
from pymongo import MongoClient
import os
from dotenv import load_dotenv
from pathlib import Path
import pprint
from pydantic import BaseModel
from beanie.odm.fields import PydanticObjectId
from DocumentModels import MockTestDB

app = FastAPI()
client=MongoClient("yourclusteraddress")#example mongodb+srv://dd:1sd45@bada.x0bogmz.mongodb.net/

class Event(BaseModel):
    url: str
    text: str
 


class Question(BaseModel):
    question: str
    choices: list[str]
    choicetype: str
    ans:int

# Mock test schema:
# {id:"",
# name:"",
# subjects:["physics","chemistry"],
# "physics":[{
#     question:"",
#     imageurl:"",
#     options;[{text:"" , type:""}],
#     crctans: int
# }],
# .....}

class MockTest(BaseModel):
    name: str
    subjects: list[str]
    questionset: dict[str,list[Question]]

        
#CORS Middleware to have some restrictions for the backend api call(not applied now just added the functionality)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Route for fetching events from the database
@app.get("/events")
async def get_events():

    db=client["Spark"]
    collection=db["events"]
    events= collection.find()
    evies=[]
    for i in events:
        obj={'id':str(i['_id']),"url":i['url'],"text":i['Text']}
        evies.append(obj)
    #print(evies)
    return evies


#Route for fetching about/founders info from the database
@app.get("/about")
async def get_founders():
    db=client["Spark"]
    collection=db["about"]
    about=collection.find()
    abous=[]
    for i in about:
        obj={'id':str(i['_id']),'url':i['url'],'name':i['name'],'desc':i['description']}
        abous.append(obj)
    return abous
    
@app.post("/mocktest")
async def post_events(TestObj: MockTest):
    db=client["Spark"]
    collection=db["mocktest"]
    testie={
        "name": TestObj.name,
        "subjects": TestObj.subjects,
        "questionset": {}
    }
    questione=testie["questionset"]
    # print(TestObj.questionset)
    for i in TestObj.questionset:
        quie=[]
        for j in TestObj.questionset[i]:
            quest={}
            for k in j:
                quest[k[0]]=k[1]
            quie.append(quest)
        questione[i]=quie
    # print(testie)
    collection.insert_one(testie)
    return TestObj

@app.get("/mocktests")
async def get_mocktests():
    db=client["Spark"]
    collection=db["mocktest"]
    tests=collection.find()
    mocktests=[]
    for i in tests:
        temp={"id":str(i['_id']),"name":i['name'],"subjects":i['subjects'],"questionset":i['questionset']}
        # print(temp)
        mocktests.append(temp)
    return mocktests

@app.get("/mocktest")
async def get_mocktest(name:str):
    db=client["Spark"]
    collection=db["mocktest"]
    # print(name)
    i=collection.find_one({"name":name})
    # print(i)
    temp={"id":str(i['_id']),"name":i['name'],"subjects":i['subjects'],"questionset":i['questionset']}
    return temp

if __name__ == "__main__":
    uvicorn.run(app,proxy_headers=True,host="0.0.0.0",port=8000)
