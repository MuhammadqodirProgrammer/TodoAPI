const elform = document.querySelector(".js-form");
const elNameInput = document.querySelector(".js-name");
const elEmailInput = document.querySelector(".js-email");
const elPhoneInput = document.querySelector(".js-phone");
const elPasInput = document.querySelector(".js-password");
// 192.168.5.242
elform.addEventListener("submit", (evt) => {
  evt.preventDefault();
  fetch("http://192.168.5.242:5000/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_name: elNameInput.value,
      phone: elPhoneInput.value,
      email: elEmailInput.value,
      password: elPasInput.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if(data.token){
localStorage.setItem("token",data.token)
location.replace("login.html")
      };
    })
    .catch((err) => console.log(err));
});

// Eye ===========================
 const elpasbtn =document.querySelector(".js-eye")
 
 elpasbtn.addEventListener("click",(evt)=>{
     evt.preventDefault()
     if (elPasInput.type === "password") {
         elPasInput.type ="text"
     }else{
         elPasInput.type ="password"
     }
     console.dir(elPasInput);
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


