import { importJPG, inlineSVG, PageShell } from 'page-compiler'
import { renderBody } from '../util/page-shell'

export default async (pageShell: PageShell) => ({
	html: pageShell.render('🧑‍💻 Iannis de Zwart', await renderBody(/* html */ `
	<div id="landing" class="inner-page">
		<div id="landing-foreground">
			${ await importJPG('src/img/face.png', { alt: 'Profile Picture', heightRatio: 0.4, id: 'profile-picture' }) }

			<div id="landing-text">
				<h2><span class="big-emoji">👋</span> Contact</h2>
				<h1>Iannis de Zwart</h1>
				<p>
					<span class="big-emoji">✉️</span>
					<a href="mailto:info@iannis.io">info@iannis.io</a>
					<br>
					<span class="big-emoji">🔑</span>
					<a href="/pgp">My PGP Public Key</a>
					<br>
					<span class="big-svg">
						${ inlineSVG('src/img/github-logo.svg') }
					</span>
					<a href="https://github.com/iannisdezwart">GitHub Profile</a>
				</p>
			</div>
		</div>
	</div>
	`, true),
	{
		author: 'Iannis de Zwart',
		description: 'Contact Iannis de Zwart',
		keywords: [ 'Iannis de Zwart', 'Iannis', 'Contact' ]
	}),
	path: '/contact/index.html'
})
