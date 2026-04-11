
import requests
from dotenv import load_dotenv
import os

load_dotenv('.env.local')
NV_API = os.getenv('NV_API')

url = "https://integrate.api.nvidia.com/v1/chat/completions"

payload = {
    "messages": [
        { 
         "role": "user",
          "content": "hi"
        }
        ],
    "model": "google/gemma-4-31b-it",
    "chat_template_kwargs": { "enable_thinking": True },
    "max_tokens": 16384,
    "stream": False,
    "temperature": 1
}
headers = {
    "accept": "application/json",
    "content-type": "application/json",
    "authorization": f"Bearer {NV_API}"
}

response = requests.post(url, json=payload, headers=headers)

print(response.text)