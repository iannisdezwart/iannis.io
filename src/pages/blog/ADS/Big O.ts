import { inlineJS, inlineSASS, inlineSVG } from 'page-compiler'
import { BlogPage, linkSymbol } from '../blog-pages'
import { comm, createCodeBlockFromStr, createInlineCodeBlock, func, id, keyw, num, op, param } from '../../../util/html-code-syntax-highlighting'
import { importLatex } from '../../../util/latex'

export default {
	imagePath: 'src/img/ADS Wallpaper.svg',
	imageAlt: 'ADS Wallpaper',
	title: 'Big O',
	url: 'ads/big-o',
	series: 'ADS',
	chapter: '0x00',
	description: 'Tutorial on space and time complexity, using Java.',
	date: new Date('9 November 2021'),
	keywords: [ 'ADS', 'Java' ],
	generateContent: async () => /* html */ `
	<h1 id="introduction">
		Introduction
		${ linkSymbol }
	</h1>

	<p>
		Algorithms & Data Structures is an important fundamental concept in computer science.
		Having a deep understanding in how they work allows you to write more efficient code.
		Not only is ADS immenslely useful, but it is also electrifying!
		What's more fun than getting a 1000x performance improvement after rewriting a function using a faster algorithm or a more efficient data structure?
		Yes, this is what you'll be doing when studying ADS!
		<br><br>
		The central idea behind Algorithms & Data Structures is time and space complexity.
		Simply put, it's the amount of time and memory required for a computer to perform a task depending on input size.
		The idea is really quite simple. Let's get started!
	</p>

	<br>

	<h2 id="analysing-code">
		Analysing code
		${ linkSymbol }
	</h2>

	<p>
		Let's take a slice of programming knowledge and a pinch of intuition.
		Without any further context on what time and space complexity is, we will just try to make sense of it.
		<br><br>
		Consider the following Java code:
	</p>

	${ createCodeBlockFromStr(`
	${ keyw('int') }
	${ func('sumArrayElements') }(${ keyw('int') }[] ${ param('arr') })
	{
		${ keyw('int') } ${ id('sum') } ${ op('=') } ${ num('0') };

		${ comm('// Add each element of the array to the sum.') }

		${ keyw('for') } (${ keyw('int') } ${ id('i') } ${ op('=') } ${ num('0') }; ${ id('i') } ${ op('<') } ${ param('arr') }.${ id('length') }; ${ id('i') }${ op('++') })
		{
			${ id('sum') } ${ op('+=') } ${ param('arr') }[${ id('i') }];
		}

		${ keyw('return') } ${ id('sum') };
	}
	`) }

	<p>
		This is a straightforward funcion that sums all elements in an array.
		We simply loop over each element of the array and add it to the output.
		<br><br>
		So, what is the time complexity of this code?
		Well, first we set ${ createInlineCodeBlock(id('sum')) } to zero, which we do 1 time.
		Then we perform the loop over the array n times, where n is the length of the array.
		Lastly, we return the value of ${ createInlineCodeBlock(id('sum')) }.
		If we define each of these steps as an operation, this function perform ${ await importLatex('$1 + n + 1 = n + 2$') } operations.
		<br><br>
		According to the Big O notation, this function has a time complexity of ${ await importLatex('$O(n)$') }.
		<br>
		You might think something like <em>"hey, but what about the 2 operations at the start and end of the function"</em>?
		Well, Big O does't care about the 2.
		Big O only cares about the highest degree of growth, which is n.
		<br>
		This is because Big O is a measure of the growth of a function's time <em>complexity</em>.
		<br>
		When we take large input sizes, the 2 operations at the start and end of the function are simply neglected, as they don't have a substantial effect on the execution time of the function anymore.
	</p>

	<div class="quote">
		For measuring the growth of a function's time complexity, we use the Big O notation.
		Inside the Big O, we put the highest degree of growth, which in the above example is n.
		The Big O notation is therefore ${ await importLatex('$O(n)$') }.
		Usually, this is pronounced like "Oh of n" or simply "Oh n".
	</div>

	<p>
		We also use the Big O notation for the space complexity of a function.
		Space complexity measures the growth of memory usage of a function depending on the input size.
		<br>
		In our example, the space complexity of the function is ${ await importLatex('$O(1)$') },
		since the function only has a single local variable ${ createInlineCodeBlock(id('sum')) }.
		<br>
		Attentive readers might have noticed that the input array is not included in the computation of the space complexity.
		This is not a mistake; space complexity doesn't cover the input!
	</p>

	<h2 id="common-time-complexities">
		Common time complexities
		${ linkSymbol }
	</h2>

	<p>
		Next to ${ await importLatex('$O(n)$') } and ${ await importLatex('$O(1)$') }, there are other common time complexities, like
		${ await importLatex('$O(\\log n)$') }, ${ await importLatex('$O(n \\log n)$') }, ${ await importLatex('$O(n^2)$') }, ${ await importLatex('$O(2^n)$') } and ${ await importLatex('$O(n^n)$') }.
		You can see their growth rate in the following image:
	</p>

	${ inlineSVG('src/img/Big O Graph.svg', { alt: 'Big O Graph', classes: [ 'fullwidth-image' ] }) }

	<p>
		As you can see, the time complexity of a couple of functions grows very rapidly with the input size.
		${ await importLatex('$O(n^n)$') } and ${ await importLatex('$O(2^n)$') } are very bad unless the input size is very small.
		${ await importLatex('$O(n^2)$') } is reasonable for not too large inputs, but it is definitely not fast.
		<br><br>
		Things get interesting for ${ await importLatex('$O(n \\log n)$') }, which still has a much higher growth rate than ${ await importLatex('$O(n)$') }, but it flattens out much faster.
		In fact, the derivative of ${ await importLatex('$O(n \\log n)$') } is ${ await importLatex('$1+\\log n$') }.
		So far, that is the only non-polynomial, non-exponential derivative,
		which explains why ${ await importLatex('$O(n \\log n)$') } doesn't grow as badly as the other time complexities.
		<br><br>
		${ await importLatex('$O(n)$') } is a very common and good time complexity.
		It is often the best time complexity you can achieve on problems with a collection of n input elements.
		<br><br>
		${ await importLatex('$O(\\log n)$') } is a special time complexity, which usually implies that the algorithm uses some form of binary search.
		${ await importLatex('$O(1)$') } simply means that the algorithm can compute its result in a constant amount of time.
		<br><br>
		I will go over some examples for all these time complexities.
	</p>

	<h3 id="linear-time-complexity">
		Linear time complexity ${ await importLatex('$O(n)$', { fixHeight: true }) }
		${ linkSymbol }
	</h3>

	${ createCodeBlockFromStr(`
	${ keyw('int') }
	${ func('sumOneToN') }(${ keyw('int') } ${ param('n') })
	{
		${ keyw('int') } ${ id('sum') } ${ op('=') } ${ num('0') };

		${ keyw('for') } (${ keyw('int') } ${ id('i') } ${ op('=') } ${ num('1') }; ${ id('i') } ${ op('<=') } ${ param('n') }; ${ id('i') }${ op('++') })
		{
			${ id('sum') } ${ op('+=') } ${ id('i') };
		}

		${ keyw('return') } ${ id('sum') };
	}
	`) }

	<p>
		The above function computes the sum of all integers from 1 to n.
		It uses a simple for loop to compute this sum.
		<br><br>
		The time complexity of this function is ${ await importLatex('$O(n)$') },
		because it loops over the array n times.
		<br><br>
		However, we can do much better, by using a well-known formula from our friend Gauss:
	</p>

	<h3 id="constant-time-complexity">
		Constant time complexity ${ await importLatex('$O(1)$', { fixHeight: true }) }
		${ linkSymbol }
	</h3>

	${ createCodeBlockFromStr(`
	${ keyw('int') }
	${ func('gaussSum') }(${ keyw('int') } ${ param('n') })
	{
		${ keyw('return') } ${ param('n') } ${ op('*') } (${ param('n') } ${ op('+') } ${ num('1') }) ${ op('/') } ${ num('2') };
	}
	`) }

	<p>
		This function computes the Gauss sum of a number.
		The Gauss sum is a simple formula to compute the sum of all integers from 1 to n.
		<br><br>
		${ await importLatex('\\[ \\sum_{ i = 1 }^{ n } i = \\frac{ n \\cdot (n + 1) }{ 2 } \\]',
			{ centre: true }) }
		<br>
		The proof is left as an exercise for the reader.
		Hint: Try using mathematical induction!
		<br><br>
		The important difference between this function and the previous one is that this function is ${ await importLatex('$O(1)$') } instead of ${ await importLatex('$O(n)$') }.
		This is because the formula for the Gauss sum can simply be computed in a constant time.
		We replaced the for loop with some basic arithmetic.
		<br><br>
		Imagine if we tried to compute the Gauss sum of a very large number using the ${ await importLatex('$O(n)$') } function.
		It would take a long time to compute, while the
		${ await importLatex('$O(1)$') } version would compute it essentially instantly.
	</p>

	<h3 id="logarithmic-time-complexity">
		Logarithmic time complexity ${ await importLatex('$O(\\log n)$', { fixHeight: true }) }
		${ linkSymbol }
	</h3>

	${ createCodeBlockFromStr(`
	${ keyw('boolean') }
	${ func('sortedArrHasElement') }(${ keyw('int') }[] ${ param('arr') }, ${ keyw('int') } ${ param('n') })
	{
		${ keyw('int') } ${ id('left') } ${ op('=') } ${ num('0') };
		${ keyw('int') } ${ id('right') } ${ op('=') } ${ param('arr') }.${ id('length') } ${ op('-') } ${ num('1') };

		${ keyw('while') } (${ id('left') } ${ op('<') } ${ id('right') })
		{
			${ id('mid') } ${ op('=') } (${ id('left') } ${ op('+') } ${ id('right') }) ${ op('/') } ${ id('2') };

			${ keyw('if') } (${ param('arr') }[${ id('mid') }] ${ op('<') } ${ param('n') })
			{
				${ id('left') } ${ op('=') } ${ id('mid') } ${ op('+') } ${ num('1') };
			}
			${ keyw('else') }
			{
				${ id('right') } ${ op('=') } ${ id('mid') };
			}
		}

		${ keyw('return') } ${ param('arr') }[${ id('left') }] ${ op('==') } ${ param('n') };
	}
	`) }

	<p>
		This code looks complicated, so let's break it down.
		We're writing a function that takes a <em>sorted</em> array of integers and a number, and returns true if the array contains the number.
		Because the array is sorted, we can use binary search to find the number.
		<br><br>
		Binary search is a well-known algorithm, and it is used in many other algorithms.
		The idea is to divide the array in half in each iteration.
		We take the middle element and compare it to the number we want to find.
		If the number is smaller, we continue searching the left half,
		and if it is bigger, we continue searching in the right half.
		We keep doing this until the array cannot be divided anymore.
		Lasty, we check if the remaining one element is the number we're looking for.
		If it is, we return true, because we found the number, otherwise we return false.
		<br><br>
		The above is a lot of text, so I made an applet that can give you
		some intuition as to how the binary search algorithm works.
		It's really not that difficult!
	</p>

	<div id="binary-search-applet"></div>
	${ await inlineSASS('src/sass/binary-search-applet.sass') }
	${ await inlineJS('src/js/binary-search-applet.js') }

	<p>
		If you've played with the applet a couple of times,
		you might realise that it always takes three steps
		to get to the final value.
		This should come as no surprise, since ${ await importLatex('$\\log_2 8 = 3$') }.
		We have to cut the array of 8 elements in half three times
		to get to a final value.
		<br><br>
		It turns out that algorithms with a logarithmic time complexity
		are very efficient.
		Consider an extremely large input of ${ await importLatex("$2^{ 100 }$") } elements to our
		${ createInlineCodeBlock(func("sortedArrHasElement")) } function.
		Since ${ await importLatex("$\\log_2 2^{ 100 } = 100$") },
		we only need a hundred iterations to find out if some value is in this
		uncomprehensively large array!
	</p>

	<h3 id="quadratic-time-complexity">
		Quadratic time complexity ${ await importLatex('$O(n^2)$', { fixHeight: true }) }
		${ linkSymbol }
	</h3>

	${ createCodeBlockFromStr(`
	${ keyw('int') }
	${ func('maxSubArraySum') }(${ keyw('int') }[] ${ param('arr') })
	{
		${ keyw('int') } ${ id('maxSum') } ${ op('=') } ${ num('0') };

		${ keyw('for') } (${ keyw('int') } ${ id('i') } ${ op('=') } ${ num('0') }; ${ id('i') } ${ op('<') } ${ param('arr') }.${ id('length') }; ${ id('i') }${ op('++') })
		{
			${ keyw('int') } ${ id('currentSum') } ${ op('=') } ${ num('0') };

			${ keyw('for') } (${ keyw('int') } ${ id('j') } ${ op('=') } ${ id('i') }; ${ id('j') } ${ op('<') } ${ param('arr') }.${ id('length') }; ${ id('j') }${ op('++') })
			{
				${ id('currentSum') } ${ op('+=') } ${ param('arr') }[${ id('j') }];

					${ keyw('if') } (${ id('currentSum') } ${ op('>') } ${ id('maxSum') })
					{
						${ id('maxSum') } ${ op('=') } ${ id('currentSum') };
					}
			}
		}

		${ keyw('return') } ${ id('maxSum') };
	}
	`) }

	<p>
		This function computes the maximum subarray sum of a given array.
		First, lets define what exactly a subarray is:
		A subarray is a contiguous sequence of elements in an array.
		For example, the array
		${ createInlineCodeBlock('[ 2, 3, 4 ]') }
		is a subarray of the array
		${ createInlineCodeBlock('[ 1, 2, 3, 4, 5 ]') }.
		On the other hand, the array
		${ createInlineCodeBlock('[ 2, 3, 5 ]') }
		is <em>not</em> a subarray of the array
		${ createInlineCodeBlock('[ 1, 2, 3, 4, 5 ]') },
		because there doesn't exist a contiguous sequence
		${ createInlineCodeBlock('[ 2, 3, 5 ]') }
		in the array.
		Note that numbers may also be negative.
		<br><br>
		Now, let's look at the code.
		We start by initializing the maximum sum to zero.
		After all, a subarray of zero elements has a sum of zero.
		Then, we iterate through the array.
		For each element, we go through all the elements after it,
		and we compute the sum of a subarray beginning and ending at the two selected elements.
		This way, we will go over all possible subarrays in the array.
		We keep track of the maximum sum we've found so far.
		In the end, we return the maximum sum we found.
		<br><br>
		This problem can be solved in linear time too!
		<br>
		The linear time solution is left as an exercise for the reader.
		<br>
		Hint: look up Kadane's algorithm.
	</p>

	<h3 id="exponential-time-complexity">
		Exponential time complexity ${ await importLatex('$O(2^n)$', { fixHeight: true }) }
		${ linkSymbol }
	</h3>

	${ createCodeBlockFromStr(`
	${ keyw('int') }
	${ func('fibonacci') }(${ keyw('int') } ${ param('n') })
	{
		${ keyw('if') } (${ param('n') } ${ op('<') } ${ num('2') })
		{
			${ keyw('return') } ${ num('1') };
		}

		${ keyw('return') } ${ func('fibonacci') }(${ param('n') } ${ op('-') } ${ num('1') }) ${ op('+') } ${ func('fibonacci') }(${ param('n') } ${ op('-') } ${ num('2') });
	}
	`) }

	<p>
		The fibonacci sequence is a sequence of numbers
		where the next number is the sum of the previous two numbers.
		The sequence starts with 1 and 1, and the first few terms are
		${ await importLatex('$1, 1, 2, 3, 5, ...$') }.
		<br><br>
		To compute the n-th number in the sequence,
		we need to compute the (n - 1)-th and
		(n - 2)-th numbers.
		In this implementation, we use recursion to do that.
		Since the function calls itself twice,
		the time complexity is ${ await importLatex('$O(2^n)$') }.
		Eventually, we will reach the base case,
		where the first and second numbers are computed.
		<br><br>
		The fibonacci sequence can also be computed in linear time by
		caching values that have already been calculated,
		or even in constant time using a direct formula.
		Again, finding these algorithms is left as an exercise for the reader.
	</p>

	<h3 id="linearithmic-time-complexity">
		Linearithmic time complexity ${ await importLatex('$O(n \\log n)$', { fixHeight: true }) }
		${ linkSymbol }
	</h3>

	<p>
		Linearithmic time complexity means that the time complexity
		is composed of a linear part and a logarithmic part.
		Many algorithms are linearithmic, such as quicksort, mergesort,
		and heapsort.
		<br><br>
		Those sorting algorithms all split the array into halves,
		and then recursively sort the halves. (Divide and Conquer)
		<br>
		Therefore the algorithms have a linearithmic time complexity.
		We will take a look at sorting algorithms in a later blog post,
		so there will be no example for now.
	</p>

	<h3 id="worst-time-complexity">
		Worst time complexity ever ${ await importLatex('$O(n^n)$', { fixHeight: true }) }
		${ linkSymbol }
	</h3>

	<p>
		The ${ await importLatex('$O(n^n)$') } is the worst time complexity
		you're every going to encounter, and I have never seen a sensible
		algorithm using it, so I created a stupid example:
	</p>

	${ createCodeBlockFromStr(`
	${ keyw('int') }
	${ func('computeNToThePowerN') }(${ keyw('int') } ${ param('n') }, ${ keyw('int') } ${ param('m') })
	{
		${ keyw('if') } (${ param('m') } ${ op('==') } ${ num('0') })
		{
			${ keyw('return') } ${ num('1') };
		}

		${ keyw('int') } ${ id('sum') } ${ op('=') } ${ num('0') };

		${ keyw('for') } (${ keyw('int') } ${ id('i') } ${ op('=') } ${ num('0') }; ${ id('i') } ${ op('<') } ${ param('n') }; ${ id('i') }${ op('++') })
		{
			${ id('sum') } ${ op('+=') } ${ func('computeNToThePowerN') }(${ param('n') }, ${ param('m') } ${ op('-') } ${ num('1') });
		}

		${ keyw('return') } ${ id('sum') };
	}
	`) }

	<p>
		This is basically the worst way to compute ${ await importLatex('$n^n$') }.
		<br>
		Amazing, isn't it?!
		<br><br>
		This function calls itself recursively ${ await importLatex('$n$') } times,
		and each time it adds up the result of the previous call.
		Essentially, this function has n nested for loops, each going over the range
		${ await importLatex('$[ 0, n - 1 ]$') }.
		<br><br>
		You're never going to encounter this time complexity,
		so take it as the upper bound of all possible time complexities.
	</p>

	<h2 id="final-thoughts">
		Final thoughts
		${ linkSymbol }
	</h2>

	<p>
		I hope you enjoyed this post and learnt the basics of space and
		time complexity! I hope to post more about Algorithms & Data Structures
		in the near future.
		<br><br>
		If you found this post helpful, feel free to share it!
		Any <a href="/contact">feedback</a> is very welcome!
	</p>
	`
} as BlogPage
