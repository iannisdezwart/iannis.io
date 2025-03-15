import { importJPG, inlineJS, inlineSVG, PageShell } from 'page-compiler'
import { renderBody } from '../../util/page-shell'

export const linkSymbol = inlineSVG('src/img/link.svg', { alt: 'Get link to this section', classes: [ 'link' ] })

export interface ProjectPage {
	imagePath: string
	imageAlt?: string
	title: string
	url: string
	description: string
	keywords?: string[]
	generateContent?: () => Promise<string>
	externalUrl?: string
}

import WebsiteYaronAbulafia from './Yaron Abulafia/Website'
import WebsiteOrlyWiersma from './Orly Wiersma/Website'
import WebsiteAmirKatzin from './Amir Katzin/Website'

export const projectPages: ProjectPage[] = [
	WebsiteAmirKatzin,
	WebsiteOrlyWiersma,
	WebsiteYaronAbulafia
]

export default (pageShell: PageShell) => projectPages.filter(projectPage => projectPage.externalUrl == null).map(async projectPage => ({
	html: await pageShell.render(`📒 ${ projectPage.title } | Iannis de Zwart`, await renderBody(/* html */ `
	<div id="blog-page" class="inner-page">
		<h1 class="title">${ projectPage.title }</h1>

		<ul class="blog-page-tags">
			${ projectPage.keywords.map(keyword => /* html */ `
			<li class="tag">
				<span>
					${ keyword }
				</span>
			</li>
			`).join('') }
		</ul>

		<div class="blog-page-image">
			${
				projectPage.imagePath.endsWith('.svg')
					? inlineSVG(projectPage.imagePath, { alt: projectPage.imageAlt, classes: [ 'card-image' ] })
					: await importJPG(projectPage.imagePath, { alt: projectPage.imageAlt, classes: [ 'card-image' ] })
			}
		</div>

		<div class="blog-page-content-container">
			<div class="blog-page-content">
				${ await projectPage.generateContent() }
			</div>
		</div>
	</div>

	${ await inlineJS('src/js/scrollbar.js') }
	${ await inlineJS('src/js/blog.js') }
	`, false),
	{
		author: 'Iannis de Zwart',
		description: projectPage.description,
		keywords: projectPage.keywords
	}),
	path: `/projects/${ projectPage.url }/index.html`
}))