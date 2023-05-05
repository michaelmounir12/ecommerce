const body = document.querySelector("tbody");






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

    btn.textContent = "cancel";

  tdBtn.appendChild(btn);

    pro.id = order.product.id;


    pro.appendChild(title);
    pro.appendChild(image);
    pro.appendChild(status);
    pro.appendChild(quantity);
    pro.appendChild(price);
    pro.appendChild(tdBtn);
   
    title.textContent = order.product.title;
    status.textContent = order.status;
    price.textContent = order.product.total;

    image.appendChild(img);
    img.src = order.product.img;
    img.alt = order.product.title;

     

    quantity.textContent = order.product.quantity
   



}

fetch("https://ecommerce-new.onrender.com/getorders", {
     
method: "GET",
 


})
.then(response => response.json())
.then(data =>data.forEach(element => {
  createOrder(element)  
}))
.catch(error => console.error(error));