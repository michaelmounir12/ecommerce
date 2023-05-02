const sub = document.querySelector("button");
const city = document.querySelector("#city");
const street = document.querySelector("#street");
const houseN = document.querySelector("#house-number")
const params = new URLSearchParams(window.location.search);

        sub.addEventListener("click",()=>
        {
             fetch("http://localhost:5000/checkout", {
     
    method: "POST",
     
    body: JSON.stringify({
        src:window.location.href.split("?")[1],
        address:{city:city.value,line1:street.value,line2:houseN.value},
        src: params.get("src"),
        p:params.get("p")

    }),
     
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})
  .then(response => response.json())
  .then(data =>window.location.href = data.url)
  .catch(error => console.error(error));
        })