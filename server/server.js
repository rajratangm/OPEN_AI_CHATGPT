import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
// import {Configuration, OpenAIApi} from 'openai'
import OpenAIApi from 'openai'
import Configuration from 'openai'
import OpenAi from 'openai'

dotenv.config();
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});


const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async(req, res)=>{
    res.status(200).send({
        message: "Hellow From Codex"
    })
})
// console.log('==============================')

console.log('OpenAI API Key:', process.env.OPENAI_API_KEY);

const response = await openai.chat.completions.create({
    
    model: 'gpt-3.5-turbo',
    messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'Tell me a joke.' },
        { role: 'assistant', content: 'Why did the chicken cross the road?' },
        { role: 'user', content: 'I dont know, why did the chicken cross the road?' },
        { role: 'assistant', content: 'To get to the other side!' },
      ]
});
console.log("==========================================")
console.log('OpenAI Response:', "this is good");
console.log("==========================================")

app.post('/', async(req, res)=>{
    console.log('==============================')
    try{
        console.log('==============================')

        const prompt = [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: 'Tell me a joke.' },
            { role: 'assistant', content: 'Why did the chicken cross the road?' },
            { role: 'user', content: 'I dont know, why did the chicken cross the road?' },
            { role: 'assistant', content: 'To get to the other side!' },
          ];
          
          const response = await openai.Completion.create({
            model: 'gpt-3.5-turbo',
            messages: prompt,
            // temperature: 0.7,
            // max_tokens: 150,
          });
        //   console.log(openai.Completion.create('tjos'))
          console.log(response.data.choices[0].text);
          
    //     const prompt= req.body.prompt;
    //     const response =await  openai.createChatCompletion({
    //         model: "gpt-3.5-turbo",
    //         prompt: `${prompt}`,
    //         temperature: 0, // Higher values means the model will take more risks.
    //         max_tokens: 3000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
    //         top_p: 1, // alternative to sampling with temperature, called nucleus sampling
    //         frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
    //         presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
          
    //     })
        res.status(200).send({
            bot: response.data.choices[0].text
        })
    }
    catch(error){
        console.log('------------------------')
        console.log(error)
        res.status(500).send({error})

    }
})
app.listen(5000, () => console.log('AI server started on http://localhost:5000'))