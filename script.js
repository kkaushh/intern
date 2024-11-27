document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
  
    // Retrieve form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = new Date(document.getElementById('dob').value);
    const termsAccepted = document.getElementById('terms').checked;
  
    // Validate age (between 18 and 55)
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    if (today.getMonth() < dob.getMonth() || (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())) {
      age--;
    }
  
    if (age < 18 || age > 55) {
      alert('Date of birth must be for someone between the ages of 18 and 55.');
      return;
    }
  
    // Save data to web storage
    const userData = {
      name: name,
      email: email,
      password: password,
      dob: dob.toDateString(),
      acceptedTerms: termsAccepted
    };
  
    // Add data to table
    const tableBody = document.querySelector('#data-table tbody');
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${userData.name}</td>
      <td>${userData.email}</td>
      <td>${userData.password}</td>
      <td>${userData.dob}</td>
      <td>${userData.acceptedTerms}</td>
    `;
    tableBody.appendChild(row);
  
    // Store data in local storage
    let storedData = JSON.parse(localStorage.getItem('formData')) || [];
    storedData.push(userData);
    localStorage.setItem('formData', JSON.stringify(storedData));
  
    // Clear form fields
    this.reset();
  });
  
  // Load data from local storage on page load
  window.onload = function() {
    const storedData = JSON.parse(localStorage.getItem('formData')) || [];
    const tableBody = document.querySelector('#data-table tbody');
    storedData.forEach(data => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${data.name}</td>
        <td>${data.email}</td>
        <td>${data.password}</td>
        <td>${data.dob}</td>
        <td>${data.acceptedTerms}</td>
      `;
      tableBody.appendChild(row);
    });
  };
  