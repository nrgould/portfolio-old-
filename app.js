const navIcon = document.querySelectorAll(".nav-icon");
const navLink = document.querySelectorAll(".nav-icon a");

navIcon.forEach((button, index) => {
	button.addEventListener("click", () => {
		toggleActiveItem(index);
	});
});

function toggleActiveItem(index) {
	navLink[0].classList.toggle("active");
}

//WORK ANIMATION
// set class for section
// ScrollMagic has to have access to the entire section for a trigger
// forEach for the two columns
// left column animates right, right animates left, etc + scale 0.5 -> 1 + opacity 0 -> 1
let controller;
let workScene;
let showCaseScene;

const workSection = document.querySelector(".work-section");
const skillSection = document.querySelector(".skills-section");

function animateWork() {
	controller2 = new ScrollMagic.Controller();
	const workCard = document.querySelectorAll(".work-card");
	const column1 = document.querySelector(".work-column-1");
	const column2 = document.querySelector(".work-column-2");

	// gsap.fromTo(workCard, 1, { scale: 0.2 }, { scale: 1 });

	workCard.forEach((card) => {
		const workTl = gsap.timeline({
			defaults: { duration: 1, ease: "power2.inOut" },
		});
		workTl.fromTo(
			column1,
			{ x: "-200%", scale: 0.2, opacity: 0 },
			{ x: "0%", scale: 1, opacity: 1 }
		);
		workTl.fromTo(
			column2,
			{ x: "200%", scale: 0.2, opacity: 0 },
			{ x: "0%", scale: 1, opacity: 1 },
			"-=1"
		);
		workScene = new ScrollMagic.Scene({
			triggerElement: workSection,
			triggerHook: 1,
			duration: "100%",
			reverse: true,
		})
			.setTween(workTl)
			.addIndicators({
				colorStart: "white",
				colorTrigger: "white",
				name: "work",
			})
			.addTo(controller);
	});
}

function animateShowCase() {
	controller = new ScrollMagic.Controller();

	const showCaseSection = document.querySelector(".showcase");
	const showCaseCard = document.querySelectorAll(".showcase-card");
	const showCaseCard1 = document.querySelector(".showcase1");
	const showCaseCard2 = document.querySelector(".showcase2");
	const showCaseCard3 = document.querySelector(".showcase3");
	showCaseCard.forEach((card) => {
		const showCaseTl = gsap.timeline({
			defaults: { duration: 1, ease: "power3.inOut" },
		});
		showCaseTl.fromTo(
			showCaseCard1,
			{ x: "-200%", opacity: 0, scale: 0.1 },
			{ x: "0%", opacity: 1, scale: 1 }
		);
		showCaseTl.fromTo(
			showCaseCard2,
			{ x: "-200%", opacity: 0, scale: 0.1 },
			{ x: "0%", opacity: 1, scale: 1 },
			"-=.75"
		);
		showCaseTl.fromTo(
			showCaseCard3,
			{ x: "-200%", opacity: 0, scale: 0.1 },
			{ x: "0%", opacity: 1, scale: 1 },
			"-=.75"
		);
		showCaseScene = new ScrollMagic.Scene({
			triggerElement: showCaseSection,
			triggerHook: 0.9,
			duration: "100%",
		})
			.setTween(showCaseTl)
			.addIndicators({
				colorStart: "white",
				colorTrigger: "white",
				name: "showcase",
			})
			.addTo(controller);
	});
}

//observer for nav.active indicators

//switch statement for determining which section gets placed as active
//
let options = {
	threshold: 0.25,
};
let observer = new IntersectionObserver(activeIndicator, options);

function activeIndicator(sections, index) {
	sections.forEach((section, index) => {
		console.log(section);
		if ((section.isIntersecting = "true")) {
			console.log(`intersecting ${index}`);
			toggleActiveItem();
		}
	});
}

animateShowCase();
animateWork();
observer.observe(workSection);
observer.observe(skillSection);
