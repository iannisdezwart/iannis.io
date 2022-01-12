import { BlogPage, linkSymbol } from '../blog-pages'
import { cl, comm, constr, convertSpaces, createCodeBlock, createCodeBlockFromStr, createInlineCodeBlock, func, id, keyw, namesp, num, op, param, str } from '../../../util/html-code-syntax-highlighting'
import { longCPPError } from './long-c++-error'

export default {
	imagePath: 'src/img/C++ Wallpaper.svg',
	imageAlt: 'C++ Wallpaper',
	title: 'Essentials: C++ classes',
	url: 'essentials-c++-classes',
	description: 'In-depth beginner-friendly tour of C++ classes.',
	keywords: [ 'C++', 'OOP' ],
	date: new Date('6 July 2021'),
	generateContent: async () => /* html */ `
	<h1 id="introduction">
		Introduction
		${ linkSymbol }
	</h1>

	<p>
		Classes are the fundamental building blocks of any <dfn meaning="Object Oriented Programming">OOP</dfn> program.
		<br>
		C++, a comparatively low-level language, provides a lot of features for OOP.
		On the other hand, some higer-level languages such as Java and Python go for a more simplistic approach, leaving you out in the dark about some advanced aspects.
		<br><br>
		This is usually advertised as a good thing: the programmer won't have to break their head over <em>copy constructors</em>, <em>move semantics</em>, <em>member initialiser lists</em>, and all other C++ OOP pecularities.
		However, these features all have their purpose, as all features in C++ do, which often boils down to speed and perfomance gains.
		<br><br>
		Studying the powerful tools C++ offers makes you excel in the language and makes you a better programmer in general.
		Because of the low-level nature you will learn a lot from looking at what's under the hood and how things work exactly.
		<br><br>
		In this blog you will learn how classes work in C++ and how to deal with them.
		I will go through examples of some important advanced features and techniques, which are often blissfully ignored by C++ newbies and even some intermediate programmers, yet are the foundation of good C++ OOP.
	</p>

	<br>

	<h2 id="dusting-off-that-class-keyword">
		Dusting off that ${ createInlineCodeBlock(keyw('class')) } keyword
		${ linkSymbol }
	</h2>

	<p>
		Classes are used in <dfn meaning="Object Oriented Programming">OOP</dfn> languages to group data into a single package.
		<br>
		We will create a simple class that represents a cat in C++.
		This should look somewhat familiar if you have already worked with classes in other programming languages.
	</p>

	${ createCodeBlock([
		`${ keyw('class') } ${ cl('Cat') }`,
		`{`,
		`\t${ keyw('private') }:`,
		``,
		`\t\t${ comm('// Fields that hold information about this cat') }`,
		``,
		`\t\t${ namesp('std') }::${ cl('string') } ${ id('name') };`,
		`\t\t${ keyw('int') } ${ id('age') };`,
		``,
		``,
		`\t${ keyw('public') }:`,
		``,
		`\t\t${ comm('// Constructor (creates a Cat instance)') }`,
		``,
		`\t\t${ func('Cat') }(${ keyw('const') } ${ namesp('std') }::${ cl('string') }${ op('&') } ${ param('name') }, ${ keyw('int') } ${ param('age') })`,
		`\t\t{`,
		`\t\t\t${ cl('this') }${ op('->') }${ id('name') } ${ func('=') } ${ param('name') };`,
		`\t\t\t${ cl('this') }${ op('->') }${ id('age') } ${ op('=') } ${ param('age') };`,
		`\t\t}`,
		``,
		`\t\t${ comm('// Print information about this cat') }`,
		``,
		`\t\t${ keyw('void') } ${ func('print') }()`,
		`\t\t{`,
		`\t\t\t${ namesp('std') }::${ id('cout') } ${ func('<<') } ${ str('"Cat "') } ${ func('<<') } ${ id('name') } ${ func('<<') } ${ str('" is "') } ${ func('<<') } ${ id('age') } ${ func('<<') } ${ str('" years old.\\n"') };`,
		`\t\t}`,
		`};`
	], {
		id: 'cat-class'
	}) }

	<p>
		Just like in other OOP languages, classes consist of <em>fields</em> and <em>methods</em> to hold information and define functionality, respectively.
		<br>
		In our example, we have two fields: ${ createInlineCodeBlock(id('name')) } and ${ createInlineCodeBlock(id('age')) }.
		These fields characterise the instance we are dealing with.
		<br>
		We also define two methods: ${ createInlineCodeBlock(func('Cat')) } and ${ createInlineCodeBlock(func('print')) }.
		The first method is a special one: it is a constructor.
		Note that the name of this method matches the name of our class.
		Also note that a class constructor in C++ does not name a return type, which we will come back to later. <!-- Todo: add link -->
		<br>
		The second method we defined is a normal method, which displays information about a cat.
		<br><br>
		In C++, we use labels inside classes to indicate from where we are allowed to access the class fields and methods.
		In this example, we put both fields in a ${ createInlineCodeBlock(keyw('private')) } context, which means that we can only use the fields within the class declaration.
		This is useful, because we don't want anyone from outside to be able to modify the class fields.
		<br>
		To the contrary, our methods are ${ createInlineCodeBlock(keyw('public')) }.
		We want to be able to use these methods, of course.
	</p>

	<br>

	<h2 id="interacting-with-classes">
		Interacting with classes
		${ linkSymbol }
	</h2>

	<p>
		We now created a class <em>declaration</em>: a template for a class <em>instance</em>.
		So, what are we waiting for? Let's get ourselves a cat!
	</p>

	${ createCodeBlock([
		`${ cl('Cat') } ${ id('first_cat') } ${ op('=') } ${ constr('Cat') }(${ str('"Nala"') }, ${ num('3') });`
	]) }

	<p>
		On the right-hand side of our variable declaration, we call the constructor of ${ createInlineCodeBlock(cl('Cat')) }.
		<br>
		There is actually a shorthand way of writing this:
	</p>

	${ createCodeBlock([
		`${ cl('Cat') } ${ id('first_cat') }(${ str('"Nala"') }, ${ num('3') });`
	]) }

	<p>
		Congrats, we created a cat. Now let's interact with it.
	</p>

	${ createCodeBlock([
		`${ id('first_cat') }.${ func('print') }();`
	]) }

	<p>
		This should output the following:
	</p>

	${ createCodeBlock([
		`Cat Nala is 3 years old.`
	]) }

	<br>

	<h2 id="implicit-constructors">
		C++ magic: implicit constructors
		${ linkSymbol }
	</h2>

	<p>
		Besides the constructor we created, our cat class also has two implicit constructors: the <em>copy constructor</em> and the <em>move constructor</em>.
		We get them for free by the C++ compiler. We don't have to specify them.
		<br>
		The copy constructor is used, as you might have guessed, to construct a copy of an instance.
	</p>

	${ createCodeBlock([
		`${ cl('Cat') } ${ id('cloned_cat') }(${ id('first_cat') });`
	]) }

	<p>
		In C++, we are allowed to overload functions and methods.
		In simple terms this means that we can create multiple functions with the same name, but different parameters.
		Our cat constructor takes two parameters: a string for the name and an integer for the age.
		The copy constructor takes one parameter: the instance we want to make a clone of.
		<br>
		We can also call the copy constructor as follows:
	</p>

	${ createCodeBlock([
		`${ cl('Cat') } ${ id('cloned_cat') } ${ func('=') } ${ id('first_cat') };`
	]) }

	<p>
		Both code snippets are equivalent, but the latter might feel more intuitive.
		<br>
		I will discuss move constructors later on. <!-- Todo: add link -->
	</p>

	<br>

	<h2 id="passing-classes-through-functions">
		Passing classes through functions
		${ linkSymbol }
	</h2>

	<p>
		We often have to connect classes together in Object Oriented Programming.
		Sometimes we must pass a class instance through a function or a method.
		Let's create a method in our cat class to update the name.
	</p>

	${ createCodeBlock([
		`${ keyw('void') } ${ func('change_name') }(${ namesp('std') }::${ cl('string') } ${ param('new_name') })`,
		`{`,
		`\t${ id('name') } ${ func('=') } ${ param('new_name') };`,
		`}`
	]) }

	<p>
		I often see beginners writing code like this.
		The above code will work as intended, but is unoptimised.
		Note that ${ createInlineCodeBlock(`${ namesp('std') }::${ cl('string') }`) } is also a class.
		However, it is not written by us, as it comes out of the box in the C++ standard library.
		<br>
		If you pass a class through a method in this way, the C++ compiler will allocate space for it.
		Then the copy constructor is implicitly called, cloning the string we pass in into the allocated space for ${ createInlineCodeBlock(param('new_name')) }.
		Next, the method body is executed, and the copy assignment operator for ${ createInlineCodeBlock(id('name')) } is called.
		This copies ${ createInlineCodeBlock(param('new_name')) } into ${ createInlineCodeBlock(id('name')) }.
		<br>
		After we are all set, we have copied our input string twice.
		Wouldn't it be more optimal if we only copied it once?
		The answer is obviously yes, and it is quite simple to do this in C++.
	</p>

	${ createCodeBlock([
		`${ keyw('void') } ${ func('change_name') }(${ keyw('const') } ${ namesp('std') }::${ cl('string') }${ op('&') } ${ param('new_name') })`,
		`{`,
		`\t${ id('name') } ${ func('=') } ${ param('new_name') };`,
		`}`
	]) }

	<p>
		The above code block functions the same as the previous code, but the string we pass in is copied only once: directly from where we got it from into the ${ createInlineCodeBlock(id('name')) }.
		<br><br>
		The only thing we had to change was to change ${ createInlineCodeBlock(`${ namesp('std') }::${ cl('string') }`) } to ${ createInlineCodeBlock(`${ keyw('const') } ${ namesp('std') }::${ cl('string') }${ op('&') }`) }.
		Note the ${ createInlineCodeBlock(`${ op('&') }`) } at the end.
		It indicates a <em>reference</em>.
		Together with the ${ createInlineCodeBlock(`${ keyw('const') }`) }, this is a <em>constant reference</em>.
		<br><br>
		References in C++ differ from normal variables, as they <em>refer</em> to another variable, instead of being an actual variable.
		We make it constant, because we don't want or need the value it refers to to be mutated.
	</p>

	<div class="quote">
		A good practice is to always use constant references when you are passing a class through a function, unless you have a reason not to.
	</div>

	<br>

	<h2 id="constructors">
		Getting our hands dirty: class constructors
		${ linkSymbol }
	</h2>

	<p>
		We have briefly touched constructors already, but there is more to it.
	</p>

	<h3 id="default-constructors">
		Default constructors
		${ linkSymbol }
	</h3>

	<p>
		Sometimes we want to create an instance, but leave it unititialised and initialise it later on.
		We can only do this if our class has a default constructor.
		A default constructor is just a constructor, but without any parameters.
		Let's make a default constructor for our cat class.
	</p>

	${ createCodeBlock([
		`${ func('Cat') }()`,
		`{`,
		`\t${ id('name') } ${ func('=') } ${ str('"Unnamed cat"') };`,
		`\t${ id('age') } ${ op('=') } ${ num('0') };`,
		`}`
	]) }

	<p>
		We can now create an uninitialised cat.
		Note that there are no parameters and we can skip the parentheses.
	</p>

	${ createCodeBlock([
		`${ cl('Cat') } ${ id('uninitialised_cat') };`
	]) }

	<p>
		We declare a cat instance, but don't assign it a value.
		Note that this is only possible because our cat class has a default constructor.
		If a class does not have a default constructor, we cannot create an uninitialised instance.
		<br><br>
		We could use our ${ createInlineCodeBlock(func('change_name')) } method to change the cat's name later on.
	</p>

	${ createCodeBlock([
		`${ id('uninitialised_cat') }.${ func('change_name') }(${ str('"Simba"') });`
	]) }

	<p>
		It might be a good idea to create another method that we can use to change the age.
		The implementation of this method is left as an exercise for the reader.
		<br><br>
		The default constructor we wrote actually does initialise the name and the age of the cat, which we might not even need to do.
		We could instead create a default constructor that does not initialise anything:
	</p>

	${ createCodeBlock([
		`${ func('Cat') }() {}`,
	]) }

	<p>
		This is often completely reasonable, but we will run into <dfn meaning="Undefined Behaviour">UB</dfn> if we tried to consume the class fields before they are initialised.
		For example, the following code, using the above default constructor, will behave oddly:
	</p>

	${ createCodeBlock([
		`${ cl('Cat') } ${ id('uninitialised_cat') };`,
		`${ id('uninitialised_cat') }.${ func('print') }();`
	]) }

	<p>
		Let's look at the output I got.
	</p>

	${ createCodeBlock([
		convertSpaces(`Cat  is 1609080832 years old.`)
	]) }

	<p>
		Well, that's odd.
		We never told the cat to be 1609080832 years old.
		This cat must have more than nine lives!
		Let's run this again, there must be a glitch in the matrix somewhere, right?
	</p>

	${ createCodeBlock([
		convertSpaces(`Cat  is -1855227680 years old.`)
	]) }

	<p>
		Oh well, that doesn't look right either.
		Before you declare C++ to be some evil black magic programming language, let me explain what is going on.
		First, let's look at the cat's name in the output.
		It is empty in both cases, which we can explain by the fact that ${ createInlineCodeBlock(`${ namesp('std') }::${ cl('string') }`) } has a default constructor that initialises the string to be empty.
		So, the cat's name is actually initialised.
		<br>
		The cat's age, however, is not initialised.
		${ createInlineCodeBlock(keyw('int')) } is not a class and therefore doesn't have a default constructor.
		This is UB and when we get in such a situation in C++, anything could happen.
		Yes, our computer might even spawn a bunch of demons that will haunt us.
		Glad that didn't happen when I to ran the code.
		<br><br>
		Empty default constructors are completely safe to use, as long as you remember not to consume the data of the instance before initialising it.
		When we are dealing with millions of class instances, it might be a very good idea from a performance perspective not to initialise each instance until we actually need to.
	</p>

	<h3 id="member-initialiser-lists">
		Member initialiser lists
		${ linkSymbol }
	</h3>

	<p>
		Within a class constructor, we can use a handy shorthand notation to initialise members:
	</p>

	${ createCodeBlock([
		`${ func('Cat') }(${ keyw('const') } ${ namesp('std') }::${ cl('string') }${ op('&') } ${ param('name') }, ${ keyw('int') } ${ param('age') })`,
		`\t: ${ id('name') }(${ param('name') }), ${ id('age') }(${ param('age') }) {}`
	]) }

	<p>
		Compared with the <a href="#cat-class">previous constructor</a> we made, this is shorter.
		We can omit the ${ createInlineCodeBlock(cl('this')) } keyword completely, and instead put our initisations in-order in a comma seperated list.
		<br><br>
		When we have a class with a field that is a class without a default constructor, we must use a member initialiser list, because C++ does not allow uninitialised class instances:
	</p>

	${ createCodeBlock([
		`${ keyw('class') } ${ cl('Point') }`,
		`{`,
		`\t${ keyw('private') }:`,
		``,
		`\t\t${ keyw('int') } ${ id('x') };`,
		`\t\t${ keyw('int') } ${ id('y') };`,
		``,
		`\t${ keyw('public') }:`,
		``,
		`\t\t${ comm('// The constructor takes a coordinate') }`,
		`\t\t${ comm('// and stores them into x and y') }`,
		``,
		`\t\t${ func('Point') }(${ keyw('int') } ${ param('x') }, ${ keyw('int') } ${ param('y') }) : ${ id('x') }(${ param('x') }), ${ id('y') }(${ param('y') }) {}`,
		`};`,
		``,
		``,
		`${ keyw('class') } ${ cl('Line') }`,
		`{`,
		`\t${ keyw('private') }:`,
		``,
		`\t\t${ cl('Point') } ${ id('from') };`,
		`\t\t${ cl('Point') } ${ id('to') };`,
		``,
		`\t${ keyw('public') }:`,
		``,
		`\t\t${ func('Line') }(${ keyw('int') } ${ param('x_from') }, ${ keyw('int') } ${ param('y_from') }, ${ keyw('int') } ${ param('x_to') }, ${ keyw('int') } ${ param('y_to') })`,
		`\t\t\t: ${ id('from') }(${ param('x_from') }, ${ param('x_to') }), ${ id('to') }(${ param('x_to') }, ${ param('y_to') }) {}`,
		`};`
	]) }

	<p>
		Here, we use a member initialiser list in the constructor of the ${ createInlineCodeBlock(cl('Point')) } class to initialise the x and y value.
		In the ${ createInlineCodeBlock(cl('Line')) } class we use a member initialiser list to call the ${ createInlineCodeBlock(constr('Point')) } constructor on the ${ createInlineCodeBlock(id('from')) } and ${ createInlineCodeBlock(id('to')) } fields.
		<br><br>
		References must also be initialised at the construction of a class. C++ does not allow uninitialised references.
	</p>

	<h3 id="destructors">
		Destructors
		${ linkSymbol }
	</h3>

	<p>
		When a class instance goes out of scope or a pointer to a class instance, its destructor is called.
		The destructor is supposed to clean up all the mess the class has created in its lifetime.
	</p>

	${ createCodeBlock([
		`${ keyw('class') } ${ cl('Population') }`,
		`{`,
		`\t${ keyw('private') }:`,
		``,
		`\t\t${ namesp('std') }::${ cl('thread') } ${ id('threads') }[${ num('16') }];`,
		`\t\t${ namesp('std') }::${ cl('vector') }${ op('<') }${ cl('Human') } ${ op('*') }${ op('>') } ${ id('humans') };`,
		``,
		``,
		`\t${ keyw('public') }:`,
		``,
		`\t\t${ func('Population') }() { ... }`,
		`\t\t${ keyw('void') } ${ func('add_human') }(${ cl('Human') } ${ op('*') }${ param('human') }) { ... }`,
		`\t\t${ keyw('void') } ${ func('run_simulation') }() { ... }`,
		``,
		`\t\t${ comm('// Stops the threads and deletes the humans') }`,
		``,
		`\t\t${ func('~Population') }()`,
		`\t\t{`,
		`\t\t\t${ keyw('for') } (${ namesp('std') }::${ cl('thread') }${ op('&') } ${ id('thr') } : ${ id('threads') })`,
		`\t\t\t{`,
		`\t\t\t\t${ id('thr') }.${ func('join') }();`,
		`\t\t\t}`,
		``,
		`\t\t\t${ keyw('for') } (${ cl('Human') } ${ op('*') }${ id('human') } : ${ id('humans') })`,
		`\t\t\t{`,
		`\t\t\t\t${ comm('// Calls the destructor on the human instance') }`,
		``,
		`\t\t\t\t${ keyw('delete') } ${ id('human') };`,
		`\t\t\t}`,
		`\t\t}`,
		`};`,
		``,
		``,
		`${ keyw('int') } ${ func('main') }()`,
		`{`,
		`\t${ cl('Population') } ${ id('population') };`,
		``,
		`\t${ keyw('for') } ( ... )`,
		`\t{`,
		`\t\t${ id('population') }.${ func('add_human') }( ... );`,
		`\t}`,
		``,
		`\t${ id('population') }.${ func('run_simulation') }();`,
		``,
		`\t${ comm('// The destructor of Population is called here at the end of scope') }`,
		`}`
	]) }

	<p>
		In C++, destructors are denoted with a tilde and the class name, which is ${ createInlineCodeBlock(`${ func('~Population') }()`) } in the above example.
		<br>
		When the simulation finishes, the destructor of the population class is called, which stops the threads and calls the destructor on each human, which cleans up the humans.
	</p>

	<br>

	<h2 id="operators">
		Keeping it simple: operator overloading
		${ linkSymbol }
	</h2>

	<p>
		In C++ we are allowed to overload functions and methods as well as operators.
		This allows us to write very clear-cut code.
		We can almost overload every normal C++ operator.
		Let's write a class for a complex number to demonstrate operator overloading in its full glory.
	</p>

	${ createCodeBlock([
		`${ keyw('class') } ${ cl('ComplexNumber') }`,
		`{`,
		`\t${ keyw('private') }:`,
		``,
		`\t\t${ keyw('double') } ${ id('re') };`,
		`\t\t${ keyw('double') } ${ id('im') };`,
		``,
		``,
		`\t${ keyw('public') }:`,
		``,
		`\t\t${ func('ComplexNumber') }(${ keyw('double') } ${ param('re') }, ${ keyw('double') } ${ param('im') })`,
		`\t\t\t: ${ id('re') }(${ param('re') }), ${ id('im') }(${ param('im') }) {}`,
		``,
		`\t\t${ keyw('void') } ${ func('print') }()`,
		`\t\t{`,
		`\t\t\t${ namesp('std') }::${ id('cout') } ${ func('<<') } ${ id('re') } ${ func('<<') } ${ str('" + "') } ${ func('<<') } ${ id('im') } ${ func('<<') } ${ str('"i"') } ${ func('<<') } ${ namesp('std') }::${ id('endl') };`,
		`\t\t}`,
		``,
		`\t\t${ comm('// ( a + bi ) + ( c + di ) = ( a + c ) + i * ( b + d )') }`,
		``,
		`\t\t${ cl('ComplexNumber') } ${ func('operator+') }(${ keyw('const') } ${ cl('ComplexNumber') }${ op('&') } ${ param('other') })`,
		`\t\t{`,
		`\t\t\t${ keyw('return') } ${ constr('ComplexNumber') }(${ id('re') } ${ op('+') } ${ param('other') }.${ id('re') }, ${ id('im') } ${ op('+') } ${ param('other') }.${ id('im') });`,
		`\t\t}`,
		``,
		`\t\t${ comm('// ( a + bi ) - ( c + di ) = ( a - c ) + i * ( b - d )') }`,
		``,
		`\t\t${ cl('ComplexNumber') } ${ func('operator-') }(${ keyw('const') } ${ cl('ComplexNumber') }${ op('&') } ${ param('other') })`,
		`\t\t{`,
		`\t\t\t${ keyw('return') } ${ constr('ComplexNumber') }(${ id('re') } ${ op('-') } ${ param('other') }.${ id('re') }, ${ id('im') } ${ op('-') } ${ param('other') }.${ id('im') });`,
		`\t\t}`,
		``,
		`\t\t${ comm('// ( a + bi ) * ( c + di ) = ( ac - db ) + i * ( ad - bc )') }`,
		``,
		`\t\t${ cl('ComplexNumber') } ${ func('operator*') }(${ keyw('const') } ${ cl('ComplexNumber') }${ op('&') } ${ param('other') })`,
		`\t\t{`,
		`\t\t\t${ keyw('double') } ${ id('new_re') } ${ op('=') } ${ id('re') } ${ op('*') } ${ param('other') }.${ id('re') } ${ op('-') } ${ id('im') } ${ op('*') } ${ param('other') }.${ id('im') };`,
		`\t\t\t${ keyw('double') } ${ id('new_im') } ${ op('=') } ${ id('re') } ${ op('*') } ${ param('other') }.${ id('im') } ${ op('+') } ${ id('im') } ${ op('*') } ${ param('other') }.${ id('re') };`,
		``,
		`\t\t\t${ keyw('return') } ${ constr('ComplexNumber') }(${ id('new_re') }, ${ id('new_im') });`,
		`\t\t}`,
		``,
		`};`,
		``,
		``,
		`${ keyw('int') } ${ func('main') }()`,
		`{`,
		`\t${ cl('ComplexNumber') } ${ id('complex_1') }(${ num('1') }, ${ num('2') });`,
		`\t${ cl('ComplexNumber') } ${ id('complex_2') }(${ num('-3') }, ${ num('1.5') });`,
		`\t${ cl('ComplexNumber') } ${ id('complex_3') }(${ num('0') }, ${ num('-5') });`,
		``,
		`\t${ cl('ComplexNumber') } ${ id('result') } ${ op('=') } ${ id('complex_1') } ${ func('*') } ${ id('complex_2') } ${ func('-') } ${ id('complex_3') };`,
		``,
		`\t${ id('result') }.${ func('print') }();`,
		`}`
	]) }

	<p>
		In this example we overloaded the plus, minus and multiplication operator.
		Overloaded operator are just class methods or functions, with ${ createInlineCodeBlock(func('operator')) } and the operator symbol as their name.
		We can now use the corresponding ${ createInlineCodeBlock(func('+')) }, ${ createInlineCodeBlock(func('-')) } and ${ createInlineCodeBlock(func('*')) } operators on instances of our complex number class.
		When we use these operators, the methods for the operators we wrote will be executed.
		Standard operator precedence applies.
		<br>
		Next to the mathematical operators, we can also overload other operators.
		Some example interesting operators to overload are ${ createInlineCodeBlock(func('=')) }, ${ createInlineCodeBlock(func('[]')) }.
		Next to the assignment operator, we can also overload compound assignment mathematical operators (${ createInlineCodeBlock(func('+=')) }, ${ createInlineCodeBlock(func('-=')) }, ${ createInlineCodeBlock(func('*=')) }, etc.).
		Let's look at an example where we overload some special operators in weird ways.
		</p>

		${ createCodeBlock([
			`${ keyw('class') } ${ cl('Printer') }`,
			`{`,
			`\t${ keyw('public') }:`,
			``,
			`\t\t${ keyw('void') } ${ func('operator[]') }(${ keyw('const') } ${ namesp('std') }::${ cl('string') }${ op('&') } ${ param('str') })`,
			`\t\t{`,
			`\t\t\t${ namesp('std') }::${ id('cout') } ${ func('<<') } ${ param('str') } ${ func('<<') } ${ namesp('std') }::${ id('endl') };`,
			`\t\t}`,
			`};`,
			``,
			``,
			`${ keyw('int') } ${ func('main') }()`,
			`{`,
			`\t${ cl('Printer') } ${ id('printer') };`,
			`\t${ id('printer') }${ func('[') }${ str('"Hello, World!"') }${ func(']') };`,
			`}`
		]) }

		<p>
			Yup, this is a hello world program.
			We overloaded the array index operator, which is normally use to retrieve something from a linear data structure, to print something.
			Some examples of standard library classes that have an overloaded array index operator include ${ createInlineCodeBlock(`${ namesp('std') }::${ cl('vector') }`) } and ${ createInlineCodeBlock(`${ namesp('std') }::${ cl('string') }`) }.
			We can use it on vectors to get a reference to the n-th element of the vector and we can use it on strings to get the n-th character of the string.
			${ createInlineCodeBlock(`${ namesp('std') }::${ cl('unordered_map') }`) } implements the array index operator in an interesting way:
		</p>

		${ createCodeBlock([
			`${ namesp('std') }::${ cl('unordered_map') }${ op('<' )}${ namesp('std') }::${ cl('string') }, ${ namesp('std') }::${ cl('string') }${ op('>') } ${ id('phonebook') };`,
			``,
			`${ id('phonebook') }${ func('[') }${ str('"John"') }${ func(']') } ${ func('=') } ${ str('"+44 7700 900077') };`,
			`${ id('phonebook') }${ func('[') }${ str('"Chantal"') }${ func(']') } ${ func('=') } ${ str('"+1 202 555 0126"') };`,
			`${ id('phonebook') }${ func('[') }${ str('"Abby"') }${ func(']') } ${ func('=') } ${ str('"+61 1900 654 321"') };`,
			`${ id('phonebook') }${ func('[') }${ str('"Clayton"') }${ func(']') } ${ func('=') } ${ str('"+65 4776 5921"') };`,
			``,
			`${ namesp('std') }::${ id('cout') } ${ func('<<') } ${ id('phonebook') }${ func('[') }${ str('"John"') }${ func(']') };`
		]) }

		<p>
			The assignment operator is also very useful.
			It can be used to copy values from an instance into another existing instance.
			It is often used in a similar way as the <a href="#default-constructors">copy constructor</a>, but the assignment operator is called when the value of an existing instance changes.
		</p>

		${ createCodeBlockFromStr(`
		${ keyw('class') } ${ cl('Point') }
		{
			${ keyw('private') }:

				${ keyw('int') } ${ id('x') };
				${ keyw('int') } ${ id('y') };


			${ keyw('public') }:

				${ func('Point') }(${ keyw('int') } ${ param('x') }, ${ keyw('int') } ${ param('y') }) : ${ id('x') }(${ param('x') }), ${ id('y') }(${ param('y') }) {}

				${ cl('Point') }${ op('&') } ${ func('operator=') }(${ keyw('const') } ${ cl('Point') }${ op('&') } ${ param('other') })
				{
					${ id('x') } ${ op('=') } ${ param('other') }.${ id('x') };
					${ id('y') } ${ op('=') } ${ param('other') }.${ id('y') };

					${ keyw('return') } ${ op('*') }${ cl('this') };
				}
		};


		${ keyw('int') } ${ func('main') }()
		{
			${ cl('Point') } ${ id('point_1') }(${ num('1') }, ${ num('2') });

			${ comm('// Copy point_1 into point_2') }
			${ comm('// The copy constructor will be called because this is a declaration') }

			${ cl('Point') } ${ id('point_2') } ${ func('=') } ${ id('point_1') };

			${ comm('// Copy point_1 into point_2') }
			${ comm('// The assignment operator will be called because this is an assignment') }

			${ id('point_2') } ${ func('=') } ${ id('point_1') };
		}
		`) }

		<p>
			Note the return type and value of the assignment operator.
			We do this because in C++, as well as other languages, the assignment operator assigns a value to something, but it also resolves into the new value.
			This makes the following also valid:
		</p>

		${ createCodeBlockFromStr(`
		${ cl('Point') } ${ id('point_3') } ${ func('=') } (${ id('point_2') } ${ func('=') } ${ id('point_1') });
		`) }

		<p>
			This code first copies the value of ${ createInlineCodeBlock(id('point_1')) } into ${ createInlineCodeBlock(id('point_2')) }.
			Then, ${ createInlineCodeBlock(id('point_3')) } will be constructed by copying the new value stored in ${ createInlineCodeBlock(id('point_2')) }.
			After this line of code, all three points hold the same data.
			<br><br>
			This brings us to the next operators that are useful to overload: the equality operators.
			Let's add them to the point class.
		</p>

		${ createCodeBlockFromStr(`
		${ keyw('bool') } ${ func('operator==') }(${ keyw('const') } ${ cl('Point') }${ op('&') } ${ param('other') })
		{
			${ keyw('return') } ${ id('x') } ${ op('==') } ${ param('other') }.${ id('x') } ${ op('&&') } ${ id('y') } ${ op('==') } ${ param('other') }.${ id('y') };
		}

		${ keyw('bool') } ${ func('operator!=') }(${ keyw('const') } ${ cl('Point') }${ op('&') } ${ param('other') })
		{
			${ keyw('return') } ${ id('x') } ${ op('!=') } ${ param('other') }.${ id('x') } ${ op('&&') } ${ id('y') } ${ op('!=') } ${ param('other') }.${ id('y') };
		}
		`) }

	<p>
		We can now confirm that all three points hold the same value:
	</p>

	${ createCodeBlockFromStr(`
	${ keyw('if') } (${ id('point_1') } ${ func('==') } ${ id('point_2') } ${ op('&&') } ${ id('point_2') } ${ func('==') } ${ id('point_3') }) { ... }
	`) }

	<p>
		For an extensive article on operator overloading, see the
		<a href="https://en.cppreference.com/w/cpp/language/operators" target="_blank">C++ reference</a>.
	</p>

	<br>

	<h2 id="templates">
		One to rule them all: templates
		${ linkSymbol }
	</h2>

	<p>
		Welcome to the C++ feature that is both the best and worst thing ever.
		Yes, we're talking templates.
		Templates themselves are amazing, it's just the error messages you might get that are horrible and a pain to read.
		The most important thing is not to panic when you receive a long error like this (scroll it all the way down):
	</p>

	${ createCodeBlockFromStr(longCPPError, {
		maxHeight: 16
	}) }

	<p>
		I'm glad you didn't click away out of utter despair.
		Let's now look at the beauty of templates!
	</p>

	${ createCodeBlockFromStr(`
	${ keyw('template') } <${ keyw('typename') } ${ cl('Type') }>
	${ keyw('class') } ${ cl('LinkedListNode') }
	{
		${ keyw('private') }:

			${ cl('LinkedListNode') } ${ op('*') }${ id('next') };
			${ cl('Type') } ${ id('value') };


		${ keyw('public') }:

			${ func('LinkedListNode') }(${ keyw('const') } ${ cl('Type') }${ op('&') } ${ param('value') }) : ${ id('value') }(${ param('value') }), ${ id('next') }(${ num('NULL') }) {}

			${ func('~LinkedListNode') }()
			{
				${ keyw('if') } (${ id('next') } ${ op('!=') } ${ num('NULL') })
				{
					${ keyw('delete') } ${ id('next') };
				}
			}

			${ keyw('void') } ${ func('append') }(${ keyw('const') } ${ cl('Type') }${ op('&') } ${ param('value') })
			{
				${ keyw('if') } (${ id('next') } ${ op('==') } ${ num('NULL') })
				{
					${ id('next') } ${ op('=') } ${ keyw('new') } ${ constr('LinkedListNode') }${ op('<') }${ cl('Type') }${ op('>') }(${ param('value') });
				}
				${ keyw('else') }
				{
					${ id('next') }${ op('->') }${ func('append') }(${ param('value') });
				}
			}
	};
	`) }

	<p>
		We created a simple class ${ createInlineCodeBlock(cl('LinkedListNode')) } that has a template parameter ${ createInlineCodeBlock(cl('Type')) }.
		This allows us to create instances of our linked list node of any type we want!
		Let's make a linked list of integers and a linked list of strings.
	</p>

	${ createCodeBlockFromStr(`
	${ cl('LinkedListNode') }${ op('<') }${ keyw('int') }${ op('>') } ${ id('head_1') };
	${ cl('LinkedListNode') }${ op('<') }${ namesp('std') }::${ cl('string') }${ op('>') } ${ id('head_2') };

	${ id('head_1') }.${ func('append') }(${ num('1') });
	${ id('head_1') }.${ func('append') }(${ num('2') });
	${ id('head_1') }.${ func('append') }(${ num('3') });

	${ id('head_2') }.${ func('append') }(${ str('"Hello"') });
	${ id('head_2') }.${ func('append') }(${ str('"World"') });
	`) }

	<p>
		Lots of classes in the C++ standard library are templated classes, which allows us to create a bunch of specialised classes to fit all our needs.
		Some examples are ${ createInlineCodeBlock(`${ namesp('std') }::${ cl('vector') }`) }, ${ createInlineCodeBlock(`${ namesp('std') }::${ cl('list') }`) }, ${ createInlineCodeBlock(`${ namesp('std') }::${ cl('map') }`) }, ${ createInlineCodeBlock(`${ namesp('std') }::${ cl('set') }`) }, ${ createInlineCodeBlock(`${ namesp('std') }::${ cl('pair') }`) }, ${ createInlineCodeBlock(`${ namesp('std') }::${ cl('queue') }`) }, and the list goes on...
		<br><br>
		Templates are not just limited to classes.
		You can even template functions!
		<br>
		Read the <a href="https://en.cppreference.com/w/cpp/language/templates">C++ reference</a> for more.
	</p>

	<br>

	<h2 id="class-hierarchy">
		From atoms to molecules and beyond: class hierarchy
		${ linkSymbol }
	</h2>

	<p>
		A house is made out of walls and a roof.
		Walls are made out of bricks.
		The roof is made out of roof tiles.
		Bricks are made out of sand and clay.
		Roof tiles can be made out of multiple materials.
		<br>
		In the end, everything is made out of atoms.
		OOP programs also work like this, but they are made out of machine code that is represented by a class hierarchy.
		These classes interrelate with each other in an abstract way.
		This means classes on top of classes, which means inheritance, and conceptual classes, which means abstract classes.
		<br><br>
		In C++, we can create abstract classes with functionality that can be later implemented by inherited classes.
		Let's look at a simple example:
	</p>

	${ createCodeBlockFromStr(`
	${ keyw('class') } ${ cl('Animal') }
	{
		${ keyw('private') }:

			${ namesp('std') }::${ cl('string') } ${ id('name') };
			${ keyw('int') } ${ id('speed') };


		${ keyw('public') }:

			${ func('Animal') }(${ keyw('const') } ${ namesp('std') }::${ cl('string') }${ op('&') } ${ id('name') }, ${ keyw('int') } ${ param('speed') })
				: ${ id('name') }(${ param('name') }), ${ id('speed') }(${ param('speed') }) {}

			${ keyw('virtual') } ${ keyw('void') } ${ func('make_sound') }() ${ op('=') } ${ num('0') };

			${ keyw('void') } ${ func('move') }(${ keyw('int') } ${ param('distance') })
			{
				${ keyw('int') } ${ id('time') } ${ op('=') } ${ param('distance') } ${ op('/') } ${ id('speed') };
				${ namesp('std') }::${ id('cout') } ${ func('<<') } ${ str('"Took "') } ${ func('<<') } ${ id('time') } ${ func('<<') } ${ str('" seconds"') } ${ func('<<') } ${ namesp('std') }::${ id('endl') };
			}
	};

	${ keyw('class') } ${ cl('Cat') } : ${ keyw('public') } ${ cl('Animal') }
	{
		${ keyw('public') }:

			${ func('Cat') }(${ keyw('const') } ${ namesp('std') }::${ cl('string') }${ op('&') } ${ id('name') }) : ${ constr('Animal') }(${ param('name') }, ${ num('7') }) {}

			${ keyw('void') } ${ func('meow') }()
			{
				${ namesp('std') }::${ id('cout') } ${ func('<<') } ${ str('"meow"') } ${ func('<<') } ${ namesp('std') }::${ id('endl') };
			}


			${ keyw('void') } ${ func('make_sound') }()
			{
				${ func('meow') }();
			}
	};

	${ keyw('class') } ${ cl('Dog') } : ${ keyw('public') } ${ cl('Animal') }
	{
		${ keyw('public') }:

			${ func('Dog') }(${ keyw('const') } ${ namesp('std') }::${ cl('string') }${ op('&') } ${ id('name') }) : ${ constr('Animal') }(${ param('name') }, ${ num('9') }) {}

			${ keyw('void') } ${ func('bark') }()
			{
				${ namesp('std') }::${ id('cout') } ${ func('<<') } ${ str('"woof"') } ${ func('<<') } ${ namesp('std') }::${ id('endl') };
			}

			${ keyw('void') } ${ func('make_sound') }()
			{
				${ func('bark') }();
			}
	};
	`) }

	<p>
		In the above example, we created a <em>base class</em> ${ createInlineCodeBlock(cl('Animal')) }, which we <em>extended</em> into a cat and a dog class.
		Our animal class is an abstract class, because it has a ${ createInlineCodeBlock(keyw('virtual')) } method.
		Note the ${ createInlineCodeBlock(`${ op('=') } ${ num('0') }`) } in the virtual ${ createInlineCodeBlock(func('make_sound')) } method.
		This is C++ syntax for specifying a virtual method that does not have an implementation yet.
		This means that we cannot create instances of the animal base class, and we must define the ${ createInlineCodeBlock(func('make_sound')) } method in classes we derive from the base animal class.
		<br>
		To denote inheritance in C++, we add a colon after the class name in the declaration and the class it extends.
		We also have to express the visibility mode (${ createInlineCodeBlock(keyw('public')) }, ${ createInlineCodeBlock(keyw('private')) } or ${ createInlineCodeBlock(keyw('protected')) }).
		Public and protected members in the base class will become available in the derived class with the selected visibility mode.
		Private members in the base class will never be available to the derived class.
		<br><br>
		In the derived classes, we must call the ${ createInlineCodeBlock(constr('Animal')) } constructor, because there is no default ${ createInlineCodeBlock(constr('Animal')) } constructor.
		We can also use the member initialiser list for this.
		Instead of initialising a member by name, we will initialise the base class instance by name.
	</p>

	<br>

	<h3 id="classes-and-pointers">
		Classes and pointers to them
		${ linkSymbol }
	</h3>

	<p>
		In C++, being a low-level language, it is important to understand where your variables and class instances are actually stored.
		There are two storage places in a typical program: the <em>stack</em> and the <em>heap</em>.
		All global and local variables and class instances are placed on the stack.
	</p>

	${ createCodeBlockFromStr(`
	${ keyw('int') } ${ id('global_1') };
	${ cl('Cat') } ${ id('global_2') }(${ str('"Cleo"') });

	${ keyw('void') } ${ func('func') }()
	{
		${ keyw('int') } ${ id('local_1') };
	}

	${ keyw('int') } ${ func('main') }()
	{
		${ keyw('int') } ${ id('local_2') };

		${ keyw('if') } ( ... )
		{
			${ keyw('uint64_t') } ${ id('local_3') };
		}
	}
	`) }

	<p>
		All variables above are stored on the stack.
		The machine code of the functions and methods we wrote also lives on the stack.
		However, there is a technical limitation to the use of the stack: it is fixed in size.
		On a typical modern Linux machine, the stack size is 8MB.
		You can check your stack size on your Linux machine with the command ${ createInlineCodeBlock(`$ ulimit -s`) }.
		This command displays the stack size in kB.
		<br><br>
		If our program has to store a lot of data, we should use the heap.
		The heap is basically all memory of our machine that is not in use and not reserved.
		Using the heap, we can use all memory available to our device.
		<br><br>
		When we want to allocate something on the heap in C++, we use the ${ createInlineCodeBlock(keyw('new')) } operator.
		This operator will ask the system for a block of memory of the size we need and returns a pointer to this memory block.
		Let's try it out.
	</p>

	${ createCodeBlockFromStr(`
	${ cl('Cat') } ${ op('*') }${ id('cat_1') } ${ op('=') } ${ keyw('new') } ${ constr('Cat') }(${ str('"Cleo"') });
	`) }

	<p>
		Declaring a heap-allocated cat is simple.
		Note the asterisk symbol (${ createInlineCodeBlock(op('*')) }) that specifies that ${ createInlineCodeBlock(id('cat_1')) } is a pointer to a cat.
		We write the ${ createInlineCodeBlock(keyw('new')) } operator and then use the cat constructor as we would usually do.
		There is no shorthand way of writing this expression.
		<br>
		To make our cat meow, we have to dereference the pointer and then call the ${ func('meow') } method:
	</p>

	${ createCodeBlockFromStr(`
	(${ op('*') }${ id('cat_1') }).${ func('meow') }();
	`) }

	<p>
		Dereferencing is done with another asterisk symbol.
		This basically means "get the value ${ createInlineCodeBlock(id('cat_1')) } points to, then call the ${ func('meow') } method on it".
		<br>
		As this is a very common operation in C++, there exists a shorthand way of writing the above code by using the <em>arrow operator</em>:
	</p>

	${ createCodeBlockFromStr(`
	${ id('cat_1') }${ op('->') }${ func('meow') }();
	`) }

	<p>
		The ${ createInlineCodeBlock(keyw('new')) } operator will allocate a block of memory for us.
		When we are done using this block, we must ${ createInlineCodeBlock(keyw('delete')) } it.
		If we don't and we simply stop caring about the block, the memory will still be in use by our program and we have a <em>memory leak</em>.
		Eventually, our machine might run out of memory, because the memory we have allocated isn't returned to the operating system.
		This is especially concerning when we develop an application that must run for an extended period of time, such as background programs or servers.
		<br>
		Let's look at an example program that leaks memory.
	</p>

	${ createCodeBlockFromStr(`
	${ comm('// Called when a button is pressed in the lift') }

	${ cl('LiftQuery') } ${ op('*') }${ func('create_lift_query') }(${ keyw('int') } ${ param('floor_number') })
	{
		${ cl('LiftQuery') } ${ op('*') }${ id('query') } ${ op('=') } ${ keyw('new') } ${ constr('LiftQuery') }(${ param('floor_number') });
		${ keyw('return') } ${ id('query') };
	}


	${ comm('// Called after the doors of the lift have closed') }

	${ keyw('void') } ${ func('move_to_desired_floor') }(${ cl('LiftQuery') } ${ op('*') }${ param('query') })
	{
		${ keyw('if') } (${ id('current_floor') } ${ op('<') } ${ param('query') }${ op('->') }${ id('floor_number') })
		{
			${ func('move_up') }();
		}
		${ keyw('else') }
		{
			${ func('move_down') }();
		}
	}


	${ comm('// Called when the lift arrives at the desired floor') }

	${ keyw('void') } ${ func('on_arrival') }(${ cl('LiftQuery') } ${ op('*') }${ param('query') })
	{
		${ comm('// Here, we forget to delete the query') }
		${ comm('// Congrats, we leaked memory!') }
	}
	`) }

	<p>
		In this program, we created some code for a lift, but we leak memory every time we arrive at the desired floor.
		Let's say that the embedded system in the lift has a 4MB memory chip, and an instance of the ${ createInlineCodeBlock(cl('LiftQuery')) } class is 128 bytes in size.
		Then, after ${ createInlineCodeBlock('4 * 1024 * 1024 / 128 = 32768') } arrivals, we have consumed the entire memory chip and the lift program will crash because there is no more memory available to allocate another ${ createInlineCodeBlock(cl('LiftQuery')) }.
		Next time you are stuck in a lift, you know you can blame some programmer.
		<br><br>
		Now, how do we return unneeded memory back to the operating system correctly?
	</p>

	${ createCodeBlockFromStr(`
	${ cl('Cat') } ${ op('*') }${ id('cat_1') } ${ op('=') } ${ keyw('new') } ${ constr('Cat') }(${ str('"Cleo"') });

	${ comm('// Do something with the cat...') }

	${ keyw('delete') } ${ id('cat_1') };
	`) }

	<div class="quote">
		Whenever you create a ${ createInlineCodeBlock(keyw('new')) } instance, always make sure you ${ createInlineCodeBlock(keyw('delete')) } it when it's not needed anymore.
		Missing deletions cause memory leaks.
	</div>

	<p>
		Pointers to classes can also be very useful when we're dealing with abstract classes.
		We cannot construct abstract classes, but we can have pointers to them.
		Let's demonstrate that in an example of racing animals.
	</p>

	${ createCodeBlockFromStr(`
	${ keyw('class') } ${ cl('RacingAnimal') }
	{
		${ keyw('private') }:

			${ comm('// Racing animals will get a set advantage') }
			${ comm('// over other racing animals') }

			${ keyw('int') } ${ id('head_start') };


		${ keyw('public') }:

			${ cl('Animal') } ${ op('*') }${ id('animal') };

			${ func('RacingAnimal') }(${ cl('Animal') } ${ op('*') }${ param('animal') }, ${ keyw('int') } ${ param('head_start') })
				: ${ id('animal') }(${ param('animal') }), ${ id('head_start') }(${ param('head_start') }) {}

			${ keyw('int') } ${ func('race') }(${ keyw('int') } ${ param('distance') }) ${ keyw('const') }
			{
				${ keyw('int') } ${ id('remaining_distance') } ${ op('=') } ${ param('distance') } ${ op('-') } ${ id('head_start') };
				${ keyw('int') } ${ id('time_taken') } ${ op('=') } ${ id('remaining_distance') } ${ op('/') } ${ id('animal') }${ op('->') }${ id('speed') };

				${ keyw('return') } ${ id('time_taken') };
			}
	};


	${ keyw('int') } ${ func('main') }()
	{
		${ namesp('std') }::${ cl('vector') }${ op('<') }${ cl('RacingAnimal') }${ op('>') } ${ id('racing_animals') };
		${ keyw('int') } ${ id('race_track_distance') } ${ op('=') } ${ num('250') };

		${ comm('// Add some animals to the list') }

		${ id('racing_animals') }.${ func('push_back') }( ${ constr('RacingAnimal') }(${ keyw('new') } ${ constr('Cat') }(${ str('"George"') }), ${ num('100') }) );
		${ id('racing_animals') }.${ func('push_back') }( ${ constr('RacingAnimal') }(${ keyw('new') } ${ constr('Dog') }(${ str('"Belle"') }),   ${ num('50') }) );
		${ id('racing_animals') }.${ func('push_back') }( ${ constr('RacingAnimal') }(${ keyw('new') } ${ constr('Bear') }(${ str('"Bruno"') }),   ${ num('0') }) );

		${ comm('// Let all animals race') }

		${ keyw('for') } (${ keyw('const') } ${ cl('RacingAnimal') }${ op('&') } ${ id('racing_animal') } : ${ id('racing_animals') })
		{
			${ keyw('const') } ${ namesp('std') }::${ cl('string') }${ op('&') } ${ id('name') } ${ op('=') } ${ id('racing_animal') }.${ id('animal') }${ op('->') }${ id('name') };
			${ keyw('int') } ${ id('seconds_taken') } ${ op('=') } ${ id('racing_animal') }.${ func('race') }(${ id('race_track_distance') });

			${ namesp('std') }::${ id('cout') } ${ func('<<') } ${ id('name') } ${ func('<<') } ${ str('" took "') } ${ func('<<') }
				${ id('seconds_taken') } ${ func('<<') } ${ str('" seconds"') } ${ func('<<') } ${ namesp('std') }::${ id('endl') };

			${ comm('// And delete them when we don\'t need them anymore') }

			${ keyw('delete') } ${ id('racing_animal') }.${ id('animal') };
		}
	}
	`) }

	<p>
		In the above example, we created a class to represent a racing animal.
		This class has a field ${ createInlineCodeBlock(id('animal')) } that holds a pointer to an actual animal.
		We are allowed to pass in any type of animal into this pointer.
		On line 35-37 we create a racing cat, dog and bear.
		We allocate the animals on the heap, using the ${ createInlineCodeBlock(keyw('new')) } operator.
		The animals will race and we ${ createInlineCodeBlock(keyw('delete')) } the animal instances when we don't need them anymore.
		The output of this program is:
	</p>

	${ createCodeBlockFromStr(`
	George took 21 seconds
	Belle took 22 seconds
	Bruno took 20 seconds
	`) }

	<p>
		Seems like Bruno the bear won the race!
	</p>

	<br>

	<h2 id="final-thoughts">
		Final thoughts
		${ linkSymbol }
	</h2>

	<p>
		With reading this tour of C++ classes, I hope you have learnt about some of the powerful tools C++ offers.
		Now it is your turn: build something cool to apply your new knowledge!
	</p>
	`
} as BlogPage

/*
	Done:
		- references
		- initialiser lists
		- constructors (this->)
		- operators
		- templates
		- inheritance
		- abstract classes
		- heap and pointers
		- rule of three, rule of five
		- move semantics

	Todo:
		- static methods
*/