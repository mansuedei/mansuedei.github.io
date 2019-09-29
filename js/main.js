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
const myForm = document.querySelector('#myForm');
const sendButton = document.querySelector('#sendButton');

sendButton.addEventListener('click', function(event) {
	event.preventDefault();

	if (validateForm(myForm)) {
		let overlay;
		const URL = 'https://webdev-api.loftschool.com/sendmail';
		const URL_FAIL = 'https://webdev-api.loftschool.com/sendmail/fail';
		const data = {
			name: myForm.elements.name.value,
			phone: myForm.elements.phone.value,
			comment: myForm.elements.comment.value,
			to: myForm.elements.to.value,
		};

		const xhr = new XMLHttpRequest();
		xhr.responseType = 'json';

		xhr.open('POST', URL);
		xhr.send(new FormData(myForm));
		xhr.addEventListener('load', res => {
			if (xhr.response.status) {
				overlay = createOverlay(
					'Ваш заказ принят. Спасибо, что выбрали CHOCCO!'
				);
			} else {
				overlay = createOverlay(
					'К сожалению, при отправке заказа произошла ошибка. Пожалуйста, попробуйте еще раз. Спасибо!'
				);
			}

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

	const closeElement = overlayElement.querySelector('.overlay__close');
	closeElement.addEventListener('click', function() {
		document.body.removeChild(overlayElement);
	});

	const contentElement = overlayElement.querySelector('.overlay__content');
	contentElement.innerHTML = content;

	return overlayElement;
}

//overlay window end
