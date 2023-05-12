// add hovered class to selected list item
let list = document.querySelectorAll(".navigation li");
const Dash = document.querySelector(".Dash");
const addProduct = document.querySelector(".addProduct");
const mainContent = document.querySelector(".main-content");
const signout = document.querySelector(".signOut");




const url = "https://ecommerce-new.onrender.com";

const numofsales = document.querySelector("#sales");
const earning = document.querySelector("#earn");
const tbody = document.querySelector("tbody");
const table = document.querySelector("table");

function createSale(order)
{

     const tr = document.createElement("tr")
     const name = document.createElement("td")
     const price = document.createElement("td")
     const payStatus = document.createElement("td")
     const delStatus = document.createElement("td")
     const span = document.createElement("span")

     name.textContent = order.name;
     price.textContent = order.price;
     payStatus.textContent = order.payStatus;
     span.classList.add("status",order.delStatus)
     span.textContent  = order.delStatus;
     delStatus.appendChild(span);

     tr.appendChild(name)
     tr.appendChild(price)
     tr.appendChild(payStatus)
     tr.appendChild(delStatus)

     tbody.appendChild(tr);

}

function createCustomer(customer)
{

const tr = document.createElement("tr")
const td = document.createElement("td")
const h4 = document.createElement("h4")
h4.innerHTML = `${customer.name} <br> <span>${customer.country}</span>`
td.appendChild(h4)
tr.appendChild(td)
table.appendChild(tr)

       
}

fetch(`${url}/dash`)
  .then(response => {
    if (response.ok) {
      return response.json(); // or response.text() for plain text response
    }
    throw new Error('Network response was not ok.');
  })
  .then(data => {
    numofsales.textContent = data.numofsales;
    earning.textContent = data.earning;
    data.customers.forEach((ele)=>
    {
       createCustomer(ele);
    })
    data.products.forEach((ele)=>
    {
       createSale(ele);
    })


  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });



fetch('/dash.html')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text();
  })
  .then(html => {
    // Use the HTML content here
      mainContent.innerHTML = html;
  })
  .catch(error => {
    console.error('There was a problem fetching the HTML:', error);
  });


function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));

// Menu Toggle
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};




Dash.addEventListener("click",()=>
{
  fetch('/dash.html')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text();
  })
  .then(html => {
    // Use the HTML content here
      mainContent.innerHTML = html;
  })
  .catch(error => {
    console.error('There was a problem fetching the HTML:', error);
  });
  
})
addProduct.addEventListener("click",()=>
{
  fetch('/addProduct.html')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text();
  })
  .then(html => {
    // Use the HTML content here
      mainContent.innerHTML = html;
      const sub = document.querySelector(".sub");
      const price = document.querySelector("#price");
      const desc = document.querySelector("#description");
      const image = document.querySelector("#image_url");
      const title = document.querySelector("#title");
      const quantity = document.querySelector("#quantity");
      const category = document.querySelector("#category");

      
      
      
      const url = "/products";
      
      
      sub.addEventListener("click",()=>
      {
      
          fetch(url, {
           
              method: "POST",
               
              body: JSON.stringify({
                  description:desc.value,
                  title:title.value,
                  price:price.value,
                  category:category.value,
                  image_url:image.value,
                  quantity:quantity.value,
      
              }),
               
              headers: {
                  "Content-type": "application/json"
              }
          })
            .then(response => response.json())
            .then(data =>console.log(data))
            .catch(error => console.error(error));
      
      })
      
  })
  .catch(error => {
    console.error('There was a problem fetching the HTML:', error);
  });
  
})


signout.addEventListener("click",async()=>
{
  await fetch("/signout")
})