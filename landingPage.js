// Add event listener to the page!


//send to gallery page with specific category selected!

//queryselect by specific class 
ecommerceApp.categories = document.querySelectorAll('.categoryLink')
ecommerceApp.heroButton = document.querySelector('.pseudoButton')
//function to add the link event listener to each of the 4 images
ecommerceApp.addLinks = () => {
    ecommerceApp.categories.forEach(item => {
        const id = item.id
        console.log(id)
        item.addEventListener('click', function() {

            
            window.location.assign(`products.html?category=${id}`)
        })
        //add keypress event for accessibility

        item.addEventListener('keydown', function(e) {
            console.log('keypressed!')
            console.log(e.keyCode)
            if(e.keyCode == 13 || e.keyCode == 32) {
                console.log('pressed')
                window.location.assign(`products.html?category=${id}`)
            }
        })

    })

    ecommerceApp.heroButton.addEventListener('click', function() {
        window.location.assign(`products.html`)
    })
}


// added opacity on hover on sibling element! (Doesn't work at the moment)
const leftAndRight = document.querySelectorAll('.testCategory .imgContainer')

leftAndRight.forEach(image => {
    console.log(image.classList.contains('leftImg'))
    const right = document.querySelector('.rightImg')
    const left = document.querySelector ('.leftImg')
    if (image.classList.contains('leftImg')) {
        image.addEventListener('mouseover', function(){
            right.style.opacity = '0.7'
        })
        image.addEventListener('mouseout', function(){
            right.style.opacity = '1'
        })
    } else {
        image.addEventListener('mouseover', function(){
            left.style.opacity = '0.7'
        })
        image.addEventListener('mouseout', function(){
            left.style.opacity = '1'
    })
}})

// trying offset width to dynamically change the position of text depending on screen width
const widthChange = () => {
    const section1Width= document.querySelector(".testCategory .section1").offsetWidth
    console.log(section1Width)
    
    const p = document.querySelector('.testCategory .section1 p')
    p.style.left = `${section1Width}px`;
    
    
    const p2 = document.querySelector('.testCategory .section2 p')
    p2.style.right = `${section1Width}px`;
}
widthChange()
window.addEventListener("resize", function() {
    widthChange()
})








//New Releases section.

ecommerceApp.displayNewReleases = function(array) {
    //to remove
    console.log(ecommerceApp.products[0])
    // copy the ecommerceApp.products array so we can manipulate it (and not mess anything else up)
    let arrayToBeShuffled = ecommerceApp.products.map(x => x)

    // randomize the array of our 20 products
    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        console.log(array)
        return array;
        
    }
    //call the function
    shuffle(arrayToBeShuffled)

    //to remove
    console.log(arrayToBeShuffled)
    
    //Grab the first 3 items on our randomized array and post them on the page
    const newReleases = document.querySelector('.newReleases')
    for( let i = 0; i < 3; i++) {
        //create container for the new HTML elements
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="gridItem2">
            <a href='product.html?id=${arrayToBeShuffled[i].id}'><img src="${arrayToBeShuffled[i].image}" alt="${arrayToBeShuffled[i].title}. Links to product page."></a>
        </div>`


        //append item to page
        newReleases.appendChild(div)


    }
}