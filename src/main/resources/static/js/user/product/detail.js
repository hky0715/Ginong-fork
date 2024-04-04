/*모바일 버전 구매정보 수량증감*/
window.addEventListener("load", function(){

    /*orderInfo section*/
    var orderInfo = this.document.querySelector("#order-info");

    /*증감버튼영역*/
    var numberBox = orderInfo.querySelector(".numberBox");
    var quantityInput = numberBox.querySelector(".quantity-input");

    /*구매총합영역*/
    var total = this.document.querySelector(".total");

    //총 수량
    var totalQuantity = total.querySelector(".total-quantity");

    //상품 가격
    var productPriceValue= this.document.querySelector(".product-price").value;
    var productPrice = parseInt(productPriceValue);

    //총 금액
    var totalPrice = total.querySelector(".total-price");
    var totalPriceInput = total.querySelector(".total-price-input");

    /*증감버튼 계산*/
    numberBox.onclick = function (e) {

        e.preventDefault();

        if(e.target.tagName!='A')
            return;

        //수량 -> int
        var quantity = parseInt(quantityInput.value);

        //클릭한 버튼 구별
        var state = e.target.dataset.btn;

        switch (state) {
            case 'minus' :
                if(quantity==1)
                    return;
                quantityInput.value = quantity-1;
                break;
            case 'plus' :
                if(quantity==10) //최대 재고수량까지(나중에 재고값 가져오기)
                    return;
                quantityInput.value = quantity+1;
                break;
        }

        //총 수량
        totalQuantity.innerText = quantityInput.value;

        // 총금액(수량*상품가격)
        var totalSum = quantityInput.value * productPrice;
        totalPrice.innerText=totalSum.toLocaleString('ko-KR')+"원";
        totalPriceInput.value=totalSum;

    }

});

/* 모바일 버전 하단 navi */
window.addEventListener("load", function(){

    var orderInfo = this.document.querySelector("#order-info");

    //popup close
    var close = orderInfo.getElementsByClassName("close")[0];

    //popup open
    var navi = this.document.querySelector(".navi");

    navi.onclick = function(e){
        if(e.target.tagName!='BUTTON')
            return;

        if(!orderInfo.classList.contains("on")){
            orderInfo.classList.remove("d:none");
            orderInfo.classList.add("on");
        }else{
            var state = e.target.dataset.btn;

            switch (state) {
                case 'cart' :
                    break;
                case 'order' :
                    var url = new URL ("/user/order/info", location.origin);

                    var productId = navi.querySelector(".product-id").value;
                    var numberBox = orderInfo.querySelector(".numberBox");
                    var quantityInput = numberBox.querySelector(".quantity-input").value;
                    var quantity = parseInt(quantityInput);

                    url = url + "?productId=" + productId
                              + "&quantity=" + quantity;

                    console.log(url);

                    location.href = url.toString();

                    // fetch('/user/order/info',{
                    //     method:'POST',
                    //     headers: {
                    //         'Content-Type': 'application/json',
                    //     },
                    //     body: JSON.stringify(params),
                    //     redirect:'manual'
                    // });

                    break;
            }
        }

    }

    //popup close
    close.onclick = function(){
        orderInfo.classList.add("d:none");
        orderInfo.classList.remove("on");
    }



});


// 살려줘요
// window.addEventListener("load", function() {
//     var orderInfo = this.document.querySelector("#l-order-info");
//     var purchase = document.querySelector("#purchase");
//
//     purchase.onclick = function (e){
//         if(e.target.tagName != 'BUTTON')
//             return;
//
//
//             case 'cart':
//                 console.log("카트에 상품을 추가합니다.");
//                 break;
//
//             case 'order':
//                 var url = new URL("/user/order/info",location.origin);
//
//                 var productId =  여기 뭐주면 좋을까요.querySelector(".l-product-id").value;
//                 var numberBox = orderInfo.querySelector(".l-numberBox");
//                 var quantityInput = numberBox.querySelector(".l-quantity-input").value;
//                 var quantity = parseInt(quantityInput);
//
//                 url.searchParams.append("productId", productId);
//                 url.searchParams.append("quantity", quantity);
//
//
//                 console.log(url.href);
//
//                 break;
//         }
//
//     }
//
// });

// 구매하기 및 장바구니 PC 버전
window.addEventListener("load", function() {
    var payBox = document.querySelector(".l-pay-box");
    var orderBtn = payBox.querySelector(".l-order");
    var cartBtn = payBox.querySelector(".l-cart");
    var productId = payBox.querySelector(".l-product-id").value;

    var quantityInput =this.document.getElementsByClassName("l-quantity-input")[0];

    orderBtn.onclick = function (){

        var quantity = parseInt(quantityInput.value);

        var url = new URL ("/user/order/info", location.origin);

        url = url + "?productId=" + productId + "&quantity=" + quantity;

        location.href = url.toString();
    };

});


