console.log("Bismillah");

const elpasInput =document.querySelector(".js-pasword")
const elEmailInput =document.querySelector(".js-email")
const elpasbtn =document.querySelector(".js-eye")
const elform =document.querySelector(".js-form")

// http://192.168.5.242:5000/user/login
// email: input.value
// password: input.value
const LocalData = localStorage.getItem("token")
// console.log(LocalData);
if (!LocalData) {
    location.replace("registir.html")
}
// elLogOutBtn.addEventListener("click", function (evt) {
//     evt.preventDefault()
//     localStorage.removeItem("token")
//     location.reload()
// })

elform.addEventListener("submit", (evt) => {
    evt.preventDefault();
    console.dir(elEmailInput.value);
    console.log();
    fetch("http://192.168.5.242:5000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email:elEmailInput.value,
        password:elpasInput.value
    }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if(data.token){
  localStorage.setItem("token",data.token)
  location.replace("index.html")
        };
      })
      .catch((err) => console.log(err));
  });



elpasbtn.addEventListener("click",(evt)=>{
    evt.preventDefault()
    if (elpasInput.type === "password") {
        elpasInput.type ="text"
    }else{
        elpasInput.type ="password"
    }
    console.dir(elpasInput);
    // console.log(evt);
})
const elBody =document.querySelector('body')
const elText =document.querySelectorAll('.h1')
console.log(elText);
let color;
setInterval(()=>{
    const random = Math.floor(Math.random() * 200) + 1
    color =random + 36
    elBody.style.backgroundColor = 'hsl('+ random +',55%,50%)'
    elText[0].style.color = 'hsl('+ color +',25%,50%)'

},4000)
