import { encodeDirName, inlineSVG } from 'page-compiler'
import { cl, comm, constr, createCodeBlockFromStr, createInlineCodeBlock, func, id, keyw, num, op, param } from '../../../util/html-code-syntax-highlighting'
import { importLatex } from '../../../util/latex'
import { BlogPage, createSpoiler, linkSymbol } from '../blog-pages'
import ADS_DynamicDataStructures from './Dynamic Data Structures'

export default {
	imagePath: 'src/img/ADS Wallpaper.svg',
	imageAlt: 'ADS Wallpaper',
	title: 'AVL Trees',
	series: 'ADS',
	chapter: '0x05',
	description: 'Binary search trees, self-balancing trees and how an AVL tree is implemented.',
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

	<p>
		Binary search trees are trees that are ordered by their keys.
		If we were to do an in-order traversal of the tree, we would
		get the keys in ascending order:
	</p>

	${ inlineSVG('src/img/Binary Search Tree.svg', { classes: [ 'fullwidth-image' ] }) }

	<p>
		<br><br>
		Due to their sorted nature, binary search trees provide three
		${ await importLatex('$O (\\log n)$') } operations:
		<ul>
			<li>
				<strong>Insertion</strong>:
				traverse down the tree until
				we find a leaf node, and insert a new node with
				the provided value as its left or right child.
				<br>
				If we find a node with the same value along
				the way, the value is already in the tree and
				we do nothing. Binary search trees do not
				support duplicate values.
				</li>
			<li>
				<strong>Deletion</strong>:
				traverse down the tree until
				we find a node with the value we want to delete.
				We replace the node with its left child.
				If it doesn't have a left child, we replace it
				with its right child.
				<br>
				If we don't find a node with the value to
				delete, we do nothing.
			</li>
			<li>
				<strong>Search</strong>:
				traverse down the tree until
				we find the node we are looking for. Then we
				return true. If we don't find it, we return
				false.
			</li>
		</ul>

		<br><br>

		Binary search trees are quite easy to implement, but they
		can be very inefficient, because they are not self-balancing.
		<br>
		Imagine that we implement a binary search tree with the
		algorithms described above, and we insert the integers between
		1 and 5 in order.
		<br>
		We will end up with a tree like this:
	</p>

	${ inlineSVG('src/img/Binary Search Tree Bad.svg', { classes: [ 'fullwidth-image' ] }) }

	<p>
		That doesn't look very much like a binary tree!
		In fact, we have a unary tree, which is a tree with only
		one node as child. Do you know another name for this data
		structure?
		<br>
		I do, it's a linked list.
		<br>
		When we try to search for the value 5, we have to traverse
		down the entire tree, which completely defeats the purpose of
		a binary search tree.
		<br>
		This is why we need self-balancing trees.
	</p>

	<br>

	<h2 id="balanced-trees">
		"Balanced" Trees
		${ linkSymbol }
	</h2>

	<p>
		Before we can understand what a self-balancing tree is,
		we first have to define what makes a tree balanced.
		This definition depends on the type of self-balancing tree
		we are dealing with.
		<br><br>
		Since we are going to implement an AVL tree in this article,
		we will use the following definition:
	<p>

	<div class="quote">
		An AVL tree is balanced if it consists solely of balanced nodes.
		A node is considered to be balanced if and only if the heights
		of its left and right child nodes differ by at most one.
	</div>

	${ inlineSVG('src/img/AVL Tree.svg', { classes: [ 'fullwidth-image' ] }) }

	<p>
		The above tree is balanced, because there is no node
		which children's heights differ by more than one.
		<br>
		Note that the height of a null node is 0.
		<br><br>
		Let's look at node 3 and find out if it is balanced or not.
		<br>
		Node 3 only has a left child, which has a height of 1.
		The right child of node 3 is null, so it has a height of 0.
		Since the height difference between the heights of the
		children of node 3 is one, this node is balanced.
		<br><br>
		Now let's look at node 8.
		<br>
		Both children of node 8 have heights of 1, so node 8 is
		balanced.
		<br><br>
		We can use the same logic for all other nodes and see that
		they are all balanced.
		<br><br>
		The definition of a balanced AVL tree also allows for some
		intuition:
		AVL trees are balanced if they look "kind of complete".
		All levels in the tree must be filled, except for the last two
		levels, which may be partially filled with gaps in between.
		<br><br>
		If we were to add a node to the tree, we might have to
		rebalance the tree.
	</p>

	${ inlineSVG('src/img/AVL Tree Add.svg', { classes: [ 'fullwidth-image' ] }) }

	<p>
		In the above image, we can see that when we add a node with
		value 2 to the tree, we have to rebalance the tree, because
		the tree is not balanced anymore at node 3.
		<br>
		We will have to perform a rotation to fix the tree.
		In particular, this rotation is called a "left-right rotation",
		because the three nodes we are rotating around are in a
		left-right order.
		We can see that the tree is properly balanced again after
		the rotation.
		<br><br>
		To make things more efficient, we store the height of each
		node in the tree.
		It's important to realise that we have to update the
		heights of all nodes in the traversal path when we insert
		the new node.
	</p>

	<br>

	<h2 id="avl-tree-rotations">
		AVL Tree Rotations
		${ linkSymbol }
	</h2>

	<p>
		We can generalise what we have discussed so far to four
		different scenarios, which all require their own rotation.
		Before we go over these four scenarios, let's first write
		some essential code for AVL tree nodes:
	</p>

	${ createCodeBlockFromStr(`
	${ keyw('class') } ${ cl('AVLTreeNode') }${ op('<') }${ cl('T') }${ op('>') }
	{
		${ keyw('public') } ${ cl('T') } ${ id('value') };
		${ keyw('public') } ${ keyw('int') } ${ id('height') };
		${ keyw('public') } ${ cl('AVLTreeNode') }${ op('<') }${ cl('T') }${ op('>') } ${ id('left') };
		${ keyw('public') } ${ cl('AVLTreeNode') }${ op('<') }${ cl('T') }${ op('>') } ${ id('right') };

		${ comm('/**') }
		${ comm(' * Constructs an AVL tree leaf node with a given value.') }
		${ comm(' */') }
		${ keyw('public') }
		${ constr('AVLTreeNode') }(${ cl('T') } ${ id('value') })
		{
			${ cl('this') }.${ id('value') } ${ op('=') } ${ id('value') };
			${ id('height') } ${ op('=') } ${ num('1') };
			${ id('left') } ${ op('=') } ${ num('null') };
			${ id('right') } ${ op('=') } ${ num('null') };
		}
	}

	${ keyw('class') } ${ cl('AVLTree') }${ op('<') }${ cl('T') } ${ keyw('extends') } ${ cl('Comparable') }${ op('<') }${ cl('T') }${ op('>') }${ op('>') }
	{
		${ keyw('public') } ${ cl('AVLTreeNode') }${ op('<') }${ cl('T') }${ op('>') } ${ id('root') };
		${ keyw('int') } ${ id('size') };

		${ comm('/**') }
		${ comm(' * Constructs an empty AVL tree.') }
		${ comm(' */') }
		${ keyw('public') }
		${ constr('AVLTree') }()
		{
			${ id('root') } ${ op('=') } ${ num('null') };
			${ id('size') } ${ op('=') } ${ num('0') };
		}

		${ keyw('public') } ${ keyw('void') }
		${ func('insert') }(${ cl('T') } ${ id('value') }) { ... }

		${ keyw('public') } ${ keyw('void') }
		${ func('remove') }(${ cl('T') } ${ id('value') }) { ... }

		${ keyw('public') } ${ keyw('boolean') }
		${ func('has') }(${ cl('T') } ${ id('value') }) { ... }

		${ comm('/**') }
		${ comm(' * Returns the height of a node in an AVL tree.') }
		${ comm(' * If the node is null, returns 0.') }
		${ comm(' */') }
		${ keyw('private') } ${ keyw('int') }
		${ func('avlHeight') }(${ cl('AVLTreeNode') }${ op('<') }${ cl('T') }${ op('>') } ${ param('node') })
		{
			${ keyw('if') }(${ param('node') } ${ op('==') } ${ num('null') })
			{
				${ keyw('return') } ${ num('0') };
			}

			${ keyw('return') } ${ param('node') }.${ id('height') };
		}
	}
	`) }

	<p>
		Now we will go over the four rotation scenarios.
		We will create a function for each of them, which will take in
		a node and perform the appropriate rotation.
		<br>
		In the end, the new root node of the subtree is returned.
	</p>

	<br>

	<h3 id="left-left-rotation">
		Left-Left Rotation
		${ linkSymbol }
	</h3>

	${ inlineSVG('src/img/AVL Tree Rebalance Left Left.svg', { classes: [ 'fullwidth-image' ] }) }

	<p>
		In this scenario, we have a left-left imbalance.
		The tree leans too much towards the left-left side.
		<br><br>
		The height of Y is at least two greater than the height of T4.
		<br>
		The highest child of Y is its left child: X.
		Therefore we will have to perform a rotation around X, Y and Z
		to fix the tree.
	</p>

	${ createCodeBlockFromStr(`
	${ comm('/**') }
	${ comm(' * Rebalances the subtree rooted at node `z` for the left-left case.') }
	${ comm(' */') }
	${ keyw('private') } ${ cl('AVLTreeNode') }${ op('<') }${ cl('T') }${ op('>') }
	${ func('avlRebalanceLeftLeft') }(${ cl('AVLTreeNode') }${ op('<') }${ cl('T') }${ op('>') } ${ param('z') })
	{
		${ cl('AVLTreeNode') }${ op('<') }${ cl('T') }${ op('>') } ${ id('y') } ${ op('=') } ${ param('z') }.${ id('left') };
		${ cl('AVLTreeNode') }${ op('<') }${ cl('T') }${ op('>') } ${ id('x') } ${ op('=') } ${ id('y') }.${ id('left') };
		${ cl('AVLTreeNode') }${ op('<') }${ cl('T') }${ op('>') } ${ id('T1') } ${ op('=') } ${ id('x') }.${ id('left') };
		${ cl('AVLTreeNode') }${ op('<') }${ cl('T') }${ op('>') } ${ id('T2') } ${ op('=') } ${ id('x') }.${ id('right') };
		${ cl('AVLTreeNode') }${ op('<') }${ cl('T') }${ op('>') } ${ id('T3') } ${ op('=') } ${ id('y') }.${ id('right') };
		${ cl('AVLTreeNode') }${ op('<') }${ cl('T') }${ op('>') } ${ id('T4') } ${ op('=') } ${ param('z') }.${ id('right') };

		${ comm('// Reorganise the nodes.') }

		${ param('z') }.${ id('left') } ${ op('=') } ${ id('T3') };
		${ id('y') }.${ id('right') } ${ op('=') } ${ param('z') };

		${ comm('// Update the heights.') }

		${ id('x') }.${ id('height') } ${ op('=') } ${ num('1') } ${ op('+') } ${ cl('Math') }.${ func('max') }(${ func('avlHeight') }(${ id('T1') }), ${ func('avlHeight') }(${ id('T2') }));
		${ id('y') }.${ id('height') } ${ op('=') } ${ num('1') } ${ op('+') } ${ cl('Math') }.${ func('max') }(${ func('avlHeight') }(${ id('T3') }), ${ func('avlHeight') }(${ id('T4') }));
		${ param('z') }.${ id('height') } ${ op('=') } ${ num('1') } ${ op('+') } ${ cl('Math') }.${ func('max') }(${ id('x') }.${ id('height') }, ${ id('y') }.${ id('height') });

		${ comm('// Return the new root.') }

		${ keyw('return') } ${ id('y') };
	}
	`) }

	<br>

	<h3 id="left-right-rotation">
		Left-Right Rotation
		${ linkSymbol }
	</h3>

	${ inlineSVG('src/img/AVL Tree Rebalance Left Right.svg', { classes: [ 'fullwidth-image' ] }) }

	<p>
		In this scenario, we have a left-right imbalance.
		The tree leans too much towards the left-right side.
		<br><br>
		The height of Y is at least two greater than the height of T4.
		<br>
		The highest child of Y is its right child: X.
		Therefore we will have to perform a rotation around X, Y and Z
		to fix the tree.
	</p>

	${ createCodeBlockFromStr(`
	${ comm('/**') }
	${ comm(' * Rebalances the subtree rooted at node `z` for the left-right case.') }
	${ comm(' */') }
	${ keyw('private') } ${ cl('AVLTreeNode') }${ op('<') }${ cl('T') }${ op('>') }
	${ func('avlRebalanceLeftRight') }(${ cl('AVLTreeNode') }${ op('<') }${ cl('T') }${ op('>') } ${ param('z') })
	{
		${ cl('AVLTreeNode') }${ op('<') }${ cl('T') }${ op('>') } ${ id('y') } ${ op('=') } ${ param('z') }.${ id('left') };
		${ cl('AVLTreeNode') }${ op('<') }${ cl('T') }${ op('>') } ${ id('x') } ${ op('=') } ${ id('y') }.${ id('right') };
		${ cl('AVLTreeNode') }${ op('<') }${ cl('T') }${ op('>') } ${ id('T1') } ${ op('=') } ${ id('y') }.${ id('left') };
		${ cl('AVLTreeNode') }${ op('<') }${ cl('T') }${ op('>') } ${ id('T2') } ${ op('=') } ${ id('x') }.${ id('left') };
		${ cl('AVLTreeNode') }${ op('<') }${ cl('T') }${ op('>') } ${ id('T3') } ${ op('=') } ${ id('x') }.${ id('right') };
		${ cl('AVLTreeNode') }${ op('<') }${ cl('T') }${ op('>') } ${ id('T4') } ${ op('=') } ${ param('z') }.${ id('right') };

		${ comm('// Reorganise the nodes.') }

		${ id('y') }.${ id('right') } ${ op('=') } ${ id('T2') };
		${ param('z') }.${ id('left') } ${ op('=') } ${ id('T3') };
		${ id('x') }.${ id('left') } ${ op('=') } ${ id('y') };
		${ id('x') }.${ id('right') } ${ op('=') } ${ param('z') };

		${ comm('// Update the heights.') }

		${ id('y') }.${ id('height') } ${ op('=') } ${ num('1') } ${ op('+') } ${ cl('Math') }.${ func('max') }(${ func('avlHeight') }(${ id('T1') }), ${ func('avlHeight') }(${ id('T2') }));
		${ param('z') }.${ id('height') } ${ op('=') } ${ num('1') } ${ op('+') } ${ cl('Math') }.${ func('max') }(${ func('avlHeight') }(${ id('T3') }), ${ func('avlHeight') }(${ id('T4') }));
		${ id('x') }.${ id('height') } ${ op('=') } ${ num('1') } ${ op('+') } ${ cl('Math') }.${ func('max') }(${ id('y') }.${ id('height') }, ${ param('z') }.${ id('height') });

		${ comm('// Return the new root.') }

		${ keyw('return') } ${ id('x') };
	}
	`) }

	<br>

	<h3 id="right-right-rotation">
		Right-Right Rotation
		${ linkSymbol }
	</h3>

	${ inlineSVG('src/img/AVL Tree Rebalance Right Right.svg', { classes: [ 'fullwidth-image' ] }) }

	<p>
		In this scenario, we have a right-right imbalance.
		The tree leans too much towards the right-right side.
		<br><br>
		The height of Y is at least two greater than the height of T1.
		<br>
		The highest child of Y is its right child: X.
		Therefore we will have to perform a rotation around X, Y and Z
		to fix the tree.
	</p>

	${ createCodeBlockFromStr(`
	${ comm('/**') }
	${ comm(' * Rebalances the subtree rooted at node `z` for the right-right case.') }
	${ comm(' */') }
	${ keyw('private') } ${ cl('AVLTreeNode') }${ op('<') }${ cl('T') }${ op('>') }
	${ func('avlRebalanceRightRight') }(${ cl('AVLTreeNode') }${ op('<') }${ cl('T') }${ op('>') } ${ param('z') })
	{
		${ cl('AVLTreeNode') }${ op('<') }${ cl('T') }${ op('>') } ${ id('y') } ${ op('=') } ${ param('z') }.${ id('right') };
		${ cl('AVLTreeNode') }${ op('<') }${ cl('T') }${ op('>') } ${ id('x') } ${ op('=') } ${ id('y') }.${ id('right') };
		${ cl('AVLTreeNode') }${ op('<') }${ cl('T') }${ op('>') } ${ id('T1') } ${ op('=') } ${ param('z') }.${ id('left') };
		${ cl('AVLTreeNode') }${ op('<') }${ cl('T') }${ op('>') } ${ id('T2') } ${ op('=') } ${ id('y') }.${ id('left') };
		${ cl('AVLTreeNode') }${ op('<') }${ cl('T') }${ op('>') } ${ id('T3') } ${ op('=') } ${ id('x') }.${ id('left') };
		${ cl('AVLTreeNode') }${ op('<') }${ cl('T') }${ op('>') } ${ id('T4') } ${ op('=') } ${ id('x') }.${ id('right') };

		${ comm('// Reorganise the nodes.') }

		${ param('z') }.${ id('right') } ${ op('=') } ${ id('T2') };
		${ id('y') }.${ id('left') } ${ op('=') } ${ param('z') };

		${ comm('// Update the heights.') }

		${ param('z') }.${ id('height') } ${ op('=') } ${ num('1') } ${ op('+') } ${ cl('Math') }.${ func('max') }(${ func('avlHeight') }(${ id('T1') }), ${ func('avlHeight') }(${ id('T2') }));
		${ id('x') }.${ id('height') } ${ op('=') } ${ num('1') } ${ op('+') } ${ cl('Math') }.${ func('max') }(${ func('avlHeight') }(${ id('T3') }), ${ func('avlHeight') }(${ id('T4') }));
		${ id('y') }.${ id('height') } ${ op('=') } ${ num('1') } ${ op('+') } ${ cl('Math') }.${ func('max') }(${ id('x') }.${ id('height') }, ${ param('z') }.${ id('height') });

		${ comm('// Return the new root.') }

		${ keyw('return') } ${ id('y') };
	}
	`) }

	<br>

	<h3 id="right-left-rotation">
		Right-Left Rotation
		${ linkSymbol }
	</h3>

	${ inlineSVG('src/img/AVL Tree Rebalance Right Left.svg', { classes: [ 'fullwidth-image' ] }) }

	<p>
		In this scenario, we have a right-left imbalance.
		The tree leans too much towards the right-left side.
		<br><br>
		The height of Y is at least two greater than the height of T1.
		<br>
		The highest child of Y is its left child: X.
		Therefore we will have to perform a rotation around X, Y and Z
		to fix the tree.
	</p>

	${ createCodeBlockFromStr(`
	${ comm('/**') }
	${ comm(' * Rebalances the subtree rooted at node `z` for the right-left case.') }
	${ comm(' */') }
	${ keyw('private') } ${ cl('AVLTreeNode') }${ op('<') }${ cl('T') }${ op('>') }
	${ func('avlRebalanceRightLeft') }(${ cl('AVLTreeNode') }${ op('<') }${ cl('T') }${ op('>') } ${ param('z') })
	{
		${ cl('AVLTreeNode') }${ op('<') }${ cl('T') }${ op('>') } ${ id('y') } ${ op('=') } ${ param('z') }.${ id('right') };
		${ cl('AVLTreeNode') }${ op('<') }${ cl('T') }${ op('>') } ${ id('x') } ${ op('=') } ${ id('y') }.${ id('left') };
		${ cl('AVLTreeNode') }${ op('<') }${ cl('T') }${ op('>') } ${ id('T1') } ${ op('=') } ${ param('z') }.${ id('left') };
		${ cl('AVLTreeNode') }${ op('<') }${ cl('T') }${ op('>') } ${ id('T2') } ${ op('=') } ${ id('x') }.${ id('left') };
		${ cl('AVLTreeNode') }${ op('<') }${ cl('T') }${ op('>') } ${ id('T3') } ${ op('=') } ${ id('x') }.${ id('right') };
		${ cl('AVLTreeNode') }${ op('<') }${ cl('T') }${ op('>') } ${ id('T4') } ${ op('=') } ${ id('y') }.${ id('right') };

		${ comm('// Reorganise the nodes.') }

		${ param('z') }.${ id('right') } ${ op('=') } ${ id('T2') };
		${ id('y') }.${ id('left') } ${ op('=') } ${ id('T3') };
		${ id('x') }.${ id('left') } ${ op('=') } ${ param('z') };
		${ id('x') }.${ id('right') } ${ op('=') } ${ id('y') };

		${ comm('// Update the heights.') }

		${ param('z') }.${ id('height') } ${ op('=') } ${ num('1') } ${ op('+') } ${ cl('Math') }.${ func('max') }(${ func('avlHeight') }(${ id('T1') }), ${ func('avlHeight') }(${ id('T2') }));
		${ id('y') }.${ id('height') } ${ op('=') } ${ num('1') } ${ op('+') } ${ cl('Math') }.${ func('max') }(${ func('avlHeight') }(${ id('T3') }), ${ func('avlHeight') }(${ id('T4') }));
		${ id('x') }.${ id('height') } ${ op('=') } ${ num('1') } ${ op('+') } ${ cl('Math') }.${ func('max') }(${ id('y') }.${ id('height') }, ${ param('z') }.${ id('height') });

		${ comm('// Return the new root.') }

		${ keyw('return') } ${ id('x') };
	}
	`) }

	<br>

	<h2 id="avl-tree-insertion">
		AVL Tree Insertion
		${ linkSymbol }
	</h2>

	<p>
		One of the three main operations in an AVL tree is the
		insertion of a particular value.
		<br><br>
		The insertion process takes ${ await importLatex('$O(\\log n)$') }
		time, where ${ await importLatex('$n$') } is the number of nodes in the tree.
		<br><br>
		The insertion process is implemented in the following
		three steps:
		<ol>
			<li>
				Traverse down the tree in binary search
				fashion; if we come across a node with a value
				larger than the value we are trying to insert,
				we go left. If we come across a smaller node,
				we go right.
				<br><br>
				We have to keep in mind one edge case:
				if we find a node with the same value as the
				value we are trying to insert, we will stop
				the insertion process and not do anything.
				AVL trees don't store duplicate values.
			</li>
			<br>
			<li>
				When we are done traversing, we have found
				a leaf node where we will insert the new
				value. We create a node for the value and
				attach it to the correct side of the leaf node.
			</li>
			<br>
			<li>
				We traverse back up the tree. In each step
				we recompute the height of the current node,
				and check if the node is balanced.
				<br><br>
				If a node becomes unbalanced, we check which
				rotation we have to perform in order to fix
				the tree. We perform the rotation.
			</li>
		</ol>
	</p>

	${ inlineSVG('src/img/AVL Tree Add.svg') }

	${ createCodeBlockFromStr(`
	${ keyw('private') } ${ cl('AVLTreeNode') }${ op('<') }${ cl('T') }${ op('>') }
	${ func('avlInsert') }(${ cl('AVLTreeNode') }${ op('<') }${ cl('T') }${ op('>') } ${ param('node') }, ${ cl('T') } ${ param('value') })
	{
		${ comm('// When we reach the end of the tree') }
		${ comm('// insert the new value at this position.') }

		${ keyw('if') } (${ param('node') } ${ op('==') } ${ num('null') })
		{
			${ id('size') }${ op('++') };
			${ keyw('return') } ${ keyw('new') } ${ cl('AVLTreeNode') }${ op('<') }${ cl('T') }${ op('>') }(${ param('value') });
		}

		${ comm('// Traverse the tree according to how the new value compares') }
		${ comm('// to the left and right children of the current node.') }

		${ keyw('if') } (${ param('value') }.${ func('compareTo') }(${ param('node') }.${ id('value') }) ${ op('<') } ${ num('0') })
		{
			${ param('node') }.${ id('left') } ${ op('=') } ${ func('avlInsert') }(${ param('node') }.${ id('left') }, ${ param('value') });
		}
		${ keyw('else') } ${ keyw('if') } (${ param('value') }.${ func('compareTo') }(${ param('node') }.${ id('value') }) ${ op('>') } ${ num('0') })
		{
			${ param('node') }.${ id('right') } ${ op('=') } ${ func('avlInsert') }(${ param('node') }.${ id('right') }, ${ param('value') });
		}
		${ keyw('else') }
		{
			${ comm('// The value already exists in the tree.') }
			${ comm('// We will do nothing.') }

			${ keyw('return') } ${ param('node') };
		}

		${ comm('// Get the height of the left and right children.') }

		${ keyw('int') } ${ id('leftHeight') } ${ op('=') } ${ func('avlHeight') }(${ param('node') }.${ id('left') });
		${ keyw('int') } ${ id('rightHeight') } ${ op('=') } ${ func('avlHeight') }(${ param('node') }.${ id('right') });

		${ comm('// After the recursive downwards step, we will traverse the') }
		${ comm('// tree upwards again and update the height of the current node.') }

		${ param('node') }.${ id('height') } ${ op('=') } ${ num('1') } ${ op('+') } ${ cl('Math') }.${ func('max') }(${ id('leftHeight') }, ${ id('rightHeight') });

		${ comm('// We will check if the current node is unbalanced.') }
		${ comm('// If it is, we will have to find a rotation to fix it.') }

		${ keyw('int') } ${ id('balance') } ${ op('=') } ${ id('leftHeight') } ${ op('-') } ${ id('rightHeight') };

		${ keyw('if') } (${ id('balance') } ${ op('>') } ${ num('1') })
		{
			${ comm('// The left subtree is too tall.') }

			${ keyw('if') } (${ param('value') }.${ func('compareTo') }(${ param('node') }.${ id('left') }.${ id('value') }) ${ op('<') } ${ num('0') })
			{
				${ comm('// Left-left case.') }

				${ keyw('return') } ${ func('avlRebalanceLeftLeft') }(${ param('node') });
			}
			${ keyw('else') }
			{
				${ comm('// Left-right case.') }

				${ keyw('return') } ${ func('avlRebalanceLeftRight') }(${ param('node') });
			}
		}

		${ keyw('if') } (${ id('balance') } ${ op('<') } ${ op('-') }${ num('1') })
		{
			${ comm('// The right subtree is too tall.') }

			${ keyw('if') } (${ param('value') }.${ func('compareTo') }(${ param('node') }.${ id('right') }.${ id('value') }) ${ op('>') } ${ num('0') })
			{
				${ comm('// Right-right case.') }

				${ keyw('return') } ${ func('avlRebalanceRightRight') }(${ param('node') });
			}
			${ keyw('else') }
			{
				${ comm('// Right-left case.') }

				${ keyw('return') } ${ func('avlRebalanceRightLeft') }(${ param('node') });
			}
		}

		${ comm('// This node is already balanced, so we just return it') }
		${ comm('// as it currently is.') }

		${ keyw('return') } ${ param('node') };
	}
	`) }

	<p>
		<strong>Note for the attentive reader:</strong>
		I have received a very good question about the part of the
		above code where we decide which rotation to perform.
		<br><br>
		In the code above, we check in what subtree we inserted
		the new value. We make the decision based on that information,
		and not on which subtree is actually higher. This is not a
		mistake, but an optimisation. It is slightly more efficient
		to compare the node to the value we inserted than to compare
		heights of both children.
		<br><br>
		The reason this works is because the newly inserted node
		will always be in the subtree that is too large. After all,
		the new node caused the imbalance in the first place.
		<br><br>
		If we get to an unbalanced node, we can now simply check in
		what subtree we inserted the new value to get the correct
		rotation we have to perform. If the node is in the left-right
		subtree, we will perform a left-right rotation etc.
		<br><br>
		We <em>cannot</em> perform this optimisation if we want to
		remove a node. So in the AVL removal code you will see below,
		we will instead check which subtree is higher the
		unoptimised way.
	</p>

	<br>

	<h2 id="avl-tree-removal">
		AVL Tree Removal
		${ linkSymbol }
	</h2>

	<p>
		The second fundamental operation of an AVL tree is the
		removal of a value from the tree.
		<br>
		This algorithm also takes ${ await importLatex('$O(\\log n)$') }
		time.
		<br><br>
		The algorithm is as follows:
		<ol>
			<li>
				Traverse down the tree in binary search fashion; if we come across a node with a value larger than the value we are trying to remove, we go left. If we come across a smaller node, we go right.
			</li>
			<br>
			<li>
				When we come across the node we want to delete,
				we will delete it from the AVL tree.
				<br><br>
				There are three cases to consider:
				<ul>
					<li>
						If the node has no children,
						we can simply delete it.
					</li>
					<li>
						If the node has one child,
						we will can it with its child.
					</li>
					<li>
						If the node has two children,
						we will replace it with the
						smallest value in its
						right subtree.
					</li>
				</ul>
				If we did't find the node we are looking for,
				we will simply return the tree as it is.
			</li>
			<br>
			<li>
				We traverse back up the tree. In each step we recompute the height of the current node, and check if the node is balanced.
				<br><br>
				If a node becomes unbalanced, we check which rotation we have to perform in order to fix the tree. We perform the rotation.
			</li>
		</ol>
	</p>

	${ inlineSVG('src/img/AVL Tree Remove.svg', { classes: [ 'fullwidth-image' ] }) }

	${ createCodeBlockFromStr(`
	${ keyw('private') } ${ cl('int') }
	${ func('avlBalance') }(${ cl('AVLTreeNode') }${ op('<') }${ cl('T') }${ op('>') } ${ param('node') })
	{
		${ keyw('if') } (${ param('node') } ${ op('==') } ${ num('null') })
		{
			${ keyw('return') } ${ num('0') };
		}

		${ keyw('return') } ${ func('avlHeight') }(${ param('node') }.${ id('left') }) ${ op('-') } ${ func('avlHeight') }(${ param('node') }.${ id('right') });
	}

	${ keyw('private') } ${ cl('AVLTreeNode') }${ op('<') }${ cl('T') }${ op('>') }
	${ func('avlRemove') }(${ cl('AVLTreeNode') }${ op('<') }${ cl('T') }${ op('>') } ${ param('node') }, ${ cl('T') } ${ param('value') })
	{
		${ comm('// When we reach the end of the tree,') }
		${ comm('// the value we want to remove is not in the tree.') }
		${ comm('// We will simply return and do nothing.') }

		${ keyw('if') } (${ param('node') } ${ op('==') } ${ num('null') })
		{
			${ keyw('return') } ${ num('null') };
		}

		${ comm('// Traverse the tree according to how the value to be removed') }
		${ comm('// compares to the left and right children of the current node.') }

		${ keyw('if') } (${ param('value') }.${ func('compareTo') }(${ param('node') }.${ id('value') }) ${ op('<') } ${ num('0') })
		{
			${ param('node') }.${ id('left') } ${ op('=') } ${ func('avlRemove') }(${ param('node') }.${ id('left') }, ${ param('value') });
		}
		${ keyw('else') } ${ keyw('if') } (${ param('value') }.${ func('compareTo') }(${ param('node') }.${ id('value') }) ${ op('>') } ${ num('0') })
		{
			${ param('node') }.${ id('right') } ${ op('=') } ${ func('avlRemove') }(${ param('node') }.${ id('right') }, ${ param('value') });
		}
		${ keyw('else') }
		{
			${ comm('// We found the node to be removed.') }
			${ comm('// Now we have to check if this node has one or two children') }
			${ comm('// or if it is a leaf.') }

			${ id('size') }${ op('--') };
			${ param('node') } ${ op('=') } ${ func('avlDeleteNode') }(${ param('node') });
		}

		${ comm('// Make sure the node exists.') }

		${ keyw('if') } (${ param('node') } ${ op('==') } ${ num('null') })
		{
			${ keyw('return') } ${ num('null') };
		}

		${ comm('// Get the height of the left and right children.') }

		${ keyw('int') } ${ id('leftHeight') } ${ op('=') } ${ func('avlHeight') }(${ param('node') }.${ id('left') });
		${ keyw('int') } ${ id('rightHeight') } ${ op('=') } ${ func('avlHeight') }(${ param('node') }.${ id('right') });

		${ comm('// After the recursive downwards step, we will traverse the') }
		${ comm('// tree upwards again and update the height of the current node.') }

		${ param('node') }.${ id('height') } ${ op('=') } ${ num('1') } ${ op('+') } ${ cl('Math') }.${ func('max') }(${ id('leftHeight') }, ${ id('rightHeight') });

		${ comm('// We will check if the current node is unbalanced.') }
		${ comm('// If it is, we will have to find a rotation to fix it.') }

		${ keyw('int') } ${ id('balance') } ${ op('=') } ${ id('leftHeight') } ${ op('-') } ${ id('rightHeight') };

		${ keyw('if') } (${ id('balance') } ${ op('>') } ${ num('1') })
		{
			${ comm('// The left subtree is too tall.') }

			${ keyw('if') } (${ func('avlBalance') }(${ param('node') }.${ id('left') }) ${ op('>=') } ${ num('0') })
			{
				${ comm('// Left-left case.') }

				${ keyw('return') } ${ func('avlRebalanceLeftLeft') }(${ param('node') });
			}
			${ keyw('else') }
			{
				${ comm('// Left-right case.') }

				${ keyw('return') } ${ func('avlRebalanceLeftRight') }(${ param('node') });
			}
		}

		${ keyw('if') } (${ id('balance') } ${ op('<') } ${ op('-') }${ num('1') })
		{
			${ comm('// The right subtree is too tall.') }

			${ keyw('if') } (${ func('avlBalance') }(${ param('node') }.${ id('left') }) ${ op('<=') } ${ num('0') })
			{
				${ comm('// Right-right case.') }

				${ keyw('return') } ${ func('avlRebalanceRightRight') }(${ param('node') });
			}
			${ keyw('else') }
			{
				${ comm('// Right-left case.') }

				${ keyw('return') } ${ func('avlRebalanceRightLeft') }(${ param('node') });
			}
		}

		${ comm('// This node is already balanced, so we just return it') }
		${ comm('// as it currently is.') }

		${ keyw('return') } ${ param('node') };
	}

	${ keyw('private') } ${ cl('AVLTreeNode') }${ op('<') }${ cl('T') }${ op('>') }
	${ func('avlDeleteNode') }(${ cl('AVLTreeNode') }${ op('<') }${ cl('T') }${ op('>') } ${ param('node') })
	{
		${ comm('// Check how many children this node has.') }

		${ keyw('if') } (${ param('node') }.${ id('left') } ${ op('==') } ${ num('null') } ${ op('&&') } ${ param('node') }.${ id('right') } ${ op('==') } ${ num('null') })
		{
			${ comm('// The node has no children.') }
			${ comm('// We can just delete it from the tree.') }

			${ keyw('return') } ${ num('null') };
		}

		${ keyw('if') } (${ param('node') }.${ id('left') } ${ op('==') } ${ num('null') })
		{
			${ comm('// The node has only a right child.') }
			${ comm('// We can just replace the node with its right child.') }

			${ keyw('return') } ${ param('node') }.${ id('right') };
		}

		${ keyw('if') } (${ param('node') }.${ id('right') } ${ op('==') } ${ num('null') })
		{
			${ comm('// The node has only a left child.') }
			${ comm('// We can just replace the node with its left child.') }

			${ keyw('return') } ${ param('node') }.${ id('left') };
		}

		${ comm('// The node has two children.') }
		${ comm('// We will replace the node with its in-order successor.') }
		${ comm('// This is the left-most child of the right subtree.') }

		${ cl('AVLTreeNode') }${ op('<') }${ cl('T') }${ op('>') } ${ id('successor') } ${ op('=') } ${ param('node') }.${ id('right') };

		${ keyw('while') } (${ id('successor') }.${ id('left') } ${ op('!=') } ${ num('null') })
		{
			${ id('successor') } ${ op('=') } ${ id('successor') }.${ id('left') };
		}

		${ comm('// Copy the value from the successor node.') }

		${ param('node') }.${ id('value') } ${ op('=') } ${ id('successor') }.${ id('value') };

		${ comm('// Delete the successor node.') }

		${ param('node') }.${ id('right') } ${ op('=') } ${ func('avlRemove') }(${ param('node') }.${ id('right') }, ${ id('successor') }.${ id('value') });

		${ comm('// Calling the above function has the unwanted side-effect') }
		${ comm('// of decrementing the size of the AVL tree again.') }
		${ comm('// We will counter this by incrementing the size back up.') }

		${ id('size') }${ op('++') };

		${ comm('// Return the "new" root of the subtree.') }
		${ comm('// It\'s not actually new, because we just replace the value') }
		${ comm('// with the value of the successor node.') }

		${ keyw('return') } ${ param('node') };
	}
	`) }

	<br>

	<h2 id="avl-tree-find">
		AVL Tree Find
		${ linkSymbol }
	</h2>

	<p>
		The final important AVL tree function is the search function.
		It takes a value and returns true if the value is in the tree,
		or false otherwise.
	</p>

	${ createCodeBlockFromStr(`
	${ keyw('public') } ${ keyw('boolean') }
	${ func('avlHas') }(${ cl('AVLTreeNode') }${ op('<') }${ cl('T') }${ op('>') } ${ param('node') }, ${ cl('T') } ${ param('value') })
	{
		${ comm('// If we reach the end of the tree, the value is not in the tree.') }

		${ keyw('if') } (${ param('node') } ${ op('==') } ${ num('null') })
		{
			${ keyw('return') } ${ num('false') };
		}

		${ comm('// Traverse the tree according to how the value to be found') }
		${ comm('// compares to the left and right children of the current node.') }

		${ keyw('if') } (${ param('value') }.${ func('compareTo') }(${ param('node') }.${ id('value') }) ${ op('<') } ${ num('0') })
		{
			${ keyw('return') } ${ func('avlHas') }(${ param('node') }.${ id('left') }, ${ param('value') });
		}

		${ keyw('if') } (${ param('value') }.${ func('compareTo') }(${ param('node') }.${ id('value') }) ${ op('>') } ${ num('0') })
		{
			${ keyw('return') } ${ func('avlHas') }(${ param('node') }.${ id('right') }, ${ param('value') });
		}

		${ comm('// We found the value.') }

		${ keyw('return') } ${ num('true') };
	}
	`) }

	<br>

	<h2 id="wrapping-up">
		Wrapping It Up
		${ linkSymbol }
	</h2>

	<p>
		With the code segments above, we have now completed all the
		necessary functions to implement an AVL tree.
		We can now create implementations for the three fundamental
		methods of an AVL tree:
	</p>

	${ createCodeBlockFromStr(`
	${ keyw('public') } ${ keyw('void') }
	${ func('insert') }(${ cl('T') } ${ id('value') })
	{
		${ id('root') } ${ op('=') } ${ func('avlInsert') }(${ id('root') }, ${ id('value') });
	}

	${ keyw('public') } ${ keyw('void') }
	${ func('remove') }(${ cl('T') } ${ id('value') })
	{
		${ id('root') } ${ op('=') } ${ func('avlRemove') }(${ id('root') }, ${ id('value') });
	}

	${ keyw('public') } ${ keyw('boolean') }
	${ func('has') }(${ cl('T') } ${ id('value') })
	{
		${ keyw('return') } ${ func('avlHas') }(${ id('root') }, ${ id('value') });
	}
	`) }

	<p>
		The full code listing can be found
		<a href="https://github.com/iannisdezwart/java-avl-tree-implementation/blob/main/AVLTree.java">here</a>.
	</p>

	<br>

	<h2 id="more-ideas">
		More Ideas
		${ linkSymbol }
	</h2>

	<p>
		Before ending this post, I would like to make you think about
		how our implementation of the AVL trees can be modified
		to implement a map data structure.
		<br><br>
		The implementation we made is a data structure that implements
		a set with ${ await importLatex('$O(\\log n)$') } operations.
		In a set, we can add distinct values, remove them, and check
		for their existence.
		<br>
		A map builds on top of the idea of the set, and allows us to
		look up values by their keys.
		In a map, we can add values by their keys, remove them by their
		keys, and check for their existence by their keys.
		We can also update the value associated with a key.
		<br><br>
		What would we have to change in the functions we wrote, and
		how can we implement the updating?
	</p>

	<br>

	<h2 id="final-thoughts">
		Final Thoughts
		${ linkSymbol }
	</h2>

	<p>
		AVL trees are efficient self-balancing trees that can be used
		to implement sets and maps. AVL trees support
		${ await importLatex('$O(\\log n)$') } operations for
		insertion, removal, and lookup.
		<br><br>
		I hope you enjoyed this post and properly understand how AVL
		trees work under the hood and how they are implemented.
		<br><br>
		Feel free to
		<a href="/contact">contact me</a>
		if you have any feedback.
	</p>
	`
} as BlogPage