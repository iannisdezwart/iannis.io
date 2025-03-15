import { formatDate } from '@iannisz/date-time-formatter'
import { importJPG, inlineSVG, PageShell } from 'page-compiler'
import { renderBody } from '../util/page-shell'
import { blogPages } from './blog/blog-pages'

export default async (pageShell: PageShell) => ({
	html: await pageShell.render('📒 Blog | Iannis de Zwart', await renderBody(/* html */ `
	<div class="inner-page">
		<h1>Blog</h1>
		<div class="cards">
			${ (await Promise.all(blogPages.map(async blogPage => /* html */ `
			<div class="card">
				<a href="/blog/${ blogPage.url }/" class="card-image-button">
					${
						blogPage.imagePath.endsWith('.svg')
							? inlineSVG(blogPage.imagePath, { alt: blogPage.imageAlt, classes: [ 'card-image' ] })
							: await importJPG(blogPage.imagePath, { alt: blogPage.imageAlt, classes: [ 'card-image' ] })
					}
					${ blogPage.chapter ? /* html */ `
					<span class="card-chapter">Chapter ${ blogPage.chapter }</span>` : '' }
					${ blogPage.workInProgress ? /* html */ `
					<span class="card-work-in-progress">Work in progress...</span>` : '' }
				</a>
				<div class="card-text">
					<h1>
						${ blogPage.series ? blogPage.series + ': ' : '' }
						${ blogPage.title }
					</h1>
					<p class="card-date">${ formatDate(blogPage.date, false) }</p>
					<p class="card-description">
						${ blogPage.description }
					</p>
				</div>
				<div class="card-read-button-container">
					<a class="button card-read-button" href="/blog/${ blogPage.url }/">Read</a>
				</div>
			</div>
			`))).join('') }
		</div>
	</div>
	`, false),
	{
		author: 'Iannis de Zwart',
		description: 'Iannis de Zwart\'s Blog',
		keywords: [ 'Iannis de Zwart', 'Iannis', 'Blog' ]
	}),
	path: '/blog/index.html'
})