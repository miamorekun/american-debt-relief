function scrollToBottom() {
    let container = document.getElementById("container");
    container.scroll({
        top: document.body.scrollHeight,
        behavior: "smooth", // Optional: Adds smooth scrolling
    });
}

// Define the messages array

class Answer {
    constructor(text, isPositive) {
        this.text = text;
        this.isPositive = isPositive;
    }
}

const messages = [
    {
        operator_message:
            "Hello! Please answer a few quick questions so we can find the best debt relief options for you. All information is confidential.",
        user_answer: [new Answer("Start", true)],
    },
    {
        operator_message:
            "How old are you?",
        user_answer: [
            new Answer("18-24 years old", true),
            new Answer("25-34 years old", true),
            new Answer("35-44 years old", true),
            new Answer("45+ years old", true),
        ],
    },
    {
        operator_message:
            "How long have you been in debt?",
        user_answer: [
            new Answer("2-3 months", true),
            new Answer("3-6 months", true),
            new Answer("more than 6 months", true),
        ],
    },
    {
        operator_message:
            "What is the amount of your credit debt?",
        user_answer: [
            new Answer("15 000$ - 25 000$", true),
            new Answer("25 000$ - 50 000$", true),
            new Answer("More than $50 000", true),
        ],
    },
    {
        operator_message:
            "Is it important for you to maintain your credit score?",
        user_answer: [
            new Answer("Yes, it is very important", true),
            new Answer("It is not so important", true),
        ],
    },
    {
        operator_message:
            "Do you agree to undergo a debt restructuring procedure and reduce your credit score by up to 75%? ",
        user_answer: [
            new Answer("Yes", true),
            new Answer("No", true),
        ],
    },
    {
        operator_message: "🎉 Congratulations! 🎁",
        user_answer: null,
    },
    {
        operator_message:
            "You are prequalified to receive up to $50,000 or more in debt relief.",
        user_answer: null,
    },
    {
        operator_message:
            "You can use this to avoid paying overdue credit card debts, medical bills, personal loans, and more…",
        user_answer: null,
    },
    {
        operator_message:
            "Tap the button with the number below to call now and get up to $50,000 in Debt Relief. It only takes 2 minutes.",
        user_answer: null,
    },
];

let currentMessageIndex = 0;

function displayMessage(content, sender) {
    if (sender == "call") {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", sender);

        var link = document.createElement("a");
        link.href = "tel:" + content;
        link.textContent = content;

        messageDiv.appendChild(link);

        document
            .getElementById("chat-container")
            .appendChild(messageDiv);
        document.getElementById("chat-container").scrollTop =
            document.getElementById("chat-container").scrollHeight;
        scrollToBottom();
        return;
    }

    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    messageDiv.textContent = content;
    document
        .getElementById("chat-container")
        .appendChild(messageDiv);
    document.getElementById("chat-container").scrollTop =
        document.getElementById("chat-container").scrollHeight;
    scrollToBottom();
}

function showOperatorMessage() {
    const message = messages[currentMessageIndex];
    if (message.operator_message) {
        const operatorMessageDiv = document.createElement("div");
        operatorMessageDiv.classList.add("message", "operator-message");

        // Створюємо аватар
        const avatarDiv = document.createElement("div");
        avatarDiv.classList.add("operator-avatar");

        // Створюємо контейнер для тексту
        const textDiv = document.createElement("div");
        textDiv.classList.add("operator-text");
        textDiv.textContent = message.operator_message;

        // Додаємо аватар і текст у повідомлення
        operatorMessageDiv.appendChild(avatarDiv);
        operatorMessageDiv.appendChild(textDiv);

        document.getElementById("chat-container").appendChild(operatorMessageDiv);
        scrollToBottom();

        if (message.user_answer && message.user_answer.length > 0) {
            displayAnswerButtons(message.user_answer);
        } else {
            proceedToNextMessage();
        }
    }
}

function displayAnswerButtons(answers) {
    const answerButtonsContainer =
        document.getElementById("answer-buttons");

    answers.forEach((answer) => {
        const button = document.createElement("button");
        button.classList.add("answer-button");
        button.textContent = answer.text;
        button.onclick = () => handleUserResponse(answer);
        answerButtonsContainer.appendChild(button);
    });

    // Enable buttons after operator's message is shown
    enableAnswerButtons();
}

function handleUserResponse(response) {
    displayMessage(response.text, "user");

    if (!response.isPositive) {
        displayMessage(
            "Desafortunadamente, usted no califica para la Liquidación de Deudas.",
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
        displayMessage("(888) 217-3304", "call");
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