document.querySelectorAll('.link').forEach(link => {
	link.addEventListener('click', () => {
		location.hash = ''
		location.hash = link.parentElement.id
	})
})