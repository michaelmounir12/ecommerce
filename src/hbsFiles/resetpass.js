
const email  = document.querySelector(".e").textContent.split(":")[1]
const p = document.querySelector("p");
const btn = document.querySelector(".resendbtn");

const url = 'https://ecommerce-new.onrender.com/resendCode';


btn.addEventListener("click",()=>
{
    fetch(url, {
     
    method: "POST",
     
    body: JSON.stringify({
        email:email
    }),
     
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})
  .then(response => response.json())
  .then(data =>p.textContent = data.message)
  .catch(error => console.error(error));
});

