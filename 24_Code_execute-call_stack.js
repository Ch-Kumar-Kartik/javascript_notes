function one(){
   console.log("one")
   two()
}

function two(){
   console.log("two")
   three()
}
function three(){
   console.log("three")
}

one()
two()
three()

/*
one
two
three
two
three
three
*/

/*  Action          Call Stack                  Output
1   one() called     [Global, one]	               one
2	two() called	   [Global, one, two]	         one, two
3	three() called	   [Global, one, two, three]	   one, two, three
4	three completes	[Global, one, two]	         one, two, three
5	two completes	   [Global, one]	               one, two, three
6	one completes	   [Global]	                     one, two, three
7	two() called	   [Global, two]	               one, two, three, two
8	three() called	   [Global, two, three]	         one, two, three, two, three
9	three completes	[Global, two]	               one, two, three, two, three
10	two completes	   [Global]	                     one, two, three, two, three
11	three() called	   [Global, three]	            one, two, three, two, three, three
12	three completes	[Global]	                     one, two, three, two, three, three
13	Global completes	[]	                           one, two, three, two, three, three */