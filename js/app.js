let inputTodo = document.querySelector('.form-control')
let btnAdd = document.querySelector('#addButton')
let listTodo = document.querySelector('#todoList')
let clearButton = document.querySelector('#clearButton')
// let btnComplet = document.querySelecttorAll('.uncompleted')

let ArrayTodo = []
function addTodo() {
    let valueInput = inputTodo.value.trim()
    if (valueInput === '') {
        alert('pleas enter todo!!!')
    } else {

        let itemTodoObj = {
            id: ArrayTodo.length + 1,
            title: valueInput,
            complete: false
        }
        ArrayTodo.push(itemTodoObj)
        savaLocalStorage(ArrayTodo)
        todoGenerator(ArrayTodo)

        inputTodo.focus()
    }
}

function savaLocalStorage(itemTodo) {
    localStorage.setItem('Todos', JSON.stringify(itemTodo))
}

function todoGenerator(itemTodo) {
    listTodo.innerHTML = ''
    itemTodo.forEach(function (todo) {
        let creatElemLi = document.createElement('li')
        let creatElemLabale = document.createElement('label')
        let creatElemBtnComp = document.createElement('button')
        let creatElemBtnDel = document.createElement('button')
        creatElemLabale.innerHTML = todo.title
        creatElemLi.append(creatElemLabale, creatElemBtnComp, creatElemBtnDel)
        creatElemLi.classList.add('completed', 'well')
        creatElemBtnComp.classList.add('btn', 'btn-success')
        creatElemBtnComp.innerHTML = 'Complete'
        creatElemBtnDel.classList.add('btn', 'btn-danger')
        creatElemBtnDel.innerHTML = 'Delete'
        listTodo.append(creatElemLi)
        creatElemBtnDel.setAttribute('onclick', 'removeTodo(' + todo.id + ')')
        creatElemBtnComp.setAttribute('onclick', 'edieStatus(' + todo.id + ')')

        if (todo.complete) {
            creatElemLi.classList.add('uncompleted', 'well')
            creatElemBtnComp.innerHTML = 'unComplete'
        }
    })
}
function removeTodo(todoid) {
    let getLocalStorage = JSON.parse(localStorage.getItem('Todos'))
    ArrayTodo = getLocalStorage
    let indexTodo = ArrayTodo.findIndex(function (todo) {
        return todoid === todo.id
    })
    ArrayTodo.splice(indexTodo, 1)
    savaLocalStorage(ArrayTodo)
    todoGenerator(ArrayTodo)
}
function edieStatus(todoid) {
    let getLocalStorage = JSON.parse(localStorage.getItem('Todos'))
    ArrayTodo = getLocalStorage
    ArrayTodo.forEach(function (todo) {
        if (todo.id == todoid)
            todo.complete = !todo.complete
    })
    savaLocalStorage(ArrayTodo)
    todoGenerator(ArrayTodo)
}
function parseTodo() {
    let getTodo = JSON.parse(localStorage.getItem('Todos'))
    if (getTodo) {
        ArrayTodo = getTodo
    } else {
        ArrayTodo = []
    }
    todoGenerator(ArrayTodo)
}
function delListTodo() {
    ArrayTodo = []
    todoGenerator(ArrayTodo)
    localStorage.removeItem('Todos')
}
window.addEventListener('load', parseTodo)
btnAdd.addEventListener('click', addTodo)
clearButton.addEventListener('click', delListTodo)
inputTodo.addEventListener('keydown', function (event) {
    if (event.code === 'Enter') {
        addTodo()
    }
})