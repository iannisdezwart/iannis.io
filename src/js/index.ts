// Disables pre-load <a> blue colour transition

addEventListener('load', () => {
	document.querySelector('body').classList.remove('preload')
})

const toggleNavbar = () => {
	document.querySelector('html').classList.toggle('mobile-navbar-opened')
}

const setCSSViewportHeight = () => {
	document.querySelector('html').style.setProperty('--vh', 0.01 * innerHeight + 'px')
}

setCSSViewportHeight()
addEventListener('resize', setCSSViewportHeight)