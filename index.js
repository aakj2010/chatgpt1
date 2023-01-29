const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors")
const { Configuration, OpenAIApi } = require("openai");

dotenv.config();

const app = express();


app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(cors({
  origin: "*",
  credentials: true
}))


const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/find-complexity", async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `
              ${prompt}
            `,
      max_tokens: 2047,
      temperature: 0.7,
      top_p: 1.0,
   //   n: 5,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
     // stop: ["\n"],
    });
 // console.log(res.status(200).json({
  //  success: true,
  //  data: response.data.choices[0].text}))

    return res.status(200).json({
      success: true,
      data: response.data.choices[0].text,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.response
        ? error.response.data
        : "There was an issue on the server",
    });
  }
});
const port = process.env.PORT || 5001;

app.get('/',(req,res)=>{
  res.render('home');
})

app.listen(port, () => console.log(`Server listening on port ${port}`));
