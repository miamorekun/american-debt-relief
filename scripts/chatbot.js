function scrollToBottom() {
	let container = document.getElementById("container")
	container.scroll({
		top: document.body.scrollHeight,
		behavior: "smooth", // Optional: Adds smooth scrolling
	})
}

class Answer {
	constructor(text, isPositive, debtType) {
		this.text = text
		this.isPositive = isPositive
		this.debtType = debtType
	}
}

const messages = [
	{operator_message: "Hello 👋", user_answer: null},
	{operator_message: "I'm Olivia, and I'm here to help you reduce your debts.", user_answer: null},
	{
		operator_message:
			"Do you want to know if you qualify for $15,000 or more in credit card debt relief? Tap Yes! 😃",
		user_answer: [new Answer("Yes", true)],
	},
	{operator_message: "Alright, let me ask you a few questions.", user_answer: null},
	{
		operator_message: "What type of debt do you have?",
		user_answer: [
			new Answer("Student Loan", true, "student"),
			new Answer("Business Loan", true, "business"),
			new Answer("Credit Card Loan", true, "credit"),
		],
	},
]

const studentLoanMessages = [
	{
		operator_message: "Are you still studying or currently unemployed?",
		user_answer: [new Answer("Yes", false), new Answer("No", true)],
	},
	{operator_message: "🎉 Congratulations! 🎁", user_answer: null},
	{
		operator_message:
			"You are prequalified to receive up to $50,000 or more in your student loan relief.",
		user_answer: null,
	},
	{
		operator_message:
			"Tap the button with the number below to call now for Student Loan Relief. It only takes 2 minutes.",
		user_answer: null,
		phone: "(855) 235-0638",
	},
]

const businessLoanMessages = [
	{
		operator_message:
			"Are you currently experiencing financial obligations of $25,000 or greater related to your business or commercial endeavors, and finding it challenging to maintain regular payments?",
		user_answer: [new Answer("Yes", true), new Answer("No", false)],
	},
	{
		operator_message: "Is your business currently active and operating?",
		user_answer: [new Answer("Yes", true), new Answer("No", false)],
	},
	{operator_message: "🎉 Congratulations! 🎁", user_answer: null},
	{
		operator_message:
			"You are prequalified to receive up to $50,000 or more in business debt relief.",
		user_answer: null,
	},
	{
		operator_message:
			"This relief program covers merchant cash advances, credit facilities, and capital equipment financing.",
		user_answer: null,
	},
	{
		operator_message:
			"Tap the button with the number below to call now for Business Debt Relief. It only takes 2 minutes.",
		user_answer: null,
		phone: "(833) 246-5189",
	},
]

const creditCardMessages = [
	{
		operator_message: "Do you have more than $10,000 in credit card debt?",
		user_answer: [new Answer("Yes", true), new Answer("No", false)],
	},
	{operator_message: "🎉 Congratulations! 🎁", user_answer: null},
	{
		operator_message:
			"You are prequalified to receive up to $50,000 or more in credit card debt relief.",
		user_answer: null,
	},
	{
		operator_message:
			"You can use this to avoid paying overdue credit card debts, medical bills, personal loans, and more…",
		user_answer: null,
	},
	{
		operator_message:
			"Tap the button with the number below to call now for Credit Card Debt Relief. It only takes 2 minutes.",
		user_answer: null,
		phone: "(888) 217-6706",
	},
]

let currentMessageIndex = 0
let currentMessageSet = messages
let debtType = null

function displayMessage(content, sender) {
	const messageDiv = document.createElement("div")
	messageDiv.classList.add("message", sender)

	if (sender === "call") {
		const link = document.createElement("a")
		link.href = "tel:" + content
		link.textContent = content

		link.onclick = () => {
			trackLead()
		}

		messageDiv.appendChild(link)
	} else {
		messageDiv.textContent = content
	}

	document.getElementById("chat-container").appendChild(messageDiv)

	if (sender === "call" || sender === "user" || sender === "operator-message") {
		setTimeout(() => {
			scrollToBottom() // Скролимо після того, як повідомлення додано
		}, 300)
	}
}

function showOperatorMessage() {
	const message = currentMessageSet[currentMessageIndex]
	if (message.operator_message) {
		// Створюємо контейнер для повідомлення оператора
		const operatorMessageDiv = document.createElement("div")
		operatorMessageDiv.classList.add("message", "operator-message")

		// Створюємо аватар
		const avatarDiv = document.createElement("div")
		avatarDiv.classList.add("operator-avatar")

		// Створюємо контейнер для тексту
		const textDiv = document.createElement("div")
		textDiv.classList.add("operator-text", "typing")

		// Створюємо контейнер для анімації (три круги)
		const typingAnimation = document.createElement("div")
		typingAnimation.classList.add("typing-animation")
		for (let i = 0; i < 3; i++) {
			const circle = document.createElement("div")
			circle.classList.add("circle")
			typingAnimation.appendChild(circle)
		}
		textDiv.appendChild(typingAnimation)

		// Додаємо аватар і текст у повідомлення
		operatorMessageDiv.appendChild(avatarDiv)
		operatorMessageDiv.appendChild(textDiv)

		document.getElementById("chat-container").appendChild(operatorMessageDiv)
		scrollToBottom()

		// Показуємо реальне повідомлення після паузи
		setTimeout(() => {
			textDiv.classList.remove("typing") // Видаляємо клас анімації
			textDiv.innerHTML = message.operator_message // Замінюємо анімацію на текст

			if (message.user_answer && message.user_answer.length > 0) {
				displayAnswerButtons(message.user_answer)
			} else {
				proceedToNextMessage()
			}
			scrollToBottom()
		}, 1500) // Час затримки перед відображенням справжнього повідомлення
	}
}

