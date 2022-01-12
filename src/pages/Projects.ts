import { importJPG, inlineSVG, PageShell } from 'page-compiler'
import { renderBody } from '../util/page-shell'
import { projectPages } from './projects/project-pages'

export default async (pageShell: PageShell) => ({
	html: pageShell.render('🚀 Projects | Iannis de Zwart', await renderBody(/* html */ `
	<div class="inner-page">
		<h1 id="projects-title">Projects</h1>
		<h2>Stuff I've been working on</h2>
		<div class="cards">
			${ (await Promise.all(projectPages.map(async projectPage => {
				if (projectPage.externalUrl != null) return /* html */ `
				<div class="card">
					<a target="_blank" href="${ projectPage.externalUrl }" class="card-image-button">
						${
							projectPage.imagePath.endsWith('.svg')
								? inlineSVG(projectPage.imagePath, { alt: projectPage.imageAlt, classes: [ 'card-image' ] })
								: await importJPG(projectPage.imagePath, { alt: projectPage.imageAlt, classes: [ 'card-image' ] })
						}
					</a>
					<div class="card-text">
						<h1>${ projectPage.title }</h1>
						<p class="card-description">
							${ projectPage.description }
						</p>
					</div>
					<div class="card-read-button-container">
						<a class="button card-read-button" target="_blank" href="${ projectPage.externalUrl }">View</a>
					</div>
				</div>
				`
				else return /* html */ `
				<div class="card">
					<a href="/projects/${ projectPage.url }/" class="card-image-button">
						${
							projectPage.imagePath.endsWith('.svg')
								? inlineSVG(projectPage.imagePath, { alt: projectPage.imageAlt, classes: [ 'card-image' ] })
								: await importJPG(projectPage.imagePath, { alt: projectPage.imageAlt, classes: [ 'card-image' ] })
						}
					</a>
					<div class="card-text">
						<h1>${ projectPage.title }</h1>
						<p class="card-description">
							${ projectPage.description }
						</p>
					</div>
					<div class="card-read-button-container">
						<a class="button card-read-button" href="/blog/${ projectPage.url }/">Read</a>
					</div>
				</div>
				`
			}))).join('') }
		</div>
	</div>
	`, false),
	{
		author: 'Iannis de Zwart',
		description: 'Latest projects by Iannis de Zwart',
		keywords: [ 'Iannis de Zwart', 'Iannis' ]
	}),
	path: '/projects/index.html'
})