const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
   
  };

  document
  .querySelector('.submit-form')
  .addEventListener('submit', loginFormHandler);