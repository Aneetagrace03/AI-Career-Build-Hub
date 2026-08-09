const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

async function listModels() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // Try a commonly available model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const result = await model.generateContent("Say Hello");

    console.log("✅ SUCCESS");
    console.log(result.response.text());

  } catch (error) {
    console.error("❌ ERROR");
    console.error(error.message);
  }
}

listModels();