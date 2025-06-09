from flask import Flask, jsonify
from openai import OpenAI

app = Flask("world")


# api_key = ""
# ai = OpenAI(api_key=api_key)
@app.route("/", methods=["GET"])
def hello():
    
    # slogan_response = ai.chat.completions.create(
    #     model="gpt-4o-mini",  
    #     messages=[{'role': "user", "content": "write one slogan in double quotes on leap of creativity"}]
    # )

    # slogan = slogan.choices[0].message

    # response = {
    #     "count": "1",
    #     "reply": slogan
    # }
    
    return jsonify(response), 200

if __name__ == "__main__":
    app.run(debug=True, port=5001)
