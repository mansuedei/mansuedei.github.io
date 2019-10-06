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

//scroll start
const sections = $('.section');
const display = $('.maincontent');
let inscroll = false;

// const md = new MobileDetect(window.navigator.userAgent);
// const isMobile = md.mobile();

const performTransition = sectionEq => {
	if (inscroll === false) {
		inscroll = true;
		const position = `${sectionEq * -100}%`;

		sections
			.eq(sectionEq)
			.addClass('active')
			.siblings()
			.removeClass('active');

		display.css({
			transform: `translateY(${position})`,
		});

		display.on('transitionend', e => {
			setTimeout(() => (inscroll = false), 300);
		});
	}
};

const scrollViewport = direction => {
	const activeSection = sections.filter('.active');
	const nextSection = activeSection.next();
	const prevSection = activeSection.prev();

	if (direction === 'next' && nextSection.length) {
		performTransition(nextSection.index());
	}

	if (direction === 'prev' && prevSection.length) {
		performTransition(prevSection.index());
	}
};

$(document).on('wheel', e => {
	const deltaY = e.originalEvent.deltaY;

	if (deltaY < 0) {
		scrollViewport('prev');
	}

	if (deltaY > 0) {
		scrollViewport('next');
	}
});

$(document).on('keydown', e => {
	const tagName = e.target.tagName.toLowerCase();
	const isInput = tagName === 'input' || tagName === 'textarea';
	// console.log(e.keyCode);

	if (!isInput) {
		switch (e.keyCode) {
			case 38: //prev
				scrollViewport('prev');
				break;
			case 40: //next
				scrollViewport('next');
				break;
		}
	}
});

$('[data-scroll-to').on('click', e => {
	e.preventDefault();

	const target = parseInt($(e.currentTarget).attr('data-scroll-to'));

	performTransition(target);
});

window.addEventListener(
	'touchmove',
	e => {
		e.preventDefault();
	},
	{passive: false}
);

$('body').on('swipe', function(event, direction) {
	let scrollDirection;

	if (direction === 'up') scrollDirection = 'next';
	if (direction === 'down') scrollDirection = 'prev';

	scrollViewport(scrollDirection);
});
//tabs end

//video start
var video = document.getElementById('video');
var videoIcon = document.querySelector('[date-play-pause]');
var videoButton = document.getElementById('play-pause');
var videoPlaybackBar = document.getElementById('controls__bar--playback');
var volumeBar = document.getElementById('controls__bar--volume');
var volumeMarker = document.getElementById('controls__bar--volume-mark');

videoButton.addEventListener('click', playPause);
video.addEventListener('timeupdate', onTimeUpdate);
volumeBar.addEventListener('click', onVolumeChange);

function playPause() {
	if (video.paused) {
		videoIcon.classList.replace('fa-play', 'fa-pause');
		video.play();
	} else {
		videoIcon.classList.replace('fa-pause', 'fa-play');
		video.pause();
	}
}

function onVolumeChange(event) {
	const clickPosition = event.offsetX < 0 ? 0 : event.offsetX;
	const barWidth = volumeBar.offsetWidth;
	const volume = parseInt((clickPosition * 100) / barWidth);
	const volumeWidth = volume + '%';

	video.volume = +`0.${volume}`;
	volumeMarker.style.width = volumeWidth;
}

function onTimeUpdate() {
	var videoTimeMark = video.currentTime / video.duration;
	videoPlaybackBar.style.width = videoTimeMark * 100 + '%';
}
//video start

//map start
ymaps.ready(init);
var myMap;
var myPlacemark1;

function init() {
	myMap = new ymaps.Map('map', {
		center: [55.75203894, 37.60108324],
		zoom: 14,
	});

	myPin = new ymaps.GeoObjectCollection(
		{},
		{
			iconLayout: 'default#image',
			iconImageHref: '/img/content/myPin.png',
			iconImageSize: [46, 57],
			iconImageOffset: [-3, -42],
			draggable: false,
		}
	);

	myPlacemark1 = new ymaps.Placemark([55.75887514, 37.58305298]);

	myPlacemark2 = new ymaps.Placemark([55.75819756, 37.62365089]);

	myPlacemark3 = new ymaps.Placemark([55.75030775, 37.60785804]);

	myPlacemark4 = new ymaps.Placemark([55.74597443, 37.58182998]);

	myPin
		.add(myPlacemark1)
		.add(myPlacemark2)
		.add(myPlacemark3)
		.add(myPlacemark4);

	myMap.geoObjects.add(myPin);
}

//map end
