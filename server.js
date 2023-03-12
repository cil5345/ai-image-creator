import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI,
});
const openai = new OpenAIApi(configuration);

//MIDDLEWARE
const app = express();
app.use(cors());
app.use(express.json());

//POST
app.post("/dream", async (req, res) => {
  const prompt = req.body.prompt;

  const aiResponse = await openai.createImage({
    prompt,
    n: 1,
    size: "1024x1024",
  });
  const imgURL =  aiResponse.data.data[0].url
  // console.log(imgURL)
  console.log({imgURL})
  res.send( {image: imgURL})

});

app.listen(8080, () => console.log('make art on http://localhost:8080/dream') )