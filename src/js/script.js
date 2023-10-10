let cardSection = document.querySelector(".cards");
let cart = document.querySelector(".cart-item");
// localStorage.setItem("basket",JSON.stringify([]));

let price = 0, itemCount;


fetch('src/js/db.json')
.then(response => response.json())
.then(cavab => {
    let arr = cavab.products
    arr.forEach(element => {
        let newCard = ` <div class="card" data-set="${element.id}">
        <div class="img-section">
            <a href="#"><img src="${element.img}"/></a>
        </div> 
        <div class="about-section">
            <p>${element.Type}</p>
            <h3>${element.Name}</h3>
            <div class="name">By <a href="#"" >${element.Owner}</a></div>
            <div class="price">
                <div data-price="${element.price}">$${element.price}<span> <del>$32.8</del></span></div>
                <button onclick="addToCart(event)"><i class="fas fa-cart-shopping"></i>Add</button>
            </div>
        
        </div>

    </div>`

    cardSection.innerHTML += newCard


    });
})



function addToCart(item){
    if(localStorage.getItem("basket") === null){
        localStorage.setItem("basket",JSON.stringify([]))
    }

    let basket = JSON.parse(localStorage.getItem("basket"));
    let itemPrice = item.target.parentNode.firstChild.parentNode.children[0].getAttribute("data-price");
    price += parseFloat(itemPrice)
    let data_id = item.target.parentNode.parentNode.parentNode.getAttribute("data-set");
    let data_price = item.target.parentNode;
    // console.log(data_price)
    let exsist = basket.find(p => p.id == data_id);
    // let productCount = item.target.parentNode.parentNode.parentNode.getAttribute("data-set");
    if(exsist){
        exsist.count++
    }else{
        basket.push({
            id: data_id,
            count:1
        })
 
    }
    
if(basket){
    cart.classList.add("selected-item")
    cart.innerText = basket.length
}
else{
    cart.classList.remove("selected-item")
}

    localStorage.setItem("basket",JSON.stringify(basket));
    console.log(basket)
}

// let basket = JSON.parse(localStorage.getItem("basket"));

// if(basket){
//     cart.classList.add("selected-item")
//     cart.innerText += basket.length
// }
// else{
//     cart.classList.remove("selected-item")
// }

