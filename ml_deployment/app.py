from flask import Flask , jsonify, request
from random import randint
import text_process
import voice_process
import base64
app = Flask(__name__)

@app.route("/" , methods = ["GET"])
def check_connection():
    return jsonify({
        "response" : "success"
    })

@app.route("/voice", methods=["POST"])
def get_command():
    try:
        # Get parameters from the request
        #params["stream_obj"]
        #params["user_language"]
        stream_obj = request.data  # Assuming the stream_obj is passed as a file in the request
        print(stream_obj)
        user_language = request.args.get("user_language", "english")   # Default language is English if not provided
        # Process the stream_obj to get the command
        base64_stream = request.form.get("stream_obj", "")

        # Decode the base64 string to obtain the raw binary data
        stream_obj = base64.b64decode(base64_stream)
        phrase = voice_process.get_english_text(mp3_stream=stream_obj, language=user_language)
        
        command = text_process.get_phrase_command(phrase)

        # Return the result as JSON
        return jsonify(
            {
                "Transaction Type": command[0],
                "Amount": command[1],
                "language" : user_language
            }
        )
    except Exception as e:
        # Handle any errors that occurred during the processing
        return jsonify({"error": str(e)}), 400