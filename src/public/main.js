
const button  = document.querySelector("button");


let items = [
    
    {
       "ProductId":"64382cd4912525d1da078b4e",
       "quantity":2
   },
   
    {
       "ProductId":"64382cf4892f62f18412a58f",
       "quantity":2
   }
]

button.onclick = ()=>
{
    fetch("/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          items
        ),
      })
        .then(res => {
          if (res.ok) return res.json()
          return res.json().then(json => Promise.reject(json))
        })
        .then(({ url }) => {
          window.location = url
        })
        .catch(e => {
          console.error(e.error)
        })
}



