// creating the ecommerceApp object
const ecommerceApp = {};

// storing our api url
ecommerceApp.url = 'https://fakestoreapi.com/products';

ecommerceApp.products = '';
ecommerceApp.displayedProducts = []; // empty array to manipulate by filtering results on products.html
ecommerceApp.filterProductsByRating = [];

// Default parameters for filtering
ecommerceApp.currentFilter =  {
    currentRating : 0,
    currentPrice: 110000
}

// firebase settings
ecommerceApp.firebaseConfig = {
    apiKey: "AIzaSyAWnTje2nBVShUjvULKKTcypvMpftpIEYk",
    authDomain: "ecommerceapp-23c51.firebaseapp.com",
    databaseURL: "https://ecommerceapp-23c51-default-rtdb.firebaseio.com",
    projectId: "ecommerceapp-23c51",
    storageBucket: "ecommerceapp-23c51.appspot.com",
    messagingSenderId: "858507509148",
    appId: "1:858507509148:web:dd23f54f6b9d153a16dc59",
    measurementId: "G-59BHJGVXPE"
};
    
// Initialize Firebase
firebase.initializeApp(ecommerceApp.firebaseConfig);
ecommerceApp.dbRef = firebase.database().ref();

// set new cartId to localstorage only if there isnt already a cartId
if(!localStorage.getItem("cartId")) {
    // Generate new id
    const uid = function(){
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    const userId = uid();

    localStorage.setItem("cartId", userId);
}
ecommerceApp.cartId = localStorage.getItem("cartId");

// update wishlist function
ecommerceApp.updateWishlist = function() {
    firebase.database().ref(ecommerceApp.cartId).once("value", data => {
        ecommerceApp.cartArray = data.val();
        
        ecommerceApp.displayWishlist(ecommerceApp.cartArray);
    })
}

// fetch and store data using api call
ecommerceApp.callApi = () => {
    fetch(ecommerceApp.url)
        .then(res=>res.json())
        .then(json=> {
            ecommerceApp.products = json;

            // if user is on ?.html
            if(typeof ecommerceApp.consoleLog === "function") {
                ecommerceApp.consoleLog()
            }

            // if user is on product.html
            if(typeof ecommerceApp.checkProduct === "function") {
                // run the function only if function exists
                ecommerceApp.checkProduct()
            }

            // if user is on products.html aka product gallery
            if(typeof ecommerceApp.productGallery === "function") {
                // run the function only if function exists
                ecommerceApp.productGallery()
            }
            
        })
        // catch and log any errors related to api call
        .catch(function(error) {
            console.log(error);
        });
}

// function to remove duplicate array items
ecommerceApp.removeDuplicates = function(arr, comp) {
    // store the comparison  values in array
    const unique =  arr.map(e => e[comp])

    // store the indexes of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)

    // eliminate the false indexes & return unique objects
    .filter((e) => arr[e]).map(e => arr[e]);

    return unique;
}

// function to redirect the page to another file
ecommerceApp.redirect = function(page) {
    window.location.assign(`./${page}.html`);
}

// display related products and product listings in the gallery
ecommerceApp.displayProducts = function(productArray, getUrl = null) {
    
    document.querySelector('#productListings').innerText = '';

    productArray.forEach((elem, index) => {
        
        if (getUrl != null && elem.category !== getUrl) {
            // SyntaxError: Illegal continue statement: no surrounding iteration statement
            return;
        }

        ecommerceApp.displayedProducts.push(elem);
        
        // select #productGallery container
        productListings = document.querySelector('#productListings');
        
        // product card container
        const cardContainer = document.createElement('div'); 

        // create anchor link around card content
        const cardLink = document.createElement('a')
        cardLink.href = `./product.html?id=${elem.id}`;

        // product card image container
        const cardImageContainer = document.createElement('div');     
        
        // product card image
        const cardImage = document.createElement('img');
        cardImage.src = elem.image;
        cardImage.alt = elem.description;
        cardImageContainer.classList.add('productImage');
        cardImageContainer.appendChild(cardImage);
        
        // product card content
        const cardContentContainer = document.createElement('div');
        cardContentContainer.classList.add('productCardContainer');

        // product card title
        const cardTitle = document.createElement('div');
        cardTitle.classList.add('productTitle');
        cardTitle.innerText = elem.title;

        // product card rating and price container
        const cardRatePrice = document.createElement('div');
        cardRatePrice.classList.add('cardRatePriceContainer');

        // product card rating
        const cardRating = document.createElement('div');
        cardRating.classList.add('productRating');
        cardRating.innerText = `${elem['rating'].rate} (${elem['rating'].count} ratings)`;
        
        // product card price
        const cardPrice = document.createElement('div');
        cardPrice.classList.add('productPrice');
        cardPrice.innerText = elem.price;

        // appending the newly created elements to the card containers
        cardLink.appendChild(cardImageContainer);
        cardImageContainer.appendChild(cardImage)
        cardContentContainer.appendChild(cardTitle)
        cardRatePrice.appendChild(cardRating)
        cardRatePrice.appendChild(cardPrice)
        cardContentContainer.appendChild(cardRatePrice)
        cardLink.appendChild(cardContentContainer)

        cardContainer.appendChild(cardLink);
        // appending the newly created elements to to related products container
        productListings.appendChild(cardContainer);
    
    });
    
}


//testing purposes for sorting our new array
ecommerceApp.filterByRating = function (array, rating, price) {

    ecommerceApp.currentFilter.currentPrice = price;
    ecommerceApp.currentFilter.currentRating = rating;
    

    ecommerceApp.filterProductsByRating = [];

    // filter array if product rating is greater than target rating
    ecommerceApp.filterProductsByRating = array.filter( (product) => {
        return product.rating.rate >= rating;
    });

    // remove any duplicated array items
    ecommerceApp.filteredByRating = ecommerceApp.removeDuplicates(ecommerceApp.filterProductsByRating,'id');

    //with the filtered array by rating, filter again by price indicated
    ecommerceApp.filterProductsByPrice = ecommerceApp.filteredByRating.filter( (product) => {
        return product.price <= price;
    });

    // sort the remaining elements in the array by rating : highest - lowest
    ecommerceApp.filterProductsByPrice.sort((a, b) => a.rating.rate < b.rating.rate)


    // display products on the page
    ecommerceApp.displayProducts(ecommerceApp.filterProductsByPrice)

}

// perform api call
ecommerceApp.init = function() {
    ecommerceApp.callApi();
    ecommerceApp.updateWishlist();
    
}

// when the document is ready, call and init the app
ecommerceApp.init()