import { inlineSVG } from 'page-compiler'
import { cl, comm, constr, createCodeBlockFromStr, func, id, keyw, num, op, param } from '../../../util/html-code-syntax-highlighting'
import { importLatex } from '../../../util/latex'
import { BlogPage, createSpoiler, linkSymbol } from '../blog-pages'
import ADS_DynamicDataStructures from './Dynamic Data Structures'

export default {
	imagePath: 'src/img/ADS Wallpaper.svg',
	imageAlt: 'ADS Wallpaper',
	title: 'Heaps & Priority Queues',
	url: 'ads/heaps-and-priority-queues',
	series: 'ADS',
	chapter: '0x04',
	description: 'Min heaps, max heaps and how they are used in the priority queue data structure.',
	date: new Date('15 December 2021'),
	keywords: [ 'ADS', 'Java' ],
	generateContent: async () => /* html */ `
	<h1 id="introduction">
		Introduction
		${ linkSymbol }
	</h1>

	<p>
		Priority queues are handy data structures for implementing
		algorithms that need to process a lot of data with a certain
		priority. For example, in a game, you need to process a lot of
		entities that need to be updated. You can use a priority queue
		to keep track of the entities that need to be updated for
		performance reasons. Entities which are closer to the camera
		will have a higher priority and are rendered first.
		<br><br>
		It turns out heaps are the most efficient data structure for
		implementing priority queues.
		Heaps are dynamic data structures that implement the
		following operations:
	</p>

	<ul>
		<li>
			Insertion in ${ await importLatex('$O(\\log n)$') } time.
		</li>
		<li>
			Removal of the minimum or maximum element in
			${ await importLatex('$O(\\log n)$') } time.
		</li>
	</ul>

	<p>
		As you can see, those two operations are both very fast, and
		basically the most important operations for priority queues.
	</p>

	<br>

	<h2 id="heap-property">
		Heap Property
		${ linkSymbol }
	</h2>

	<p>
		A simple max (or min) heap is a binary tree that satisfies the
		following two properties:
	</p>

	<div class="quote">
		For each path you can take from the root to a leaf, the values you
		traverse must be in non-increasing (or non-decreasing) order.
		From this, we can conclude that the root of the tree is the
		largest (or smallest) element in the heap.
		<br><br>
		A heap must be a complete binary tree. This means that every
		level except the last must be completely filled, and the last
		level must be filled from left to right.
	</div>

	<p>
		Let's look at some binary trees and see whether they are heaps or not.
		If they are heaps, then check whether they are max heaps or min heaps.
	</p>

	${ inlineSVG('src/img/Max Heap.svg', { classes: [ 'fullwidth-image' ] }) }

	${ createSpoiler('Spoiler: answer', /* html */ `
	<p>
		The above binary tree is a max heap.
		There are four paths we can take from the root to the children:

		<ul>
			<li>
				9-4-3
			</li>
			<li>
				9-4-3
			</li>
			<li>
				9-8-2
			</li>
			<li>
				9-8-7
			</li>
		</ul>

		All of them are in non-increasing order, so it is a max heap.
	</p>
	`) }

	<br>

	${ inlineSVG('src/img/Min Heap.svg', { classes: [ 'fullwidth-image' ] }) }

	${ createSpoiler('Spoiler: answer', /* html */ `
	<p>
		The above binary tree is a min heap.
		There are four paths we can take from the root to the children:

		<ul>
			<li>
				3-4-4
			</li>
			<li>
				3-4-7
			</li>
			<li>
				3-3-8
			</li>
			<li>
				3-3-5
			</li>
		</ul>

		All of them are in non-decreasing order, so it is a min heap.
	</p>
	`) }

	<br>

	${ inlineSVG('src/img/Not Heap.svg', { classes: [ 'fullwidth-image' ] }) }

	${ createSpoiler('Spoiler: answer', /* html */ `
	<p>
		The above binary tree is not a heap.
		There are four paths we can take from the root to the children:

		<ul>
			<li>
				5-5-6
			</li>
			<li>
				5-5-5
			</li>
			<li>
				5-8-7
			</li>
			<li>
				5-8-9
			</li>
		</ul>

		5-8-7 first increases, and then decreases. So it is neither
		non-decreasing nor non-increasing. We have to conclude that
		it is not a heap.
		<br>
		Which two elements would we have to switch to make it a heap?
	</p>
	`) }

	<br>

	<h2 id="heap-algorithms">
		Heap Algorithms
	</h2>

	<p>
		Let's see how we can add and remove elements from a heap.
		These two operations are required for a priority queue.
	</p>

	<h3 id="heap-add">
		Heap Add
		${ linkSymbol }
	</h3>

	${ inlineSVG('src/img/Max Heap Add.svg', { classes: [ 'fullwidth-image' ] }) }

	<p>
		In the above picture, we can see how we add an entry to a max heap.
		We put the new entry at the bottom of the tree, and then we
		bubble it upwards until it is in the correct position.
		<br><br>
		Putting the entry at the bottom of the tree takes
		${ await importLatex('$O(1)$') } time, and bubbling it upwards
		takes ${ await importLatex('$O(\\log n)$') } time, because
		we have to swap at most ${ await importLatex('$\\log n$') }
		elements, since there are ${ await importLatex('$\\log n$') }
		items in a path from the root to a leaf.
		<br>
		The total time complexity is therefore
		${ await importLatex('$O(\\log n)$') }.
	</p>

	<h3 id="heap-remove">
		Heap Remove
		${ linkSymbol }
	</h3>

	${ inlineSVG('src/img/Max Heap Remove.svg', { classes: [ 'fullwidth-image' ] }) }

	<p>
		To remove the maximum element from a max heap, we take out the
		root, which we will return later. Then we replace the root with
		the last element in the heap, and then we bubble the new root
		downwards until it is in the correct position.
		<br><br>
		With the same logic as in the add case, we can conclude that
		the time complexity is ${ await importLatex('$O(\\log n)$') }.
	</p>

	<h2 id="array-tree">
		Array Trees
		${ linkSymbol }
	</h2>

	<p>
		Since a heap works with a complete binary tree, we can also use
		a dynamic array to represent it. This array tree is much more
		performant than a linked tree, since we can access any node in
		constant time and
		<a href="${ `/blog/${ ADS_DynamicDataStructures.url }#dynamic-array-vs-linked-list` }">
			dynamic arrays are much more efficient than linked lists.
		</a>
	</p>

	${ inlineSVG('src/img/Array Tree.svg', { classes: [ 'fullwidth-image' ] }) }

	<p>
		The elements of the heap are put in the array in breadth-first
		order. This mean that the root is at index 0, the first level
		nodes are at indices 1 and 2, the second level nodes are
		at indices 3, 4, 5, 6 and so on. Since heaps are complete
		binary trees, there are no gaps in the array, and the array
		ends at the last existing element of the last level.
		<br><br>
		There are three formulas that we can use to get the parent
		and the children of any node in the array tree:
		<br><br>
		${ await importLatex('$Parent(i) = \\lfloor \\frac{i - 1}{2} \\rfloor$', { centre: true }) }
		<br>
		${ await importLatex('$LeftChild(i) =  2i + 1$', { centre: true }) }
		<br>
		${ await importLatex('$RightChild(i) =  2i + 2$', { centre: true }) }
	</p>

	${ inlineSVG('src/img/Array Tree Parent Children.svg', { classes: [ 'fullwidth-image' ] }) }

	<p>
		With these formulas, we can find the parent or children of any
		node.
		<br>
		For example, the parent of the node at index 3 is at index 1;
		<br>
		the left right of the node at index 1 is at index 4;
		<br>
		and the right child of the root node is at index 2.
		<br>
		The left child of the node at index 4 is at index 9. But
		the array only goes up to index 6, so the node at index 4
		doesn't have a left child.
	</p>

	<br>

	<h2 id="basic-priority-queue-implementation">
		Basic Priority Queue Implementation
		${ linkSymbol }
	</h2>

	<p>
		Let's implement an array-based heap priority queue
		in Java that supports removal of the root and insertion.
		The priority queue will be a max heap, so the root will
		have the highest priority.
	</p>

	${ createCodeBlockFromStr(`
	${ comm('// The type of elements in the priority queue must be comparable,') }
	${ comm('// because we need to be able to reorder the elements.') }

	${ keyw('class') } ${ cl('PriorityQueue') }${ op('<') }${ cl('T') } ${ keyw('extends') } ${ cl('Comparable') }${ op('<') }${ cl('T') }${ op('>') }${ op('>') }
	{
		${ keyw('public') } ${ cl('T') }[] ${ id('arr') }
		${ keyw('public') } ${ keyw('int') } ${ id('size') };

		${ keyw('public') }
		${ constr('PriorityQueue') }()
		{
			${ id('root') } ${ op('=') } ${ num('null') };
			${ id('last') } ${ op('=') } ${ num('null') };
			${ id('size') } ${ op('=') } ${ num('0') };
		}

		${ keyw('private') } ${ keyw('int') }
		${ func('leftChildIndex') }(${ keyw('int') } ${ id('i') })
		{
			${ keyw('return') } ${ num('2') } ${ op('*') } ${ param('i') } ${ op('+') } ${ num('1') };
		}

		${ keyw('private') } ${ keyw('int') }
		${ func('rightChildIndex') }(${ keyw('int') } ${ id('i') })
		{
			${ keyw('return') } ${ num('2') } ${ op('*') } ${ param('i') } ${ op('+') } ${ num('2') };
		}

		${ keyw('private') } ${ keyw('int') }
		${ func('parentIndex') }(${ keyw('int') } ${ id('i') })
		{
			${ keyw('return') } (${ param('i') } ${ op('-') } ${ num('1') }) ${ op('/') } ${ num('2') };
		}

		${ keyw('public') } ${ keyw('void') }
		${ func('add') }(${ cl('T') } ${ param('value') })
		{
			${ comm('// Insert the new node at the end of the array.') }

			${ id('arr') }[${ id('size') }] ${ op('=') } ${ param('value') };
			${ id('size') }${ op('++') };

			${ comm('// Bubble the new node upwards.') }

			${ func('bubbleUp') }(${ id('size') } ${ op('-') } ${ num('1') });
		}

		${ keyw('public') } ${ cl('T') }
		${ func('removeMax') }()
		{
			${ cl('T') } ${ id('max') } ${ op('=') } ${ id('arr') }[${ num('0') }];

			${ comm('// Put the last node at the place of the root node.') }

			${ id('arr') }[${ num('0') }] ${ op('=') } ${ id('arr') }[${ id('size') } ${ op('-') } ${ num('1') }];
			${ id('size') }${ op('--') };

			${ comm('// Bubble the root node down.') }

			${ func('bubbleDown') }(${ num('0') });

			${ keyw('return') } ${ id('max') };
		}

		${ keyw('private') } ${ keyw('void') }
		${ func('swap') }(${ keyw('int') } ${ id('i') }${ op(',') } ${ keyw('int') } ${ id('j') })
		{
			${ cl('T') } ${ id('temp') } ${ op('=') } ${ id('arr') }[${ param('i') }];
			${ id('arr') }[${ param('i') }] ${ op('=') } ${ id('arr') }[${ param('j') }];
			${ id('arr') }[${ param('j') }] ${ op('=') } ${ id('temp') };
		}

		${ keyw('private') } ${ keyw('void') }
		${ func('bubbleUp') }(${ keyw('int') } ${ id('index') })
		{
			${ comm('// This method bubbles a node up.') }
			${ comm('// In each iteration, we check if the parent node exists,') }
			${ comm('// and if it does, we will bubble the given element up if needed.') }

			${ keyw('while') } (${ num('true') })
			{
				${ keyw('if') } (${ id('index') } ${ op('==') } ${ num('0') })
				{
					${ comm('// We reached the root of the array tree.') }

					${ keyw('break') };
				}

				${ keyw('int') } ${ id('parentIndex') } ${ op('=') } ${ func('parentIndex') }(${ param('index') });

				${ keyw('if') } (${ id('arr') }[${ id('parentIndex') }].${ func('compareTo') }(${ id('arr') }[${ param('index') }]) ${ op('>') } ${ num('0') })
				{
					${ comm('// The parent is larger than the node,') }
					${ comm('// so we should stop bubbling.') }

					${ keyw('break') };
				}

				${ comm('// Bubble the node up a level.') }

				${ func('swap') }(${ param('index') }, ${ id('parentIndex') });
				${ param('index') } ${ op('=') } ${ id('parentIndex') };
			}
		}

		${ keyw('private') } ${ keyw('void') }
		${ func('bubbleDown') }(${ keyw('int') } ${ id('index') })
		{
			${ comm('// This method bubbles a node down.') }
			${ comm('// In each iteration, we check if the left and right children') }
			${ comm('// exist, and if they do, we take the largest among them and') }
			${ comm('// bubble the given node down if needed.') }

			${ keyw('while') } (${ num('true') })
			{
				${ keyw('int') } ${ id('leftChildIndex') } ${ op('=') } ${ func('leftChildIndex') }(${ param('index') });
				${ keyw('int') } ${ id('rightChildIndex') } ${ op('=') } ${ func('rightChildIndex') }(${ param('index') });

				${ keyw('if') } (${ id('leftChildIndex') } ${ op('>=') } ${ id('size') })
				{
					${ comm('// There is no left child.') }

					${ keyw('break') };
				}

				${ keyw('if') } (${ id('rightChildIndex') } ${ op('>=') } ${ id('size') })
				{
					${ comm('// There is only a left child.') }

					${ keyw('if') } (${ id('arr') }[${ id('index') }].${ func('compareTo') }(${ id('arr') }[${ param('leftChildIndex') }]) ${ op('>') } ${ num('0') })
					{
						${ comm('// The node is larger than the only child,') }
						${ comm('// so we should stop bubbling.') }

						${ keyw('break') };
					}

					${ comm('// Bubble the node down a level.') }

					${ func('swap') }(${ param('index') }, ${ param('leftChildIndex') });
				}
				${ keyw('else') }
				{
					${ keyw('if') } (${ id('arr') }[${ id('leftChildIndex') }].${ func('compareTo') }(${ id('arr') }[${ id('rightChildIndex') }]) ${ op('>') } ${ num('0') })
					{
						${ comm('// The left child is larger than the right child.') }

						${ keyw('if') } (${ id('arr') }[${ id('index') }].${ func('compareTo') }(${ id('arr') }[${ param('leftChildIndex') }]) ${ op('>') } ${ num('0') })
						{
							${ comm('// The node is larger than the left child,') }
							${ comm('// so we should stop bubbling.') }

							${ keyw('break') };
						}
					}
					${ keyw('else') }
					{
						${ comm('// The right child is larger than the left child.') }

						${ keyw('if') } (${ id('arr') }[${ id('index') }].${ func('compareTo') }(${ id('arr') }[${ param('rightChildIndex') }]) ${ op('>') } ${ num('0') })
						{
							${ comm('// The node is larger than the right child,') }
							${ comm('// so we should stop bubbling.') }

							${ keyw('break') };
						}
					}
				}
			}
		}
	}
	`) }

	<p>
		The above is a lot of code, but it's mostly because of the
		bubbling methods are rather long. We are essentially just
		implementing the bubbling methods in
		<a href="#heap-add">the pictures above</a>.
	</p>

	<h2 id="heapify">
		Heapify
		${ linkSymbol }
	</h2>

	<p>
		Sometimes we would like to create a heap from an array of
		unsorted elements. We can do this by using the heapify
		algorithm. This algorithm will take an array and turn it into
		a heap in ${ await importLatex('$O(n)$') } time.
		<br><br>
		A naive approach of the heapify algorithm would be to create a
		heap, and add each element to the heap. This would take
		${ await importLatex('$O(n \\log n)$') } time, which is worse.
		<br><br>
		The heapify algorithm is very simple: we go through the array
		in reverse order, and bubble down each element we are iterating
		over. You might think this would still take
		${ await importLatex('$O(n \\log n)$') } time, because we are
		performing a ${ await importLatex('$O(\\log n)$') } operation
		for each element, but this is not the case because the
		algorithm ensures we never bubble down twice over the same path.
	</p>

	${ inlineSVG('src/img/Heapify Paths.svg', { classes: [ 'fullwidth-image' ] }) }

	<p>
		We can see that we can create paths in a heap that only go over
		each edge once, and since the number of edges is equal to the
		number of nodes in the heap minus one, we can see that if we
		bubble down over unique paths, we will never bubble down twice
		over the same path. This is why the heapify algorithm takes
		${ await importLatex('$O(n)$') } time.
	</p>

	${ createCodeBlockFromStr(`
	${ keyw('public') } ${ cl('PriorityQueue') }${ op('<') }${ cl('T') }${ op('>') }
	${ func('heapify') }(${ cl('T') }[] ${ id('arr') })
	{
		${ cl('PriorityQueue') }${ op('<') }${ cl('T') }${ op('>') } ${ id('heap') } ${ op('=') } ${ keyw('new') } ${ cl('PriorityQueue') }${ op('<') }${ op('>') }();
		${ id('heap') }.${ id('arr') } ${ op('=') } ${ param('arr') };
		${ id('heap') }.${ id('size') } ${ op('=') } ${ param('arr') }.${ id('length') };

		${ keyw('for') } (${ keyw('int') } ${ id('i') } ${ op('=') } ${ id('size') } ${ op('-') } ${ num('1') }; ${ id('i') } ${ op('>') } ${ num('0') }; ${ id('i') }${ op('--') })
		{
			${ id('heap') }.${ func('bubbleDown') }(${ id('i') });
		}

		${ keyw('return') } ${ id('heap') };
	}
	`) }

	<h2 id="final-thoughts">
		Final Thoughts
		${ linkSymbol }
	</h2>

	<p>
		Priority queues are a very useful data structure in many situations.
		They support ${ await importLatex('$O(\\log n)$') } insertion
		and removal, and can be implemented using a heap.
		An arbitrary array can be turned into a heap in
		${ await importLatex('$O(n)$') } time using the heapify algorithm.
		<br><br>
		I hope you enjoyed this post! Feel free to share it, and if
		you have any feedback, feel free to <a href="/contact">contact me</a>.
	</p>
	`
} as BlogPage