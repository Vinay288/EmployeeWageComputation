
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
let totalEmployeeWage = 0
function sum(dailyWage) {
    totalEmployeeWage += dailyWage
}
employeeWageArray.forEach(sum);
console.log("total days: " + day + " Employee hours: " + workingHours + " Employee wage: " + totalEmployeeWage);

//using reduce
function totalWages(totalWage, dailyWage) {
    return totalWage + dailyWage;
}
console.log("Employee wage with reduce:" + employeeWageArray.reduce(totalWages, 0));

//mapping day with wage earned that day
let dayCounter = 0
function mapDayWithWage(dailyWage) {
    dayCounter++;
    return [dayCounter, dailyWage];
}

let mapDayWithWageArray = employeeWageArray.map(mapDayWithWage);
console.log("Mapping day with Wage earned on that day");
console.log(mapDayWithWageArray)
//Using filter to show when full time wage of 160 was earned
function fulltimeWage(dailyWage) {
    return dailyWage[1] == 160;
}
let fullDayWageArray = mapDayWithWageArray.filter(fulltimeWage);
console.log("Daily wage when full time wage earned ")
console.log(fullDayWageArray)

//Find first occurence when full time wage was earned using find
function findFulltimeWage(dailyWage)
{
    return dailyWage[1]==160
}
console.log("First full time wage was earned on Day: "+mapDayWithWageArray.find(findFulltimeWage))

//check if truely holding full time wage
function isAllFullTimeWage(dailyWage)
{
    return dailyWage[1]==160
}
console.log("Check if all element have Full time Wage: "+fullDayWageArray.every(isAllFullTimeWage))