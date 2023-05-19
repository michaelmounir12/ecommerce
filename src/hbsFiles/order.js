const body = document.querySelector("tbody");


const url =" https://ecommerce-azxx.onrender.com"



function createOrder(order)
{
    const pro = document.createElement("tr");
    const title = document.createElement("td");
    const status = document.createElement("td");
    const image = document.createElement("td");
    const quantity = document.createElement("td");
    const price = document.createElement("td");
    const img = document.createElement("img");
    const btn = document.createElement('button');
    const tdBtn = document.createElement('td');
    pro.id = order.id;

    btn.textContent = "cancel";
    btn.addEventListener("click",()=>
    {
      fetch(`${url}/cancelorder`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id:pro.id})
      })
      .then(response => {
        if(response.ok) {
          tdBtn.innerHTML = "<p>we'll try our best to cancel your order</p>";
        }
        throw new Error('Network response was not ok.');
      })
    
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
    })
    if(order.status === "pending")
    {
        tdBtn.appendChild(btn);

    }else
    {
      tdBtn.innerHTML = "<p>we'll try our best to cancel your order</p>";
    }



    pro.appendChild(title);
    pro.appendChild(image);
    pro.appendChild(status);
    pro.appendChild(quantity);
    pro.appendChild(price);
    pro.appendChild(tdBtn);
   
    title.textContent = order.product.title;
    status.textContent = order.status;
    price.textContent = order.product.price;

    image.appendChild(img);
    img.src = order.product.img;
    img.alt = order.product.title;

     

    quantity.textContent = order.product.quantity
   
    body.appendChild(pro)


}

fetch(`${url}/getorders`, {
     
method: "GET",
 


})
.then(response => response.json())
.then(data =>{
  console.log(data)
  if(!data) {body.textContent = "No products yet"}
  data.orders.forEach(element => {
  createOrder(element) 
})})
.catch(error => console.error(error));