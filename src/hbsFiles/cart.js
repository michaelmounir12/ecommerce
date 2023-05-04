const body = document.querySelector("tbody");
const total = document.querySelector(".total-price");
const price = document.createElement("span");
const probtn = document.querySelector("button");
total.appendChild(price)






let proArr = []
function createPro(product)
{
    const pro = document.createElement("tr");
    const title = document.createElement("td");
    const status = document.createElement("td");
    const image = document.createElement("td");
    const quantity = document.createElement("td");
    const price = document.createElement("td");
    const tdBtn = document.createElement("td");
    const deletebtn = document.createElement("button");
    const img = document.createElement("img");
    const select = document.createElement("select");

    deletebtn.textContent = "Delete";



    pro.id = product.pId;
    proArr.push(product.pId);


    pro.appendChild(title);
    pro.appendChild(image);
    pro.appendChild(status);
    pro.appendChild(quantity);
    pro.appendChild(price);
    pro.appendChild(tdBtn);
   
    title.textContent = product.title;
    status.textContent = product.status ? "in Stock":"out of Stock";
    price.textContent = `${product.price} EGP`;

    image.appendChild(img);
    img.src = product.img;
    img.alt = product.title;

     
    tdBtn.appendChild(deletebtn);

    quantity.appendChild(select);
    for(let i = 0;i<product.totalQuantity;i++)
    {
        const opt = document.createElement("option");
        opt.value = i+1
        opt.textContent = i+1;
        select.appendChild(opt)
    }
    select.selectedIndex = product.quantity - 1



    select.addEventListener("change",(e)=>
        {

          fetch("https://ecommerce-new.onrender.com:5000/cart", {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({qt:e.target.value,proID:pro.id})
          })
          .then(response => response.json())
          .then(data => {
            // console.log('Success:', data);
          })
          .catch((error) => {
            // console.error('Error:', error);
          });
          location.reload()
        })

        deletebtn.addEventListener("click",()=>
        {
          fetch("https://ecommerce-new.onrender.com:5000/cart", {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({dele:true,proID:pro.id})
          })
          .then(response => response.json())
          .then(data => {
            // console.log('Success:', data);
          })
          .catch((error) => {
            // console.error('Error:', error);
          });
          location.reload()
        })
   body.appendChild(pro);
   



}

const url = "https://ecommerce-new.onrender.com/cartproducts"

fetch(url, {
     
    method: "GET",
     
    
})
  .then(response =>  response.json())
  .then(data =>{
    data.products.forEach(element => {
     createPro(element)
  }
  
  )
  price.textContent =  `${data.totalPrice} EGP`;
  probtn.addEventListener("click",()=>{window.location.href = `/address?src=cart`})
})

