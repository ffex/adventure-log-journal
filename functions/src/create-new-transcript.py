import os
import assemblyai as aai
import json
from datetime import datetime
from appwrite.client import Client
from appwrite.services.databases import Databases
from appwrite.exception import AppwriteException
from appwrite.id import ID

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
    fileId = context.req.path.split('/')[-1]
    context.log(json.dumps(context.req.query))  
    name = context.req.query.get('name')
    adventure = context.req.query.get('adventure')

    try:
        fileUrl = f"https://cloud.appwrite.io/v1/storage/buckets/{BUCKET_ID}/files/{fileId}/view?project={os.environ['APPWRITE_FUNCTION_PROJECT_ID']}"

        aai.settings.api_key = AAI_API_KEY
        transcriber = aai.Transcriber()

        config = aai.TranscriptionConfig(speaker_labels=True)
        #TODO implement language italian

        transcript = transcriber.submit(fileUrl, config=config)

        db = Databases(client)

        document_fields = {
            "fileId": fileId,
            "dateUpload": datetime.now().isoformat(),
            "fileUrl": fileUrl,
            "isProcessing": True,
            "assemblyAiTranscriptId": transcript.id,
            "name":name,
            "adventure":adventure
        }

        
        document_id = ID.unique()
        document = db.create_document(DB_ID, COLLECTION_ID, document_id,document_fields)
        return context.res.text(f"Document created with id {document_id}")
    except (AppwriteException, Exception) as err:
        context.error("Error: " + repr(err))
        return context.res.text(f"Error: {err}")
    