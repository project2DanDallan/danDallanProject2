ecommerceApp.productGallery = function() {

    // store url in parseUrl
    const parseUrl = new URLSearchParams(window.location.search)
    // using get we grab the category parameter in the url
    const grabId = parseUrl.get('category')

    // if the id parameter exists
    if(grabId) {
        // call display products with the category as argument
        ecommerceApp.displayProducts(ecommerceApp.products, grabId);
    } else {
        // call display products with no category as argument
        ecommerceApp.displayProducts(ecommerceApp.products);
    }

    document.querySelectorAll('.ratings').forEach(rating => {
        rating.addEventListener('click', () => {
            ecommerceApp.filterByRatingGallery(rating)
        })

        //add accessibility to keyboard only
        rating.addEventListener('keydown', function(e) {
        if(e.keyCode == 13 || e.keyCode == 32) {
            ecommerceApp.filterByRatingGallery(rating)
        }})

    })

    document.querySelectorAll('.priceFilter').forEach( price => {
        
        price.addEventListener('click', () => {                   
            ecommerceApp.filterByPriceGallery(price)
        })
        // adding accessibility to keyboard only users
        price.addEventListener('keydown', function(e) {
        if(e.keyCode == 13 || e.keyCode == 32) {
            ecommerceApp.filterByPriceGallery(price)
        }})
    })

    
    ecommerceApp.filterByPriceGallery = (price) => {
        document.querySelectorAll('.priceFilter').forEach(liColoring => {
            if (liColoring.classList.contains('underline')) {
                liColoring.classList.remove('underline')
            }
        })

        price.classList.add('underline')
        ecommerceApp.filterByRating(ecommerceApp.displayedProducts, ecommerceApp.currentFilter.currentRating, price.id)
    }

    ecommerceApp.filterByRatingGallery = (rating) => {
        document.querySelectorAll('.ratings').forEach(liColoring => {
            if (liColoring.classList.contains('underline')) {
                liColoring.classList.remove('underline')
            }
        })

        rating.classList.add('underline')
        ecommerceApp.filterByRating(ecommerceApp.displayedProducts, rating.id, ecommerceApp.currentFilter.currentPrice);
    }
}