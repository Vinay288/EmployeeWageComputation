window.addEventListener("DOMContentLoaded", (event) => {
  employeePayrollList = getEmployeePayrollDataFromStorage();
  document.querySelector(".emp-count").textContent = employeePayrollList.length;
  createInnerHtml();
  localStorage.removeItem("editEmp");
});
const getEmployeePayrollDataFromStorage = () => {
  return localStorage.getItem("EmployeePayrollList")
    ? JSON.parse(localStorage.getItem("EmployeePayrollList"))
    : [];
};

const createInnerHtml = () => {
  if (employeePayrollList.length == 0) return;
  const headerHtml = "<tr><th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th></tr>";
  let innerHtml = `${headerHtml}`;
  for (const empPayrollData of employeePayrollList) {
    console.log(empPayrollData._profile);
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
                  id="${empPayrollData._id}"
                  onclick="remove(this)"
                  alt="delete"
                  src="../Assets/icons/delete-black-18dp.svg"
                />
                <img
                  id="${empPayrollData._id}"
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
const createEmployeePayrollJSON = () => {
  let employeePayrollListLocal = [
    {
      _name: "Narayan Mahadevan",
      _gender: "Male",
      _department: ["Finance", "Engineering"],
      _salary: "5000000",
      _startDate: "29 Oct 2020",
      _note: "",
      _id: new Date().getTime(),
      _profile: "../Assets/profile-images/Ellipse -2.png",
    },
    {
      _name: "Raju",
      _gender: "Male",
      _department: ["Sales", "Others"],
      _salary: "550000",
      _startDate: "1 Oct 2021",
      _note: "",
      _id: new Date().getTime() + 1,
      _profile: "../Assets/profile-images/Ellipse -3.png",
    },
  ];

  return employeePayrollListLocal;
};

const getDeptHtml = (departmentList) => {
  let deptHtml = "";
  for (const dept of departmentList) {
    deptHtml = `${deptHtml}<div class="dept-label">${dept}</div>`;
  }
  return deptHtml;
};
const formatDate = (date) => {
  date = new Date(date);
  return (
    date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
  );
};
const remove = (node) => {
  let employeePayrollData = employeePayrollList.find(empData => empData._id == node.id);
  if (!employeePayrollData) return;
  const index = employeePayrollList.map(empData => empData._id).indexOf(employeePayrollData._id);
  employeePayrollList.splice(index, 1);
  localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
  document.querySelector(".emp-count").textContent = employeePayrollList.length;
  createInnerHtml();

}
const update = (node) => {
  let employeePayrollData = employeePayrollList.find(empData => empData._id == node.id);
  if (!employeePayrollData) return;
  localStorage.setItem('editEmp', JSON.stringify(employeePayrollData));
  window.location.replace(site_properties.add_emp_payroll_page);
}