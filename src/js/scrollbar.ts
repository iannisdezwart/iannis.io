document.body.insertAdjacentHTML('beforeend', /* html */ `
<div id="scrollbar">
	<div id="scrollbar-inner"></div>
</div>
`)

const scrollBar = document.querySelector<HTMLDivElement>('#scrollbar')

const setScrollBar = () => {
	const curScroll = document.documentElement.scrollTop
	const maxScroll = document.documentElement.scrollHeight
	const height = document.documentElement.clientHeight
	const ratio = curScroll / (maxScroll - height)

	scrollBar.style.width = `${ 100 * ratio }%`
}

setScrollBar()
addEventListener('scroll', setScrollBar)