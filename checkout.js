$(document).ready(function() {

    function createCheckoutProductCard(obj) {
        // <div class="checkout-card">
        //     <div>
        //         <img class="checkout-product-img" src="/assets/default-product.png" />
        //     </div>
        //     <div>
        //         <h4>Product Title</h4>
        //         <p>x3</p>
        //         <p>Amount: Rs <span>30000</span></p>
        //     </div>
        // </div>

        var card = document.createElement('div');
        card.classList.add('checkout-card');

        var firstInnerDiv = document.createElement('div');
        var productImg = document.createElement('img');
        productImg.classList.add('checkout-product-img');
        productImg.src = obj.preview;
        firstInnerDiv.appendChild(productImg);

        var secondInnerDiv = document.createElement('div');
        var productName = document.createElement('h4');
        productName.innerHTML = obj.name;
        var productCount = document.createElement('p');
        productCount.innerHTML = 'x'+obj.count;
        var amountLabel = document.createElement('span');
        amountLabel.innerHTML = 'Amount: Rs ';
        var amountSpan = document.createElement('span');
        amountSpan.innerHTML = parseInt(obj.count) * parseInt(obj.price);
        var productAmount = document.createElement('p');
        productAmount.appendChild(amountLabel);
        productAmount.appendChild(amountSpan);
        secondInnerDiv.appendChild(productName);
        secondInnerDiv.appendChild(productCount);
        secondInnerDiv.appendChild(productAmount);

        card.appendChild(firstInnerDiv);
        card.appendChild(secondInnerDiv);

        return card;
    }

    var productList = window.localStorage.getItem('product-list');
    productList = productList === null || productList === '' ? [] : productList;
    productList = productList.length > 0 ? JSON.parse(productList) : [];

    // console.log(productList);
    var grandTotal = 0;
    for(var i=0; i<productList.length; i++) {
        $('#card-list').append(createCheckoutProductCard(productList[i]));
        // console.log('Count => ', productList[i].count);
        // console.log('Price => ', productList[i].price);

        var totalForCurrentProduct = parseFloat(productList[i].count) * parseFloat(productList[i].price);

        grandTotal = grandTotal + totalForCurrentProduct;

        // console.log('Total For Product '+ i + ' is=> ' + totalForCurrentProduct);
    }

    $('#item-count').html(productList.length);
    $('#total-amount').html(grandTotal);

    $('#btn-place-order').click(function() {

        var orderItemArr = [];
        for(var i=0; i<productList.length; i++) {
            var prodObj = {
                "id": productList[i].id,
                "brand": productList[i].brand,
                "name": productList[i].name,
                "price": productList[i].price,
                "preview": productList[i].preview,
                "isAccessory": productList[i].isAccessory
            }

            orderItemArr.push(prodObj);
        }

        // console.log(productList);
        // console.log(orderItemArr);

        var dataObj = {
            amount: grandTotal,
            products: orderItemArr
        }
        $.post('https://5d76bf96515d1a0014085cf9.mockapi.io/order', dataObj, function() {
            alert('Order Placed Successfully')
            localStorage.setItem('product-list', []);

            location.assign('./thankyou.html');
        })
    })
})