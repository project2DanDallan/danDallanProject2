// store nav and cart link ids in variable
const nav = document.getElementById("navLink");
const navMenuLink = document.getElementById("navMenuLink");
const navMenuItems = document.getElementById("navMenu");
const navMenuOverlay = document.getElementById("navMenuOverlay");

const cart = document.getElementById("cartLink");
const cartMenuLink = document.getElementById("cartMenuLink");
const cartMenuItems = document.getElementById("cartMenu");
const cartMenuOverlay = document.getElementById("cartMenuOverlay")

// initialize menu status to off
nav.navStatus = "off";
cart.cartStatus = "off";

// click events for the nav links
ecommerceApp.toggleNav = function() {
    // using switch cases to toggle nav menu
    switch(nav.navStatus) {
        case "off":
            nav.navStatus = "on";
            
            // add a class of flex which will change the display from 'none' to 'flex'
            navMenuItems.classList.add('flex');

            break;
        case "on":
            nav.navStatus = "off";

            // remove a class of flex which will change the display from 'flex' to 'none'
            navMenuItems.classList.remove('flex');
            break;
    }
};

ecommerceApp.toggleCart = function() {
    // using switch cases to toggle cart menu
    switch(cart.cartStatus) {
        case "off":
            cart.cartStatus = "on";

            // add a class of flex which will change the display from 'none' to 'flex'
            cartMenuItems.classList.add('flex');

            break;
        case "on":
            cart.cartStatus = "off";

            // remove a class of flex which will change the display from 'flex' to 'none'
            cartMenuItems.classList.remove('flex');
            
            break;
    }
};

// event listener for shopping cart and nav icon
cart.addEventListener('click', function() {
    ecommerceApp.toggleCart();
});
nav.addEventListener('click', function() {
    ecommerceApp.toggleNav();
});

// event listener for shopping cart icon within the shopping cart and nav menu
cartMenuLink.addEventListener('click', function() {
    ecommerceApp.toggleCart();
});
navMenuLink.addEventListener('click', function() {
    ecommerceApp.toggleNav();
});

// event listener for overlay of cart and nav menu
cartMenuOverlay.addEventListener('click', function() {
    ecommerceApp.toggleCart();
});
navMenuOverlay.addEventListener('click', function() {
    ecommerceApp.toggleNav();
});


const currencySelection = document.getElementById('currencySelection');

currencySelection.addEventListener("change", function(e) {
    console.log(currencySelection.value)
    localStorage.setItem('currencyId',currencySelection.value)
    ecommerceApp.currencyId = localStorage.getItem("currencyId");
    ecommerceApp.checkProduct();
});
// ecommerceApp.currencySelection = function()

const ulElement = document.getElementById('wishlist');

ecommerceApp.displayWishlist = function(cartArray) {

    ulElement.innerHTML = '';

    for(prop in cartArray) {
        const listItemElement = document.createElement('div');
        listItemElement.classList.add('cartItemContainer')

        const cartItemDel = document.createElement('div');
        cartItemDel.classList.add('cartItemDel');
        cartItemDel.innerHTML = `<button class="removeItem" data-id="${cartArray[prop].id}"><i class="fas fa-times remove"></i></button>`;

        const cartItemImgContainer = document.createElement('div');
        cartItemImgContainer.classList.add('cartItemImg');
        const cartItemImg = document.createElement('img');
        cartItemImg.src = cartArray[prop].image;
        cartItemImgContainer.appendChild(cartItemImg);

        const cartItemTitle = document.createElement('div');
        cartItemTitle.classList.add('cartItemTitle');
        
        const cartItemTitleLink = document.createElement('a');
        cartItemTitleLink.classList.add('cartItemLink');
        cartItemTitleLink.href = `./product.html?id=${cartArray[prop].id}`
        cartItemTitleLink.innerHTML = cartArray[prop].title;
        cartItemTitle.appendChild(cartItemTitleLink);

        listItemElement.appendChild(cartItemDel);
        listItemElement.appendChild(cartItemImgContainer);
        listItemElement.appendChild(cartItemTitle);

        // add to div
        ulElement.appendChild(listItemElement)

    };

    // adda common class to all the buttons
    let deleteBtn = document.getElementsByClassName("removeItem");
    // converting html collection to array, to use array methods
    Array.prototype.slice.call(deleteBtn).forEach(function(item) {
    // iterate and add the event handler to it
        item.addEventListener("click", function(e) {
            const itemToRemove = item.getAttribute('data-id');
            firebase.database().ref(`/${ecommerceApp.cartId}`).child(itemToRemove).remove()
            // ecommerceApp.cartArrayCount = ecommerceApp.cartArrayCount - 1

            if(cartArray === null) {
                ecommerceApp.cartArrayCount = 0;
                console.log('im null')
            }

            ecommerceApp.updateWishlist();
            
        });

    })

    // if ulElement in cart menu is empty
    if(ulElement.innerHTML === '') {
        document.getElementById('emptyCart').innerHTML = 'Wishlist is empty :-('
    } else {
        document.getElementById('emptyCart').innerHTML = 'Your wishlist'
    }

    // set cartArrayCount to the number of keys in cartArray
    if(cartArray !== null) {
        ecommerceApp.cartArrayCount = Object.keys(cartArray).length
        console.log('not null')
    } else {
        ecommerceApp.cartArrayCount = 0;
    }

    // create cart menu notification if cart array count is more than 0
    if(ecommerceApp.cartArrayCount > 0) {
        const cartArrayCountNotif = document.createElement('span');
        cartArrayCountNotif.classList.add('cartArrayCount');
        cartArrayCountNotif.innerHTML = ecommerceApp.cartArrayCount;
        document.getElementById('cartIcon').appendChild(cartArrayCountNotif)
    } else {
        document.getElementById('cartIcon').innerHTML = '';
    }

      
      

    //   document.getElementById('cartArrayCount').innerHTML = ecommerceApp.cartArrayCount
    // cartArray.forEach((elem, index) => {
    //     // const listItemElement = document.createElement('li');
    //     //   listItemElement.innerHTML = `<i class="far fa-square"></i>`;
    //     //   listItemElement.appendChild(document.createTextNode(toDoData[prop].description));
    
    //     //   arrayOfToDos.push(listItemElement.outerHTML);
    //     //   ulElement.innerHTML = arrayOfToDos.join('');

    //     console.log('his');
    //     console.log(index);
    // })
};

// ecommerceApp.dbRef.on('value', (data) => {
//     const toDoData = data.val();
  
//     const arrayOfToDos = [];
    
//     for(prop in toDoData) {
//       const listItemElement = document.createElement('li');
//       listItemElement.innerHTML = `<i class="far fa-square"></i>`;
//       listItemElement.appendChild(document.createTextNode(toDoData[prop].description));
  
//       arrayOfToDos.push(listItemElement.outerHTML);
//     };

  
//     ulElement.innerHTML = arrayOfToDos.join('');
  
//   });