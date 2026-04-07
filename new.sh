stream=true
if [ "$stream" = true ]; then
    accept_header='Accept: text/event-stream'
else
    accept_header='Accept: application/json'
fi


cat > payload.json <<'JSON'
{
  "model": "google/gemma-4-31b-it",
  "messages": [{"role":"user","content":""}],
  "max_tokens": 16384,
  "temperature": 1.00,
  "top_p": 0.95,
  "stream": true,
  "chat_template_kwargs": {"enable_thinking":true}
}
JSON

curl https://integrate.api.nvidia.com/v1/chat/completions \
  -H "Authorization: Bearer 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" \
  -H "Content-Type: application/json" \
  -H "$accept_header" \
  -d @payload.json
