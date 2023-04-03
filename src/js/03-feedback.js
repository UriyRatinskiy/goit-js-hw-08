import throttle from 'lodash.throttle';

const STORAGE_KEY = "feedback-form-state";

const formData = {};

const form = document.querySelector('.feedback-form');
const textarea = document.querySelector(' textarea');
const input = document.querySelector(' input');


form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

function onFormInput (event) {
    formData[event.target.name] = event.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
    event.preventDefault();
    if (input.value === '' || textarea.value === '') {
        alert ('Please fill in all the fields!')
    } else {
        console.log(formData);
        event.currentTarget.reset();
        localStorage.removeItem(STORAGE_KEY),
        (formData = {});  
    };
    }   

    populateFormData()
function populateFormData() {
    const savedInformation = localStorage.getItem(STORAGE_KEY);

    let parsedSaved;

    if (savedInformation === null) {
        parsedSaved = {};
      } else {
        parsedSaved = JSON.parse(savedInformation);

        if (
          parsedSaved['email'] && parsedSaved['message']
        ) {
          input.value = parsedSaved.email;
          textarea.value = parsedSaved.message;
          formData.email = parsedSaved.email;
          formData.message = parsedSaved.message;
        } else if (parsedSaved['email']) {
          input.value = parsedSaved.email;
          formData.email = parsedSaved.email;
        } else if (parsedSaved['message']) {
          textarea.value = parsedSaved.message;
          formData.message = parsedSaved.message;
        }
      }
 
}
