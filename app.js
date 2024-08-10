
const btn = document.querySelector('.talk');
const content = document.querySelector('.content');
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

let voices = [];

function loadVoices() {
    voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
            voices = window.speechSynthesis.getVoices();
            console.log(voices); // Log available voices for debugging
        };
    } else {
        console.log(voices); // Log available voices for debugging
    }
}
window.addEventListener('load', loadVoices);

function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    
    console.log('Available voices:', voices);
    
    
    const googleVoice = voices.find(voice => voice.name.toLowerCase().includes('google'));
   

    // Prioritize the voices in the order of Google, Siri, and then any female voice
    text_speak.voice = googleVoice || voices[0];
    
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    var day = new Date();
    var hour = day.getHours();
    if (hour >= 0 && hour < 12) {
        speak("Good Morning");
    } else if (hour >= 12 && hour < 19) {
        speak("Good Afternoon");
    } else {
        speak("Hello bro! how may I help you");
    }
}

window.addEventListener('load', () => {
    loadVoices();
    wishMe();
    addChatMessage("I am your voice assistant. How may I help you?", 'bot');
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
    addChatMessage(transcript, 'user');  // Add user's voice input to chat
};

btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    recognition.start();
});

// Predefined chat responses
const chatResponses = {
  
  "i am tired":"Take some rest Dude!",
  "tell me i am in which class now": "You are in Eleven class bro",
  "am i funny": "you are totally mad ",
  "i am sad": "I am with you bro, tell me what happened",
  "ok":"hmm",
  "who made you bro": "Ritesh",
  "tomorrow is my physics exam": "Go and die!",
  "how are you": "I'm fine, thank you!",
  "what is your name": "I am your voice assistant.",
  "tell me a joke": "Why don't skeletons fight each other? They don't have the guts.",
  "do you know python": "Yes, I can code in Python.",
  "what is javascript": "JavaScript is a programming language commonly used in web development.",
  
  
  "what is the weather today": "I'm not sure, but you might want to check a weather app.",
  "how old are you": "I don't have an age, but I am always learning!",
  "what time is it": "I can't check the time, but you can look at your device's clock.",
  "tell me a fun fact": "Did you know honey never spoils? Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible.",
  "what is 2 + 2": "2 + 2 equals 4.",
  "what is the capital of France": "The capital of France is Paris.",
  "who is the president of the USA": "As of now, the President of the USA is Joe Biden.",
  "tell me a joke": "Why don't scientists trust atoms? Because they make up everything!",
  "what is your favorite color": "I don't have a favorite color, but I like blue!",
  "who won the last world series": "I don't have the latest sports updates, but you can check online for recent scores.",
  "what is the meaning of life": "That's a deep question. Many people believe it’s about finding happiness and purpose.",
  "tell me a joke": "Why did the scarecrow win an award? Because he was outstanding in his field!",
  "what is the largest planet in our solar system": "The largest planet in our solar system is Jupiter.",
  "who painted the Mona Lisa": "The Mona Lisa was painted by Leonardo da Vinci.",
  "how many continents are there": "There are seven continents: Africa, Antarctica, Asia, Europe, North America, Australia, and South America.",
  "what is the square root of 16": "The square root of 16 is 4.",
  "who wrote 'To Kill a Mockingbird'": "Harper Lee wrote 'To Kill a Mockingbird'.",
  "tell me a joke": "Why did the golfer bring two pairs of pants? In case he got a hole in one.",
  "what is the speed of light": "The speed of light is approximately 299,792 kilometers per second.",
  "who is the author of 'Harry Potter'": "J.K. Rowling is the author of the 'Harry Potter' series.",
  "what is the chemical symbol for gold": "The chemical symbol for gold is Au.",
  "how tall is Mount Everest": "Mount Everest is approximately 8,848 meters (29,029 feet) tall.",
  "what is the smallest planet in our solar system": "The smallest planet in our solar system is Mercury.",
  "tell me a joke": "Why did the math book look sad? Because it had too many problems.",
  "what is the boiling point of water": "The boiling point of water is 100 degrees Celsius (212 degrees Fahrenheit) at sea level.",
  "who discovered penicillin": "Alexander Fleming discovered penicillin.",
  "what is the longest river in the world": "The longest river in the world is the Nile River.",
  "how many bones are in the human body": "There are 206 bones in the adult human body.",
  "what is the fastest animal on land": "The cheetah is the fastest animal on land.",
  "what is the largest ocean on Earth": "The largest ocean on Earth is the Pacific Ocean.",
  "tell me a joke": "Why can't you trust an atom? Because they make up everything!",
  "who was the first person to walk on the moon": "Neil Armstrong was the first person to walk on the moon.",
  "what is the hardest natural substance on Earth": "The hardest natural substance on Earth is diamond.",
  "what is the currency of Japan": "The currency of Japan is the yen.",
  "what is the chemical formula for water": "The chemical formula for water is H2O.",
  "how many planets are in our solar system": "There are eight planets in our solar system.",
  "what is the tallest building in the world": "The tallest building in the world is the Burj Khalifa in Dubai.",
  "tell me a joke": "How does a penguin build its house? Igloos it together!",
  "what is the largest desert in the world": "The largest desert in the world is the Antarctic Desert.",
  "what is the primary ingredient in guacamole": "The primary ingredient in guacamole is avocado.",
  "who invented the light bulb": "Thomas Edison is credited with inventing the light bulb.",
  "what is the most spoken language in the world": "The most spoken language in the world is English.",
  "tell me a joke": "What do you call fake spaghetti? An impasta!",
  "what is the deepest ocean trench": "The deepest ocean trench is the Mariana Trench.",
  "who is known as the 'Father of Computers'": "Charles Babbage is known as the 'Father of Computers'.",
  "what is the largest island in the world": "The largest island in the world is Greenland.",
  "what is the speed of sound": "The speed of sound is approximately 343 meters per second in air.",
  "who wrote 'Pride and Prejudice'": "Jane Austen wrote 'Pride and Prejudice'.",
  "what is the capital of Australia": "The capital of Australia is Canberra.",
  "tell me a joke": "Why did the bicycle fall over? Because it was two-tired!",
  "what is the name of our galaxy": "Our galaxy is called the Milky Way.",
  "what is the chemical symbol for silver": "The chemical symbol for silver is Ag.",
  "what is the largest country by land area": "The largest country by land area is Russia.",
  "who painted the Sistine Chapel ceiling": "Michelangelo painted the Sistine Chapel ceiling.",
  "tell me a joke": "Why don’t programmers like nature? It has too many bugs.",
  "what is the name of the current UK Prime Minister": "As of now, the UK Prime Minister is Rishi Sunak.",
  "what is the capital of Canada": "The capital of Canada is Ottawa.",
  "who is the author of '1984'": "George Orwell is the author of '1984'.",
  "what is the longest river in South America": "The longest river in South America is the Amazon River.",
  "tell me a joke": "Why did the tomato turn red? Because it saw the salad dressing!",
  "what is the smallest country in the world": "The smallest country in the world is Vatican City.",
  "who developed the theory of relativity": "Albert Einstein developed the theory of relativity.",
  "what is the main ingredient in sushi": "The main ingredient in sushi is rice.",
  "tell me a joke": "Why did the student eat his homework? Because his teacher told him it was a piece of cake!",
  
};


