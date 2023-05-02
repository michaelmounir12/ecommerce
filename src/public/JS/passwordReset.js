const btn = document.querySelector("button");
       const p = document.querySelector("p");
       const email = document.querySelector("input");
       const url = "http://localhost:5000/forgotpassword";
       btn.addEventListener("click",()=>
       {
        fetch(url, {
     
     method: "POST",
      
     body: JSON.stringify({
         email:email.value
     }),
      
     headers: {
         "Content-type": "application/json"
     }
 })
   .then(response => response.json())
   .then(data =>p.textContent = data.message)
   .catch(error => console.error(error));
       })