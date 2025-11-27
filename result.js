const finalScore = localStorage.getItem('quizScore')
console.log(finalScore)

function final() {

  document.getElementById('res').innerHTML = `You Scored : ${finalScore} / 15`
  const feed = document.getElementById('feedBack')

  if (finalScore == 15) {
    feed.innerHTML = `Outstanding! A perfect 15/15. You’ve shown strong command over frontend fundamentals. Keep this momentum going!`
  } else if (finalScore < 15 && finalScore >= 10) {
    feed.innerHTML = `Great job! Scoring ${finalScore} shows you have a strong understanding of frontend basics. A little revision on a few topics and you’ll be at a perfect score!`
  } else if (finalScore > 5 && finalScore < 10) {
    feed.innerHTML = `“Good effort! Scoring between ${finalScore} shows you understand some frontend concepts. With more practice, you’ll improve quickly.”`
  } else if (finalScore >= 0 && finalScore <= 5) {
    feed.innerHTML = `Your score ${finalScore} shows that the fundamentals need more attention. Spend time understanding each topic step-by-step, and you’ll get better`
  }

}

final()

document.getElementById('done').addEventListener('click', () => {
  localStorage.removeItem('quizScore')
  window.location.href = `./starter.html`
})