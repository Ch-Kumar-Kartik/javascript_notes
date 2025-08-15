/*
document.getElementById('title').id // gives the id of the element
document.getElementById('title').class // undefined
document.getElementById('title').className // heading
// don't write class to access the class but write className

-// another way of accessing the elements
document.getElementById('title').getAttribute('attribute_name')

-// changing the attributes of the element from the developer tools
document.getElementById('title').setAttribute('class', 'test') // this will override the class from heading to title

document.getElementById('title').setAttribute('class', 'test heading') // adding two classes, don't override the classes as it will cause issues with css

-// storing it in a variable
const title = document.document.getElementById('title')

-// adding styles
title.style.backgroundColor = 'green'
title.style.padding = "15px"
title.style.borderRadius = "15px"

-// extracting content from this element
title.textContext  
// DOM Learning on Chai aur Code test text

title.innerText
// DOM Learning on Chai aur Code

title.innerHTML // shows the html tags inside this text
// DOM Learning on Chai aur Code <span style = "display: none;">test text</span>

-// query selector
document.querySelector('h1') // selects the first h1
document.querySelector('#title') // selecting by using id
document.querySelector('.heading') // selecting by using class 
document.querySelector('input[type="password"]') // selecting the input field
// all css selectors are selectable
document.querySelector('p;first-child')

document.querySelector('ul')
const myul = document.querySelector('ul')
const turngreen = myul.querySelector('li')
turngreen.style.backgroundColor = "green"
turngreen.innerText = "onechangedtofive"

-// query selector all 
document.querySelectorAll('li')
// output won't be array, it will NodeList as in prototype map function is not there which is essential part of arrays
const tempList = document.querySelectorAll('li')
tempList.style.color = 'green' // will give an error
tempList[0].style.color = 'green'
// or we can apply forEach loop
tempList.forEach((l)=>({
    l.style.background = 'red'
    }))

-// getElementByClassName('')
const templClassList = document.getElementsByClassName('list-item')
// output will be HTML Collection, forEach won't work on this as in the prototype it doesn't exist
// to use things like forEach we need to convert HTML Colection to Array
const myConvertedArray = Array.from(templClassList)
myConvertedArray.forEach(function(li){
    li.style.color = 'orange'})
*/