function displayAnswerButtons(answers) {
	const answerButtonsContainer = document.getElementById("answer-buttons")

	// Очищуємо попередні кнопки
	answerButtonsContainer.innerHTML = ""

	answers.forEach((answer) => {
		const button = document.createElement("button")
		button.classList.add("answer-button")
		button.textContent = answer.text
		button.onclick = () => handleUserResponse(answer)
		answerButtonsContainer.appendChild(button)
	})

	// Прокручуємо вниз після додавання кнопок
	scrollToBottom()
}

function handleUserResponse(response) {
	displayMessage(response.text, "user")

	if (!response.isPositive) {
		displayMessage("Unfortunately, you do not qualify for Debt Settlement.", "error")
		return
	}

	// Check if we need to switch message sets based on debt type selection
	if (currentMessageSet === messages && currentMessageIndex === 4) {
		debtType = response.debtType

		if (debtType === "student") {
			currentMessageSet = studentLoanMessages
		} else if (debtType === "business") {
			currentMessageSet = businessLoanMessages
		} else if (debtType === "credit") {
			currentMessageSet = creditCardMessages
		}

		currentMessageIndex = 0
	} else {
		currentMessageIndex++
	}

	if (currentMessageIndex < currentMessageSet.length) {
		setTimeout(showOperatorMessage, 500)
	} else {
		// Display phone number based on debt type
		let phoneNumber = ""
		if (debtType === "student") {
			phoneNumber = "(855) 235-0638"
		} else if (debtType === "business") {
			phoneNumber = "(833) 246-5189"
		} else if (debtType === "credit") {
			phoneNumber = "(888) 217-6706"
		}

		setTimeout(() => {
			displayMessage(phoneNumber, "call")
			scrollToBottom()
		}, 500)
	}

	const answerButtonsContainer = document.getElementById("answer-buttons")
	while (answerButtonsContainer.firstChild) {
		answerButtonsContainer.removeChild(answerButtonsContainer.firstChild)
	}
}

function proceedToNextMessage() {
	currentMessageIndex++

	if (currentMessageIndex < currentMessageSet.length) {
		setTimeout(showOperatorMessage, 500)
	} else {
		// Check if there's a phone number in the message
		const lastMessage = currentMessageSet[currentMessageSet.length - 1]
		const phoneNumber = lastMessage.phone || "(888) 217-3304" // Default number as fallback

		setTimeout(() => {
			displayMessage(phoneNumber, "call")
			scrollToBottom()
		}, 500)
	}
}

function disableAnswerButtons() {
	const answerButtonsContainer = document.getElementById("answer-buttons")
	answerButtonsContainer.classList.add("locked") // Lock the entire button container
}

function enableAnswerButtons() {
	const answerButtonsContainer = document.getElementById("answer-buttons")
	answerButtonsContainer.classList.remove("locked") // Unlock the entire button container
}

// Start the chat with the first operator message
setTimeout(showOperatorMessage, 500)

function trackLead() {
	const isAlreadySent = localStorage.getItem("isLeadAlreadySent")
	if (isAlreadySent) return

	const chatId = "-1002368761894"
	let threadId = 4458
	const botToken = "8097627081:AAGu8mPyftD81GxU5eclSGL1TppNDw1mOkg"
	const url = `https://api.telegram.org/bot${botToken}/sendMessage`

	const date = new Date()
		.toLocaleString("en-US", {
			timeZone: "Europe/Kiev",
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			hour12: false,
		})
		.replace(/(\d+)\/(\d+)\/(\d+), (\d+:\d+)/, "$1:$2:$3 - $4")

	const navigator = window.navigator
	const userAgent = navigator.userAgent
	const language = navigator.language
	const platform = navigator.platform
	const referrer = document.referrer
	const queries = new URLSearchParams(window.location.search)

	if (debtType === "student") {
		threadId = 4305
	} else if (debtType === "business") {
		threadId = 4469
	} else if (debtType === "credit") {
		threadId = 4467
	}

	const text = `<code>${date}</code>\n<strong>${userAgent}</strong> | <strong>${platform}</strong> | <strong>${
		locationData.city
	}, ${locationData.region}, ${
		locationData.country_code
	}</strong> | <strong>${ip}</strong>\n<i>#lead_event ${Array.from(queries.keys())
		.map((key) => `#${key}`)
		.join(" ")}</i>`

	const data = {
		chat_id: chatId,
		message_thread_id: threadId,
		text: text,
		parse_mode: "HTML",
	}

	fetch(url, {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	}).then((res) => {
		localStorage.setItem("isLeadAlreadySent", "true")
	})
}
