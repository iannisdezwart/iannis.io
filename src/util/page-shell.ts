import { importJPG, inlineSVG } from 'page-compiler'

export const renderBody = async (inner: string, bigLogo: boolean) => /* html */ `
${ await renderNavbar(bigLogo ? 0.4 : 0.1) }

${ inlineSVG('src/img/background.svg', { alt: 'Background Image', id: 'background' }) }

<div id="page">
	${ inner }
</div>
`

const renderNavbar = async (logoHeightRatio: number) => /* html */ `
<div id="top">
	<div id="top-colour-strip"></div>
	<nav id="navbar">
		<div class="left">
			<div class="navbar-item">
				<a href="/" id="logo">
					${ await importJPG('src/img/face.png', {
						alt: 'Profile Picture',
						heightRatio: logoHeightRatio, id: 'profile-picture'
					}) }
					Iannis<span id="logo-last-name">&nbsp;de Zwart</span>
				</a>
			</div>
		</div>
		<div class="middle">
			<!--
			<div class="navbar-item">
				<a href="#">About</a>
			</div>
			-->
			<div class="navbar-item">
				<a href="/projects">Projects</a>
			</div>
			<div class="navbar-item">
				<a href="/blog">Blog</a>
			</div>
			<div class="navbar-item">
				<a href="/contact">Contact</a>
			</div>
		</div>
		<div class="right">
			<div class="navbar-item" id="hamburger-container">
				<div onclick="toggleNavbar()">
					${ inlineSVG('src/img/hamburger.svg', { id: 'hamburger', alt: 'Toggle Menu' }) }
				</div>
			</div>
		</div>
	</nav>
</div>
`