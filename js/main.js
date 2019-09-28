hamburgerMenu(
	'#hamburger-button__toggler',
	'.hamburgermenu',
	'hamburgermenu--visible'
);


function hamburgerMenu(togglerSelector, menuSelector, toggleClass) {
	const toggler = document.querySelector(togglerSelector);
	const hamburgerMenu = document.querySelector(menuSelector);
	const hamburgerClasses = hamburgerMenu.classList;

	toggler.addEventListener('click', function() {
		hamburgerClasses.toggle(toggleClass);
	});
}