import { cl, comm, createCodeBlockFromStr, createInlineCodeBlock, func, id, keyw, num, op, param, str } from '../../../util/html-code-syntax-highlighting'
import { BlogPage, linkSymbol } from '../blog-pages'

export default {
	imagePath: 'src/img/Misc Coding Wallpaper.svg',
	imageAlt: 'Coding Wallpaper',
	title: 'The Ultimate Code Style',
	url: 'the-ultimate-code-style',
	description: 'Discussion of the most popular coding styles and how to use them to write code that is readable, maintainable and scalable.',
	date: new Date('11 January 2021'),
	keywords: [ 'Misc', 'Code Style' ],
	generateContent: async () => /* html */ `
	<h1 id="introduction">
		Introduction
		${ linkSymbol }
	</h1>

	<p>
		In the programming world, there are many different coding styles.
		Each of them has its own set of rules and guidelines.
		Sometimes a coding style is bound to the language it is used in,
		because of specific syntax rules.
		But usually the rules are more general and can be applied to
		almost any language.
		<br><br>
		Coding style can be broken down into two main categories:

		<ul>
			<li>
				<strong>Indentation & Whitespace</strong>
			</li>
			<li>
				<strong>Placement of brackets</strong>
			</li>
		</ul>

		Whitespace is a quite general concept, and isn't very specific
		to a language. Some languages such as Python do have syntax
		rules which are bound to indentation, but most languages
		allow you to use whitespace however you want.
		<br><br>
		In this blog post I will discuss the most popular coding styles
		among C-like languages mostly. These languages include C, C++,
		C#, Java, JavaScript, TypeScript, PHP, Go, Rust, Kotlin, Scala,
		R, Swift and many others.
		<br>
		Many things in this post still apply to languages that don't
		inherit their syntax from C, like Python and Ruby.
	</p>

	<br>

	<h2 id="brace-placement">
		Brace Placement
		${ linkSymbol }
	</h2>

	<p>
		C-like languages tend to use a lot of braces. Braces are used to
		define blocks of code, and in many languages also to enclose
		classes, structures, and array or object literals.
		<br><br>
		There are different brace placement styles. I will go over
		the most popular ones and discuss their pros and cons.
		<br><br>
		Note that no brace placement style is objectively the best.
		Not everyone finds the same style the most readable.
		Much is subjective, and comes down to aestatics.
	</p>

	<br>

	<h3 id="1tbs">
		1TBS (One True Brace Style)
		${ linkSymbol }
	</h3>

	${ createCodeBlockFromStr(`
	${ keyw('void') } ${ func('fibonacci') }(${ keyw('int') } ${ param('n') }) {
		${ keyw('if') } (${ param('n') } ${ op('<') } ${ num('2') }) {
			${ keyw('return') } ${ num('1') };
		}

		${ keyw('return') } ${ func('fibonacci') }(${ param('n') } ${ op('-') } ${ num('1') }) ${ op('+') } ${ func('fibonacci') }(${ param('n') } ${ op('-') } ${ num('2') });
	}

	${ keyw('int') } ${ func('main') }() {
		${ keyw('for') } (${ keyw('int') } ${ id('i') } ${ op('=') } ${ num('0') }; ${ id('i') } ${ op('<') } ${ num('10') }; ${ id('i') } ${ op('+') } ${ num('1') }) {
			${ func('printf') }(${ str('"%d "') }, ${ func('fibonacci') }(${ id('i') }));
		}
	}
	`) }

	<p>
		1TBS is a very popular brace style. It probably originates
		from Java, where 1TBS is the convention.
		In 1TBS, all opening braces are put on the same line.
		Closing braces are put on their own line.
	</p>

	<br>

	<h3 id="k-and-r">
		K&R (Kernighan and Ritchie)
		${ linkSymbol }
	</h3>

	${ createCodeBlockFromStr(`
	${ keyw('void') } ${ func('fibonacci') }(${ keyw('int') } ${ param('n') })
	{
		${ keyw('if') } (${ param('n') } ${ op('<') } ${ num('2') }) {
			${ keyw('return') } ${ num('1') };
		}

		${ keyw('return') } ${ func('fibonacci') }(${ param('n') } ${ op('-') } ${ num('1') }) ${ op('+') } ${ func('fibonacci') }(${ param('n') } ${ op('-') } ${ num('2') });
	}

	${ keyw('int') } ${ func('main') }()
	{
		${ keyw('for') } (${ keyw('int') } ${ id('i') } ${ op('=') } ${ num('0') }; ${ id('i') } ${ op('<') } ${ num('10') }; ${ id('i') } ${ op('+') } ${ num('1') }) {
			${ func('printf') }(${ str('"%d "') }, ${ func('fibonacci') }(${ id('i') }));
		}
	}
	`) }

	<p>
		The creators of the C programming language, Brian Kernighan and
		Dennis Ritchie, used this style of brace placement.
		<br>
		K&R is similar 1TBS, but opening braces for functions are put
		on their own lines.
		The reason for this is that in the old days of C, the types
		of the parameters were declared differently:
	</p>

	${ createCodeBlockFromStr(`
	${ keyw('void') } ${ func('my_function') }(${ param('a') }, ${ param('b') }, ${ param('c') })
		${ keyw('int') } ${ param('a') };
		${ keyw('float') } ${ param('b') };
		${ keyw('char') } ${ op('*') }${ param('c') };
	{
		${ keyw('int') } ${ id('local_var') };

		...
	}
	`) }

	<p>
		Let's look at the code again in 1TBS, and we will see that
		it becomes much less readable:
	</p>

	${ createCodeBlockFromStr(`
	${ keyw('void') } ${ func('my_function') }(${ param('a') }, ${ param('b') }, ${ param('c') })
		${ keyw('int') } ${ param('a') };
		${ keyw('float') } ${ param('b') };
		${ keyw('char') } ${ op('*') }${ param('c') }; {
		${ keyw('int') } ${ id('local_var') };

		...
	}
	`) }

	<p>
		It is very easy to misread the local variable declaration as
		a parameter, because it comes right after the parameter list.
		The K&R style fixes this, making it very clear where the
		function body starts.
		<br><br>
		Even though parameters are rarely declared like this anymore in
		C, many people stuck to K&R style because they found it easier
		to read function declarations with more space between the
		parameter list and the function body.
	</p>

	<br>

	<h3 id="allman">
		Allman
		${ linkSymbol }
	</h3>

	${ createCodeBlockFromStr(`
	${ keyw('void') } ${ func('fibonacci') }(${ keyw('int') } ${ param('n') })
	{
		${ keyw('if') } (${ param('n') } ${ op('<') } ${ num('2') })
		{
			${ keyw('return') } ${ num('1') };
		}

		${ keyw('return') } ${ func('fibonacci') }(${ param('n') } ${ op('-') } ${ num('1') }) ${ op('+') } ${ func('fibonacci') }(${ param('n') } ${ op('-') } ${ num('2') });
	}

	${ keyw('int') } ${ func('main') }()
	{
		${ keyw('for') } (${ keyw('int') } ${ id('i') } ${ op('=') } ${ num('0') }; ${ id('i') } ${ op('<') } ${ num('10') }; ${ id('i') } ${ op('+') } ${ num('1') })
		{
			${ func('printf') }(${ str('"%d "') }, ${ func('fibonacci') }(${ id('i') }));
		}
	}
	`) }

	<p>
		The Allman style goes even further than K&R.
		<em>All</em> opening braces are put on their own lines.
		<br>
		I personally find this style of brace placement the most
		readable. Of course, I might be very biased, but let me explain
		why it is so good:
		<br><br>
		The Allman style really shifts your perspective of writing
		clean code. Sticking to any proper set of rules for indentation
		will of course help, but I found that the Allman style provides
		the best balance between freedom of writing code and readability
		of the final product.
		<br><br>
		The Allman style gives you an extra dimension: a feel for space
		in your code. Since putting all braces on their own lines leads
		to the lines of code being further apart from each other, it
		becomes very natural to leave lines blank every now and then,
		intuitively grouping your code into logical blocks that fit
		together:
	</p>

	${ createCodeBlockFromStr(`
	${ comm('/**') }
	${ comm(' * @brief Checks if a free memory block can be merged with') }
	${ comm(' * its neigbouring blocks.') }
	${ comm(' * If this is possible, the blocks are merged.') }
	${ comm(' *') }
	${ comm(' * @param block The free block to check.') }
	${ comm(' */') }
	${ keyw('void') }
	${ func('maybe_merge_free_blocks') }(${ cl('FreeHeapBlockHeader') } ${ op('*') }${ param('block') })
	{
		${ keyw('bool') } ${ id('prev_exists') } ${ op('=') } ${ param('block') }${ op('->') }${ id('prev_block') } ${ op('!=') } ${ num('nullptr') };
		${ keyw('bool') } ${ id('next_exists') } ${ op('=') } ${ param('block') }${ op('->') }${ func('next_block') }() ${ op('!=') } ${ id('heap_end') };

		${ comm('// If both the previous and next blocks are free,') }
		${ comm('// merge them with the current block.') }

		${ keyw('if') } (${ id('prev_exists') } ${ op('&&') } ${ param('block') }${ op('->') }${ id('prev_block') }${ op('->') }${ func('is_free') }()
			${ op('&&') } ${ id('next_exists') } ${ op('&&') } ${ param('block') }${ op('->') }${ func('next_block') }()${ op('->') }${ func('is_free') }())
		{
			${ func('merge_three_free_blocks') }(
				(${ cl('FreeHeapBlockHeader') } ${ op('*') }) ${ param('block') }${ op('->') }${ id('prev_block') }, ${ param('block') },
				(${ cl('FreeHeapBlockHeader') } ${ op('*') }) ${ param('block') }${ op('->') }${ func('next_block') }());
		}

		${ comm('// If only the previous block is free, merge it with the current block.') }

		${ keyw('else') } ${ keyw('if') } (${ id('prev_exists') } ${ op('&&') } ${ param('block') }${ op('->') }${ id('prev_block') }${ op('->') }${ func('is_free') }())
		{
			${ func('merge_two_free_blocks') }(
				(${ cl('FreeHeapBlockHeader') } ${ op('*') }) ${ param('block') }${ op('->') }${ id('prev_block') }, ${ param('block') });
		}

		${ comm('// If only the next block is free, merge it with the current block.') }

		${ keyw('else') } ${ keyw('if') } (${ param('next_exists') } ${ op('&&') } ${ param('block') }${ op('->') }${ func('next_block') }()${ op('->') }${ func('is_free') }())
		{
			${ func('merge_two_free_blocks') }(
				${ param('block') }, (${ cl('FreeHeapBlockHeader') } ${ op('*') }) ${ param('block') }${ op('->') }${ func('next_block') }());
		}

		${ comm('// The neigbouring blocks are both allocated.') }
		${ comm('// We cannot merge anything, so we return.') }
	}
	`) }

	<p>
		Good code should be readable, and using whitespace correctly
		is a key part of that. When I write code that other people will
		have to read as well, I want to make sure that the code does
		not scream at the reader and is self-explanatory.
		<br><br>
		In the above snippet, many lines are too long and are split
		across multiple lines. You can see that these lines are still
		very readable using the Allman style.
		<br><br>
		When you start grouping small chunks of code into logical
		blocks, you start realising that each block does something
		specific. If this specific thing is not very obvious, you
		should comment out what your code block does and why.
		<br><br>
		The above code snippet has a lot of comments, because it is
		part of a memory allocator, which is a rather complex thing.
	</p>

	<br>

	<h4 id="long-code">
		When code becomes too long: Allman for the rescue
		${ linkSymbol }
	</h4>

	<p>
		We've all been there: we write a simple function that does
		something, and we start adding more and more code to it.
		<br>
		At some point we find ourselves in a situation where we
		have a function with parts in it that don't fit nicely on the
		screen anymore.
		<br>
		Sometimes, it just makes more sense to have a long line of
		code, rather than breaking it up in shorter lines and losing
		the context of what the code does.
		<br><br>
		As you have seen in the previous section, the Allman style
		handles these situations really well, due to the fact that
		all braces are on their own lines. This allows the reader
		(and writer) of the code to easily see where code blocks start.
		<br><br>
		Let's look at the following long code:
	</p>

	${ createCodeBlockFromStr(`
	${ cl('HashMap') }${ op('<') }${ cl('Integer') }, ${ cl('ArrayList') }${ op('<') }${ cl('String') }${ op('>') }${ op('>') } ${ func('mapNumbersToPlaceNames') }(${ cl('ArrayList') }${ op('<') }${ cl('Integer') }${ op('>') } ${ id('inputs') }, ${ cl('ArrayList') }${ op('<') }${ cl('ArrayList') }${ op('<') }${ cl('String') }${ op('>') }${ op('>') } ${ id('outputs') }) {
		${ cl('HashMap') }${ op('<') }${ cl('Integer') }, ${ cl('ArrayList') }${ op('<') }${ cl('String') }${ op('>') }${ op('>') } ${ id('map') };

		...

		${ keyw('if') } (${ id('foundIndex') } ${ op('<') } ${ id('inputs') }.${ func('size') }() ${ op('&&') } ${ id('inputs') }[${ id('foundIndex') }] ${ op('==') } ${ id('number') } ${ op('&&') } ${ op('!') }${ id('map') }.${ func('contains') }(${ id('number') })) {
			${ id('map') }.${ func('put') }(${ id('number') }, ${ id('outputs') }[${ id('foundIndex') }]);
		}

		...

		${ keyw('return') } ${ id('map') };
	}
	`) }

	<p>
		In the above code, we have three problems:
		<ol>
			<li>
				The function signature line is too long.
			</li>
			<li>
				The code inside the if-statement check is too long.
			</li>
			<li>
				We cannot easily tell where the function and
				if-statement bodies start.
			</li>
		</ol>
		<br>
		The code is written using a 1TBS brace placement style, which
		makes it very hard to see where the function and if-statement
		bodies begin.
		<br><br>
		Let's convert this code to the Allman style and see what
		happens:
	</p>

	${ createCodeBlockFromStr(`
	${ cl('HashMap') }${ op('<') }${ cl('Integer') }, ${ cl('ArrayList') }${ op('<') }${ cl('String') }${ op('>') }${ op('>') } ${ func('mapNumbersToPlaceNames') }(${ cl('ArrayList') }${ op('<') }${ cl('Integer') }${ op('>') } ${ id('inputs') }, ${ cl('ArrayList') }${ op('<') }${ cl('ArrayList') }${ op('<') }${ cl('String') }${ op('>') }${ op('>') } ${ id('outputs') })
	{
		${ cl('HashMap') }${ op('<') }${ cl('Integer') }, ${ cl('ArrayList') }${ op('<') }${ cl('String') }${ op('>') }${ op('>') } ${ id('map') };

		...

		${ keyw('if') } (${ id('foundIndex') } ${ op('<') } ${ id('inputs') }.${ func('size') }() ${ op('&&') } ${ id('inputs') }[${ id('foundIndex') }] ${ op('==') } ${ id('number') } ${ op('&&') } ${ op('!') }${ id('map') }.${ func('contains') }(${ id('number') }))
		{
			${ id('map') }.${ func('put') }(${ id('number') }, ${ id('outputs') }[${ id('foundIndex') }]);
		}

		...

		${ keyw('return') } ${ id('map') };
	}
	`) }

	<p>
		The code still looks horrible, but it already a bit easier to
		read because of the extra whitespace.
		<br><br>
		To fix problems like this in the Allman style, we will insert
		more whitespace. We will simply continue the code on a new
		line, and indent the code by one tab. This will make the code
		look much more readable.
	</p>

	${ createCodeBlockFromStr(`
	${ cl('HashMap') }${ op('<') }${ cl('Integer') }, ${ cl('ArrayList') }${ op('<') }${ cl('String') }${ op('>') }${ op('>') } ${ func('mapNumbersToPlaceNames') }(
		${ cl('ArrayList') }${ op('<') }${ cl('Integer') }${ op('>') } ${ id('inputs') }, ${ cl('ArrayList') }${ op('<') }${ cl('ArrayList') }${ op('<') }${ cl('String') }${ op('>') }${ op('>') } ${ id('outputs') })
	{
		${ cl('HashMap') }${ op('<') }${ cl('Integer') }, ${ cl('ArrayList') }${ op('<') }${ cl('String') }${ op('>') }${ op('>') } ${ id('map') };

		...

		${ keyw('if') } (${ id('foundIndex') } ${ op('<') } ${ id('inputs') }.${ func('size') }()
			${ op('&&') } ${ id('inputs') }[${ id('foundIndex') }] ${ op('==') } ${ id('number') }
			${ op('&&') } ${ op('!') }${ id('map') }.${ func('contains') }(${ id('number') }))
		{
			${ id('map') }.${ func('put') }(${ id('number') }, ${ id('outputs') }[${ id('foundIndex') }]);
		}

		...

		${ keyw('return') } ${ id('map') };
	}
	`) }

	<p>
		If we run out of screen space or we want to enforce the
		80-column rule, we can just continue writing the code on the
		next line and the indentation will be preserved.
		<br><br>
		This only works well because the brace is placed on its own
		line. In the 1TBS style, one of the three initial problems
		will still remain: we cannot easily tell where the function
		and if-statement bodies start.
	</p>

	${ createCodeBlockFromStr(`
	${ comm('// Allman brace placement') }

	${ keyw('if') } (${ id('foundIndex') } ${ op('<') } ${ id('inputs') }.${ func('size') }()
		${ op('&&') } ${ id('inputs') }[${ id('foundIndex') }] ${ op('==') } ${ id('number') }
		${ op('&&') } ${ op('!') }${ id('map') }.${ func('contains') }(${ id('number') }))
	{
		${ id('map') }.${ func('put') }(${ id('number') }, ${ id('outputs') }[${ id('foundIndex') }]);
	}

	${ comm('// One True Brace Style') }

	${ keyw('if') } (${ id('foundIndex') } ${ op('<') } ${ id('inputs') }.${ func('size') }()
		${ op('&&') } ${ id('inputs') }[${ id('foundIndex') }] ${ op('==') } ${ id('number') }
		${ op('&&') } ${ op('!') }${ id('map') }.${ func('contains') }(${ id('number') })) {
		${ id('map') }.${ func('put') }(${ id('number') }, ${ id('outputs') }[${ id('foundIndex') }]);
	}

	${ comm('// One True Brace Style fix 1') }

	${ keyw('if') } (${ id('foundIndex') } ${ op('<') } ${ id('inputs') }.${ func('size') }()
		${ op('&&') } ${ id('inputs') }[${ id('foundIndex') }] ${ op('==') } ${ id('number') }
		${ op('&&') } ${ op('!') }${ id('map') }.${ func('contains') }(${ id('number') })) {
			${ id('map') }.${ func('put') }(${ id('number') }, ${ id('outputs') }[${ id('foundIndex') }]);
	}

	${ comm('// One True Brace Style fix 2') }

	${ keyw('if') } (${ id('foundIndex') } ${ op('<') } ${ id('inputs') }.${ func('size') }()
			${ op('&&') } ${ id('inputs') }[${ id('foundIndex') }] ${ op('==') } ${ id('number') }
			${ op('&&') } ${ op('!') }${ id('map') }.${ func('contains') }(${ id('number') })) {
		${ id('map') }.${ func('put') }(${ id('number') }, ${ id('outputs') }[${ id('foundIndex') }]);
	}
	`) }

	<p>
		In the 1TBS style, we could somewhat easily fix the problem
		by adding a second level indentation. Some people prefer to
		indent the code in the check by one level, and the code inside
		the if-statement body another time, but I dislike this idea
		because it still looks messy. It also makes the code look like
		it is two levels deep, but it is actually only one level deep.
		Another way to fix this in the 1TBS style is to use two levels
		of indentation in the check, and one for the body.
		This distinguishes the check from the body a bit better,
		but I think the Allman style just looks better,
		and it is more intuitive to write.
	</p>

	<br>

	<h2 id="tabs-and-spaces">
		Tabs and Spaces
		${ linkSymbol }
	</h2>

	<p>
		Indentation can be accomplished with tabs or spaces in most
		programming languages. You could even mix them up, but I don't
		think that's a good idea. (Though indentation and alignment
		are seperate things. If you're using tabs for indentation,
		you should still align your code using spaces.)
		<br><br>
		I personally prefer using tabs, because they are easier to
		delete and replace, since they are only one character long.
		<br><br>
		Tabs allow you to set your own indentation size,
		while allowing other people to use their preferred indentation
		size. For some people, including me, it can be annoying to work
		on a project which uses spaces with a different indentation
		size than my own. On top of that, visually impaired people
		might not even be able to work on code that does not use tabs,
		because they often have to use a huge font size.
		<br>
		They are forced to converting the spaces to tabs, and then
		converting the tabs back to spaces after editing the code.
		That is a lot of unnecessary pain, so I encourage everyone
		to use tabs.
		<br><br>
		The size of indentation is really up to you. I personally
		prefer 8 width tabs, but I had been using 2 character before.
		<br>
		Some people heavily advocate using 8 width tabs:
	</p>

	<div class="quote">
		Now, some people will claim that having 8-character indentations
		makes the code move too far to the right, and makes it hard to
		read on a 80-character terminal screen. The answer to that is
		that if you need more than 3 levels of indentation,
		you're screwed anyway, and should fix your program.
		<br><br>
		<a href="https://www.kernel.org/doc/html/v4.10/process/coding-style.html">
			- Linus Torvalds @ The Linux Coding Style
		</a>
	</div>

	<p>
		4 width tabs are a good compromise between readability and
		real estate, and are the default for most editors.
		The code snippets on my website are all using 4 width tabs
		for these reasons.
	</p>

	<br>

	<h2 id="return-types">
		Return Types
		${ linkSymbol }
	</h2>

	<p>
		In statically typed languages, the return type of a function
		often comes directly before the function name and its
		parameters. Return types might get very long, so some people
		prefer to put them on their own line. This is a good idea
		because it makes the code more readable. I have recently
		switched to enforcing this rule, and I found that it
		actually makes the code more readable, so I would like to
		bring it up in this blog page.
	</p>

	${ createCodeBlockFromStr(`
	${ cl('HashMap') }${ op('<') }${ cl('Integer') }, ${ cl('ArrayList') }${ op('<') }${ cl('String') }${ op('>') }${ op('>') }
	${ func('mapNumbersToPlaceNames') }(...)
	{
		...
	}

	${ keyw('int') }
	${ func('otherFunction') }(...)
	{
		...
	}
	`) }

	<p>
		For functions with long return types this definitely
		makes the code more readable, but for functions with short
		return types it might seem a little strange at first.
		<br><br>
		A cool side-effect of enforcing this rule in languages like C,
		where functions can only be declared on the first level of
		indentation, is that function declarations can be matched with
		the regex ${ createInlineCodeBlock('^functionName\\(') }.
		This allows you to easily find the function declaration
		by searching for the function name, but excluding all the
		calls to the function.
		<br><br>
		I'm not telling you that you must use this rule from now on
		of course, but putting return types on their own lines might
		improve readability for functions with long return types,
		so feel free to try it out.
	</p>

	<br>

	<h2 id="final-thoughts">
		Final Thoughts
	</h2>

	<p>
		In the end, there is of course no objectively best style
		for indentation. You should try to find a style that works
		for you. I hope this blog post will make you more aware of
		the different styles of indentation and tools to make your
		code look more readable. After all, readable code is much
		nicer to work with than code that is hard to read.
		<br><br>
		Hopefully, you will write all your code using the Allman style
		from now on, because it's simply the best style.
		(No, I'm just kidding.)
		<br><br>
		If you have any comments or suggestions, feel free to
		<a href="/contact">contact me</a>.
	</p>
	`
} as BlogPage