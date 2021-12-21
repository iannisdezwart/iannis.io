import { encodeDirName, inlineSVG } from 'page-compiler'
import { cl, comm, constr, createCodeBlockFromStr, func, id, keyw, num, op, param } from '../../../util/html-code-syntax-highlighting'
import { importLatex } from '../../../util/latex'
import { BlogPage, createSpoiler, linkSymbol } from '../blog-pages'
import ADS_DynamicDataStructures from './Dynamic Data Structures'

export default {
	imagePath: 'src/img/ADS Wallpaper.svg',
	imageAlt: 'ADS Wallpaper',
	title: 'AVL Trees',
	series: 'ADS',
	chapter: '0x05',
	description: 'Binary search trees, self-balancing trees and implementing an AVL tree.',
	date: new Date('21 December 2021'),
	keywords: [ 'ADS', 'Java' ],
	workInProgress: true,
	generateContent: async () => /* html */ `
	<h1 id="introduction">
		Introduction
		${ linkSymbol }
	</h1>

	<p>
		Binary search trees are very important data structures
		in computer science. They can be used to implement ordered sets
		and ordered maps.
		<br>
		To make them more efficient, it is often necessary to implement
		them as self-balancing trees. Self-balancing trees are trees
		that balance themselves after every insertion and deletion.
		<br>
		In this article, we will implement an AVL tree, which is
		such a self-balancing tree.
	</p>

	<br>

	<h2 id="binary-search-trees">
		Binary Search Trees
		${ linkSymbol }
	</h2>

	${ inlineSVG('src/img/Binary Search Tree.svg', { classes: [ 'fullwidth-image' ] }) }

	<p>
		<br><br>
		Due to their binary search nature, they provide three
		${ await importLatex('$O (\\log n)$') } operations:
		<ul>
			<li>
				Insertion
			</li>
			<li>
				Deletion
			</li>
			<li>
				Search
			</li>
		</ul>
	</p>
	`
} as BlogPage