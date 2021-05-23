const counter = document.getElementById('counter')
const minus = document.getElementById('minus')
const plus = document.getElementById('plus')
const heart = document.getElementById('heart')
const pause = document.getElementById('pause')
const likes = document.querySelector('.likes')
const comments = document.getElementById('list')
const commentForm = document.getElementById('comment-form')
const commentInput = document.getElementById('comment-input')
const submit = document.getElementById('submit')

heartsMap = new Object()
let intervalID
let paused = false

document.addEventListener('DOMContentLoaded', () => {
    intervalID = window.setInterval(increment, 1000)
    plus.addEventListener('click', add)
    minus.addEventListener('click', subtract)
    heart.addEventListener('click', addHearts)
    pause.addEventListener('click', handlePause)
    commentForm.addEventListener('submit', handleSubmit) 
});
  
function increment() {
    counter.innerText = parseInt(counter.innerText) + 1
}

function add() {
    counter.innerText = parseInt(counter.innerText) + 1
}

function subtract() {
    counter.innerText = parseInt(counter.innerText) - 1
}

function addHearts() {
    const currentCounter = counter.innerText
    if (typeof heartsMap[currentCounter] !== 'undefined') {
        heartsMap[currentCounter] += 1
    } else {
        heartsMap[currentCounter] = 1
    }

    const heartsList = Object.keys(heartsMap).map((key) => {
        return `<li>
                    <p>${key} has been liked ${heartsMap[key]} time${
          heartsMap[key] > 1 ? 's' : ''
        }</p>
                  </li>`
      })
      likes.innerHTML = heartsList.join('')
}

function handlePause() {
    if (paused == false) {
        plus.removeEventListener('click', add)
        plus.disabled = true
        minus.removeEventListener('click', subtract)
        minus.disabled = true
        heart.removeEventListener('click', addHearts)
        heart.disabled = true
        submit.disabled = true  
        window.clearInterval(intervalID)
    } else {
        intervalID = window.setInterval(increment, 1000)
        plus.addEventListener('click', add)
        plus.disabled = false
        minus.addEventListener('click', subtract)
        minus.disabled = false
        heart.addEventListener('click', addHearts)
        heart.disabled = false
        submit.disabled = false  
    }

    paused = !paused
    if (paused) {
        pause.innerText = 'resume'
    } else {
        pause.innerText = 'pause'
    }
}

function handleSubmit(event) {
    event.preventDefault()
    const p = document.createElement('p')
    p.innerText = commentInput.value
    comments.appendChild(p)
    commentInput.value = ''
}