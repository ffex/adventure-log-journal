import os
from datetime import datetime
from appwrite.client import Client
from appwrite.services.databases import Databases
from appwrite.exception import AppwriteException
from appwrite.id import ID
from openai import OpenAI


DB_ID = os.environ["DB_ID"]
COLLECTION_ID = os.environ["COLLECTION_ID"]
BUCKET_ID = os.environ["BUCKET_ID"]
AAI_API_KEY = os.environ["AAI_API_KEY"]

def main(context):

    client = (
        Client()
        .set_endpoint(os.environ["APPWRITE_FUNCTION_API_ENDPOINT"])
        .set_project(os.environ["APPWRITE_FUNCTION_PROJECT_ID"])
        .set_key(context.req.headers["x-appwrite-key"])
    )
    transcriptId = context.req.path.split('/')[-1]

    client_openai = OpenAI()
    try:
        db = Databases(client)

        transcription = db.get_document(DB_ID, COLLECTION_ID, transcriptId)

        text = transcription["rawText"]
        context.log(text)

        #send to openai
        response = client_openai.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "system", "content": "You are the storyteller of the adventure. You are given a transcription of a day of the adventure. You need to write a journal entry for that day. max 500 words."}, 
                      {"role": "user", "content": text}]
        )

        #get and save to db
        journal_day = {
            "text": response.choices[0].message.content
        }
        db.create_document(DB_ID, COLLECTION_ID, ID.unique(), journal_day)

    except (AppwriteException, Exception) as err:
        context.error("Error: " + repr(err))
        return context.res.text(f"Error: {err}")
    