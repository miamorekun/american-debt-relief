let ip = null
let locationData = null

document.addEventListener("DOMContentLoaded", () => {
	setTimeout(() => {
		const isAlreadySent = localStorage.getItem("isVisitEventAlreadySent")
		if (isAlreadySent) return

		const chatId = "-1002368761894"
		const threadId = 4458
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

		const text = `<code>${date}</code>\n<strong>${userAgent}</strong> | <strong>${platform}</strong> | <strong>${
			locationData.city
		}, ${locationData.region}, ${
			locationData.country_code
		}</strong> | <strong>${ip}</strong>\n<i>#visit_event ${Array.from(queries.keys())
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
			localStorage.setItem("isVisitEventAlreadySent", "true")
		})
	}, 2500)
})

document.addEventListener("DOMContentLoaded", () => {
	fetch("https://api.ipify.org?format=json")
		.then((res) => res.json())
		.then((data) => {
			ip = data.ip.toString()
			console.log(ip.toString())
			fetch(`https://ipapi.co/${ip.toString()}/json/`)
				.then((res) => res.json())
				.then((data) => {
					locationData = data
				})
		})
})
