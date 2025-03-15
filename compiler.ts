import { compilePages, createPWAManifest, importGoogleFont, inlineJS, inlineSASS, PageShell, enableDebug } from 'page-compiler'
import homePageCompiler from './src/pages/Home'
import mainBlogPageCompiler from './src/pages/Blog'
import blogPagesCompiler from './src/pages/blog/blog-pages'
import mainProjectPageCompiler from './src/pages/Projects'
import projectPagesCompiler from './src/pages/projects/project-pages'
import contactPageCompiler from './src/pages/Contact'
import buildRSS from './rss'

const main = async () => {
	if (process.argv.includes('--debug')) {
		enableDebug()
	}

	const pageShell = new PageShell({
		head: /* html */ `
		${ await importGoogleFont('Poppins', [
			{ weight: 400, italic: false },
			{ weight: 400, italic: true },
			{ weight: 600, italic: false },
			{ weight: 600, italic: true },
			{ weight: 700, italic: false }
		]) }
		${ await importGoogleFont('Anonymous Pro', [
			{ weight: 400, italic: false },
			{ weight: 400, italic: true },
			{ weight: 700, italic: false }
		]) }
		${ await inlineSASS('./src/sass/index.sass') }
		${ await inlineJS('./src/js/mobile.js') }
		`,
		tail: /* html */ `
		${ await inlineJS('./src/js/index.js') }
		`
	})

	await createPWAManifest({
		name: 'Iannis de Zwart',
		shortName: 'Iannis de Zwart',
		startURL: '/',
		display: 'standalone',
		backgroundColour: '#ffb171',
		themeColour: '#ff5a5a',
		orientation: 'portrait-primary',
		icon: {
			png: 'src/img/face.png'
		}
	}, pageShell)

	compilePages([
		() => homePageCompiler(pageShell),
		() => mainBlogPageCompiler(pageShell),
		...blogPagesCompiler(pageShell).map(x => () => x),
		() => mainProjectPageCompiler(pageShell),
		... projectPagesCompiler(pageShell).map(x => () => x),
		() => contactPageCompiler(pageShell)
	])

	buildRSS()
}

main()
