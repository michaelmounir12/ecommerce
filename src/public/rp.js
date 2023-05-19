const btn = document.querySelector("button");
      const pass = document.querySelector("#new-password")
      btn.addEventListener("click",()=>
      {
        console.log(window.location.href)
           fetch(window.location.href, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ 
   password:pass.value
  })
})
.then(data => window.location.href = "https://ecommerce-azxx.onrender.com/login")
.catch(error => console.error(error));
      })