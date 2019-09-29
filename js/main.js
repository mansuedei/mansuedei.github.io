// hamburger menu start

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

// hamburger menu end

// accordeon start
var accordeonTitles = document.getElementsByClassName('accordeon__title');
var accordeonContents = document.getElementsByClassName('accordeon__content');

for (var i = 0; i < accordeonTitles.length; i++) {
	accordeonTitles[i].onclick = function() {
		var setClasses = !this.classList.contains('active');
		setClass(accordeonTitles, 'active', 'remove');
		setClass(accordeonContents, 'show', 'remove');

		if (setClasses) {
			this.classList.toggle('active');
			this.nextElementSibling.classList.toggle('show');
		}
	};
}

function setClass(els, className, fnName) {
	for (var i = 0; i < els.length; i++) {
		els[i].classList[fnName](className);
	}
}

//slider start
const arrowLeft = document.querySelector('#arrowLeft');
const arrowRight = document.querySelector('#arrowRight');
const sliderList = document.querySelector('#sliderList');

arrowRight.addEventListener('click', function(e) {
	e.preventDefault();
	loop('right');
});

arrowLeft.addEventListener('click', function(e) {
	e.preventDefault();
	loop('left');
});

function loop(direction) {
	if (direction === 'right') {
		sliderList.appendChild(sliderList.firstElementChild);
	} else {
		sliderList.insertBefore(
			sliderList.lastElementChild,
			sliderList.firstElementChild
		);
	}
}
//slider end

//form start

//form end