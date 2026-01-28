// in developer tool, console.log(document) and console.dir(document) gives us the info about the pages
// console.log(document.links[]) // gives all the links
/* document object model diagram
#document
  ├── DOCTYPE: html
  └── <html lang="en">
       ├── <head>
       │    ├── <meta charset="UTF-8">
       │    ├── <meta name="viewport" content="width=device-width, initial-scale=1.0">
       │    └── <title>
       │         └── #text: DOM learning
       └── <body>
            └── <div class="bg-black">
                 ├── <h1 class="heading">
                 │    └── #text: DOM learning on chai aur code
                 └── <p>
                      └── #text: Lorem ipsum dolor sit amet.
*/

// document.getElementById('ID_name') // returns the element with ID_name in argument
// document.getElementById('ID_name').innerHTML = "" // is DOM Manipulation