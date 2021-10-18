let employeePayrollList;
window.addEventListener("DOMContentLoaded", (event) => {
  if (site_properties.localStorage.match("true")){
    getEmployeePayrollDataFromStorage();
    console.log("fdsfs");
  }
  else{
    getEmployeePayrollDataFromServer();
  }
  
});

const getEmployeePayrollDataFromStorage = () => {
  employeePayrollList = localStorage.getItem("EmployeePayrollList")
    ? JSON.parse(localStorage.getItem("EmployeePayrollList"))
    : [];
    processEmployeeDataResponse();
};

const processEmployeeDataResponse=()=>{
  document.querySelector(".emp-count").textContent = employeePayrollList.length;
  createInnerHtml();
  localStorage.removeItem("editEmp");
}

const getEmployeePayrollDataFromServer = () => {
  makeServiceCall("GET", site_properties.site_url, true)
    .then(responseText => {
      employeePayrollList = JSON.parse(responseText);
      processEmployeeDataResponse();
    })
    .catch(error => {
      console.log("GET error status" + JSON.stringify(error));
      employeePayrollList = [];
      processEmployeeDataResponse();
    });
}

const createInnerHtml = () => {
  if (employeePayrollList.length == 0) return;
  const headerHtml = "<tr><th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th></tr>";
  let innerHtml = `${headerHtml}`;
  for (const empPayrollData of employeePayrollList) {
    innerHtml = `${innerHtml}
            <tr>
              <td>
                <img
                  class="profile"
                  alt="profile picture"
                  src="${empPayrollData._profile}"
                >
              </td>
              <td>${empPayrollData._name}</td>
              <td>${empPayrollData._gender}</td>
              <td>
              ${getDeptHtml(empPayrollData._department)}
              </td>
              <td>${empPayrollData._salary}</td>
              <td>${formatDate(empPayrollData._startDate)}</td>
              <td>
                <img
                  id="${empPayrollData.id}"
                  onclick="remove(this)"
                  alt="delete"
                  src="../Assets/icons/delete-black-18dp.svg"
                />
                <img
                  id="${empPayrollData.id}"
                  alt="edit"
                  onclick="update(this)"
                  src="../Assets/icons/create-black-18dp.svg"
                />
              </td>
            </tr>
      `;
    length += 1;
  }
  document.querySelector("#table-display").innerHTML = innerHtml;
};

const getDeptHtml = (departmentList) => {

  deptHtml = `<div class="dept-label">${departmentList}</div>`;

  return deptHtml;
};

const formatDate = (date) => {
  date = new Date(date);
  return (
    date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
  );
};

const remove = (node) => {
  let employeePayrollData = employeePayrollList.find(empData => empData.id == node.id);
  if (!employeePayrollData) return;
  const index = employeePayrollList.map(empData => empData.id).indexOf(employeePayrollData.id);
  employeePayrollList.splice(index, 1);
  if(site_properties.localStorage.match("true")){
  localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
  document.querySelector(".emp-count").textContent = employeePayrollList.length;
  createInnerHtml();
  }
  else{
    const deleteURL= site_properties.site_url+employeePayrollData.id.toString();
    makeServiceCall("DELETE",deleteURL,false)
    .then(responseText =>{
      createInnerHtml();
    })
    .catch(error =>{
      console.log("DELETE ERROR status: "+JSON.stringify(error));
    });
  }
}


const update = (node) => {
  let employeePayrollData = employeePayrollList.find(empData => empData.id == node.id);
  if (!employeePayrollData) return;
  localStorage.setItem('editEmp', JSON.stringify(employeePayrollData));
  window.location.replace(site_properties.add_emp_payroll_page);
}
