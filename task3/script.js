const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const weatherIcon = document.getElementById("weatherIcon");
const errorMessage = document.getElementById("errorMessage");

searchBtn.addEventListener("click", getWeather);


cityInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        getWeather();
    }

});


async function getWeather() {

    const city = cityInput.value.trim();

    if (city === "") {

        errorMessage.textContent = "Please enter a city name.";
        return;
    }

    errorMessage.textContent = "";

    try {

        const locationResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
        );

        const locationData = await locationResponse.json();

        if (!locationData.results) {

            errorMessage.textContent = "City not found.";
            return;
        }

        const location = locationData.results[0];

        const latitude = location.latitude;
        const longitude = location.longitude;

        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`
        );

        const weatherData = await weatherResponse.json();

        const currentWeather = weatherData.current;

        cityName.textContent = location.name;

        temperature.textContent =
            `${Math.round(currentWeather.temperature_2m)}°C`;

        humidity.textContent =
            `${currentWeather.relative_humidity_2m}%`;

        windSpeed.textContent =
            `${currentWeather.wind_speed_10m} km/h`;

        const weatherInfo =
            getWeatherDescription(currentWeather.weather_code);

        description.textContent = weatherInfo.description;

        weatherIcon.textContent = weatherInfo.icon;

    } 
    
    catch (error) {

        console.error(error);

        errorMessage.textContent =
            "Unable to fetch weather data. Please try again.";

    }

}


// Convert weather code into description and icon
function getWeatherDescription(code) {

    if (code === 0) {

        return {
            description: "Clear sky",
            icon: "☀️"
        };

    }

    if (code >= 1 && code <= 3) {

        return {
            description: "Partly cloudy",
            icon: "🌤️"
        };

    }

    if (code >= 45 && code <= 48) {

        return {
            description: "Foggy",
            icon: "🌫️"
        };

    }

    if (code >= 51 && code <= 67) {

        return {
            description: "Rainy",
            icon: "🌧️"
        };

    }

    if (code >= 71 && code <= 77) {

        return {
            description: "Snowy",
            icon: "❄️"
        };

    }

    if (code >= 80 && code <= 82) {

        return {
            description: "Rain showers",
            icon: "🌦️"
        };

    }

    if (code >= 95) {

        return {
            description: "Thunderstorm",
            icon: "⛈️"
        };

    }

    return {
        description: "Unknown weather",
        icon: "🌤️"
    };

}
// =========================
// INTERACTIVE QUIZ
// =========================

const questions = [

    {
        question: "Which language is used to add interactivity to a webpage?",
        options: [
            "HTML",
            "CSS",
            "JavaScript",
            "SQL"
        ],
        answer: "JavaScript"
    },

    {
        question: "Which HTML tag is used to create a hyperlink?",
        options: [
            "<p>",
            "<a>",
            "<img>",
            "<link>"
        ],
        answer: "<a>"
    },

    {
        question: "Which CSS property is used to change text color?",
        options: [
            "font-size",
            "background",
            "color",
            "text-style"
        ],
        answer: "color"
    },

    {
        question: "Which method is commonly used to make an API request in JavaScript?",
        options: [
            "fetch()",
            "requestAPI()",
            "getData()",
            "callAPI()"
        ],
        answer: "fetch()"
    },

    {
        question: "Which keyword is used to declare a constant in JavaScript?",
        options: [
            "var",
            "let",
            "const",
            "constant"
        ],
        answer: "const"
    }

];


let currentQuestion = 0;
let scoreValue = 0;


const questionElement = document.getElementById("question");

const optionButtons =
    document.querySelectorAll(".option");

const quizResult =
    document.getElementById("quizResult");

const scoreElement =
    document.getElementById("score");

const nextButton =
    document.getElementById("nextBtn");


function loadQuestion() {

    const current = questions[currentQuestion];

    questionElement.textContent =
        current.question;

    optionButtons.forEach(function(button, index) {

        button.textContent =
            current.options[index];

        button.disabled = false;

    });

    quizResult.textContent = "";

    nextButton.style.display = "none";
}


// Check answer
optionButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const selectedAnswer =
            button.textContent;

        const correctAnswer =
            questions[currentQuestion].answer;


        if (selectedAnswer === correctAnswer) {

            quizResult.textContent =
                "✅ Correct!";

            scoreValue++;

            scoreElement.textContent =
                `Score: ${scoreValue}`;

        } else {

            quizResult.textContent =
                `❌ Incorrect! Correct answer: ${correctAnswer}`;

        }

        optionButtons.forEach(function(btn) {

            btn.disabled = true;

        });


        nextButton.style.display = "inline-block";

    });

});

nextButton.addEventListener("click", function() {

    currentQuestion++;


    if (currentQuestion < questions.length) {

        loadQuestion();

    } else {

        questionElement.textContent =
            "🎉 Quiz Completed!";

        quizResult.textContent =
            `You scored ${scoreValue} out of ${questions.length}`;

        optionButtons.forEach(function(button) {

            button.style.display = "none";

        });

        nextButton.style.display = "none";

    }

});

loadQuestion();