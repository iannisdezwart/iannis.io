import { encodeDirName, importJPG, inlineJS, inlineSVG, PageShell } from 'page-compiler'
import { renderBody } from '../../util/page-shell'
import { formatDate } from '@iannisz/date-time-formatter'

export const linkSymbol = inlineSVG('src/img/link.svg', { alt: 'Get link to this section', classes: [ 'link' ] })

let spoilerIndex = 0

export const createSpoiler = (title: string, content: string) => /* html */ `
<div class="spoiler">
	<input type="checkbox" class="toggle" id="spoiler-toggle-${ ++spoilerIndex }">
	<label class="button" for="spoiler-toggle-${ spoilerIndex }">${ title }</label>

	<div class="spoiler-content">
		${ content }
	</div>
</div>
`

export interface BlogPage {
	imagePath: string
	imageAlt: string
	title: string
	series?: string
	chapter?: string
	workInProgress?: boolean
	description: string
	keywords: string[]
	date: Date
	generateContent: () => Promise<string>
}

import essentials_CPP_classes from './C++/Classes'
import hello_assembly from './Assembly/Hello Assembly'
import ADS_BigO from './ADS/Big O'
import ADS_AmortisedAnalysis from './ADS/Amortised Analysis'
import ADS_LinearDataStructures from './ADS/Linear Data Structures'
import ADS_DynamicDataStructures from './ADS/Dynamic Data Structures'
import ADS_Heaps from './ADS/Heaps'
import ADS_AVLTrees from './ADS/AVL Trees'

export const blogPages: BlogPage[] = [
	ADS_AVLTrees,
	ADS_Heaps,
	ADS_DynamicDataStructures,
	ADS_LinearDataStructures,
	ADS_AmortisedAnalysis,
	ADS_BigO,
	hello_assembly,
	essentials_CPP_classes
]

export default (pageShell: PageShell) => Promise.all(blogPages.map(async blogPage => ({
	html: pageShell.render(`📒 ${ blogPage.title } | Iannis de Zwart`, await renderBody(/* html */ `
	<div id="blog-page" class="inner-page">
		<h1 class="title">
			${ blogPage.series || '' } ${ blogPage.chapter ? blogPage.chapter + ':' : '' }
			${ blogPage.title }
		</h1>
		<h3 class="publish-date">Published ${ formatDate(blogPage.date, false) }</h3>

		<ul class="blog-page-tags">
			${ blogPage.keywords.map(keyword => /* html */ `
			<li class="tag">
				<span>
					${ keyword }
				</span>
			</li>
			`).join('') }
		</ul>

		<div class="blog-page-image">
		${
			blogPage.imagePath.endsWith('.svg')
				? inlineSVG(blogPage.imagePath, { alt: blogPage.imageAlt, classes: [ 'card-image' ] })
				: await importJPG(blogPage.imagePath, { alt: blogPage.imageAlt, classes: [ 'card-image' ] })
		}
		</div>

		<div class="blog-page-content-container">
			<div class="blog-page-content">
				${ await blogPage.generateContent() }
			</div>
		</div>
	</div>

	${ await inlineJS('src/js/scrollbar.js') }
	${ await inlineJS('src/js/blog.js') }
	`, false),
	{
		author: 'Iannis de Zwart',
		description: blogPage.description,
		keywords: blogPage.keywords
	}),
	path: `/blog/${ encodeDirName(blogPage.title) }/index.html`
})))