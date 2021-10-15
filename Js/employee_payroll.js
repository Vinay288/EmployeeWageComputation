let isUpdate = false;
let employeePayrollObj = {};
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
  checkForUpdate();
});
const save = () => {
  event.preventDefault();
  event.stopPropagation();
  try {
    setEmployeePayrollObject();
    createAndUpdateStorage();
    resetForm();
    window.location.replace(site_properties.home_page);
  } catch (e) {
    console.error(e);
    return;
  }
}
const setEmployeePayrollObject = () => {
  employeePayrollObj._name = getInputValueById("#name");
  employeePayrollObj._profilePic = getSelectedValues("[name=profile]").pop();
  employeePayrollObj.gender = getSelectedValues("[name=gender]").pop();
  employeePayrollObj.department = getSelectedValues("[name=department]");
  employeePayrollObj.salary = getInputValueById("#salary");
  employeePayrollObj.note = getInputValueById("#notes");
  let date =
    getInputValueById("#year") +
    "-" +
    getInputValueById("#month") +
    "-" +
    getInputValueById("#day");
  employeePayrollObj.startDate = new Date(Date.parse(date));
};
const createEmployeePayroll = (id) => {
  let employeePayrollData = new EmployeePayrollData();
  try {
    employeePayrollData.name = getInputValueById('#name');
  } catch (e) {
    setTextValue('.text-error', e);
    throw e;
  }
  
  if (!id) employeePayrollData._id = Math.floor(Math.random() * 100);
  else employeePayrollData._id = id;
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
  resetForm();
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

const createAndUpdateStorage = () => {
  let employeePayrollList = JSON.parse(
    localStorage.getItem("EmployeePayrollList")
  );

  if (employeePayrollList) {
    let empPayrollData = employeePayrollList.find(
      (empData) => empData._id == employeePayrollObj._id
    );

    if (!empPayrollData) {
      employeePayrollList.push(createEmployeePayroll());
    } else {
      const index = employeePayrollList
        .map((empData) => empData._id)
        .indexOf(empPayrollData._id);
      employeePayrollList.splice(
        index,
        1,
        createEmployeePayroll(empPayrollData._id)
      );
    }
  } else {
    employeePayrollList = [createEmployeePayroll()];
  }
  localStorage.setItem(
    "EmployeePayrollList",
    JSON.stringify(employeePayrollList)
  );
  window.location.replace(site_properties.home_page);
};
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
const checkForUpdate = () => {
  const employeePayrollJson = localStorage.getItem('editEmp');
  isUpdate = employeePayrollJson ? true : false;
  if (!isUpdate) return;
  employeePayrollObj = JSON.parse(employeePayrollJson);
  setForm();
}
const setForm = () => {
  document.getElementById('submitButton').innerHTML = "Update";
  document.getElementById('submitButton').disabled = false;
  setValue('#name', employeePayrollObj._name);
  setSelectedValues('[name=profile]', employeePayrollObj._profile);
  setSelectedValues('[name=gender]', employeePayrollObj._gender);
  setSelectedValues('[name=department]', employeePayrollObj._department);
  setValue('#salary', employeePayrollObj._salary);
  setTextValue('.salary-output', employeePayrollObj._salary);
  setValue('#notes', employeePayrollObj._note);
  let date = stringifyDate(employeePayrollObj._startDate).split(" ");
  setValue('#day', date[0]);
  setValue('#month', date[1]);
  setValue('#year', date[2]);

}
const setSelectedValues = (propertyValue, value) => {
  let allItems = document.querySelectorAll(propertyValue);
  allItems.forEach(item => {
    if (Array.isArray(value)) {
      if (value.includes(item.value)) {
        item.checked = true;
      }
    }
    else if (item.value === value)
      item.checked = true;
  });
}

const setSelectedIndex = (id, index) => {
  const element = document.querySelector(id);
  element.selectedIndex = index;
}