(() => {

const app = document.querySelector('#binary-search-applet')
const N_ARRAY_ELEMENTS = 8
const MAX_ELEMENT = N_ARRAY_ELEMENTS * 2

app.innerHTML = /* html */ `
<div class="controls">
	<button class="reset">Reset</button>
	<input type="number" class="number" value="${ Math.floor(Math.random() * MAX_ELEMENT) }" step="1">
	<button class="search">Next iteration</button>
</div>
<div class="array"></div>
<div class="message"></div>
`

const arrayContainer = app.querySelector('.array')
const resetButton = app.querySelector('.reset')
const numberInput = app.querySelector<HTMLInputElement>('.number')
const searchButton = app.querySelector('.search')
const message = app.querySelector('.message')

let array: number[]
let left: number
let right: number

const updateArray = () => {
	for (let i = 0; i < N_ARRAY_ELEMENTS; i++) {
		const node = arrayContainer.children[i]

		if (i >= left && i <= right) {
			node.classList.add('active')
		} else {
			node.classList.remove('active')
		}

		node.classList.remove('left')
		node.classList.remove('right')
		node.classList.remove('final')

		if (left == i && right == i) {
			node.classList.add('final')
		}
		else if (left == i) {
			node.classList.add('left')
		}
		else if (right == i) {
			node.classList.add('right')
		}
	}

	if (left == right) {
			if (array[left] == +numberInput.value) {
				message.innerHTML = `found value ${ numberInput.value }`
			}
			else {
				message.innerHTML = `didn't find value ${ numberInput.value }`
			}
	}
	else {
		message.innerHTML = `searching value ${ numberInput.value }...`
	}
}

const resetArray = () => {
	array = []

	left = 0
	right = N_ARRAY_ELEMENTS - 1

	for (let i = 0; i < N_ARRAY_ELEMENTS; i++) {
		array.push(Math.floor(Math.random() * MAX_ELEMENT))
	}

	array.sort((a, b) => a - b)

	arrayContainer.innerHTML = ''

	for (let i = 0; i < N_ARRAY_ELEMENTS; i++) {
		const node = document.createElement('div')

		node.classList.add('array-element')
		node.innerText = array[i].toString()
		arrayContainer.appendChild(node)
	}

	updateArray()
}

resetArray()

resetButton.addEventListener('click', resetArray)

searchButton.addEventListener('click', () => {
	const mid = Math.floor((left + right) / 2)

	if (right - left < 1) {
		return
	}

	if (array[mid] < +numberInput.value) {
		left = mid + 1
	}
	else {
		right = mid
	}

	updateArray()
})

})()