/* pc버전 구매정보 수량증감*/
window.addEventListener("load", function(){

    /* l-order-info section */
    var orderInfo = this.document.querySelector("#l-order-info");

    /*증감버튼영역*/
    var numberBox = orderInfo.querySelector(".l-numberBox");
    var quantityInput = numberBox.querySelector(".l-quantity-input");

    /*구매총합영역*/
    var total = orderInfo.querySelector(".l-total");

    //총 수량
    var totalQuantity = total.querySelector(".l-total-quantity");

    //상품 가격
    var productPriceValue= this.document.querySelector(".l-price").value;
    var productPrice = parseInt(productPriceValue);

    //총 금액
    var totalPrice = total.querySelector(".l-total-price");
    var totalPriceInput = total.querySelector(".l-total-price-input");

    numberBox.onclick = function (e) {

        e.preventDefault();

        if(e.target.tagName!='A')
            return;

        //수량 -> int
        var quantity = parseInt(quantityInput.value);

        //클릭한 버튼 구별
        var state = e.target.dataset.btn;

        switch (state) {
            case 'minus' :
                if(quantity==1)
                    return;
                quantityInput.value = quantity-1;
                break;
            case 'plus' :
                if(quantity==10) //최대 재고수량까지(나중에 재고값 가져오기)
                    return;
                quantityInput.value = quantity+1;
                break;
        }

        //총 수량
        totalQuantity.innerText = quantityInput.value;

        // 총금액(수량*상품가격)
        var totalSum = quantityInput.value * productPrice;
        totalPrice.innerText=totalSum.toLocaleString('ko-KR')+"원";
        totalPriceInput.value=totalSum;

    }

});

// ===================================================================================================

/* pc 버전 하단 navi */
window.addEventListener("load", function(){

    var orderInfo = this.document.querySelector("#order-info");

    //popup close
    var close = orderInfo.getElementsByClassName("close")[0];

    //popup open
    var navi = this.document.querySelector(".navi");

    navi.onclick = function(e){
        if(e.target.tagName!='BUTTON')
            return;

        if(!orderInfo.classList.contains("on")){
            orderInfo.classList.remove("d:none");
            orderInfo.classList.add("on");
        }else{
            var state = e.target.dataset.btn;

            switch (state) {
                case 'cart' :
                    break;
                case 'order' :
                    var url = new URL ("/user/order/info", location.origin);

                    var productId = navi.querySelector(".product-id").value;
                    var numberBox = orderInfo.querySelector(".numberBox");
                    var quantityInput = numberBox.querySelector(".quantity-input").value;
                    var quantity = parseInt(quantityInput);

                    url = url + "?productId=" + productId
                        + "&quantity=" + quantity;

                    console.log(url);

                    location.href = url.toString();

                    // fetch('/user/order/info',{
                    //     method:'POST',
                    //     headers: {
                    //         'Content-Type': 'application/json',
                    //     },
                    //     body: JSON.stringify(params),
                    //     redirect:'manual'
                    // });

                    break;
            }
        }

    }

    //popup close
    close.onclick = function(){
        orderInfo.classList.add("d:none");
        orderInfo.classList.remove("on");
    }



});




//찜 눌렀을때
window.addEventListener("load", function(e){

    e.preventDefault();

    var payBox = this.document.querySelector('.pay-box');
    var icon = payBox.querySelector('.icon');

    icon.onclick = function(){

        var isClick = icon.classList.contains('icon:heart_fill')

        if(!isClick)
            icon.classList.replace('icon:heart','icon:heart_fill');
        else
            icon.classList.replace('icon:heart_fill','icon:heart');
    }

});

// 탭바 클릭 시 해당 정보만 출력
window.addEventListener("load", function () {
    var tabbar = document.querySelector("#tabbar");
    var mInfoSection = document.querySelector(".m-info");
    var mReviewSection = document.querySelector(".m-review");
    var pcReviewSection = document.querySelector(".pc-review");
    var mQnaSection = document.querySelector(".m-qna");
    var pcQnaSection = document.querySelector(".pc-qna");

    tabbar.onclick = function (e) {
        var tabLinks = tabbar.querySelectorAll("a");

        if(e.target.tagName != 'A')
            return

        e.preventDefault();

        tabLinks.forEach(function (tabLink) {
            tabLink.classList.remove("bd-bottom");
            tabLink.classList.remove("bd-color:main-6");
        });

        e.target.classList.add("bd-bottom");
        e.target.classList.add("bd-color:main-6");


        if (e.target.innerText == '상품정보') {
            console.log('상품정보 출력');

            mInfoSection.classList.remove("d:none");

            mReviewSection.classList.add("d:none");
            pcReviewSection.classList.add("md:d:none");
            mQnaSection.classList.add("d:none");
            pcQnaSection.classList.add("md:d:none");


        } else if(e.target.innerText == '후기') {
            console.log('후기 정보 출력');

            mReviewSection.classList.remove("d:none");
            pcReviewSection.classList.remove("md:d:none");

            mInfoSection.classList.add("d:none");
            mQnaSection.classList.add("d:none");
            pcQnaSection.classList.add("md:d:none");


        } else {
            console.log('QNA 정보 출력');

            mQnaSection.classList.remove("d:none");
            pcQnaSection.classList.remove("md:d:none");

            mReviewSection.classList.add("d:none");
            pcReviewSection.classList.add("md:d:none");
            mInfoSection.classList.add("d:none");
            // pcInfoSection.classList.add("md:d:none");


        }


    }

});