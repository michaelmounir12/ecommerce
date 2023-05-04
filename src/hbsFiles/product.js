

const img = document.querySelector("img");
const title = document.querySelector(".product-title");
const desc = document.querySelector(".product-description");
const price = document.querySelector(".product-price");
const stars = document.querySelector(".product-rating-stars");
const countRate = document.querySelector(".product-rating-count");
const revList = document.querySelector(".review-list");
const cont = document.querySelector(".product-container")


let proId = cont.id
const url = `https://ecommerce-new.onrender.com/productCred/${proId}`;




function addPro(pro)
{
    


    img.src = pro.image;
    title.textContent = pro.title;
    desc.textContent = pro.desc;
    price.textContent = `${pro.price} EGP`;

    if(pro.rating === 1)
    {
        stars.textContent = "★☆☆☆☆"
    }
   else if(pro.rating === 2)
    {
        stars.textContent = "★★☆☆☆"
    }
   else if(pro.rating === 3)
    {
        stars.textContent = "★★★☆☆"
    }
  else  if(pro.rating === 4)
    {
        stars.textContent = "★★★★☆"
    }
   else if(pro.rating === 5)
    {
        stars.textContent = "★★★★★"
    }
    else
    {
        stars.textContent = "☆☆☆☆☆"
    }
    countRate.textContent = `(${pro.numofreviews})`

   pro.reviews.forEach((ele)=>
   {
    const revItem = document.createElement("li");
    revItem.classList.add("review-item");
    const revAuth = document.createElement("div");
    revAuth.classList.add("review-author");
    const revRate = document.createElement("div");
    revRate.classList.add("review-rating");
    const revText = document.createElement("div");
    revText.classList.add("review-text"); 
    revItem.append(revAuth);
    revItem.append(revRate);
    revItem.append(revText);
    revAuth.textContent = ele.name;
    
    if(ele.rating === 1)
    {
        revRate.textContent = "★☆☆☆☆"
    }
   else if(ele.rating === 2)
    {
        revRate.textContent = "★★☆☆☆"
    }
   else if(ele.rating === 3)
    {
        revRate.textContent = "★★★☆☆"
    }
  else  if(ele.rating === 4)
    {
        revRate.textContent = "★★★★☆"
    }
   else if(ele.rating === 5)
    {
        revRate.textContent = "★★★★★"
    }
  
    
    revText.textContent = ele.comment;
    revList.append(revItem);


      
   })

    
}


fetch(url, {
     
    method: "GET",
     
  
})
.then(response => response.json())
.then(data =>addPro(data.pro))
.catch(error => console.error(error));