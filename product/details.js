$(document).ready(function() {
    var productId = window.location.search.split('=')[1];
    var currentObj = null;

    function createProductImages(url, pos) {
        var image = document.createElement('img');
        image.src = url

        if(pos === 0) {
            image.classList.add("active-image");
        }

        image.onclick = function() {
            $('#product-images img').removeClass("active-image")
            image.classList.add("active-image");
            $('#product-preview').attr('src', url);
        }

        return image;
    }

    $.get('https://5d76bf96515d1a0014085cf9.mockapi.io/product/' + productId, function(data, status) {
        currentObj = data;
        $('#product-preview').attr('src', data.preview)
        $('#product-title').html(data.name);
        $('#product-brand').html(data.brand);
        $('#description').html(data.description);
        $('#product-price').html(data.price);

        for(var i=0; i<data.photos.length; i++) {
            $('#product-images').append(createProductImages(data.photos[i], i));
        }
    })

    $("#btn-add-to-cart").click(function() {
        $('#btn-add-to-cart').addClass('bigger');
        setTimeout(function() {
            $('#btn-add-to-cart').removeClass('bigger');
        }, 200)

        var productList = window.localStorage.getItem('product-list');
        productList = productList === null || productList === '' ? [] : productList;
        productList = productList.length > 0 ? JSON.parse(productList) : [];

        // productList.push(currentObj);
        // window.localStorage.setItem('product-list', JSON.stringify(productList));
        console.log(productList);

        var foundAtPos = -1;
        for(var i=0; i < productList.length; i++) {
            // console.log(productList[i].id);
            if(parseInt(productList[i].id) == parseInt(currentObj.id)) {
                foundAtPos = i;
            }
        }

        if(foundAtPos > -1) {
            productList[foundAtPos].count = productList[foundAtPos].count + 1;
            console.log(productList[foundAtPos].count);
            window.localStorage.setItem('product-list', JSON.stringify(productList));
        } else {
            currentObj.count = 1;
            productList.push(currentObj);
            console.log(productList);
            window.localStorage.setItem('product-list', JSON.stringify(productList));
        }

        var totalCount = 0;
        for(var i=0; i<productList.length; i++) {
            totalCount = totalCount + productList[i].count;
        }
    
        $('#cart-count').html(totalCount);
    })
});