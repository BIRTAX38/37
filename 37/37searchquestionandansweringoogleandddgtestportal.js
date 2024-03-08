//credits https://github.com/MrCyjaneK/testportal-multitool 
function answerSearch() {
    let classqanda = ["answer_body", "question_essence"]
    classqanda.forEach(c => {
        let elms = document.getElementsByClassName(c)
        for (let i = 0; i < elms.length; i++) {
            console.log(elms[i])
            let text = elms[i].innerText
            if (text == "") {
                continue
            }
            elms[i].innerHTML += `<a target="_blank" href="https://duckduckgo.com/?q=${ encodeURIComponent(text) }">DDG</a> | <a target="_blank" href="https://google.com/search?q=${ encodeURIComponent(text) }&igu=1">Google</a>`
        }
    })
}
function imageSearch() {
    const images = document.querySelectorAll('img');

    images.forEach((image) => {
      if (
        !image.classList.contains('logo_wide') &&
        !image.classList.contains('logo_default')
      ) {
        image.addEventListener('click', () => {
          const imageUrl = image.getAttribute('src');
          const googleSearchUrl =
            'https://lens.google.com/uploadbyurl?url=' + encodeURIComponent(imageUrl);
          window.open(googleSearchUrl);
        });
      }
    });
  }

    setTimeout(answerSearch, 100)
    setTimeout(imageSearch, 200)
