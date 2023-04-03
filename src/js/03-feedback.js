import throttle from 'lodash.throttle';

const STORAGE_KEY = "feedback-form-state";

const formData = {};

const refs = {
    form: document.querySelector('form'),
    input: document.querySelector('input'),
    textarea: document.querySelector('textarea'),
};

populateFormData()

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

function onFormInput (event) {
    formData[event.target.name] = event.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
    event.preventDefault();
    console.log(formData);
    event.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
}

function populateFormData() {
    const savedInformation = localStorage.getItem(STORAGE_KEY);

    if (savedInformation) {
        const parsedInformation = JSON.parse(savedInformation);
        refs.input.value = parsedInformation.email;
        refs.textarea.value = parsedInformation.message;
        return parsedInformation;
    }
}
