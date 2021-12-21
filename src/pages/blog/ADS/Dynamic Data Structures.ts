import { encodeDirName, inlineJS, inlineSASS, inlineSVG } from 'page-compiler'
import { cl, comm, createCodeBlockFromStr, createInlineCodeBlock, func, id, keyw, num, op, param } from '../../../util/html-code-syntax-highlighting'
import { importLatex } from '../../../util/latex'
import { BlogPage, linkSymbol } from '../blog-pages'
import ADS_LinearDataStructures from './Linear Data Structures'

export default {
	imagePath: 'src/img/ADS Wallpaper.svg',
	imageAlt: 'ADS Wallpaper',
	title: 'Dynamic Data Structures',
	series: 'ADS',
	chapter: '0x03',
	description: 'Dynamic arrays and how they are used in other data structures.',
	date: new Date('25 November 2021'),
	keywords: [ 'ADS', 'Java' ],
	generateContent: async () => /* html */ `
	<h1 id="introduction">
		Introduction
		${ linkSymbol }
	</h1>

	<p>
		Dynamic data structures are data structures that can grow and shrink as needed.
		The simplest example of a dynamic data structure is a dynamic array.
		Most other dynamic data structures are based on dynamic arrays.
		Dynamic arrays solve most of the problems of a normal array,
		and enables us to use almost all of the linked list operations
		in a more efficient way.
		<br><br>
		In this post, we will discuss the dynamic array and how it is
		used in other dynamic data structures.
		We will also implement a stack and queue using dynamic arrays.
	</p>

	<br>

	<h2 id="dynamic-array">
		Dynamic Array
		${ linkSymbol }
	</h2>

	<p>
		When we allocate a normal array, we allocate a fixed amount of memory.
		If we have more elements than we can fit in the allocated memory,
		we cannot add any more elements to the array.
		<br><br>
		Dynamic arrays do support the behaviour of adding any number of elements to itself.
		A dynamic array allocates a fixed amount of memory in the background,
		but it will automatically grow and shrink the array as needed.
		<br><br>
		Growing and shrinking the array is done by reallocating the memory.
		This is done by creating a new array, copying the elements from the old array
		to the new array, and then deleting the old array.
		<br><br>
		It is trivial that it takes ${ await importLatex('$O(n)$') }
		time to copy all the elements over, which is inefficient.
		A dynamic array solves this problem by reallocating a new array
		with double the capacity of the old array if we grow the array.
	</p>

	<br>

	<h3 id="dynamic-array-implementation">
		Dynamic Array Implementation
		${ linkSymbol }
	</h3>

	<p>
		Let's consider a dynamic array implementation and analyse the
		time complexity of its methods to see that it is in fact more
		efficient.
	</p>

	${ createCodeBlockFromStr(`
	${ keyw('class') } ${ cl('DynamicArray') }${ op('<') }${ cl('T') }${ op('>') }
	{
		${ keyw('private') } ${ cl('T') }[] ${ id('array') };
		${ keyw('private') } ${ keyw('int') } ${ id('size') };

		${ keyw('public') }
		${ func('DynamicArray') }(${ keyw('int') } ${ param('capacity') })
		{
			${ id('array') } ${ op('=') } ${ keyw('new') } ${ cl('T') }[${ param('capacity') }];
		}

		${ keyw('public') } ${ keyw('int') }
		${ func('size') }()
		{
			${ keyw('return') } ${ id('size') };
		}

		${ keyw('public') } ${ cl('T') }
		${ func('get') }(${ keyw('int') } ${ param('index') })
		{
			${ keyw('if') }(${ id('index') } ${ op('<') } ${ num('0') } ${ keyw('||') } ${ id('index') } ${ op('>=') } ${ id('size') })
			{
				${ keyw('throw') } ${ keyw('new') } ${ cl('IndexOutOfBoundsException') }();
			}

			${ keyw('return') } ${ id('array') }[${ param('index') }];
		}

		${ keyw('public') } ${ keyw('void') }
		${ func('append') }(${ cl('T') } ${ param('element') })
		{
			${ comm('// Check if the array has space on it to append the element.') }

			${ keyw('if') } (${ id('size') } ${ op('==') } ${ id('array') }.${ id('length') })
			{
				${ comm('// Double the capacity of the array.') }

				${ func('reallocate') }(${ id('array') }.${ id('length') } ${ op('*') } ${ num('2') });
			}

			${ comm('// Now we are sure the array has enough capacity.') }
			${ comm('// Append the element to the array.') }

			${ id('array') }[${ id('size') }] ${ op('=') } ${ param('element') };
			${ id('size') }${ op('++') };
		}

		${ keyw('private') } ${ keyw('void') }
		${ func('reallocate') }(${ keyw('int') } ${ param('newCapacity') })
		{
			${ comm('// Create a new array of the requested new capacity.') }

			${ cl('T') }[] ${ id('newArray') } ${ op('=') } ${ keyw('new') } ${ cl('T') }[${ param('newCapacity') }];

			${ comm('// Copy the elements over to the new array.') }

			${ keyw('for') } (${ keyw('int') } ${ id('i') } ${ op('=') } ${ num('0') }; ${ id('i') } ${ op('<') } ${ id('size') }; ${ id('i') }${ op('++') })
			{
				${ id('newArray') }[${ id('i') }] ${ op('=') } ${ id('array') }[${ id('i') }];
			}

			${ comm('// Delete the old array.') }

			${ id('array') } ${ op('=') } ${ id('newArray') };
		}
	}
	`) }

	<p>
		This implementation of a dynamic array has two public methods
		that can be used to access and add elements:
		${ createInlineCodeBlock(func('get')) } and
		${ createInlineCodeBlock(func('append')) }.
		<br><br>
		${ createInlineCodeBlock(func('get')) } just returns the
		element at the given index or throws if the index is out of bounds.
		It takes ${ await importLatex('$O(1)$') } time.
		<br><br>
		The ${ createInlineCodeBlock(func('append')) } method appends
		an element to the end of the array.
		If the array has enough space, it will just append the element,
		which takes ${ await importLatex('$O(1)$') } time:
	</p>

	${ inlineSVG('src/img/Dynamic Array Append O(1).svg', { classes: [ 'fullwidth-image' ] }) }

	<p>
		If the array does not have enough space, it will double the
		capacity of the array, copy the elements over to the new array,
		delete the old array, and then append the element.
		This takes ${ await importLatex('$O(n)$') } time:
	</p>

	${ inlineSVG('src/img/Dynamic Array Append O(n).svg', { classes: [ 'fullwidth-image' ] }) }

	<p>
		What's interesting though, is that the average time complexity
		of the ${ createInlineCodeBlock(func('append')) } method is
		actually ${ await importLatex('$O(1)$') }.
		<br>
		This might seem counter-intuitive, but it is true.
		Consider the following scenario:
	</p>

	${ createCodeBlockFromStr(`
		${ cl('DynamicArray') }<${ keyw('int') }> ${ id('array') } ${ op('=') } ${ keyw('new') } ${ cl('DynamicArray') }<${ cl('int') }>(${ num('16') });

		${ keyw('for') } (${ keyw('int') } ${ id('i') } ${ op('=') } ${ num('0') }; ${ id('i') } ${ op('<') } ${ num('1073741824') }; ${ id('i') }${ op('++') })
		{
			${ id('array') }.${ func('append') }(${ id('i') });
		}
	`) }

	<p>
		Here, we create a dynamic array of initial capacity 16 and append
		1073741824 (${ await importLatex('$2^{30}$') }) elements to it.
		<br><br>
		For the first 16 elements, the time complexity is of the
		${ createInlineCodeBlock(func('append')) } method is always
		${ await importLatex('$O(1)$') }, because the array has enough
		space to append the element.
		<br><br>
		We have to grow the array after it has reached 16 elements.
		The next time we have to grow the array is when the array
		has 32 elements on it. Then, when the array has 64 elements,
		and so on.
		<br>
		These are the powers of two, starting from 16.
		In these cases, we have to copy all elements on the array
		over to the new bigger array.
		<br>
		All other times, the array has enough space to append the
		element, so we can just put the element in the next free slot.
		<br><br>
		So, we're doing two operations:
		adding elements and and copying elements.
		<br><br>
		Let's compute the total number of individual operations that
		we have to perform to append all 1073741824 elements to the
		dynamic array.
		<br>
		It is trivial to see that we will have to perform
		${ await importLatex('$2^{30}$') } add operations,
		since we certainly have to add all elements to the array.
		<br><br>
		But how many times will we have to copy elements over to the
		new array?
		<br>
		If the number of elements on the array is a power of two,
		the array is completely full and we have to grow it,
		which involves copying all currently stored elements
		over to a bigger chunk of memory.
		<br>
		Since there are 26 powers of two between
		${ await importLatex('$2^4$') } (16) and
		${ await importLatex('$2^{30}$') } (1073741824),
		we have to construct a new array 26 times.
		<br>
		The first time, we have to copy ${ await importLatex('$2^4$') }
		elements, the second time ${ await importLatex('$2^5$') }
		elements, ..., the last time ${ await importLatex('$2^{29}$') }
		elements.
		<br><br>
		${ await importLatex('\\[ \\sum_{i=4}^{29} 2^i = 2^{30} - 2^4  \\approx 2^{30} \\]', { centre: true }) }
		<br><br>
		It turns out we have to do approximately
		${ await importLatex('$2^{30}$') } copy operations,
		which is the same number as the number of add operations.
		<br><br>
		So for each call to the ${ createInlineCodeBlock(func('append')) }
		method, we have to perform two operations on average.
		Since this is a constant number and we can generalise this
		to any number of elements, we can conclude that the average time
		complexity of the ${ createInlineCodeBlock(func('append')) }
		method is ${ await importLatex('$O(1)$') }.
	</p>

	<div class="quote">
		Appending an element to a dynamic array takes
		${ await importLatex('$O(1)$') } time on average.
	</div>

	<br>

	<h3 id="dynamic-array-interface">
		Dynamic Array Interface
		${ linkSymbol }
	</h3>

	<p>
		Many dynamic array implementations support the following operations:
		(Which the
		<a href="https://docs.oracle.com/javase/8/docs/api/java/util/ArrayList.html" target="_blank">
			dynamic array implementation from the Java standard library
			${ createInlineCodeBlock(cl('ArrayList')) }
		</a>
		also does.)
	</p>

	<table>
		<thead>
			<tr>
				<th>Operation</th>
				<th>Time complexity</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>
					Accessing by index (get & set)
				</td>
				<td>
					${ await importLatex('$O(1)$') }
				</td>
			</tr>
			<tr>
				<td>
					Appending an element to the end
				</td>
				<td>
					${ await importLatex('$O(1)$') }
				</td>
			</tr>
			<tr>
				<td>
					Extracting an element from the end
				</td>
				<td>
					${ await importLatex('$O(1)$') }
				</td>
			</tr>
			<tr>
			<tr>
				<td>
					Adding an element at a given index
					<br>
					(shifts the elements after the index to the right)
				</td>
				<td>
					${ await importLatex('$O(n)$') }
				</td>
			</tr>
			<tr>
				<td>
					Removing an element at a given index
					<br>
					(shifts the elements after the index to the left)
				</td>
				<td>
					${ await importLatex('$O(n)$') }
				</td>
			</tr>
		</tbody>
	</table>

	<p>
		We have already implemented the getting by index and appending
		an element operations. The implementations of the rest
		of the operations are left as an exercise for the reader.
	</p>

	<br>

	<h3 id="dynamic-array-vs-linked-list">
		Dynamic Array Vs. Linked List
		${ linkSymbol }
	</h3>

	<p>
		In the <a href="${ `/blog/${ encodeDirName(ADS_LinearDataStructures.title) }` }">previous post</a>,
		we discussed that arrays are much faster than linked lists,
		but less flexible.
		<br><br>
		Dynamic arrays try to take the best of both worlds and are
		more flexible, while still storing its elements contiguously
		for maximum performance.
		<br><br>
		Dynamic arrays can do everything linked lists can do,
		but they are faster.
		<br>
		The one thing dynamic arrays are slower at is adding elements
		at arbitrary indices, provided that we have a reference to the
		element we want to add the item after.
		<br><br>
		A linked list really only makes sense if we have a very large
		number of elements and we keep a pointer to one or a couple
		of hotspot elements that we're currently processing.
		<br><br>
		A good example of a problem where using a linked list makes
		sense is
		<a href="https://courses.ewi.tudelft.nl/ads/qq/2.php" target="_blank">
			the third problem of the TU Delft ADS Quadruple Quest
		</a>.
		The input file can be found
		<a href="https://courses.ewi.tudelft.nl/ads/qq/2_input_xyr.php">
			here
		</a>.
		<br><br>
		Funny enough, an optimised implementation of a dynamic array
		still beats linked lists in this problem, because the input
		size (10000) is not extremely large.
	</p>

	<br>

	<h2 id="stack-and-queue-implementation">
		Stack and Queue Implementation
	</h2>

	<p>
		Stacks and Queues are two very common dynamic linear data
		structures. We will discuss them both and how they can be
		efficiently implemented using dynamic arrays.
		Stacks and Queues can also be implemented using linked lists,
		but as you can see from the results of
		<a href="https://github.com/iannisdezwart/queues-and-stacks-bench/" target="_blank">the benchmark I did</a>,
		those implementations are much slower.
	</p>

	<br>

	<h3 id="stacks">
		Stacks
		${ linkSymbol }
	</h3>

	<p>
		A stack is a last-in-first-out data structure.
		We can push elements onto the stack, and pop elements off the
		stack. The last element that is pushed on the stack is the first
		element that is popped off the stack.
	</p>

	${ inlineSVG('src/img/Stack.svg', { classes: [ 'fullwidth-image' ] }) }

	<p>
		The stack in the picture above is represented horizontally,
		but it might be more intuitive to think of it as a vertical
		stack of elements.
		<br>
		Since it is hard to make a vertical image look good in a blog
		post, we will think of the stack as a horizontal array
		with a "bottom" on the left and a "top" on the right.
		<br><br>
		When we push an element onto the stack, we add it to the
		right of the stack:
	</p>

	${ inlineSVG('src/img/Stack Push.svg', { classes: [ 'fullwidth-image' ] }) }

	<p>
		When we pop an element off the stack, we remove the element
		from the right of the stack:
	</p>

	${ inlineSVG('src/img/Stack Pop.svg', { classes: [ 'fullwidth-image' ] }) }

	<p>
		With the two main operations of a stack in mind,
		let's implement it using a dynamic array.
	</p>

	<br>

	<h3 id="stack-implementation">
		Stack Implementation
		${ linkSymbol }
	</h3>

	${ createCodeBlockFromStr(`
	${ keyw('class') } ${ cl('Stack') }${ op('<') }${ cl('T') }${ op('>') }
	{
		${ keyw('private') } ${ cl('T') }[] ${ id('array') };
		${ keyw('private') } ${ keyw('int') } ${ id('size') };

		${ keyw('public') }
		${ func('Stack') }(${ keyw('int') } ${ param('capacity') })
		{
			${ id('array') } ${ op('=') } ${ keyw('new') } ${ cl('T') }[${ id('capacity') }];
			${ id('size') } ${ op('=') } ${ num('0') };
		}

		${ keyw('public') } ${ keyw('int') }
		${ func('size') }()
		{
			${ keyw('return') } ${ id('size') };
		}

		${ keyw('public') } ${ keyw('void') }
		${ func('push') }(${ cl('T') } ${ param('element') })
		{
			${ comm('// If the array is too small, grow it.') }

			${ keyw('if') } (${ id('size') } ${ op('==') } ${ id('array') }.${ id('length') })
			{
				${ func('reallocate') }(${ id('array') }.${ id('length') } ${ op('*') } ${ num('2') });
			}

			${ comm('// Add the element to the top of the stack.') }

			${ id('array') }[${ id('size') }] ${ op('=') } ${ param('element') };
			${ id('size') }${ op('++') };
		}

		${ keyw('public') } ${ cl('T') }
		${ func('pop') }()
		{
			${ keyw('if') } (${ id('size') } ${ op('==') } ${ num('0') })
			{
				${ keyw('throw') } ${ keyw('new') } ${ cl('EmptyStackException') }();
			}

			${ comm('// Remove the element at the top of the stack.') }

			${ id('size') }${ op('--') };
			${ cl('T') } ${ id('element') } ${ op('=') } ${ id('array') }[${ id('size') }];

			${ comm('// If the array is very big, shrink it to save memory.') }

			${ keyw('if') } (${ id('array') }.${ id('length') } ${ op('>') } ${ num('16') } ${ op('&&') } ${ id('size') } ${ op('==') } ${ id('array') }.${ id('length') } ${ op('/') } ${ num('2') })
			{
				${ func('reallocate') }(${ id('array') }.${ id('length') } ${ op('/') } ${ num('2') });
			}

			${ keyw('return') } ${ id('element') };
		}

		${ keyw('private') } ${ keyw('void') }
		${ func('reallocate') }(${ keyw('int') } ${ param('newCapacity') })
		{
			${ comm('// Create a new array of the requested new capacity.') }

			${ cl('T') }[] ${ id('newArray') } ${ op('=') } ${ keyw('new') } ${ cl('T') }[${ param('newCapacity') }];

			${ comm('// Copy the elements over to the new array.') }

			${ keyw('for') } (${ keyw('int') } ${ id('i') } ${ op('=') } ${ num('0' )}; ${ id('i') } ${ op('<') } ${ id('size') }; ${ id('i') }${ op('++') })
			{
				${ id('newArray') }[${ id('i') }] ${ op('=') } ${ id('array') }[${ id('i') }];
			}

			${ comm('// Delete the old array.') }

			${ id('array') } ${ op('=') } ${ id('newArray') };
		}
	}
	`) }

	<p>
		As you can see, the stack implementation looks very similar
		to the dynamic array we implemented earlier.
		<br>
		The ${ createInlineCodeBlock(func('push')) } and
		${ createInlineCodeBlock(func('reallocate')) } methods are
		essentially the same as the
		${ createInlineCodeBlock(func('append')) } and
		${ createInlineCodeBlock(func('reallocate')) } methods from the
		dynamic array implementation, respectively.
		<br>
		We just added a method to pop an element off the stack.
		<br><br>
		Both the ${ createInlineCodeBlock(func('push')) } and the
		${ createInlineCodeBlock(func('pop')) } methods are
		${ await importLatex('$O(1)$') } on average, because they
		double and cut in half the size of the array as needed.
		<br><br>
		The Java standard library has a
		<a href="https://docs.oracle.com/javase/7/docs/api/java/util/Stack.html" target="_blank">stack implementation</a>
		too.
	</p>

	<br>

	<h3 id="queues">
		Queues
		${ linkSymbol }
	</h3>

	<p>
		A queue is a first-in-first-out data structure.
		The first element that is pushed onto a queue is the first
		element that is popped off.
		<br><br>
		Since the terms "bottom" and "top" don't really make sense
		in a queue, we'll use the terms "front" and "back" instead.
		The element at the front of the queue is the first element
		that was inserted and will be the first element that is
		removed.
		<br>
		In some implementations, the terms "push" and "pop" are
		called "enqueue" and "dequeue".
	</p>

	${ inlineSVG('src/img/Queue.svg', { classes: [ 'fullwidth-image' ] }) }

	<p>
		When we push an element onto the queue, we add it to the back
		of the queue:
	</p>

	${ inlineSVG('src/img/Queue Push.svg', { classes: [ 'fullwidth-image' ] }) }

	<p>
		When we pop an element off the queue, we remove the first
		element of the queue. Note that the indices of the array
		also change:
	</p>

	${ inlineSVG('src/img/Queue Pop.svg', { classes: [ 'fullwidth-image' ] }) }

	<br>

	<h3 id="queue-implementation">
		Queue Implementation
		${ linkSymbol }
	</h3>

	<p>
		Implementing a queue using a dynamic array is slightly more
		tricky than the stack implementation.
		<br>
		The reason is that we need to be able to remove the first
		element of the queue, which means that we have to shift all
		the elements in the array to the left.
		This operation would be very expensive, because we have to
		move all elements one place to the left, which takes
		${ await importLatex('$O(n)$') } time.
		<br><br>
		However, we can also do something very clever and make the
		pop operation ${ await importLatex('$O(1)$') }.
		<br>
		We do this by making the dynamic array circular.
		This means that we save the index of the actual first element
		(the front), and we can just increment the front whenever we
		pop an element off the queue.
		We will also keep track of the last element index (the back)
		to make our lives easier.
		<br>
		Elements that would be placed after the end of the array
		are circularly placed at the beginning of the array instead.
		<br><br>
		Let's bring it to life:
	</p>

	${ createCodeBlockFromStr(`
	${ keyw('class') } ${ cl('Queue') }${ op('<') }${ cl('T') }${ op('>') }
	{
		${ keyw('private') } ${ cl('T') }[] ${ id('array') };
		${ keyw('private') } ${ keyw('int') } ${ id('front') };
		${ keyw('private') } ${ keyw('int') } ${ id('size') };

		${ keyw('public') }
		${ func('Queue') }(${ keyw('int') } ${ param('capacity') })
		{
			${ id('array') } ${ op('=') } ${ keyw('new') } ${ cl('T') }[${ id('capacity') }];
			${ id('size') } ${ op('=') } ${ num('0') };
			${ id('front') } ${ op('=') } ${ num('0') };
		}

		${ keyw('public') } ${ keyw('int') }
		${ func('size') }()
		{
			${ keyw('return') } ${ id('size') };
		}

		${ keyw('public') } ${ keyw('void') }
		${ func('push') }(${ cl('T') } ${ param('element') })
		{
			${ comm('// If the array is too small, grow it.') }

			${ keyw('if') } (${ id('size') } ${ op('==') } ${ id('array') }.${ id('length') })
			{
				${ func('reallocate') }(${ id('array') }.${ id('length') } ${ op('*') } ${ num('2') });
			}

			${ comm('// Add the element to the back of the queue.') }

			${ id('array') }[${ id('back') }] ${ op('=') } ${ param('element') };
			${ id('size') }${ op('++') };

			${ comm('// If the back of the queue would exceed the array size,') }
			${ comm('// circularly place it at the front of the array.') }

			${ keyw('if') } (${ id('back') } ${ op('==') } ${ id('array') }.${ id('length') } ${ op('-') } ${ num('1') })
			{
				${ id('back') } ${ op('=') } ${ num('0') };
			}
			
			${ comm('// Else, we can safely increment the back.') }

			${ keyw('else') }
			{
				${ id('back') }${ op('++') };
			}

		}

		${ keyw('public') } ${ cl('T') }
		${ func('pop') }()
		{
			${ keyw('if') } (${ id('size') } ${ op('==') } ${ num('0') })
			{
				${ keyw('throw') } ${ keyw('new') } ${ cl('EmptyQueueException') }();
			}

			${ comm('// Remove the element at the front of the queue.') }

			${ cl('T') } ${ id('element') } ${ op('=') } ${ id('array') }[${ id('front') }];
			${ id('size') }${ op('--') };

			${ comm('// If the front of the queue would exceed the array size,') }
			${ comm('// circularly place it at the front of the array.') }

			${ keyw('if') } (${ id('front') } ${ op('==') } ${ id('array') }.${ id('length') } ${ op('-') } ${ num('1') })
			{
				${ id('front') } ${ op('=') } ${ num('0') };
			}

			${ comm('// Else, we can safely increment the front.') }

			${ keyw('else') }
			{
				${ id('front') }${ op('++') };
			}

			${ comm('// If the array is very big, shrink it to save memory.') }

			${ keyw('if') } (${ id('array') }.${ id('length') } ${ op('>') } ${ num('16') } ${ op('&&') } ${ id('size') } ${ op('==') } ${ id('array') }.${ id('length') } ${ op('/') } ${ num('2') })
			{
				${ func('reallocate') }(${ id('array') }.${ id('length') } ${ op('/') } ${ num('2') });
			}

			${ comm('// Finally, return the element.') }

			${ keyw('return') } ${ id('element') };
		}

		${ keyw('private') } ${ keyw('void') }
		${ func('reallocate') }(${ keyw('int') } ${ param('newCapacity') })
		{
			${ comm('// Create a new array of the requested new capacity.') }

			${ cl('T') }[] ${ id('newArray') } ${ op('=') } ${ keyw('new') } ${ cl('T') }[${ param('newCapacity') }];

			${ comm('// Copy the elements over to the new array.') }
			${ comm('// We start at the front and circularly copy all') }
			${ comm('// elements until we reach the back.') }

			${ keyw('for') } (${ keyw('int') } ${ id('i') } ${ op('=') } ${ num('0') }; ${ id('i') } ${ op('<') } ${ id('size') }; ${ id('i') }${ op('++') })
			{
				${ comm('// Note the use of the modulo operator;') }
				${ comm('// it ensures that we iterate over a circular range.') }

				${ id('newArray') }[${ id('i') }] ${ op('=') } ${ id('array') }[(${ id('front') } ${ op('+') } ${ id('i') }) ${ op('%') } ${ id('array') }.${ id('length') }];
			}

			${ comm('// Delete the old array.') }

			${ id('array') } ${ op('=') } ${ id('newArray') };

			${ comm('// Reset the front and back.') }

			${ id('front') } ${ op('=') } ${ num('0') };
			${ id('back') } ${ op('=') } ${ id('size') } ${ op('%') } ${ id('array') }.${ id('length') };
		}
	}
	`) }

	<p>
		I created an applet which can give you some more intuition
		about how the circular dynamic array we used in the
		queue implementation works.
		<br>
		Play around with it and push and pop some elements!
		See what happens when you push more elements than
		the array can hold.
	</p>

	<div id="queue-applet"></div>
	${ await inlineSASS('src/sass/queue-applet.sass') }
	${ await inlineJS('src/js/queue-applet.js') }

	<br>

	<h2 id="final-thoughts">
		Final Thoughts
		${ linkSymbol }
	</h2>

	<p>
		I hope you enjoyed this post and acquired a greater
		understanding of dynamic data structures.
		<br>
		In the next post, we will discuss heaps and priority queues.
		<br><br>
		If you found this post helpful, feel free to share it!
		Any <a href="/contact">feedback</a> is very welcome!
	</p>
	`
} as BlogPage