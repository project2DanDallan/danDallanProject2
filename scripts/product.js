ecommerceApp.checkProduct = function() {
         
    // storage main container in variable
    const error404 = document.getElementById('productPageContainer')

    // check if there are arguments in the url
    let url = window.location.href;
    if(url.includes('?')){

        // storing the url parameter value of "id"
        url = url.substring(url.length,url.indexOf('=')+1);

        // using regex to create a condition of only numberic values to follow
        const numericCondition = /^\d+$/;

        // check if id parameter is numerical
        if (numericCondition.test(url)) {

            // check if url is greater than 0 but less than max number of available products
            if(url < ecommerceApp.products.length && url > 0) {
                
                // get index of product by id number
                const index = ecommerceApp.products.findIndex(p => p.id == url);

                // declare ids as variables
                const productImg = document.getElementById('productImg');
                productImg.src = ecommerceApp.products[index].image;
                
                const productTitle = document.getElementById('productTitle');
                productTitle.innerText = ecommerceApp.products[index].title

                const productPrice = document.getElementById('productPrice');
                productPrice.innerText = `${(ecommerceApp.products[index].price*ecommerceApp.currency[ecommerceApp.currencyId]).toFixed(2)} ${ecommerceApp.currencyId}`

                const productRating = document.getElementById('productRating');
                productRating.innerText = `${ecommerceApp.products[index].rating.rate} (${ecommerceApp.products[index].rating.count} ratings)`
                
                const productDesc = document.getElementById('productDesc');

                productDesc.innerText = ecommerceApp.products[index].description
              
                // related products
                ecommerceApp.productsByCategory = []; // store all products with specified category
                ecommerceApp.productListings = []; // store limited number of products with specified category

                // iterate through products array
                for(let i = 0 ; i < ecommerceApp.products.length ; i++) {
                    // if a product is equal to the product page cateogry BUT not the same product we are currently viewing then push to productsByCategory array
                    if(ecommerceApp.products[i].category === ecommerceApp.products[index].category && ecommerceApp.products[i].id != ecommerceApp.products[index].id) {
                        ecommerceApp.productsByCategory.push(ecommerceApp.products[i])
                    }
                }

                // remove the product thats currently being viewed out of related products

                // randomize the productsByCategory array and take the first 3 objects
                ecommerceApp.productListings = ecommerceApp.productsByCategory
                .map(x => ({ x, r: Math.random() }))
                .sort((a, b) => a.r - b.r)
                .map(a => a.x)
                .slice(0, 3);

                ecommerceApp.displayProducts(ecommerceApp.productListings, ecommerceApp.products[index].category);
            
                const addToWishlist = document.getElementById('addTo')

                // event listener for shopping cart and nav icon
                addToWishlist.addEventListener('click', function() {
                    ecommerceApp.addToWishlist(ecommerceApp.products[index].id,ecommerceApp.products[index].title,ecommerceApp.products[index].image,ecommerceApp.products[index].price);
                });

            } else {
                // throw 404 error
                ecommerceApp.errorPage(error404);
            }
        } else {
            // throw 404 error
            ecommerceApp.errorPage(error404);
        }
    
    } else {
        // redirect to products page
        ecommerceApp.redirect('products');
    }

}

ecommerceApp.addToWishlist = function(itemId,item,image,price) {

    const id = `${itemId}`;
    const itemLists = {};
    itemLists[id] = {
        id: itemId,
        title: item,
        image: image,
        price: price
    }

    // update current wishlist
    ecommerceApp.updateWishlist();

    //push to firebase our new itemLists.
    return firebase.database().ref(`/${ecommerceApp.cartId}`).update(itemLists)
}