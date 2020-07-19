const navIcon = document.querySelectorAll(".nav-icon");

navIcon.forEach((button, index) => {
	button.addEventListener("click", () => {
		toggleActiveItem(index);
	});
});

function toggleActiveItem(index) {
	navIcon[index].classList.toggle("active");
}
