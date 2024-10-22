import assemblyai as aai

aai.settings.api_key = "2f02a9cf668542319f423143b2a832ac"
transcriber = aai.Transcriber()

transcript = transcriber.transcribe("https://assembly.ai/news.mp4")
# transcript = transcriber.transcribe("./my-local-audio-file.wav")

print(transcript.text)