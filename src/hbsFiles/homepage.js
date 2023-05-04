const products = document.querySelector(".products");
const profile = document.querySelector(".account-link")
const dropDown = document.querySelector(".dropdown-content")
profile.addEventListener("click",()=>
{
    dropDown.classList.toggle("appear");
})



function createProduct(product)
{
    const productdiv = document.createElement("div");
    const img = document.createElement("img");
    const h2 = document.createElement("h2");
    const pricediv = document.createElement("div");
    const rating = document.createElement("div");
    const revnum = document.createElement("p");
    const buybtn = document.createElement("button");
    const cartbtn = document.createElement("button");
    const span1 = document.createElement("span");
    const span2 = document.createElement("span");
    const span3 = document.createElement("span");
    const span4 = document.createElement("span");
    const span5 = document.createElement("span");
    productdiv.appendChild(img);
    productdiv.appendChild(h2);
    productdiv.appendChild(pricediv);
    productdiv.appendChild(rating);
    productdiv.appendChild(revnum);
    productdiv.appendChild(buybtn);
    productdiv.appendChild(cartbtn);

    productdiv.id = product._id;

    rating.appendChild(span1);
    rating.appendChild(span2);
    rating.appendChild(span3);
    rating.appendChild(span4);
    rating.appendChild(span5);


    productdiv.classList.add("product");
    img.src = product.image;
    img.alt = product.title;
    pricediv.classList.add("price");
    rating.classList.add("rating");
    revnum.classList.add("reviews");
    buybtn.classList.add("btn");
    buybtn.classList.add("buy-btn");
    cartbtn.classList.add("btn");
    cartbtn.classList.add("cart-btn");
    span1.classList.add("fa");
    span1.classList.add("fa-star");
    span2.classList.add("fa")
    span2.classList.add("fa-star")
    span3.classList.add("fa")
    span3.classList.add("fa-star")
    span4.classList.add("fa")
    span4.classList.add("fa-star")
    span5.classList.add("fa")
    span5.classList.add("fa-star")

    h2.textContent = product.title;
    pricediv.textContent = `${product.price} Egp`;
    revnum.textContent = product.numofreviews?`${product.numofreviews} reviews`:"no reviews yet";
    buybtn.textContent = "Buy Now";
    cartbtn.textContent = "Add to Cart";


    if(product.rating == 1) 
    {span1.style.color = "orange"}
    else if(product.rating == 2){span1.style.color = "orange"
    span2.style.color = "orange"}
    else if(product.rating == 3){
        span1.style.color = "orange"
        span2.style.color = "orange"
        span3.style.color = "orange"
    }
    else if(product.rating == 4){
        span1.style.color = "orange"
        span2.style.color = "orange"
        span3.style.color = "orange"
        span4.style.color = "orange"
    }
    else if(product.rating == 5){
        span1.style.color = "orange"
        span2.style.color = "orange"
        span3.style.color = "orange"
        span4.style.color = "orange"
        span5.style.color = "orange"
    }

    cartbtn.addEventListener("click",()=>{
        fetch(`https://ecommerce-new.onrender.com/cart`,{
            method:"POST",
            body: JSON.stringify({
                pId:productdiv.id
            }),
             
            headers: {
                "Content-type": "application/json"
            }
        }).then(res=>res.json()).then()
    })

    buybtn.addEventListener("click",()=>{window.location.href = `/address?src=buynow&p=${productdiv.id}`})
    img.addEventListener("click",()=>{
        window.location.href = `/product/${productdiv.id}`
    })
    products.appendChild(productdiv);



}

const url = 'https://ecommerce-new.onrender.com/getproducts';


window.addEventListener("load",()=>
{
    fetch(url, {
     
        method: "GET",
      
    })
      .then(response => response.json())
      .then(data =>data.forEach((ele)=>
      {
          createProduct(ele)
      })  )
      .catch(error => console.error(error));
})


