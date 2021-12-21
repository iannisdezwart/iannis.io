(() => {

const app = document.querySelector('#queue-applet')
const MAX_ELEMENT = 100
const NODES_PER_ROW = 8

app.innerHTML = /* html */ `
<div class="controls">
	<div class="controls-row">
		<button class="reset">Reset</button>
	</div>
	<div class="controls-row">
		<button class="push">Push</button>
		<input type="number" class="number" value="1" step="1" min="0" max="${ MAX_ELEMENT }">
	</div>
	<div class="controls-row">
		<button class="pop">Pop</button>
	</div>
</div>
<div class="queue"></div>
<div class="message"></div>
`

const queueContainer = app.querySelector('.queue')
const resetButton = app.querySelector('.reset')
const numberInput = app.querySelector<HTMLInputElement>('.number')
const pushButton = app.querySelector('.push')
const popButton = app.querySelector('.pop')
const message = app.querySelector('.message')

let queue: number[]
let front: number
let back: number
let size: number
let capacity: number

// window.getQueue = () => ({ queue, front, back, size, capacity })

const updateQueue = () => {
	const queueSegments = queueContainer.children

	for (let i = 0; i < capacity; i++) {
		const row = Math.floor(i / NODES_PER_ROW)
		const segment = queueSegments[row]
		const node = segment.children[i % NODES_PER_ROW]

		if (i == front) {
			node.classList.add('front')
		}
		else {
			node.classList.remove('front')
		}

		if (i == back) {
			node.classList.add('back')
		}
		else {
			node.classList.remove('back')
		}

		if (size == capacity) {
			node.classList.add('active')
		}
		else if (back > front && i >= front && i < back) {
			node.classList.add('active')
		}
		else if (back < front && (i < back || i >= front)) {
			node.classList.add('active')
		}
		else {
			node.classList.remove('active')
		}

		if (queue[i] != null) {
			node.innerHTML = queue[i].toString()
		}
		else {
			node.innerHTML = ''
		}
	}
}

const allocateQueue = () => {
	queueContainer.innerHTML = /* html */ `
	<div class="queue-segment"></div>
	`.repeat(capacity / NODES_PER_ROW)

	const queueSegments = queueContainer.children

	for (let i = 0; i < capacity; i++) {
		const segment = queueSegments[Math.floor(i / NODES_PER_ROW)]
		const node = document.createElement('div')

		node.classList.add('queue-element')
		segment.appendChild(node)
	}
}

const reallocateQueue = (newCapacity: number) => {
	const newQueue = new Array(newCapacity).fill(null)

	for (let i = 0; i < size; i++) {
		newQueue[i] = queue[(front + i) % capacity]
	}

	capacity = newCapacity
	queue = newQueue
	front = 0
	back = size % capacity

	allocateQueue()
}

const resetQueue = () => {
	capacity = NODES_PER_ROW
	queue = Array(capacity).fill(null)
	front = 0
	back = 0
	size = 0

	message.innerHTML = ''

	allocateQueue()
	updateQueue()
}

resetQueue()

resetButton.addEventListener('click', resetQueue)

pushButton.addEventListener('click', () => {
	if (size == capacity) {
		reallocateQueue(capacity * 2)
	}

	const value = +numberInput.value
	const next = (value + 1) % MAX_ELEMENT
	numberInput.value = next.toString()
	
	queue[back] = value

	size++
	back++
	back %= capacity

	message.innerHTML = ''
	updateQueue()
})

popButton.addEventListener('click', () => {
	if (size == 0) {
		message.innerHTML = 'Queue is empty'
		return
	}

	let value = queue[front]
	message.innerHTML = `Popped value ${ value }`
	queue[front] = null

	size--
	front++
	front %= capacity

	if (capacity > NODES_PER_ROW && size == capacity / 2) {
		reallocateQueue(capacity / 2)
	}

	updateQueue()
})

})()