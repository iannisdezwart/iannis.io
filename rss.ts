import * as fs from 'fs'
import { blogPages } from './src/pages/blog/blog-pages'

const formatDate = (d: Date) => {
	const day = [
		'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
	][d.getDay()]

	const date = d.getDate()

	const month = [
		'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
		'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
	][d.getMonth()]

	const year = d.getFullYear()

	return `${ day }, ${ date } ${ month } ${ year }`
}

const htmlEncode = (html: string) => {
	return html.replace(/[\u00A0-\u9999<>\&]/gim,
		c => `$#${ c.charCodeAt(0) };`)
}

export const compileRSS = () => `\
<rss version="2.0">
	<channel>
		<title>Iannis de Zwart</title>
		<link>https://iannis.io/blog</link>
		<description>Iannis de Zwart's blog</description>
		<language>en-UK</language>
		<lastBuildDate>${ formatDate(new Date()) }</lastBuildDate>
\	\	${ blogPages.map(blogPage => `\
		<item>
			<title>${ htmlEncode(blogPage.title) }</title>
			<link>https://iannis.io/blog/${ blogPage.url }</link>
			<description>${ htmlEncode(blogPage.description) }</description>
			<pubDate>${ formatDate(blogPage.date) }</pubDate>
		</item>`).join('\n') }
	</channel>
</rss>
`

export default () => {
	fs.writeFileSync('root/rss.xml', compileRSS())
}