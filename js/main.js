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
accordeon('accordeon__title', 'accordeon__content');
accordeon('accordeon__menu', 'accordeon__content', 'close__svg');

function accordeon(triggerSelector, contentSelector, closeSelector) {
	var accordeonTitles = document.getElementsByClassName(triggerSelector);
	var accordeonContents = document.getElementsByClassName(contentSelector);

	for (var i = 0; i < accordeonTitles.length; i++) {
		accordeonTitles[i].onclick = function() {
			var setClasses = !this.classList.contains('active');
			setClass(accordeonTitles, 'active', 'remove');
			setClass(accordeonContents, 'show', 'remove');
			if (setClasses) {
				this.classList.toggle('active');
				this.childNodes[3].classList.toggle('show');
			}
		};

		if (closeSelector) {
			var closeButton = document.getElementsByClassName(closeSelector);

			closeButton[i].onclick = function() {
				var setClasses = !this.classList.contains('active');
				setClass(accordeonTitles, 'remove', 'active');
				setClass(accordeonContents, 'remove', 'show');
				if (setClasses) {
					this.classList.toggle('active');
					this.childNodes[3].classList.toggle('show');
				}
			};
		}
	}
}

function setClass(els, className, fnName) {
	for (var i = 0; i < els.length; i++) {
		els[i].classList[fnName](className);
	}
}
// accordeon end

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
const myForm = document.querySelector('#myForm');
const sendButton = document.querySelector('#sendButton');

sendButton.addEventListener('click', function(event) {
	event.preventDefault();

	if (validateForm(myForm)) {
		let overlay;
		const URL = 'https://webdev-api.loftschool.com/sendmail';
		const URL_FAIL = 'https://webdev-api.loftschool.com/sendmail/fail';

		const xhr = new XMLHttpRequest();
		xhr.responseType = 'json';

		xhr.open('POST', URL);
		xhr.send(new FormData(myForm));
		xhr.addEventListener('load', res => {
			overlay = createOverlay(xhr.response.message);

			document.body.appendChild(overlay);
		});
	}
});

function validateForm(form) {
	let valid = true;

	if (!validateField(form.elements.name)) {
		valid = false;
	}
	if (!validateField(form.elements.phone)) {
		valid = false;
	}

	if (!validateField(form.elements.comment)) {
		valid = false;
	}

	if (!validateField(form.elements.to)) {
		valid = false;
	}

	return valid;
}

function validateField(field) {
	if (!field.checkValidity()) {
		field.nextElementSibling.textContent = field.validationMessage;

		return false;
	} else {
		field.nextElementSibling.textContent = '';

		return true;
	}
}
//form end

//overlay start
function createOverlay(content) {
	const overlayElement = document.createElement('div');
	overlayElement.classList.add('overlay');

  const template = document.querySelector('#formOverlay');
  overlayElement.innerHTML = template.innerHTML;

  const closeElement = overlayElement.querySelector('.button.overlay__button');

	closeElement.addEventListener('click', function() {
		document.body.removeChild(overlayElement);
	});

	const contentElement = overlayElement.querySelector('.overlay__content');
	contentElement.innerHTML = content;

	return overlayElement;
}
//overlay end

//tabs start
function openReview(evt, reviewName) {
  if (!evt.currentTarget.classList.contains('active')) {
		let reviewItems = document.getElementsByClassName('reviews-item');
		let reviewButtons = document.getElementsByClassName(
			'reviews-buttons__item'
		);

		for (let i = 0; i < reviewItems.length; i++) {
			reviewItems[i].classList.remove('active');
			reviewButtons[i].classList.remove('active');
		}

		document.getElementById(reviewName).classList.add('active');
		evt.currentTarget.classList.add('active');
	} 
}
//tabs end