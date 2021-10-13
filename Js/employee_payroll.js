
window.addEventListener('DOMContentLoaded', (event) => {
  const name = document.querySelector('#name');
  const textError = document.querySelector('.text-error');
  name.addEventListener('input', function () {
    if (name.value.length == 0) {
      textError.textContent = "";
      document.getElementById('submitButton').disabled = true;
      return;
    }
    try {
      (new EmployeePayrollData()).name = name.value;
      document.getElementById('submitButton').disabled = false;
      textError.textContent = "";
    } catch (e) {
      textError.textContent = e;
      document.getElementById('submitButton').disabled = true;
    }
  });
  var salaryOutput = document.querySelector(".salary-output");
  var salary = document.querySelector("#salary");
  salary.addEventListener("input", function () {
    salaryOutput.textContent = salary.value;
  });
  var date = document.getElementById("day");
  var month = document.getElementById("month");
  var year = document.getElementById("year");
  const dateError = document.querySelector(".date-error");
  date.addEventListener("change", validateDate);
  month.addEventListener("change", validateDate);
  year.addEventListener("change", validateDate);

  function validateDate() {
    let startDate = Date.parse(
      year.value + "-" + month.value + "-" + date.value
    );
    try {
      new EmployeePayrollData().startDate = startDate;
      dateError.textContent = "";
    } catch (e) {
      dateError.textContent = e;
    }
  }
});
const save = () => {
  try {
    let employeePayrollData = createEmployeePayroll();
    createUpdateLocalStorage(employeePayrollData);
  } catch (e) {
    return;
  }
}
const createEmployeePayroll = () => {
  let employeePayrollData = new EmployeePayrollData();
  try {
    employeePayrollData.name = getInputValueById('#name');
  } catch (e) {
    setTextValue('.text-error', e);
    throw e;
  }
  employeePayrollData.profile = getSelectedValues('[name=profile]').pop();
  employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
  employeePayrollData.department = getSelectedValues('[name=department]');
  employeePayrollData.salary = getInputValueById('#salary');
  employeePayrollData.note = getInputValueById('#notes');
  let date = getInputValueById('#month') + " " + getInputValueById('#day') + ", " +
    getInputValueById('#year');
  console.log(date)
  employeePayrollData.startDate = new Date(date);
  alert(employeePayrollData.toString());
  return employeePayrollData;
}
const getSelectedValues = (propertyValue) => {
  let allItems = document.querySelectorAll(propertyValue);
  let selItems = [];
  allItems.forEach(item => {
    if (item.checked) selItems.push(item.value);
  });
  return selItems;
}
const getInputValueById = (id) => {
  let value = document.querySelector(id).value;
  return value;
}

function createUpdateLocalStorage(employeePayrollData) {
  let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
  if (employeePayrollList != undefined) {
    employeePayrollList.push(employeePayrollData);
  }
  else {
    employeePayrollList = [employeePayrollData];
  }
  alert("Local Storage Updated Successfully!\nTotal Employees : " + employeePayrollList.length);
  localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}
const resetForm = () => {
  setValue("#name", "");
  unsetSelectedValues("[name=profile]");
  unsetSelectedValues("[name=gender]");
  unsetSelectedValues("[name=department]");
  setValue("#day", "1");
  setValue("#month", "January");
  setValue("#year", "2020");
  setValue("#notes", "");
  resetRange("#salary", ".salary-output");
};

const setValue = (propertyId, value) => {
  const element = document.querySelector(propertyId);
  element.value = value;
};

const unsetSelectedValues = (propertyName) => {
  let allValues = document.querySelectorAll(propertyName);
  allValues.forEach(input => input.checked == false);
};

const setTextValue = (propertyId, value) => {
  const element = document.querySelector(propertyId);
  element.textContent = value;
};

const resetRange = (propertyId, outputId) => {
  const rangeElement = document.querySelector(propertyId);
  rangeElement.value = 400000;
  const outputElement = document.querySelector(outputId);
  outputElement.textContent = rangeElement.value;
};