export const convertSpaces = (str: string) => str.replace(/ /g, /* html */ `&nbsp;`)

export const str = (str: string) => /* html */ `<span class="string">${ convertSpaces(str) }</span>`
export const func = (str: string) => /* html */ `<span class="function">${ convertSpaces(str) }</span>`
export const namesp = (str: string) => /* html */ `<span class="namespace">${ convertSpaces(str) }</span>`
export const cl = (str: string) => /* html */ `<span class="class">${ convertSpaces(str) }</span>`
export const param = (str: string) => /* html */ `<span class="parameter">${ convertSpaces(str) }</span>`
export const id = (str: string) => /* html */ `<span class="identifier">${ convertSpaces(str) }</span>`
export const keyw = (str: string) => /* html */ `<span class="keyword">${ convertSpaces(str) }</span>`
export const comm = (str: string) => /* html */ `<span class="comment">${ convertSpaces(str) }</span>`
export const num = (str: string) => /* html */ `<span class="number">${ convertSpaces(str) }</span>`
export const op = (str: string) => /* html */ `<span class="operator">${ convertSpaces(str) }</span>`
export const constr = (str: string) => /* html */ `<span class="constructor">${ convertSpaces(str) }</span>`

export const indent = (str: string) => /* html */ `
<pre>
${ str == '' ? /* html */ `<span></span>` : str }
</pre>
`

interface CodeBlockOptions {
	id?: string
	maxHeight?: number
	runLink?: string
}

export const createCodeBlockFromStr = (code: string, options: CodeBlockOptions = null) => {
	let lines = code.split('\n')

	const firstNonEmpty = lines.findIndex(line => line.trim() != '')

	let lastNonEmpty = 0

	for (let i = lines.length - 1; i >= 0; i--) {
		if (lines[i].trim() != '') {
			lastNonEmpty = i
			break
		}
	}

	lines = lines.slice(firstNonEmpty, lastNonEmpty + 1)

	let defaultIndent = 0

	for (let i = 0; i < lines[0].length; i++) {
		if (lines[0][i].trim() != '') {
			defaultIndent = i
			break
		}
	}

	lines = lines.map(line => line.substr(defaultIndent))

	return createCodeBlock(lines, options)
}

export const createCodeBlock = (code: string[], options: CodeBlockOptions = null) => {
	const maxLineNumberLength = code.length.toString().length

	const pad = (lineNumber: number, line: string) => {
		const lineNumberStr = lineNumber.toString()
		const lineNumberStrPad = `&nbsp;`.repeat(maxLineNumberLength - lineNumberStr.length)

		return /* html */ `<span class="line-number">${ lineNumberStrPad }${ lineNumberStr }</span><span class="line-content">${ line }</span>`
	}

	return /* html */ `
	<div class="code-block-container" ${ options?.id != null ? `id="${ options.id }"` : '' }>
		<div class="code-block" ${ options?.maxHeight ? `style="max-height: ${ options.maxHeight * 2 + 1 }ch"` : '' }>
			<code>
			${ code.map((line, index) => /* html */ `${ pad(index + 1, indent(line)) }`).join('') }
			</code>
		</div>
	</div>
	`
}

export const createInlineCodeBlock = (code: string) => /* html */ `<code class="inline">${ code }</code>`