// Function to add a message to the chatbox
function addChatMessage(message, sender = 'user') {
    const messageElement = document.createElement('div');
    messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the bottom
}

// Function to process user input
function processInput() {
    const message = userInput.value.trim();
    if (message === '') return;

    addChatMessage(message, 'user');
    takeCommand(message.toLowerCase());
    userInput.value = ''; // Clear input field
}

// Handle send button click
sendBtn.addEventListener('click', processInput);

// Handle enter key press in the input field
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        processInput();
    }
});

function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, How May I Help You?");
        addChatMessage("Hello Sir, How May I Help You?", 'bot');
    } else if (message.includes("open browser")) {
        window.open("https://www.bing.com", "_blank");
        speak("Opening Bing...");
        addChatMessage("Opening Bing...", 'bot');
    } else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening YouTube...");
        addChatMessage("Opening YouTube...", 'bot');
    } else if (message.includes("open whatsapp")) {
        window.open("https://web.whatsapp.com", "_blank");
        speak("Opening WhatsApp...");
        addChatMessage("Opening WhatsApp...", 'bot');
    } else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
        addChatMessage("Opening Facebook...", 'bot');
    } else if (message.includes("open instagram")) {
        window.open("https://www.instagram.com", "_blank");
        speak("Opening Instagram...");
        addChatMessage("Opening Instagram...", 'bot');
    } else if (message.includes('message abhijit on whatsapp')) {
        window.open("https://web.whatsapp.com/send?phone=918167099432", "_blank");
        speak("Messaging Abhijit on WhatsApp...");
        addChatMessage("Messaging Abhijit on WhatsApp...", 'bot');
    } else if (message.includes('message mom on whatsapp')) {
        window.open("https://web.whatsapp.com/send?phone=917908264566", "_blank");
        speak("Messaging Mom on WhatsApp...");
        addChatMessage("Messaging Mom on WhatsApp...", 'bot');
    } else if (message.includes('message sagarika on instagram')) {
        window.open("https://www.instagram.com/_pearly.flakes_/", "_blank");
        speak("Messaging Sagarika on Instagram...");
        addChatMessage("Messaging Sagarika on Instagram...", 'bot');
    } else if (message.includes('message abhijit on instagram')) {
        window.open("https://www.instagram.com/__b_a_t_m_a_n_999/", "_blank");
        speak("Messaging Abhijit on Instagram...");
        addChatMessage("Messaging Abhijit on Instagram...", 'bot');
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.bing.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what I found on the internet regarding " + message;
        speak(finalText);
        addChatMessage(finalText, 'bot');
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        const finalText = "The current time is " + time;
        speak(finalText);
        addChatMessage(finalText, 'bot');
    } else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        const finalText = "Today's date is " + date;
        speak(finalText);
        addChatMessage(finalText, 'bot');
    } else if (message.includes('calculator')) {
        window.open('Calculator:///', "_blank");
        const finalText = "Opening Calculator";
        speak(finalText);
        addChatMessage(finalText, 'bot');
    } else if (chatResponses[message]) {
        const response = chatResponses[message];
        addChatMessage(response, 'bot');
        speak(response);
    } else {
        const defaultMessage = "I found some information for " + message;
        window.open(`https://www.bing.com/search?q=${message.replace(" ", "+")}`, "_blank");
        addChatMessage(defaultMessage, 'bot');
        speak(defaultMessage);
    }
}
