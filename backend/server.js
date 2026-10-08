import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;
    const conversation = req.body.messages || [];
    console.log("Conversation received:", conversation);

    const input = conversation.map(msg => ({
      role: msg.sender === "user" ? "user" : "assistant",
      content: msg.text
    }));

    input.push({
      role: "user",
      content: userMessage
    });


    const response = await openai.responses.create({
      model: "gpt-6-luna",
      input: input,
      instructions: `
You are SindhuGPT, a natural, conversational AI assistant.

Answer the user's question directly and naturally.
Do not automatically create tables.
Do not automatically give cost breakdowns or disclaimers.
Do not end every answer by asking the user for more information.
Only ask a follow-up question when the user's request genuinely needs missing information.

Choose the response format based on the question:
- Use short paragraphs for normal questions.
- Use bullet points for lists or recommendations.
- Use numbered steps for instructions or plans.
- Use tables only when they make comparison easier.
- Use headings when the answer has multiple sections.

For travel questions, give practical and useful suggestions such as an itinerary, places to visit, approximate timing, and useful tips when appropriate.

Keep answers concise for simple questions and detailed for complex questions.
Be friendly, clear, and human-like.
`
    });

    const aiMessage = response.output_text;

    res.json({
      message: aiMessage
    });

  } catch (error) {
    console.error("OpenAI API error:", error);

    res.status(500).json({
      message: "Sorry, something went wrong. Please try again."
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});