import * as fs from 'fs'
import * as http from 'http'
import { createHash } from 'crypto'
import { inlineSVG } from 'page-compiler'

const PORT = 3099

if (!fs.existsSync('cache/latex')) {
	  fs.mkdirSync('cache/latex')
}

export const importLatex = async (
	equation: string,
	options: {
		fixHeight?: boolean
		centre?: boolean
	} = {}
) => {
	options = {
		fixHeight: false,
		centre: false,
		...options
	}

	const classes = [ 'latex' ]

	if (options.fixHeight) {
		classes.push('fix-height')
	}

	if (options.centre) {
		classes.push('centre')
	}

	return await generateLatex(equation, classes)
}

export const generateLatex = (
	equation: string,
	classes: string[]
) => new Promise<string>((resolve, reject) => {
	const hash = createHash('md5').update(equation + classes.join()).digest('hex')
	const path = `cache/latex/${ hash }.svg`

	if (fs.existsSync(path)) {
		try {
			resolve(inlineSVG(path, { classes }))
		} catch {
			throw `Failed to inline SVG: ${ path }`
		}

		return
	}

	const req = http.request({
		hostname: 'localhost',
		port: PORT,
		path: '/render',
		method: 'POST',
	}, res => {
		let svg = ''

		res.on('data', chunk => {
			svg += chunk
		})

		res.on('end', () => {
			if (svg == 'Error while compiling LaTeX equation') {
				throw `Failed to compile LaTeX: ${ equation }`
			}

			fs.writeFileSync(path, svg)
			resolve(inlineSVG(path, { classes }))
		})

		res.on('error', () => {
			reject(new Error('Error while rendering latex'))
		})
	})

	req.setHeader('X-Scale', '1.1')
	req.end(equation)
})