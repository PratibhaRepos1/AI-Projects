// Import the necessary libraries
const express = require('express');
const dotenv = require('dotenv');
//const {Configuration, OpenAIApi} = require("openai");
const OpenAI = require("openai");

const bodyParser = require('body-parser');
const cors = require("cors");


// Load environment variables from .env file
dotenv.config();

// Create the Express app
const app = express();

// Use body-parser middleware to parse JSON bodies
app.use(bodyParser.json());

// Setup CORs
app.use(cors());

// Configure OpenAI API
// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY
// })

// const openai = new OpenAIApi(configuration);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});


// Create an index route which returns a welcome message
app.get('/', (req, res) => {
  res.send('Welcome to our A.I Backend!');
});

// Create a "message" route which returns a JSON response
app.post('/message', async (req, res) => {

    //console.log(process.env.OPENAI_API_KEY);

    try {
        const {prompt, previousMessage} = req.body;

        let messages = [];

       if (previousMessage) {
        messages.push({
            role: "assistant",
            content: previousMessage
        });
        }

        messages.push({
        role: "user",
        content: prompt
        });

        

       
            const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages
          })
          const aiMessage = chatCompletion.choices[0].message.content;
          const aiRole = chatCompletion.choices[0].message.role;

         console.log("AI Response:", aiMessage);

          res.json({
             message: aiMessage,
             role: aiRole
          });
    } catch (error) {
        console.error("OpenAI Error:", error);
        res.status(500).json({ error: 'Something went wrong.' });
    }

  



  
});

// The port the app will listen on
const PORT = process.env.PORT || 1330;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});