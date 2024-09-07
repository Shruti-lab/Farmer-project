const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express()
const port = 3000
const hostname = '127.0.0.1'
//AIzaSyB9xJMxtw8IXb5u2K5Rtt2OCMMGHeX-VSs    gemini api key


// Set EJS as templating engine 
app.set('view engine', 'ejs');
// app.use(express.static(__dirname + '/public'));
// app.use(express.static('public'))
app.use('/static', express.static('public'))
app.use(bodyParser.json());
app.use(cors());


//open api keysk-WEHiSxWXMl1AoZLkamfCT3BlbkFJ6LmpM6rzAMfeAdhbBd2b"
// console.log(process.env.API_KEY);


app.get('/',(req,res)=>{
  res.render('home'); 
})

app.get('/yield',(req,res)=>{
  res.render('yield'); 
})

app.get('/chat',(req,res)=>{
  res.render('chat'); 
})

app.get('/price',(req,res)=>{
  res.render('price'); 
})


// app.post('/chat', async (req, res) => {
//   try {
//     const prompt = req.body.prompt;
//     const response = await openai.createCompletion({
//       model: "text-davinci-003",
//       prompt: prompt,
//       max_tokens: 150,
//       temperature: 0.7,
//     });
//     res.json({ response: response.data.choices[0].text });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error generating response' });
//   }
// });

// const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
// const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// ...

// async function run() {
//   // For text-only input, use the gemini-pro model
//   const model = genAI.getGenerativeModel({ model: "gemini-pro"});

//   const prompt = "Write a story about a magic backpack."

//   const result = await model.generateContent(prompt);
//   const response = await result.response;
//   const text = response.text();
//   console.log(text);
// }

// run();





app.listen(port,hostname,()=>{
     console.log(`Server running at http://${hostname}:${port}/`);
})












// const http = require('http');
// const fs = require('fs');
// const hostname = '127.0.0.1';
// const port = 8000;
// const filecontent = fs.readFileSync('home.html');

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/html');
  
//   res.end(filecontent);
// });
// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
