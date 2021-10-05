
function employeeAttendence() {
    const ABSENT = 0

    let empValue = Math.floor(Math.random() * 10) % 2;
    if (empValue == ABSENT) {
        console.log("Employee is Absent");
        return
    }
    else {
        console.log("Employee is Present");
    }
}
function getWorkingHours() {
    const PART_TIME = 0;
    const FULL_TIME = 1;
    const PART_TIME_HOURS = 4;
    const FULL_TIME_HOURS = 8;
    
    let employeeHours = 0;
    let employeeValue = Math.floor(Math.random() * 10) % 2;
    switch (employeeValue) {
        case PART_TIME:
            employeeHours = PART_TIME_HOURS;
            break;
        case FULL_TIME:
            employeeHours = FULL_TIME_HOURS;
            break;
        default:
            employeeHours = 0;
    }
}
const MAXIMUM_WORKING_DAYS = 20;
const WAGE_PER_HOUR = 20;
let employeeWage = 0;
for (let day = 0; day < MAXIMUM_WORKING_DAYS; day++) {
    employeeWage +=getWorkingHours() * WAGE_PER_HOUR;
    console.log(employeeWage)

}
console.log("Employee wage = " + employeeWage);