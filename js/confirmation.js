const scriptURL = 'https://script.google.com/macros/s/AKfycbwwp6sl6UHHNcKAow7T3AZNTUprB7py_L7zedi_iXxTML_5eTQayRWKExBRHo4C-KTZ/exec'
const formName = 'submit-to-google-sheet'
const form = document.forms[formName]
const submissionStatus = document.getElementById('submission-status');
const formFields = document.forms[formName].elements;

function confirmedFunction(number) {
    submissionStatus.style.visibility = "hidden";
}

formFields.forEach((element, i) => element.addEventListener("click", confirmedFunction));

form.addEventListener('submit', e => {
  e.preventDefault()
  submissionStatus.style.visibility = "visible";
  // location.href = "confirmation.html";
})

// form.addEventListener('submit', e => {
//   e.preventDefault();
//   fetch(scriptURL, { method: 'POST', body: new FormData(form)})
//     .then(response => console.log('Success!', response))
//     .catch(error => console.error('Error!', error.message));
  // submission_status.style.visibility = "hidden";
// })
