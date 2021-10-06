
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
let employeeWageArray = new Array()
function getEmployeeWage(employeeHours) {
    employeeWageArray.push(employeeHours * WAGE_PER_HOUR)
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
    getEmployeeWage(employeeHours)
    return employeeHours;
}
const MAXIMUM_WORKING_DAYS = 20;
const WAGE_PER_HOUR = 20;
const MAXIMUM_WOKING_HOURS = 160;
let employeeWage = 0, workingHours = 0, day = 0;

for (day = 0; day < MAXIMUM_WORKING_DAYS && workingHours < 160; day++) {
    workingHours += getWorkingHours();

}
employeeWage += workingHours * WAGE_PER_HOUR;
//using foreach
let totalEmployeeWage=0
function sum(dailyWage)
{
    totalEmployeeWage+=dailyWage
}
employeeWageArray.forEach(sum);
console.log("total days: "+day+" Employee hours: "+workingHours+" Employee wage: "+totalEmployeeWage);