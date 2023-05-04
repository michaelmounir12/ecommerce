const body = document.querySelector("tbody");






function createOrder(order)
{
    const pro = document.createElement("tr");
    const title = document.createElement("td");
    const status = document.createElement("td");
    const image = document.createElement("td");
    const quantity = document.createElement("td");
    const price = document.createElement("td");
    const cancelbtn = document.createElement("button");
    const img = document.createElement("img");
    const tdBtn = document.createElement("td");
    cancelbtn.textContent = "Delete";



    pro.id = order.pId;


    pro.appendChild(title);
    pro.appendChild(image);
    pro.appendChild(status);
    pro.appendChild(quantity);
    pro.appendChild(price);
    pro.appendChild(tdBtn);
   
    title.textContent = order.title;
    status.textContent = order.status;
    price.textContent = order.total;

    image.appendChild(img);
    img.src = order.img;
    img.alt = order.title;

     
    tdBtn.appendChild(cancelbtn);

    quantity.textContent = order.quantity
   



}