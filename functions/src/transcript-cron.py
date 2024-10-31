from datetime import datetime
from appwrite.client import Client
from appwrite.services.databases import Databases
from appwrite.exception import AppwriteException
from appwrite.query import Query
import os
import requests

DB_ID = os.environ["DB_ID"]
BUCKET_ID = os.environ["BUCKET_ID"]
COLLECTION_ID = os.environ["COLLECTION_ID"]
AAI_API_KEY = os.environ["AAI_API_KEY"]

def main(context):

    client = (
        Client()
        .set_endpoint(os.environ["APPWRITE_FUNCTION_API_ENDPOINT"])
        .set_project(os.environ["APPWRITE_FUNCTION_PROJECT_ID"])
        .set_key(context.req.headers["x-appwrite-key"])
    )
    cnt_transcripts_processed = 0
    try:
        db = Databases(client)
        documents = db.list_documents(DB_ID, COLLECTION_ID, [
            Query.equal("isProcessing", True)
        ])



        for document in documents['documents']:

            response = requests.get(f"https://api.assemblyai.com/v2/transcript/{document['assemblyAiTranscriptId']}",
                                    headers={"Authorization": AAI_API_KEY})
            
            context.log(response.json())
            transcript = response.json();
            if transcript['status'] == 'completed':
                transcript_text = ""
                speakerCharacters = []
                for utterance in transcript['utterances']:
                    transcript_text += f"Speaker {utterance['speaker']}: {utterance['text']}\n"
                    
                    speaker = {"speaker":f"Speaker {utterance['speaker']}","character":""}
                    if not any(s['speaker'] == speaker['speaker'] for s in speakerCharacters):
                        speakerCharacters.append(speaker)

                if transcript is not None:
                    db.update_document(DB_ID, COLLECTION_ID, document['$id'], {"rawText": transcript_text,
                                                                               "isProcessing": False,
                                                                               "dateUpload": datetime.now().isoformat(),
                                                                               "speakerCharacters": speakerCharacters})
                    cnt_transcripts_processed += 1
            else:
                context.log(f"Error getting transcript {document['assemblyAiTranscriptId']}")
                context.log(response.json())

        message = f"Processed {cnt_transcripts_processed} transcripts"
        context.log(message)
        return context.res.text(message)
    except (AppwriteException, Exception) as err:
        context.log(f"Error: {err}")
        return context.res.text(f"Error: {err}")
