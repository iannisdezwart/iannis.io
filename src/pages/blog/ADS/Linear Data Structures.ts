import { inlineSVG } from 'page-compiler'
import { cl, comm, constr, createCodeBlockFromStr, createInlineCodeBlock, func, id, keyw, num, op, param } from '../../../util/html-code-syntax-highlighting'
import { importLatex } from '../../../util/latex'
import { BlogPage, linkSymbol } from '../blog-pages'

export default {
	imagePath: 'src/img/ADS Wallpaper.svg',
	imageAlt: 'ADS Wallpaper',
	title: 'Arrays & Linked Lists',
	url: 'ads/arrays-linked-lists',
	series: 'ADS',
	chapter: '0x02',
	description: 'How they work, how they are implemented, and analysed.',
	date: new Date('16 November 2021'),
	keywords: [ 'ADS', 'Java' ],
	generateContent: async () => /* html */ `
	<h1 id="introduction">
		Introduction
		${ linkSymbol }
	</h1>

	<p>
		Linear data structures are by far the most common kinds of data
		structure in computer science.
		If implemented correctly, they are easy, fast, and efficient.
		The idea of any data structure is that they store arbitrary data
		in a way that makes it easy to access and manipulate the data.
		<br><br>
		We will go over all the important linear data structures with
		implementations in Java and amortised analysis of the methods
		they provide.
	</p>

	<h2 id="arrays">
		Arrays
		${ linkSymbol }
	</h2>

	<p>
		Arrays are the most common linear data structure.
		Most other linear data structures are implemented using arrays.
	</p>

	${ inlineSVG('src/img/Array.svg', { classes: [ 'fullwidth-image' ] }) }

	<p>
		As you can see, arrays are simple:
		they are simple contiguous blocks of memory that hold data.
		<br><br>
		Elements on the array are accessed by their index.
		Indices start at 0, except they start at 1 in some ghoulish
		programming languages that shall not be named for legal reasons.
		In Java, which is a not a ghoulish language (or is it?),
		indices start at 0.
		<br><br>
		Pros:
		<ul>
			<li>
				Any element can be accessed easily by its index
			</li>
			<li>
				The elements are stored contiguously,
				which means that the caching of elements is
				very efficient
			</li>
			<li>
				It is very straightforward to iterate over the
				elements on the array
			</li>
		</ul>
		Cons:
		<ul>
			<li>
				Arrays are fixed size, so eventually we will
				run out of space
			</li>
			<li>
				Arrays don't have a lot of functionality,
				especially when it comes to searching for
				elements
			</li>
		</ul>
	</p>

	<h3 id="array-implementation">
		Array Implementation
		${ linkSymbol }
	</h3>

	${ createCodeBlockFromStr(`
	${ keyw('public') } ${ keyw('class') } ${ cl('Array') }${ op('<') }${ cl('T') }${ op('>') }
	{
		${ keyw('private') } ${ cl('T') }[] ${ id('array') };

		${ keyw('public') }
		${ constr('Array') }(${ keyw('int') } ${ param('size') })
		{
			${ comm('// Allocate memory for the array.') }

			${ id('array') } ${ op('=') } ${ keyw('new') } ${ cl('T') }[${ param('size') }];
		}

		${ keyw('public') } ${ cl('T') }
		${ func('get') }(${ keyw('int') } ${ param('index') })
		{
			${ comm('// Check if the index is valid.') }

			${ keyw('if') }(${ param('index') } ${ op('<')} ${ num('0') } ${ op('||') } ${ param('index') } ${ op('>=') } ${ id('array') }.${ id('length') })
			{
				${ keyw('throw') } ${ keyw('new') } ${ constr('IndexOutOfBoundsException') }();
			}

			${ comm('// Return the element at the provided index.') }

			${ keyw('return') } ${ id('array') }[${ id('index') }];
		}

		${ keyw('public') } ${ keyw('void') }
		${ func('set') }(${ keyw('int') } ${ param('index') }, ${ cl('T') } ${ param('value') })
		{
			${ comm('// Check if the index is valid.') }

			${ keyw('if') }(${ param('index') } ${ op('<')} ${ num('0') } ${ op('||') } ${ param('index') } ${ op('>=') } ${ id('array') }.${ id('length') })
			{
				${ keyw('throw') } ${ keyw('new') } ${ constr('IndexOutOfBoundsException') }();
			}

			${ comm('// Set the element at the provided index.') }

			${ id('array') }[${ id('index') }] ${ op('=') } ${ param('value') };
		}
	}
	`)}

	<p>
		In order to support any types of data, we use Java generics.
		This allows us to use the same array implementation for all
		types of data.
		<br><br>
		An array of integers can be written as
		${ createInlineCodeBlock(`${ cl('Array') }${ op('<') }${ cl('Integer') }${ op('>') }`) },
		an array of strings can be written as
		${ createInlineCodeBlock(`${ cl('Array') }${ op('<') }${ cl('String') }${ op('>') }`) },
		and so on.
		<br><br>
		As you can see, arrays are very simple and don't have a lot of
		functionality.
	</p>

	<h2 id="linked-lists">
		Linked Lists
		${ linkSymbol }
	</h2>

	<p>
		Linked lists are a non-contiguous data structure.
		Each node in the list contains a reference to the next node.
	</p>

	${ inlineSVG('src/img/Linked List.svg', { classes: [ 'fullwidth-image' ] }) }

	<h3 id="linked-lists-vs-arrays">
		Linked Lists vs. Arrays
		${ linkSymbol }
	</h3>

	<p>
		As you can see from the diagram, linked lists are very similar
		to arrays. The biggest difference is that linked lists are not
		contiguous, whereas arrays are.
		<br><br>
		Pros:
		<ul>
			<li>
				It is very easy to add or remove elements from
				a linked list at any position
			</li>
			<li>
				It is still easy to iterate over all elements
				of a linked list
			</li>
		</ul>
		Cons:
		<ul>
			<li>
				Since linked lists are not contiguous,
				we can't access elements by their index
			</li>
			<li>
				Caching locality of linked lists is really bad
				because the elements are not stored contiguously
			</li>
			<li>
				Linked lists waste memory because we need to
				store a reference to the next node
			</li>
		</ul>

		All in all, linked lists are a trade-off between flexibility and
		efficiency. Linked lists are more flexible because they allow
		you to add or remove elements at any position, whereas arrays
		are more efficient because they are contiguous.
		<br><br>
		Linked lists are slower because the elements are not
		contiguously stored. This can lead to a lot of cache misses
		when accessing elements. This can have a substantial performance
		impact in programs.
		<br><br>
		The only good reason to use linked lists is if you really need
		a container that supports adding or removing elements at any
		position.
		<br>
		If you store references to elements in a linked list in another
		data structure, you might be able to add or remove elements
		in constant time.
	</p>

	<h3 id="linked-list-implementation">
		Linked List Implementation
		${ linkSymbol }
	</h3>

	${ createCodeBlockFromStr(`
	${ keyw('public') } ${ keyw('class') } ${ cl('Node') }${ op('<') }${ cl('T') }${ op('>') }
	{
		${ keyw('public') } ${ cl('T') } ${ id('data') };
		${ keyw('public') } ${ cl('Node') }${ op('<') }${ cl('T') }${ op('>') } ${ id('next') };

		${ keyw('public') }
		${ constr('Node') }(${ cl('T') } ${ param('data') })
		{
			${ cl('this') }.${ id('data') } ${ op('=') } ${ param('data') };
			${ id('next') } ${ op('=') } ${ num('null') };
		}
	}

	${ keyw('public') } ${ keyw('class') } ${ cl('LinkedList') }${ op('<') }${ cl('T') }${ op('>') }
	{
		${ keyw('private') } ${ cl('Node') }${ op('<') }${ cl('T') }${ op('>') } ${ id('head') };
		${ keyw('private') } ${ cl('Node') }${ op('<') }${ cl('T') }${ op('>') } ${ id('tail') };
		${ keyw('private') } ${ keyw('int') } ${ id('curSize') };

		${ keyw('public') }
		${ constr('LinkedList') }()
		{
			${ comm('// Initialise the linked list.') }

			${ id('head') } ${ op('=') } ${ num('null') };
			${ id('tail') } ${ op('=') } ${ num('null') };
			${ id('curSize') } ${ op('=') } ${ num('0') };
		}

		${ keyw('public') } ${ keyw('int') }
		${ func('size') }()
		{
			${ keyw('return') } ${ id('curSize') };
		}

		${ keyw('public') } ${ cl('Node') }${ op('<') }${ cl('T') }${ op('>') }
		${ func('getNodeByIndex') }(${ keyw('int') } ${ param('index') })
		{
			${ comm('// Check if the index is valid.') }

			${ keyw('if') } (${ param('index') } ${ op('<') } ${ num('0') } ${ op('||') } ${ param('index') } ${ op('>=') } ${ id('curSize') })
			{
				${ keyw('throw') } ${ keyw('new') } ${ constr('IndexOutOfBoundsException') }();
			}

			${ comm('// Iterate over the list until we reach the index.') }

			${ cl('Node') }${ op('<') }${ cl('T') }${ op('>') } ${ id('curNode') } ${ op('=') } ${ id('head') };

			${ keyw('for') } (${ keyw('int') } ${ id('i') } ${ op('=') } ${ num('0') }; ${ id('i') } ${ op('<') } ${ param('index') }; ${ id('i') }${ op('++') })
			{
				${ id('curNode') } ${ op('=') } ${ id('curNode') }.${ id('next') };
			}

			${ keyw('return') } ${ id('curNode') };
		}

		${ keyw('public') } ${ cl('T') }
		${ func('get') }(${ keyw('int') } ${ param('index') })
		{
			${ keyw('return') } ${ func('getNodeByIndex') }(${ param('index') }).${ id('data') };
		}

		${ keyw('public') } ${ cl('Node') }${ op('<') }${ cl('T') }${ op('>') }
		${ func('getNodeByData') }(${ cl('T') } ${ param('data') })
		{
			${ comm('// Iterate over the list until we reach') }
			${ comm('// the first node with the given data.') }

			${ cl('Node') }${ op('<') }${ cl('T') }${ op('>') } ${ id('curNode') } ${ op('=') } ${ id('head') };

			${ keyw('while') } (${ id('curNode') } ${ op('!=') } ${ num('null') })
			{
				${ keyw('if') } (${ id('curNode') }.${ id('data') } ${ op('==') } ${ param('data') })
				{
					${ keyw('break') };
				}

				${ id('curNode') } ${ op('=') } ${ id('curNode') }.${ id('next') };
			}

			${ comm('// If there was a node with the given data,') }
			${ comm('// a reference to it is returned.') }
			${ comm('// The reference will be null if a node') }
			${ comm('// with the given data was not found.') }

			${ keyw('return') } ${ id('curNode') };
		}

		...
	}
	`) }

	<p>
		Above you can see the core structure of a linked list.
		The head and tail nodes are used to keep track of the
		first and last elements of the list.
		<br><br>
		There are some utility functions that can be used to
		find elements in the list.
		<br><br>
		We also keep track of the current size of the list.
		Every time we add or remove an element, we increment the size,
		and every time we add or remove an element,
		we decrement the size.
		<br><br>
		Next, we will add a couple of methods to the linked list
		and go over how they work.
	</p>

	<h4 id="linked-list-append-element">
		Linked List: Append Element
		${ linkSymbol }
	</h4>

	${ inlineSVG('src/img/Linked List Append.svg', { classes: [ 'fullwidth-image' ] }) }

	<p>
		Appending an element to the end of a linked list is pretty easy.
		We just need to create a new node and append it to the tail.
		<br><br>
		There is one edge case to be aware of though:
		if the linked list is empty, we need to set the head and tail
		to the new node instead.
	</p>

	${ createCodeBlockFromStr(`
	${ keyw('public') } ${ keyw('void') }
	${ func('append') }(${ cl('T') } ${ param('data') })
	{
		${ comm('// Create a new node.') }
		${ comm('// Since `node.next` is initialised to NULL already,') }
		${ comm('// so we don\'t need to set it.') }

		${ cl('Node') }${ op('<') }${ cl('T') }${ op('>') } ${ id('node') } ${ op('=') } ${ keyw('new') } ${ cl('Node') }${ op('<') }${ cl('T') }${ op('>') }(${ param('data') });

		${ comm('// Check if the list is empty.') }

		${ keyw('if') }(${ id('head') } ${ op('==') } ${ num('null') })
		{
			${ comm('// Set the head and tail to the new node.') }

			${ id('head') } ${ op('=') } ${ id('node') };
			${ id('tail') } ${ op('=') } ${ id('node') };
		}
		${ keyw('else') }
		{
			${ comm('// Add the node to the end of the linked list.') }

			${ id('tail') }${ op('.') }${ id('next') } ${ op('=') } ${ id('node') };

			${ comm('// Update the tail.') }

			${ id('tail') } ${ op('=') } ${ id('node') };
		}
	}
	`) }

	<h4 id="linked-list-prepend-element">
		Linked List: Prepend Element
		${ linkSymbol }
	</h4>

	${ inlineSVG('src/img/Linked List Prepend.svg', { classes: [ 'fullwidth-image' ] }) }

	<p>
		Prepending an element to the beginning of a linked list is very
		similar to appending an element to the end of a linked list:
	</p>

	${ createCodeBlockFromStr(`
	${ keyw('public') } ${ keyw('void') }
	${ func('prepend') }(${ cl('T') } ${ param('data') })
	{
		${ comm('// Create a new node.') }

		${ cl('Node') }${ op('<') }${ cl('T') }${ op('>') } ${ id('node') } ${ op('=') } ${ keyw('new') } ${ cl('Node') }${ op('<') }${ cl('T') }${ op('>') }(${ param('data') });

		${ comm('// Check if the list is empty.') }

		${ keyw('if') }(${ id('head') } ${ op('==') } ${ num('null') })
		{
			${ comm('// Set the head and tail to the new node.') }

			${ id('head') } ${ op('=') } ${ id('node') };
			${ id('tail') } ${ op('=') } ${ id('node') };
		}
		${ keyw('else') }
		{
			${ comm('// Add the node to the beginning of the linked list.') }

			${ id('node') }${ op('.') }${ id('next') } ${ op('=') } ${ id('head') };

			${ comm('// Update the head.') }

			${ id('head') } ${ op('=') } ${ id('node') };
		}
	}
	`) }

	<p>
		Removing the first or last element from the linked list is
		also quite trivial and is left as an exercise for the reader.
	</p>

	<h3 id="doubly-linked-lists">
		Doubly Linked Lists
		${ linkSymbol }
	</h3>

	<p>
		In order to support some of the more advanced operations
		like adding or removing elements at the middle of the list,
		we need to add a reference to the previous node.
		<br>
		A linked list with nodes that store references to the previous
		node is called a doubly linked list and looks like this:
	</p>

	${ inlineSVG('src/img/Doubly Linked List.svg', { classes: [ 'fullwidth-image' ] }) }

	<p>
		Note that each node now also points back to the previous node,
		and the previous element of the head is NULL.
		<br><br>
		We simply add a reference to the previous node to the 
		${ createInlineCodeBlock(`${ cl('Node') }${ op('<') }${ cl('T') }${ op('>') }`) }
		class and update the constructor:
	</p>

	${ createCodeBlockFromStr(`
	${ keyw('public') } ${ keyw('class') } ${ cl('Node') }${ op('<') }${ cl('T') }${ op('>') }
	{
		${ keyw('public') } ${ cl('T') } ${ id('data') };
		${ keyw('public') } ${ cl('Node') }${ op('<') }${ cl('T') }${ op('>') } ${ id('next') };
		${ keyw('public') } ${ cl('Node') }${ op('<') }${ cl('T') }${ op('>') } ${ id('prev') };

		${ keyw('public') }
		${ constr('Node') }(${ cl('T') } ${ param('data') })
		{
			${ cl('this') }.${ id('data') } ${ op('=') } ${ param('data') };
			${ id('next') } ${ op('=') } ${ num('null') };
			${ id('prev') } ${ op('=') } ${ num('null') };
		}
	}
	`) }

	<p>
		That's it! We don't really have to change anything in the
		${ createInlineCodeBlock(`${ cl('LinkedList') }${ op('<') }${ cl('T') }${ op('>') }`) }
		class, except for the ${ createInlineCodeBlock(func('append')) }
		and ${ createInlineCodeBlock(func('prepend')) } methods.
		<br>
		Think about how we would have to change these methods for a
		doubly linked list.
	</p>

	<h4 id="doubly-linked-list-add-element">
		Doubly Linked List: Add Element
		${ linkSymbol }
	</h4>

	${ inlineSVG('src/img/Doubly Linked List Add.svg', { classes: [ 'fullwidth-image' ] }) }

	<p>
		If you have a reference to the previous node, you can add
		a new element to the middle of the list by updating a couple
		of references, as you can see in the picture above.
	</p>

	${ createCodeBlockFromStr(`
	${ keyw('public') } ${ keyw('void') }
	${ func('add') }(${ cl('T') } ${ param('data') }, ${ cl('Node') }${ op('<') }${ cl('T') }${ op('>') } ${ param('prevNode') })
	{
		${ comm('// Create a new node.') }

		${ cl('Node') }${ op('<') }${ cl('T') }${ op('>') } ${ id('node') } ${ op('=') } ${ keyw('new') } ${ cl('Node') }${ op('<') }${ cl('T') }${ op('>') }(${ param('data') });

		${ comm('// Save a reference to the next node.') }

		${ cl('Node') }${ op('<') }${ cl('T') }${ op('>') } ${ id('nextNode') } ${ op('=') } ${ param('prevNode') }${ op('.') }${ id('next') };

		${ comm('// Set the next and prev references on the new node.') }

		${ id('node') }${ op('.') }${ id('next') } ${ op('=') } ${ id('nextNode') };
		${ id('node') }${ op('.') }${ id('prev') } ${ op('=') } ${ param('prevNode') };

		${ comm('// Link the node with the previous node.') }

		${ param('prevNode') }${ op('.') }${ id('next') } ${ op('=') } ${ id('node') };

		${ comm('// Link the node with the next node.') }

		${ keyw('if') } (${ id('nextNode') } ${ op('!=') } ${ num('null') })
		{
			${ id('nextNode') }${ op('.') }${ id('prev') } ${ op('=') } ${ id('node') };
		}
		
		${ comm('// If there is no next node, set the new node as tail') }

		${ keyw('else') }
		{
			${ id('tail') } ${ op('=') } ${ id('node') };
		}
	}
	`) }

	<h4 id="doubly-linked-list-remove-element">
		Doubly Linked List: Remove Element
		${ linkSymbol }
	</h4>

	${ inlineSVG('src/img/Doubly Linked List Remove.svg', { classes: [ 'fullwidth-image' ] }) }

	<p>
		Finally, let's create a method that takes a reference to
		a node and removes it from a doubly linked list.
	</p>

	${ createCodeBlockFromStr(`
	${ keyw('public') } ${ keyw('void') }
	${ func('remove') }(${ cl('Node') }${ op('<') }${ cl('T') }${ op('>') } ${ param('node') })
	{
		${ comm('// Save a reference to the next node.') }

		${ cl('Node') }${ op('<') }${ cl('T') }${ op('>') } ${ id('nextNode') } ${ op('=') } ${ param('node') }${ op('.') }${ id('next') };

		${ comm('// Save a reference to the previous node.') }

		${ cl('Node') }${ op('<') }${ cl('T') }${ op('>') } ${ id('prevNode') } ${ op('=') } ${ param('node') }${ op('.') }${ id('prev') };

		${ comm('// If we\'re removing the head, update the head.') }

		${ keyw('if') } (${ id('prevNode') } ${ op('==') } ${ num('null') })
		{
			${ id('head') } ${ op('=') } ${ id('nextNode') };
			${ id('nextNode') }.${ id('prev') } ${ op('=') } ${ num('null') };
		}

		${ comm('// Else, link the previous node with the next node.') }

		${ keyw('else') }
		{
			${ id('prevNode') }${ op('.') }${ id('next') } ${ op('=') } ${ id('nextNode') };
		}

		${ comm('// If we\'re removing the tail, update the tail.') }

		${ keyw('if') } (${ id('nextNode') } ${ op('==') } ${ num('null') })
		{
			${ id('tail') } ${ op('=') } ${ id('prevNode') };
			${ id('prevNode') }${ op('.') }${ id('next') } ${ op('=') } ${ num('null') };
		}

		${ comm('// Else, link the next node with the previous node.') }

		${ keyw('else') }
		{
			${ id('nextNode') }${ op('.') }${ id('prev') } ${ op('=') } ${ id('prevNode') };
		}

		${ comm('// Let Java\'s Garbage Collector delete the node.') }
	}
	`) }

	<h3 id="arrays-vs-linked-lists-time-complexity">
		Arrays vs. Linked Lists: Time Complexity
		${ linkSymbol }
	</h3>

	<p>
		We have gone through some common operations on arrays and
		linked lists, so try to analyse their time complexity and
		compare your results to the below table.
	</p>

	<table>
		<thead>
			<tr>
				<th>Operation</th>
				<th>Array</th>
				<th>Linked List</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>
					Accessing by index
				</td>
				<td>
					${ await importLatex('$O(1)$') }
				</td>
				<td>
					${ await importLatex('$O(n)$') }
				</td>
			</tr>
			<tr>
				<td>
					Appending an element
				</td>
				<td>
					-
				</td>
				<td>
					${ await importLatex('$O(1)$') }
				</td>
			</tr>
			<tr>
				<td>
					Prepending an element
				</td>
				<td>
					-
				</td>
				<td>
					${ await importLatex('$O(1)$') }
				</td>
			</tr>
			<tr>
				<td>
					Adding an element
				</td>
				<td>
					-
				</td>
				<td>
					${ await importLatex('$O(1)$') } *
				</td>
			</tr>
			<tr>
				<td>
					Removing an element
				</td>
				<td>
					-
				</td>
				<td>
					${ await importLatex('$O(1)$') } *
				</td>
			</tr>
		</tbody>
	</table>

	<p>
		<em>* Assuming we already have a reference to the node we want to
		add or remove. If we don't have this reference, we will have to
		traverse the list to find the node. This takes
		${ await importLatex('$O(n)$') } time.</em>
		<br><br>
		As you can see in the table, accessing elements from a linked
		list takes ${ await importLatex('$O(n)$') } time, and adding or
		removing elements takes ${ await importLatex('$O(1)$') } time.
		<br>
		The catch is that we can only add or remove elements if we have
		a reference to the node we want to add to or to remove.
		We first have to find the node, so we still have to traverse
		the list to add or remove an element.
		<br><br>
		So, linked lists really only make sense if you store references
		to nodes you might want to change, which is usually not
		very efficient.
		<br><br>
		The only true ${ await importLatex('$O(1)$') } operation
		that a linked list supports is appending or prepending an
		element, which we cannot do with arrays, since they are fixed
		in size.
		<br><br>
		Also, since arrays are fixed in size, we cannot really do
		anything with them except accessing and changing elements by
		index.
		<br>
		This is why dynamic arrays and deques exist, which are arrays
		that <em>can</em> change in size and support
		${ await importLatex('$O(1)$') } appending and prepending
		operations.
		<br>
		Dynamic arrays and deques are much more efficient than linked
		lists, since they do store their elements contiguously.
		<br>
		We will talk about these data structures in the
		next blog post.
	</p>

	<h2 id="final-thoughts">
		Final Thoughts
		${ linkSymbol }
	</h2>

	<p>
		In today's blog post, we've learnt how arrays and linked lists
		work, and what their differences are. We've also learnt how to
		implement linked lists and doubly linked lists in Java.
		<br><br>
		In the next blog post, we'll learn how to implement a
		dynamic array works and we will use it to implement a stack and
		a queue.
		<br><br>
		If you found this post helpful, feel free to share it!
		Any <a href="/contact">feedback</a> is very welcome!
	</p>
	`
} as BlogPage
