import { BlogPage, linkSymbol } from '../blog-pages'
import { comm, createCodeBlockFromStr, createInlineCodeBlock, func, id, keyw, namesp, num, op, str } from '../../../util/html-code-syntax-highlighting'

export default {
	imagePath: 'src/img/Assembly Wallpaper.svg',
	imageAlt: 'Assembly Wallpaper',
	title: 'Hello, Assembly!',
	url: 'hello-assembly',
	description: 'Hello world example with thorough explanation in GAS Assembly.',
	keywords: [ 'Assembly' ],
	date: new Date('19 September 2021'),
	generateContent: async () => /* html */ `
	<h1 id="introduction">
		Introduction
		${ linkSymbol }
	</h1>

	<p>
		We all know that writing proper Assembly is hard.
		While constructing even a Assembly file, we are constantly being tormented
		by weird compiler errors, segmentation faults, undefined behaviour
		and more.
		During my first few weeks at a university that forces us to write Assembly
		by hand, I have come across many fellow students who went ape about
		some weird error they weren't able to solve.
		<br><br>
		It's not their fault though. Expecting students (some of which without
		any previous programming experience) to write god-tier GAS Assembly in the
		first three weeks of the programme simply isn't going to happen with
		a tedious and incomplete self-study guide.
		Resources about GAS Assembly on the internet are scarce, because no-one
		actually writes assembly by hand and the Intel syntax is more popular.
		In fact, Assembly becomes ten times easier once you know what you're doing.
		It's time to write a proper guide.
	</p>

	<br>

	<h2 id="hello-world">
		Hello world: not that simple
		${ linkSymbol }
	</h2>

	<p>
		Let's start with a proper simple hello world program.
		I will explain in detail what every line is doing.
	</p>

	${ createCodeBlockFromStr(`
	${ namesp('.data') }

	${ op('hello_world_str:') }
		${ keyw('.string') } ${ str('"Hello, World!"') }


	${ namesp('.text') }

	${ keyw('.global') } ${ keyw('main') }
	${ keyw('main:') }

		${ comm('# prologue') }

		${ func('pushq') } ${ id('%rbp') }      ${ comm('# save rbp') }
		${ func('movq') } ${ id('%rsp') }, ${ id('%rbp') } ${ comm('# create a new stackframe') }

		${ comm('# output "Hello, World!" and a newline') }

		${ func('movq') } ${ num('$hello_world_str') }, ${ id('%rdi') }
		${ func('call') } ${ id('puts') }

		${ comm('# epilogue') }

		${ func('movq') } ${ id('%rbp') }, ${ id('%rsp') } ${ comm('# end the stackframe') }
		${ func('popq') } ${ id('%rbp') }       ${ comm('# restore the previous stackframe') }
		${ func('movq') } ${ num('$0') }, ${ id('%rax') }   ${ comm('# exit successfully') }
		${ func('ret') }             ${ comm('# returning from the main function exits the program') }
	`) }

	<p>
		Let's save the file as ${ createInlineCodeBlock('app.s') } and compile it
		with ${ createInlineCodeBlock(`gcc app.s -o app -no-pie -g`) }.
		This commands calls the GNU Compiler Collection to compile the assembly file
		${ createInlineCodeBlock('app.s') }.
		With the output flag we specify that we want the output executable to
		be called ${ createInlineCodeBlock('app') }.
		The ${ createInlineCodeBlock('-no-pie') } flag is used to disable the
		Position Independent Executable flag.
		PIE is a Linux security feature which we have to disable to make our
		lives easier when compiling Assembly.
		Finally, the ${ createInlineCodeBlock('-g') } flag denotes that we want
		to add debugging symbols to our executable, which will be very helpful
		when we have to debug our program.
		<br><br>
		Let's go through the source code line by line.
		<br><br>
		${ createInlineCodeBlock('1') }: We start by defining the data section.
		In this section we put the string we want to print.
		The data section can also be used to save any data our program might
		need, or to store global variables.
		<br><br>
		${ createInlineCodeBlock('3') }: This is a label which we can use to
		address the string containing our hello world message.
		<br><br>
		${ createInlineCodeBlock('4') }: The
		${ createInlineCodeBlock(keyw('.string')) } keyword denotes that we want
		to store a string of characters. The compiler will append a null byte to
		the string, which is used to identify the end of the string.
		<br><br>
		${ createInlineCodeBlock('7') }: Next we define the text section.
		This section will hold the actual code of our program.
		<br><br>
		${ createInlineCodeBlock('9') }: We specify that we will declare a global
		function ${ createInlineCodeBlock('main') }.
		Without this, the compiler cannot access the main function and our code
		wouldn't compile.
		<br><br>
		${ createInlineCodeBlock('10') }: Here we put the label for the main
		function. This function is special, because the compiler will use the
		main function as entry point for the program.
		<br><br>
		${ createInlineCodeBlock('12') }: Most functions we will write
		require a prologue.
		In the prologue we will create a new <em>stack frame</em>.
		A stack frame is a place for a function to create local variables.
		<br><br>
		${ createInlineCodeBlock('14') }: We have to ensure the stack frame of the
		<dfn title="When function x calls function y, function x is the caller and function y is the callee.">caller</dfn>
		is left untouched, so we have to save the stack frame pointer (also known
		as the base pointer, ${ createInlineCodeBlock(id('%rbp')) }).
		<br><br>
		${ createInlineCodeBlock('15') }: This line of code will move the base
		pointer to the top of the stack (defined by the stack pointer,
		${ createInlineCodeBlock(id('%rsp')) }), where we place the new stack
		frame.
		<br><br>
		${ createInlineCodeBlock('19') }: In order to print the hello world string,
		we move its address into the ${ createInlineCodeBlock(id('%rdi')) }
		register, which holds the value of the first argument for a function.
		The dollar sign in front of the hello world string label indicates that we
		take the address of the label, instead of the first bytes stored at the
		label.
		<br><br>
		${ createInlineCodeBlock('20') }: Now we call the
		${ createInlineCodeBlock('puts') } function. It is a function from the C
		standard library. As the acronym implies, it will <strong>put</strong>
		a <strong>s</strong>tring onto our screen.
		${ createInlineCodeBlock('puts') } expects an address to a string as its
		first parameter, and it will print all characters one by one until it
		finds a null byte, indicating the end of the string.
		Finally it will end the line by printing the newline character.
		<br><br>
		${ createInlineCodeBlock('22') }: We conclude the function with an
		epilogue, which does the opposite of the prologue.
		It will clean up the current stackframe, so we can safely pass control
		back to the caller.
		<br><br>
		${ createInlineCodeBlock('24') }: This brings back the stack pointer to
		where it was just after the function was called.
		<br><br>
		${ createInlineCodeBlock('25') }: Next we restore the base pointer to
		where it was before the function was called.
		<br><br>
		${ createInlineCodeBlock('26') }: We move the value 0 into the return
		register (${ createInlineCodeBlock(id('%rax')) }).
		The return value of the main function denotes the exit code of the program.
		Zero means success, and anything else implies that an error occured.
		<br><br>
		${ createInlineCodeBlock('27') }: Lastly, we return from the main function.
		This will exit the program.
		<br><br>
		Hopefully you will have learnt how a basic Assembly file looks like.
		It's time to dive deeper into some Assembly fundamentals.
	</p>
	`
} as BlogPage

/*
<br>

<h2 id="registers">
	What the var?
	${ linkSymbol }
</h2>	

<p>
	If you've ever coded in Python, JavaScript, C, or any other higher level
	language, you know how to declare a variable. Simply give it a name
	and depending on the language you might also need to give it a type and
	we're done. Unfortunately for us, it's not that simple in Assembly.
	<br><br>
	Welcome to the world where we have to manage memory ourselves!
	It's going to be a fun time, and very time consuming.
	On the bright side we can decide ourselves where we put all our variables.
	Assembly offers all options: we can allocate variables on the stack,
	in the data section of our program, or in registers.
	<br><br>
	In this introduction 
	</p>
*/