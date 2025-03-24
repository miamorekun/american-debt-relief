const burger = document.querySelector(".burger-menu")
const closeBtn = document.querySelector(".close")
const nav = document.querySelector(".navigation")

// Відкрити меню
burger.addEventListener("click", function () {
	nav.classList.add("active")
})

// Закрити меню
closeBtn.addEventListener("click", function () {
	nav.classList.remove("active")
})
