document.addEventListener('DOMContentLoaded', () => {

    const startButton = document.getElementById('startButton');
    const questionDiv = document.getElementById('question');
    const optionsDiv = document.getElementById('options');
    const submitAnswerButton = document.getElementById('submitAnswer');
    const retryButton = document.getElementById('retry');
    const resultDiv = document.getElementById('result');
    const instructions = document.querySelector('p');

    const questions = [
        {
            question: "Are you a tech guy?",
            options: ["Yes", "No", "Not Sure"]
        },
        {    
            question: "How many friends do you have?",
            options: ["fewer than five", "around a dozen", "why the hell would you mind"]
        },
        {   question: "Do you identfiy yourself as social?",
            options: ["Yes", "No", "I don't care"]
        }
    ];

    const answers = [];
    let currentQuestionIndex = 0;

    function showNextQuestion() {
        startButton.style.display = 'none';
        instructions.style.display = 'none';
        optionsDiv.innerHTML = "";
        
        if (currentQuestionIndex < questions.length) {
            const currentQuestion = questions[currentQuestionIndex];
            questionDiv.textContent = `Question: ${currentQuestion.question}`;

            currentQuestion.options.forEach(option => {
                const button = document.createElement('button');
                button.textContent = option;
                button.addEventListener('click', () => {
                    answers.push(option);
                    currentQuestionIndex++;
                    showNextQuestion();
                });
                optionsDiv.appendChild(button);
            });
            
            resultDiv.textContent = "";
        } else {
            showFinalResult();
        }
    }

    function showFinalResult() {
        const techGuyAnswers = answers.filter(answer => answer === "Yes").length;

        if (techGuyAnswers >= 2) {
            resultDiv.textContent = "You're definitely a Macbook guy.";
        } else if (answers.includes("around a dozen")) {
            resultDiv.textContent = "Go buy a Macbook and show it off to your friends.";
        } else if (answers.includes("why the hell would you mind")) {
            resultDiv.textContent = "You should get yourself a Macbook. Quickly.";
        } else {
            resultDiv.textContent = "Well, why don't you stop boring me and just go buy a Macbook?";
        }
        
        questionDiv.textContent = "";
        optionsDiv.innerHTML = "";
        retryButton.style.display = 'block';
        
    }

    retryButton.addEventListener('click', () => {
        currentQuestionIndex = 0;
        answers.length = 0;
        resultDiv.textContent = "";
        retryButton.style.display = 'none';
        showNextQuestion();
    })
    
    startButton.addEventListener('click', () => {
        showNextQuestion();
    });
});