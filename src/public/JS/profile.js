      const btn = document.querySelector("button");
      const pass = document.querySelector(".pass")
      const confir = document.querySelector(".confirm")

      btn.addEventListener("click",()=>
      {
        const proId = window.location.href.split("/")[4]
        console.log(proId)
        fetch(`http://localhost:5000/resetpass/${proId}`, {
     
     method: "POST",
      
     body: JSON.stringify({
         password:pass.value,
         confirm:confir.value
     }),
      
     headers: {
         "Content-type": "application/json"
     }
 })
   .then()
   .then()
   .catch(error => console.error(error));
      })