const elLogOutBtn = document.querySelector(".js-logout")
const elForm = document.querySelector(".js-form")
const elList = document.querySelector(".js-list")
const elInput = document.querySelector(".js-input")


const LocalData = localStorage.getItem("token")
// console.log(LocalData);
if (!LocalData) {
    location.replace("login.html")
}
elLogOutBtn.addEventListener("click", function (evt) {
    evt.preventDefault()
    localStorage.removeItem("token")
    location.reload()
})
// Todo larni domga chizish uchun ==========
const renderTodo =(arr,node) =>{
node.innerHTML =""
arr.forEach(todo => {
    node.innerHTML += `
    <li class=" text-center d-flex justify-content-between list-group-item">
    <span> ${todo.todo_value} </span>
    <div class="d-flex gap-2">
    <button data-todo-id=${todo.id} class="btn btn-warning todo-edit btn-sm">EDIT</button>
    <button data-todo-id=${todo.id} class="btn btn-danger todo-delate btn-sm">DELATE</button>
    </div>
    </li>`
});
}
// todolarni bacenddan get(olish) uchun func
async function getTodos() {
    const res = await fetch("http://192.168.5.242:5000/todo", {
        headers: {
            Authorization: LocalData,
        },
    })
    const data = await res.json()
    console.log(data);
    renderTodo(data,elList)
}
getTodos()
// Todo larni domga chizish uchun ==========
elForm.addEventListener("submit", (evt) => {
    evt.preventDefault()
    console.log(elInput.value);
    // console.log(evt);
    fetch("http://192.168.5.242:5000/todo", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            Authorization: LocalData,
        },
        body: JSON.stringify({
            text: elInput.value,
        }),
    }).then(res => res.json()
    .then(data => {
        if(data){
            getTodos()
        }
    }))
    .catch(err => console.log(err))
})
// // Todo larni delete qilish uchun ==========
const delataTodo =(id)=>{
    fetch(`http://192.168.5.242:5000/todo/${id}`,{
        method:"DELETE",
        headers:{
            Authorization: LocalData, 
        },
    }).then((res) => res.json())
    .then((data) => {
        if(data){
            getTodos()
        }
    })
    .catch((err) => console.log(err))
}
// // Todo larni edit qilish uchun ==========

const editTodo =(id) =>{
    const newText =prompt("Yangi todo ni kiriting")
    fetch(`http://192.168.5.242:5000/todo/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            Authorization: LocalData, 
        },
        body:JSON.stringify({
            text:newText,
        })
    }).then((res)=> res.json()).then((data) => {
        if(data){
            getTodos()
        };
    }).catch((err) => console.log(err))
 
}

elList.addEventListener("click",(evt)=>{
if(evt.target.matches(".todo-delate")){
    const todoId = evt.target.dataset.todoId;
delataTodo(todoId)
};
if(evt.target.matches(".todo-edit")){
    const todoId = evt.target.dataset.todoId;
editTodo(todoId)

}
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

},5000)

