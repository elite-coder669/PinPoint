import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt, viewport } = await req.json();

    const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.NV_API}`
      },
      body: JSON.stringify({
        model: "google/gemma-4-31b-it",
        messages: [{ role: "user", content: `Viewport: ${viewport}. ${prompt}` }],
        chat_template_kwargs: { "enable_thinking": true },
        max_tokens: 16384,
      })
    });

    // 202 CHECK: Capture the Request ID for Polling
    if (response.status === 202) {
      const requestId = response.headers.get("NVCF-REQID");
      return NextResponse.json({ status: 'pending', requestId });
    }

    const data = await response.json();
    return NextResponse.json({ status: 'done', code: data.choices[0].message.content });

  } catch (error) {
    return NextResponse.json({ error: "Bridge Failed" }, { status: 500 });
  }
}