from google.cloud import speech, translate_v2 as translate
import os
import subprocess



def convert_mp3_to_flac(mp3_bytes):
    # Run ffmpeg command to convert MP3 to FLAC in-memory
    ffmpeg_cmd = [
        "ffmpeg",
        "-i", "pipe:0",       # Read input from stdin
        "-ac", "2",           # Set the number of audio channels to 2 (stereo)
        "-f", "flac",         # Output format FLAC
        "pipe:1",             # Write output to stdout
    ]
    ffmpeg_process = subprocess.Popen(ffmpeg_cmd, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE , shell=False)

    # Write MP3 byte stream to ffmpeg process stdin
    stdout, stderr = ffmpeg_process.communicate(input=mp3_bytes)

    # Check for any errors
    if ffmpeg_process.returncode != 0:
        raise Exception("Error converting MP3 to FLAC: " + stderr.decode())

    return stdout
def transcribe_audio_file(content, language_code):
  # Set up Google Cloud credentials
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = "speech-api-key.json"  
    client = speech.SpeechClient()

    # Define BCP-47 language tags based on the input language
    if language_code == 'malay':
        language_code = "ms-MY"
    elif language_code == 'english':
        language_code = "en-SG"
    elif language_code == 'tamil':
        language_code = "ta-SG"
    elif language_code == 'chinese':
        language_code = "zh-CN"
    else:
        raise ValueError("Invalid language code. Supported languages: malay, english, tamil")

    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.FLAC,
        language_code=language_code,
        audio_channel_count  = 2
    )
    audio = {"content": content}
    response = client.recognize(request={"config": config, "audio": audio})
    full_transcript = ""
    for result in response.results:
        # First alternative is the most probable result
        alternative = result.alternatives[0]
        full_transcript += alternative.transcript + " "

    return full_transcript

def translate_text(text, target_language):
    translate_client = translate.Client()
    translation = translate_client.translate(text, target_language=target_language)
    return translation['input'], translation['translatedText']

def get_english_text(mp3_stream, language):
    content = convert_mp3_to_flac(mp3_stream)
    transcript = transcribe_audio_file(content, language)
    print(f"Original Transcript: {transcript}")
    if language in ['malay', 'tamil' , "chinese"]:
        target_language = "en"
        original_text, translated_text = translate_text(transcript, target_language)
        print(f"Original Text: {original_text}")
        print(f"Translated Text: {translated_text}")
    return(translated_text)
# Testing
# local_path = "malay_test.mp3"
# language = "malay"
# with open(local_path, "rb") as audio_file:
#   content = audio_file.read()
# print(content)
# #content is the mp3 stream
# translated_text = get_english_text(content, language)
# print(translated_text)