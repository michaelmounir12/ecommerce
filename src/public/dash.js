const url = "https://ecommerce-azxx.onrender.com";

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