
window.addEventListener('DOMContentLoaded', (event) => {
  const name = document.querySelector('#name');
  const textError = document.querySelector('.text-error');
  name.addEventListener('input', function () {
    if (name.value.length == 0) {
      textError.textContent = "";
      return;
    }
    try {
      (new EmployeePayrollData()).name = name.value;;
      textError.textContent = "";
    } catch (e) {
      textError.textContent = e;
    }
  });
  var salaryOutput = document.querySelector(".salary-output");
  var salary = document.querySelector("#salary");
  salary.addEventListener("input", function () {
    salaryOutput.textContent = salary.value;
  });
});
function onSubmit() {
  let employeeData = new EmployeePayrollData(document.getElementById('name').value, document.getElementById('salary').value, document.getElementById('gender').value, document.getElementById('startDate'))
  // console.log(employeeData);
}
