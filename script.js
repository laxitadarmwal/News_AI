async function createContentGPT(prompt, titlesString) {
  const output = document.getElementById('output');
  output.innerText = "Loading...";

  try {
    const response = await fetch(CHAT_GPT_API, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `Summarize:\n${titlesString}` }]
      })
    });

    const data = await response.json();

    if (data.choices && data.choices[0]) {
      output.innerText = data.choices[0].message.content;
    } else {
      output.innerText = "⚠️ OpenAI response error:\n" + JSON.stringify(data, null, 2);
    }

  } catch (error) {
    output.innerText = "Error: " + error.message;
  }
}
