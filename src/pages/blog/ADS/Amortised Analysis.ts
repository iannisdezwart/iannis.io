import { inlineSVG } from 'page-compiler'
import { cl, comm, createCodeBlockFromStr, createInlineCodeBlock, func, id, keyw, num, op, param, str } from '../../../util/html-code-syntax-highlighting'
import { importLatex } from '../../../util/latex'
import { BlogPage, createSpoiler, linkSymbol } from '../blog-pages'
import ADS_BigO from './Big O'

export default {
	imagePath: 'src/img/ADS Wallpaper.svg',
	imageAlt: 'ADS Wallpaper',
	title: 'Amortised Analysis',
	url: 'ads/amortised-analysis',
	series: 'ADS',
	chapter: '0x01',
	description: 'But how do we calculate and analyse Big O from code?',
	date: new Date('15 November 2021'),
	keywords: [ 'ADS', 'Java' ],
	generateContent: async () => /* html */ `
	<h1 id="introduction">
		Introduction
		${ linkSymbol }
	</h1>

	<p>
		When writing an algorithm or analysing a program,
		you should be able to calculate the Big O of the algorithm.
		This process is called amortised analysis.
		<br><br>
		In this article, we will perform this analysis on some
		programs and algorithms, and explain how to calculate the
		Big O of each of them.
	</p>

	<h2 id="big-o-formalised">
		The Big O family formalised
	</h2>

	<p>
		First, let's formalise what exactly Big O is.
		If you've read the <a href="${ `/blog/${ ADS_BigO.url }` }">previous article</a>,
		you should be able to have some good intuition about what Big O is already.
	</p>

	<div class="quote">
		A function ${ await importLatex('$f(n)$') } is
		${ await importLatex('$O(g(n))$') } if and only if
		${ await importLatex('\\[ \\lim_{ n \\rightarrow \\infty } \\frac{ f(n) }{ g(n) } \\]') } converges.
	</div>

	<p>
		Why is this so?
		<br><br>
		From the previous post, we concluded that ${ await importLatex('$f(n)$') } is ${ await importLatex('$O(g(n))$') }
		if ${ await importLatex('$g(n)$') } is the highest degree of ${ await importLatex('$n$') } in ${ await importLatex('$f(n)$') }.
		<br>
		If we divide two functions with the same growth rate and approach infinity,
		we will end up with a computable value.
		<br><br>
		Let's try this out on an example.
		Imagine we have a function ${ await importLatex('$f(n) = 2n^2 + 17n + 38$') }
		and we want to check if it is ${ await importLatex('$O(n^2)$') }.
		Certainly, this is the case, because both functions have the same highest degree
		${ await importLatex('$n^2$') }, but we will prove it mathematically.
		<br>
		We compute the limit as we approach an infinite input size:
		<br><br>
		${ await importLatex('\\[ \\lim_{ n \\rightarrow \\infty } \\frac{ f(n) }{ g(n) } \\]', { centre: true }) }
		<br>
		${ await importLatex('\\[ = \\lim_{ n \\rightarrow \\infty } \\frac{ 2n^2 + 17n + 38 }{ n^2 } \\]', { centre: true }) }
		<br>
		${ await importLatex('\\[ = \\lim_{ n \\rightarrow \\infty } \\frac{ 2 + \\frac{17}{n} + \\frac{38}{n^2} }{ 1 } = 2\\]', { centre: true }) }
		<br><br>
		Because the limit converges to a constant,
		we can conclude that ${ await importLatex('$f(n)$') } is
		indeed ${ await importLatex('$O(g(n))$') }.
		<br><br>
		You might notice that according to this definition of Big O,
		${ await importLatex('$O(n)$') } is also ${ await importLatex('$O(n^2)$') }.
		This is true. The Big O of a function ${ await importLatex('$f(n)$') }
		actually specifies all functions that have a growth rate
		equal or greater than the worst-case growth rate of
		${ await importLatex('$f(n)$') }.
		In Algorithms & Data Structures, we're only really
		insterested in the tightest Big O.
	</p>

	<h2 id="amortised-analysis">
		Amortised Analysis
		${ linkSymbol }
	</h2>

	<h3 id="printing squares">
		Printing Squares
		${ linkSymbol }
	</h3>

	<p>
		The time and space complexity of some functions can
		be easily determined, while it can be more difficult
		for others.
		<br><br>
		Let's start with a simple example.
		Can you figure out what the space and time complexity of
		the following function is?
	</p>

	${ createCodeBlockFromStr(`
	${ keyw('void') }
	${ func('printAsciiSquareBorder') }(${ keyw('int') } ${ param('n') })
	{
		${ keyw('for') } (${ keyw('int') } ${ id('y') } ${ op('=') } ${ num('0') }; ${ id('y') } ${ op('<') } ${ param('n') }; ${ id('y') }${ op('++') })
		{
			${ keyw('for') } (${ keyw('int') } ${ id('x') } ${ op('=') } ${ num('0') }; ${ id('x') } ${ op('<') } ${ param('n') }; ${ id('x') }${ op('++') })
			{
				${ comm('// If this point is on an edge, print \'#\'') }

				${ keyw('if') } (${ id('x') } ${ op('==') } ${ num('0') } ${ op('||') } ${ id('x') } ${ op('==') } ${ param('n') } ${ op('-') } ${ num('1') } ${ op('||') } ${ id('y') } ${ op('==') } ${ num('0') } ${ op('||') } ${ id('y') } ${ op('==') } ${ param('n') } ${ op('-') } ${ num('1') })
				{
					${ cl('System') }.${ id('out') }.${ func('print') }(${ str('"#"') });
				}

				${ comm('// Otherwise, print a space') }

				${ keyw('else') }
				{
					${ cl('System') }.${ id('out') }.${ func('print') }(${ str('" "') });
				}
			}

			${ comm('// Print newline') }

			${ cl('System') }.${ id('out') }.${ func('println') }();
		}
	}
	`) }

	${ createSpoiler('Spoiler: analysis', /* html */ `
	<p>
		The time complexity is ${ await importLatex('$O(n^2)$') }.
		We can easily see this by the fact that we have two loops,
		each iterating ${ await importLatex('$n$') } times.
		<br>
		The outer loop is executed for each row,
		and the inner loop is executed once for each column in that row.
		So, the total number of iterations is ${ await importLatex('$n^2$') }.
		<br><br>
		The space complexity is constant
		(${ await importLatex('$O(1)$') }), however.
		This function does not use or allocate any additional memory.
		If we were to use a ${ createInlineCodeBlock(cl('String')) }
		or a ${ createInlineCodeBlock(cl('StringBuilder')) } to build the
		output before printing it for example, the space complexity
		would be ${ await importLatex('$O(n^2)$') }.
	</p>
	`) }

	<h3 id="recursion-factorial">
		Recursion: Factorial
		${ linkSymbol }
	</h3>

	<p>
		When you have a recursive function, it is a bit harder
		to determine the space and time complexity.
		<br><br>
		Let's start with a simple example.
	</p>

	${ createCodeBlockFromStr(/* html */ `
	${ keyw('int') }
	${ func('factorial') }(${ keyw('int') } ${ param('n') })
	{
		${ keyw('if') } (${ param('n') } ${ op('==') } ${ num('1') })
		{
			${ keyw('return') } ${ num('1') };
		}

		${ keyw('return') } ${ param('n') } ${ op('*') } ${ func('factorial') }(${ param('n') } ${ op('-') } ${ num('1') });
	}
	`) }

	${ createSpoiler('Spoiler: analysis', /* html */ `
	<p>
		The time complexity is ${ await importLatex('$O(n)$') }.
		<br><br>
		Notice that we have a recursive function with a branch:
		<ul>
			<li>
				Base case:
				If ${ id('n') } is equal to ${ num('1') },
				the function returns ${ num('1') }.
			</li>
			<li>
				Recursive case:
				The function returns ${ id('n') } times the result of calling
				${ func('factorial') }(${ id('n') } ${ op('-') } ${ num('1') }).
			</li>
		</ul>
		The base case has a time complexity of ${ await importLatex('$O(1)$') },
		because it only executes once.
		What's left to do is to figure out the time complexity of the recursive case.
		<br>
		Intuitively, we can see that each recursive call is called with
		${ id('n') } decremented by one, and the base case is reached
		when ${ id('n') } is equal to ${ num('1') }.
		Therefore, the function must be called
		${ await importLatex('$n$') } times.
		<br>
		From this we can conclude that the time complexity of the
		recursive case is ${ await importLatex('$O(n)$') }.
		<br><br>
		The space complexity is also ${ await importLatex('$O(n)$') }.
		This is because the recursive call stack is ${ await importLatex('$n$') }
		levels deep.
	</p>

	${ inlineSVG('src/img/Recursion.svg', { classes: [ 'fullwidth-image' ] }) }

	<p>
		Note that each stack frame holds return value, local variables
		and parameters. Some functions might not have any local
		variables or parameters, but all functions have a return value.
		Therefore you always have to take the stack frame size into account
		when calculating the space complexity for recursive functions.
		<br>
		In the above example, each call to the function takes one
		parameter and the return value on its stack frame.
	</p>
	`) }

	<h3 id="recursion-binary-search">
		Recursion: Binary Search
		${ linkSymbol }
	</h3>

	<p>
		Consider the binary search algorithm you have seen in the
		<a href="${ `/blog/${ ADS_BigO.url }#logarithmic-time-complexity` }">previous post</a>.
		<br>
		We can also use this algorithm recursively:
	</p>

	${ createCodeBlockFromStr(`
	${ keyw('boolean') }
	${ func('sortedArrHasElement') }(${ keyw('int') }[] ${ param('arr') }, ${ keyw('int') } ${ param('n') }, ${ keyw('int') } ${ param('left') }, ${ keyw('int') } ${ param('right') })
	{
		${ keyw('if') } (${ param('left') } ${ op('==') } ${ param('right') })
		{
			${ keyw('return') } ${ param('arr') }[${ param('left') }] ${ op('==') } ${ param('n') };
		}

		${ keyw('int') } ${ id('mid') } ${ op('=') } (${ param('left') } ${ op('+') } ${ param('right') }) ${ op('/') } ${ num('2') };

		${ keyw('if') } (${ param('arr') }[${ id('mid') }] ${ op('<') } ${ param('n') })
		{
			${ keyw('return') } ${ func('sortedArrHasElement') }(${ param('arr') }, ${ param('n') }, ${ id('mid') } ${ op('+') } ${ num('1') }, ${ param('right') });
		}
		${ keyw('else') }
		{
			${ keyw('return') } ${ func('sortedArrHasElement') }(${ param('arr') }, ${ param('n') }, ${ param('left') }, ${ id('mid') });
		}
	}
	`) }

	${ createSpoiler('Spoiler: analysis', /* html */ `
	<p>
		The time complexity is ${ await importLatex('$O(\\log n)$') },
		which should come as no surprise, because we are implementing
		a binary search algorithm.
		<br><br>
		Let's see why this is the case.
		<br>
		The code has three branches:
		<ul>
			<li>
				Base case:
				If our range consists of a single element
				(${ createInlineCodeBlock(`${ id('left') } ${ op('==') } ${ id('right') }`) }),
				we check if that element is equal to the element
				we are looking for. If it is, we return true.
				Otherwise, we return false.
			</li>
			<li>
				Recursive case 1:
				If the middle element is less than the element
				we are looking for, we recursively continue our
				search in the right half of the array
				(all elements between
				${ createInlineCodeBlock(`${ id('mid') } ${ op('+') } ${ num('1') }`) }
				and ${ createInlineCodeBlock(id('right')) }).
			</li>
			<li>
				Recursive case 2:
				If the middle element is greater than or equal
				to the element we are looking for, we recursively
				continue our search in the left half of the array
				(all elements between
				${ createInlineCodeBlock(id('left')) } and
				${ createInlineCodeBlock(id('mid')) }.
			</li>
		</ul>
		The base case has a time complexity of ${ await importLatex('$O(1)$') },
		because it only executes once.
		<br>
		In both recursive cases, the function is called again
		with half the range. The range is recursively halved
		until the base case is reached.
		<br>
		This means that the time complexity of the recursive case
		is ${ await importLatex('$O(\\log n)$') }.
		<br><br>
		The space complexity is also ${ await importLatex('$O(\\log n)$') },
		because the recursive call stack is ${ await importLatex('$\\log n$') } deep.
		<br>
		Note that if we made this function iterative,
		the space complexity would be ${ await importLatex('$O(1)$') }.
		An example can be found in the
		<a href="${ `/blog/${ ADS_BigO.url }#logarithmic-time-complexity` }">previous post</a>.
	</p>
	`) }

	<h3 id="generating-subsets">
		Generating Subsets
		${ linkSymbol }
	</h3>

	<p>
		Consider the following problem:
		<br><br>
		You get an input array of integers and a non-zero integer ${ createInlineCodeBlock(id('n')) }.
		Find the maximum subset with a sum that is divisible by ${ createInlineCodeBlock(id('n')) }.
		Return the sum of the found subset.
		<br>
		Note that such a subset always exists: an empty array is also
		a subset of the input array. The sum of the empty array is 0,
		which is divisible by ${ createInlineCodeBlock(id('n')) }.
		<br><br>
		Example:
		<br>
		Consider an input array of ${ createInlineCodeBlock(`[ 3, 8, 6, 5 ]`) }
		and ${ createInlineCodeBlock(id('n')) } = ${ createInlineCodeBlock(num('3')) }.
		<br>
		The subset of elements that is divisible by ${ createInlineCodeBlock((num('3'))) }
		and maximises the sum is ${ createInlineCodeBlock(`[ 3, 6 ]`) }.
		The sum is ${ createInlineCodeBlock(num('9')) }, so we return ${ createInlineCodeBlock(num('9')) }.
		<br><br>
		Try creating a function
		${ createInlineCodeBlock(`${ keyw('void') } ${ func('maxDivisibleSubsetSum') }(${ keyw('int') }[] ${ id('arr') }, ${ keyw('int') } ${ id('n') })`) }
		that returns the sum of the maximum divisible subset and analyse
		its time and space complexity.
		You may use helper functions and other constructs if you wish.
	</p>

	${ createSpoiler('Spoiler: implementation', /* html */ `
	<p>
		The algorithm can be solved with iteration or recursion.
		This implementation uses recursion to generate the subsets.
		There exist more efficient implementations,
		which are left as an exercise for the reader.
		(<a href="https://cses.fi/book/book.pdf#page=57">Competitive Programmer's Handbook</a>, page 47)
	</p>

	${ createCodeBlockFromStr(`
	${ keyw('public') } ${ keyw('class') } ${ cl('Solution') }
	{
		${ keyw('int') }[] ${ id('arr') };
		${ keyw('int') } ${ id('n') };
		${ keyw('int') } ${ id('maxSum') };
		${ cl('ArrayList') }${ op('<') }${ keyw('int') }${ op('>') } ${ id('subset') };

		${ keyw('void') }
		${ func('processSubset') }()
		{
			${ keyw('int') } ${ id('sum') } ${ op('=') } ${ num('0') };

			${ comm('// Calculate the sum of all the elements in the subset.') }

			${ keyw('for') } (${ keyw('int') } ${ id('i') } ${ op('=') } ${ num('0') }; ${ id('i') } ${ op('<') } ${ id('subset') }.${ func('size') }(); ${ id('i') }${ op('++') })
			{
				${ id('sum') } ${ op('+=') } ${ id('subset') }.${ func('get') }(${ id('i') });
			}

			${ comm('// If the sum is divisible by n and bigger than the max sum,') }
			${ comm('// update the max sum.') }

			${ keyw('if') } (${ id('sum') } ${ op('%') } ${ id('n') } ${ op('==') } ${ num('0') } ${ op('&&') } ${ id('sum') } ${ op('>') } ${ id('maxSum') })
			{
				${ id('maxSum') } ${ op('=') } ${ id('sum') };
			}
		}

		${ keyw('void') }
		${ func('search') }(${ keyw('int') } ${ param('k') })
		{
			${ keyw('if') } (${ param('k') } ${ op('==') } ${ id('arr') }.${ id('length') })
			{
				${ comm('// We\'re at the end of the current search, process this subset') }

				${ func('processSubset') }();
			}
			${ keyw('else') }
			{
				${ comm('// Here we branch our search in two segments:') }
				${ comm('// One that contains the element at position k,') }
				${ comm('// and one that does not.') }

				${ comm('// Branch 1: don\'t include the element and keep searching.') }

				${ func('search') }(${ param('k') } ${ op('+') } ${ num('1') });

				${ comm('// Branch 2: temporarily include the element and keep searching.') }
				${ comm('// We will add the element at index k to the subset,') }
				${ comm('// then we will continue our search,') }
				${ comm('// and when the search is completed and the subset is processed,') }
				${ comm('// we remove the element again.') }

				${ id('subset') }.${ func('add') }(${ id('arr') }[${ param('k') }]);
				${ func('search') }(${ param('k') } ${ op('+') } ${ num('1') });
				${ id('subset') }.${ func('remove') }(${ id('subset') }.${ id('size') } ${ op('-') } ${ num('1') });
			}
		}

		${ keyw('void') }
		${ func('maxDivisibleSubsetSum') }(${ keyw('int') }[] ${ param('arr') }, ${ keyw('int') } ${ param('n') })
		{
			${ comm('// Save the input to the class, so the other methods') }
			${ comm('// can easily access the input.') }

			${ cl('this') }.${ id('arr') } ${ op('=') } ${ param('arr') };
			${ cl('this') }.${ id('n') } ${ op('=') } ${ param('n') };

			${ comm('// Search all subsets of the array') }

			${ func('search') }(${ num('0') });

			${ comm('// Return the maximum sum') }

			${ keyw('return') } ${ id('maxSum') };
		}
	}
	`) }
	`) }

	<br>

	${ createSpoiler('Spoiler: analysis', /* html */ `
	<p>
		The ${ createInlineCodeBlock(func('maxDivisibleSubsetSum')) } function
		has a couple of lines that take constant time and space.
		The rest of the function is a recursive search.
		<br>
		Here you can see a visualisation of the ${ createInlineCodeBlock(func('search')) } function:
	</p>

	${ inlineSVG('src/img/Subset Search.svg', { classes: [ 'fullwidth-image' ] }) }

	<p>
		The numbers in the subsets represent indices of elements
		in the array that are included in the subset.
		<br><br>
		The ${ createInlineCodeBlock(func('search')) }
		function is called ${ await importLatex('$2^n$') } times.
		We can easily derive this from the visualisation:
		<br>
		We have ${ await importLatex('$n$') } array elements,
		so for each of them we have to both include it and not include it.
		This splits the problem into two subproblems.
		Since the ${ createInlineCodeBlock(func('search')) } function is
		called with ${ await importLatex('$n$') } levels of recursion,
		the time number of recursive calls is ${ await importLatex('$2^n$') }.
		<br><br>
		The base case of the ${ createInlineCodeBlock(func('search')) }
		function calls the ${ createInlineCodeBlock(func('processSubset')) } function.
		This function calculates the sum of the elements in the subset,
		and updates ${ createInlineCodeBlock(id('n')) } if the sum is
		divisible by ${ await importLatex('$n$') }.
		It is trivial that this function takes linear time and constant space.
		<br><br>
		Since we know the time complexity of the ${ createInlineCodeBlock(func('processSubset')) }
		function, we can calculate the time complexity of the ${ createInlineCodeBlock(func('search')) }
		function too.
		<br>
		The ${ createInlineCodeBlock(func('search')) } function consists
		of two branches: one that takes ${ await importLatex('$O(2^n)$') } time,
		and one that takes ${ await importLatex('$O(n)$') } time.
		We take the highest of these two for the time complexity,
		which is ${ await importLatex('$O(2^n)$') }.
		<br><br>
		The space complexity of the ${ createInlineCodeBlock(func('search')) }
		function is ${ await importLatex('$O(n)$') },
		since we need to store the current subset in the recursive calls.
		In the visualisation you can see that the leafs of the
		recursion tree all have a depth of three.
		We can generalise this to an arbitrary input size of ${ await importLatex('$n$') }.
		<br><br>
		Since the ${ createInlineCodeBlock(func('maxDivisibleSubsetSum')) }
		function simply wraps the ${ createInlineCodeBlock(func('search')) } function,
		we can conclude that the time complexity of the
		${ createInlineCodeBlock(func('maxDivisibleSubsetSum')) }
		function is ${ await importLatex('$O(2^n)$') }, and its
		space complexity is ${ await importLatex('$O(n)$') }.
	</p>

	<br>

	<h2 id="final-thoughts">
		Final Thoughts
		${ linkSymbol }
	</h2>

	<p>
		I hope that this post has been helpful.
		<br><br>
		If you found this post helpful, feel free to share it!
		Any <a href="/contact">feedback</a> is very welcome!
	</p>
	`) }
	`
} as BlogPage