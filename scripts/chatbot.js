function scrollToBottom() {
    let container = document.getElementById("container");
    container.scroll({
        top: document.body.scrollHeight,
        behavior: "smooth", // Optional: Adds smooth scrolling
    });
}

class Answer {
    constructor(text, isPositive) {
        this.text = text;
        this.isPositive = isPositive;
    }
}

const messages = [
    { operator_message: "Hello 👋", user_answer: null },
    { operator_message: "I’m Olivia, and I’m here to help you reduce your debts.", user_answer: null },
    { operator_message: "Do you want to know if you qualify for $15,000 or more in credit card debt relief? Tap Yes! 😃", user_answer: [new Answer("Yes", true)] },
    { operator_message: "Alright, let me ask you two quick questions.", user_answer: null },
    { operator_message: "Do you have more than $15,000 in credit card debt? Tap Yes or No", user_answer: [new Answer("Yes", true), new Answer("No", false)] },
    { operator_message: "Would you like to reduce your debt today?", user_answer: [new Answer("Yes", true), new Answer("No", false)] },
    { operator_message: "🎉 Congratulations! 🎁", user_answer: null },
    { operator_message: "You are prequalified to receive up to $50,000 or more in debt relief.", user_answer: null },
    { operator_message: "You can use this to avoid paying overdue credit card debts, medical bills, personal loans, and more…", user_answer: null },
    { operator_message: "Tap the button with the number below to call now and get up to $50,000 in Debt Relief. It only takes 2 minutes.", user_answer: null }
];

let currentMessageIndex = 0;

function displayMessage(content, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);

    if (sender === "call") {
        const link = document.createElement("a");
        link.href = "tel:" + content;
        link.textContent = content;
        messageDiv.appendChild(link);
    } else {
        messageDiv.textContent = content;
    }

    document.getElementById("chat-container").appendChild(messageDiv);

    if (sender === "call" || sender === "user" || sender === "operator-message") {
        setTimeout(() => {
            scrollToBottom(); // Скролимо після того, як повідомлення додано
        }, 300);
    }
}

function showOperatorMessage() {
    const message = messages[currentMessageIndex];
    if (message.operator_message) {
        // Створюємо контейнер для повідомлення оператора
        const operatorMessageDiv = document.createElement("div");
        operatorMessageDiv.classList.add("message", "operator-message");

        // Створюємо аватар
        const avatarDiv = document.createElement("div");
        avatarDiv.classList.add("operator-avatar");

        // Створюємо контейнер для тексту
        const textDiv = document.createElement("div");
        textDiv.classList.add("operator-text", "typing");

        // Створюємо контейнер для анімації (три круги)
        const typingAnimation = document.createElement("div");
        typingAnimation.classList.add("typing-animation");
        for (let i = 0; i < 3; i++) {
            const circle = document.createElement("div");
            circle.classList.add("circle");
            typingAnimation.appendChild(circle);
        }
        textDiv.appendChild(typingAnimation);

        // Додаємо аватар і текст у повідомлення
        operatorMessageDiv.appendChild(avatarDiv);
        operatorMessageDiv.appendChild(textDiv);

        document.getElementById("chat-container").appendChild(operatorMessageDiv);
        scrollToBottom();

        // Показуємо реальне повідомлення після паузи
        setTimeout(() => {
            textDiv.classList.remove("typing"); // Видаляємо клас анімації
            textDiv.innerHTML = message.operator_message; // Замінюємо анімацію на текст

            if (message.user_answer && message.user_answer.length > 0) {
                displayAnswerButtons(message.user_answer);
            } else {
                proceedToNextMessage();
            }
            scrollToBottom();
        }, 1500); // Час затримки перед відображенням справжнього повідомлення
    }
}

function displayAnswerButtons(answers) {
    const answerButtonsContainer = document.getElementById("answer-buttons");

    // Очищуємо попередні кнопки
    answerButtonsContainer.innerHTML = "";

    answers.forEach((answer) => {
        const button = document.createElement("button");
        button.classList.add("answer-button");
        button.textContent = answer.text;
        button.onclick = () => handleUserResponse(answer);
        answerButtonsContainer.appendChild(button);
    });

    // Прокручуємо вниз після додавання кнопок
    scrollToBottom();
}

function handleUserResponse(response) {
    displayMessage(response.text, "user");

    if (!response.isPositive) {
        displayMessage(
            "Unfortunately, you do not qualify for Debt Settlement.",
            "error"
        );
        return;
    }

    proceedToNextMessage();

    const answerButtonsContainer =
        document.getElementById("answer-buttons");
    while (answerButtonsContainer.firstChild) {
        answerButtonsContainer.removeChild(
            answerButtonsContainer.firstChild
        );
    }
}

function proceedToNextMessage() {
    currentMessageIndex++;
    if (currentMessageIndex < messages.length) {
        setTimeout(showOperatorMessage, 500);
    } else {
        setTimeout(() => {
            displayMessage("(888) 217-3304", "call");
            scrollToBottom();
        }, 500);
    }
}

function disableAnswerButtons() {
    const answerButtonsContainer =
        document.getElementById("answer-buttons");
    answerButtonsContainer.classList.add("locked"); // Lock the entire button container
}

function enableAnswerButtons() {
    const answerButtonsContainer =
        document.getElementById("answer-buttons");
    answerButtonsContainer.classList.remove("locked"); // Unlock the entire button container
}

// Start the chat with the first operator message
setTimeout(showOperatorMessage, 500);