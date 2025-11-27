// debugger;
const log = console.log
const subBtn = document.getElementById("submit")
const backBtn = document.getElementById('goBack')
const ans = []
const opt = document.querySelector('input[name="ans"]:checked')
/*
Objective of fetchQues() function is to fetch questions from question.json and store 15 random question without repeatation out of it and push it in arr[] and returning
*/
async function fetchQues() {
  const res = await fetch("./src/questions.json")
  const data = await res.json()
  const unique = new Set() //{}
  const arr = []

  while (unique.size < 15) {
    const random = Math.floor(Math.random() * 50) 
    if (!unique.has(random)) {
      unique.add(random)
      arr.push(data[random])
    }
  }
  return arr
}

/*
Objective of loadQues() function is to display the returned array by fetchQues() questions via DOM
*/
function loadQues(q, i) {
  document.getElementById('quesNum').innerHTML = `<h1>Question ${i + 1} : </h1>`
  document.getElementById('mainQuestion').innerHTML =`Q: ${q[i].question}`

  document.getElementById('ans1').innerHTML = q[i].options[0]
  document.getElementById('ans2').innerHTML = q[i].options[1]
  document.getElementById('ans3').innerHTML = q[i].options[2]
  document.getElementById('ans4').innerHTML = q[i].options[3]
  
  
  if (q[i].tags == 'HTML') {

    document.getElementById('langBadge').innerHTML = `<span class="inline-flex items-center rounded-md bg-red-400/10 px-2 py-1 text-xs font-medium text-red-400 inset-ring inset-ring-red-400/20">${q[i].tags}</span>`

  } else if (q[i].tags == 'CSS') {

    document.getElementById('langBadge').innerHTML = `<span class="inline-flex items-center rounded-md bg-indigo-400/10 px-2 py-1 text-xs font-medium text-indigo-400 inset-ring inset-ring-indigo-400/30">${q[i].tags}</span>`

  } else if (q[i].tags == 'Javascript') {

    document.getElementById('langBadge').innerHTML = `<span class="inline-flex items-center rounded-md bg-yellow-400/10 px-2 py-1 text-xs font-medium text-yellow-500 inset-ring inset-ring-yellow-400/20">${q[i].tags}</span>`

  } else if (q[i].tags == 'Bootstrap') {

    document.getElementById('langBadge').innerHTML = `<span class="inline-flex items-center rounded-md bg-purple-400/10 px-2 py-1 text-xs font-medium text-purple-400 inset-ring inset-ring-purple-400/30">${q[i].tags}</span>`

  } else if (q[i].tags == 'React') {

    document.getElementById('langBadge').innerHTML = `<span class="inline-flex items-center rounded-md bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-400 inset-ring inset-ring-blue-400/30">${q[i].tags}</span>`
  }

 
  document.querySelectorAll('input[name="ans"]').forEach(radio => radio.checked = false)

  if (ans[i]) {
    document.getElementById(ans[i]).checked = true
  }
}
/*
Objective of initQuiz() function is that it acts as a entry point for all other functions
*/
async function initQuiz() {
  const questions = await fetchQues()
  let index = 0
  let score = 0

  loadQues(questions, index)

  subBtn.addEventListener('click', () => {
    const opt = document.querySelector('input[name="ans"]:checked')
    
    if (!opt) {
      alert("Please Select an option")
      return;
    }

    ans[index] = opt.id

    if (opt.id == questions[index].answer) {
      score++
      ans[index] = opt.id
    }

    ans[index] = opt.id
  
    index++   

    if (index == 15) {
      alert("Quiz Completed")
      localStorage.setItem("quizScore", score)
      window.location.href = `./result.html`
    }
    
    loadQues(questions, index)
  })

  backBtn.addEventListener('click', () => {
    log(ans)
    
    if (index > 0) {
      index--
      loadQues(questions, index)
    }
    
  })

  
}

initQuiz()

/*
Objective of this is to change the theme (either light or dark)
*/
const userTheme = document.getElementById('theme')
userTheme.addEventListener('change', () => {

  if (userTheme.value == 'dark') {
    document.querySelector('body').style.backgroundColor = '#222831'
    document.querySelector('body').style.color = 'white'
    document.getElementById('main').style.boxShadow = "1px 1px 10px 2px #FDFEFF"
    document.getElementById('theme').style.backgroundColor = 'white'
    document.getElementById('theme').style.color = 'black'
    
  } else if (userTheme.value == 'light') {
    document.querySelector('body').style.backgroundColor = 'white'
    document.querySelector('body').style.color = 'black'
    document.getElementById('main').style.boxShadow = "0 25px 50px -40px #000000"
    document.getElementById('theme').style.backgroundColor = 'black'
    document.getElementById('theme').style.color = 'white'
  }
})