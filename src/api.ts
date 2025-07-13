import { generateQuestionPrompt, evaluateAnswerPrompt } from "./prompts";

const OPENAI_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export async function generateQuestion(topic: string) {
  const prompt = generateQuestionPrompt(topic);

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  console.log("RES: ", res);

  const data = await res.json();
  const text = data.choices[0].message.content;

  const match = text.match(
    /Question:(.*)Options:(.*)A\)(.*)B\)(.*)C\)(.*)D\)(.*)/s
  );
  if (!match) return { q: "Error parsing question", choices: [] };

  return {
    q: match[1].trim(),
    choices: [match[3], match[4], match[5], match[6]].map((s) => s.trim()),
  };
}

export async function evaluateAnswer(question: string, answer: string) {
  const prompt = evaluateAnswerPrompt(question, answer);

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await res.json();
  return data.choices[0].message.content;
}
