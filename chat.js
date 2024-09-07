import { GoogleGenerativeAI } from "@google/generative-ai";
// Fetch your API_KEY
const API_KEY = <API_KEY>;

// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemeini-pro"});
console.log(56321)

async function run() {
  var userText = $('#textInput').val();
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: "Hello, I have 2 dogs in my house.",
      },
      {
        role: "model",
        parts: "Great to meet you. What would you like to know?",
      },
    ],
    generationConfig: {
      maxOutputTokens: 100,
    },
  });

  const msg = "How many paws are in my house?";

  const result = await chat.sendMessage(msg);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();
function getUserResponse(){
  var userText = $('#textInput').val();

  if(userText.trim()!==''){
      var userHTML="<p class='userText'><strong>User: </strong><span>"+userText+"</span></p>"
      $('#textInput').val("");
      $('#chatbox').append(userHTML);
      //console.log(userHTML)

      //sending user's message to server
      $.get('getResponse/',{userMessage:userText}).done(function(data){
          console.log(data)
      var returnedMessage = '<p class="botText"><strong>Chatbot: </strong><span>'+data+'</span></p>'
      console.log(returnedMessage)
      $('#chatbox').append(returnedMessage);
      $('#chatbox').scrollTop($('#chatbox')[0].scrollHeight);
  });
  }
}

$('#sendMessage').click(getUserResponse);
