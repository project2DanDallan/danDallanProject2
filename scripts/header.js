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
currencySelection.value = ecommerceApp.currencyId; // pre select whats in our localstorage

currencySelection.addEventListener("change", function(e) {

    localStorage.setItem('currencyId',currencySelection.value)
    ecommerceApp.currencyId = localStorage.getItem("currencyId");
    if(typeof ecommerceApp.checkProduct === "function") {
        // run the function only if function exists
        ecommerceApp.checkProduct()
    }

    if(typeof ecommerceApp.productGallery === "function") {
        // run the function only if function exists
        ecommerceApp.productGallery()
    }


});
// ecommerceApp.currencySelection = function()

const ulElement = document.getElementById('wishlist');

ecommerceApp.displayWishlist = function(cartArray) {

    ulElement.innerHTML = '';
    ecommerceApp.totalCartValue = 0; // make cart total value = 0

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

        const cartItemPrice = document.createElement('div');
        cartItemPrice.classList.add('cartItemPrice');

        if(typeof ecommerceApp.checkProduct !== "undefined") {
            cartItemPrice.innerHTML = (cartArray[prop].price*ecommerceApp.currency[ecommerceApp.currencyId]).toFixed(2);
        }
        

        listItemElement.appendChild(cartItemDel);
        listItemElement.appendChild(cartItemImgContainer);
        listItemElement.appendChild(cartItemTitle);
        listItemElement.appendChild(cartItemPrice);

        // add sum of each cart item price to subtotal
        ecommerceApp.totalCartValue += cartArray[prop].price;

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

            if(cartArray === null) {
                ecommerceApp.cartArrayCount = 0;
            }

            ecommerceApp.updateWishlist();
            
        });

    })

    // if ulElement in cart menu is empty
    if(ulElement.innerHTML === '') {
        document.getElementById('emptyCart').innerHTML = 'Wishlist is empty :-('
        document.getElementById('subtotal').innerHTML = ''
    } else {
        document.getElementById('emptyCart').innerHTML = 'Your wishlist'
        document.getElementById('subtotal').innerHTML = `Subtotal ${(ecommerceApp.totalCartValue*ecommerceApp.currency[ecommerceApp.currencyId]).toFixed(2)} ${ecommerceApp.currencyId}`
    }

    // set cartArrayCount to the number of keys in cartArray
    if(cartArray !== null) {
        ecommerceApp.cartArrayCount = Object.keys(cartArray).length
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
};