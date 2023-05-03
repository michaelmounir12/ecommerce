// add hovered class to selected list item
let list = document.querySelectorAll(".navigation li");
const Dash = document.querySelector(".Dash");
const addProduct = document.querySelector(".addProduct");
const mainContent = document.querySelector(".main-content");
const signout = document.querySelector(".signOut");


fetch('/HTML/dash.html')
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
  fetch('/HTML/dash.html')
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
  fetch('/HTML/addProduct.html')
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