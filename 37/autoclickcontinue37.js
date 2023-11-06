function clickElementWithText() {
  const targetClass = 'btn';
  const targetText = 'Continue generating';

  const elements = document.getElementsByClassName(targetClass);

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    if (element.innerText.trim() === targetText) {
      element.click();
      break;
    }
  }
}

setInterval(clickElementWithText, 500);
