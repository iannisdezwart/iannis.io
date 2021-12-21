.data

hello_world_str:
	.string "Hello, World!"


.text

.global main
main:

	# prologue

	# pushq %rbp      # save rbp
	# movq %rsp, %rbp # create a new stackframe

	# output "Hello, World!" and a newline

	movq $hello_world_str, %rdi
	call puts

	# epilogue

	# movq %rbp, %rsp # end the stackframe
	# popq %rbp       # restore the previous stackframe
	movq $0, %rax
	ret             # return from the main function
