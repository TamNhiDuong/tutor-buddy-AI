export function generateQuestionPrompt(topic: string): string {
  return `Generate a multiple-choice question about ${topic} for a beginner-level learner.
Provide 1 correct and 3 incorrect options. Use this format:

Question: ...
Options:
A) ...
B) ...
C) ...
D) ...
Answer: ...`;
}

export function evaluateAnswerPrompt(
  question: string,
  userAnswer: string
): string {
  return `Evaluate the following multiple-choice answer.

Question: ${question}
User's Answer: ${userAnswer}

Is it correct? Provide a short explanation in friendly tone.`;
}
