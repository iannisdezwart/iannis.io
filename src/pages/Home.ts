import { importJPG, PageShell } from 'page-compiler'
import { renderBody } from '../util/page-shell'

export default async (pageShell: PageShell) => ({
	html: pageShell.render('👋 Iannis de Zwart', await renderBody(/* html */ `
	<div id="landing" class="inner-page">
		<div id="landing-foreground">
			${ await importJPG('src/img/face.png', { alt: 'Profile Picture', heightRatio: 0.4, id: 'profile-picture' }) }

			<div id="landing-text">
				<h2><span class="big-emoji">👋</span> Hello, I'm</h2>
				<h1>Iannis de Zwart</h1>
				<p>
					<span class="big-emoji">📚</span>
					Self-taught
					${ new Date(Date.now() - new Date('october 29, 2003').getTime()).getFullYear() - 1970 }-year-old
					<span class="slant">programmer</span>
					and
					<span class="slant">web designer</span>
					from the Netherlands
					<span class="big-emoji">🇳🇱</span>
				</p>
				<p>
					<span class="big-emoji">🖥</span>
					Studying
					<span class="slant">Computer Science & Engineering</span>
					at
					<a href="http://tudelft.nl/en/" target="_blank" rel="noopener noreferrer">Delft University of Technology</a>
					<span class="big-emoji">📒</span>
				</p>
			</div>
		</div>
	</div>
	`, true),
	{
		author: 'Iannis de Zwart',
		description: 'Iannis de Zwart',
		keywords: [ 'Iannis de Zwart', 'Iannis' ]
	}),
	path: '/index.html'
})