class EmployeePayrollData {

    constructor(...params) {
        this.id = params[0];
        this.name = params[1];
        this.salary = params[2];
        this.gender = params[3];
        this.startDate = params[4];
    }


    get id() {
        return this._id;
    }

    set id(id) {
        let idRegex = RegExp('^\\d*$');
        if (idRegex.test(id)) {
            this._id = id;
        }
        else {
            throw new Error("id is Incorrect");
        }
    }
    get name() {
        return this._name;
    }

    set name(name) {
        let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z0-9]{3,}$');
        if (nameRegex.test(name)) {
            this._name = name;
        }
        else {
            throw new Error("Name is Incorrect");
        }
    }

    get salary() {
        return this._salary;
    }

    set salary(salary) {
        let salaryRegex = RegExp('^\\d*$');
        if (salaryRegex.test(salary)) {
            this._salary = salary;
        }
        else {
            throw new Error("salary is Incorrect");
        }
    }
    get gender() {
        return this._gender;
    }

    set gender(gender) {
        let genderRegex = RegExp('^[M|F]$');
        if (genderRegex.test(gender)) {
            this._gender = gender;
        }
        else {
            throw new Error("gender is Incorrect");
        }
    }
    get startDate() {
        return this._startDate;
    }
    set startDate(startDate) {
        if (startDate <= new Date() && Math.abs(startDate - new Date() < 30))
            this._startDate = startDate;
        else throw 'Invalid date';
    }

    toString() {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const employeeDate = this.startDate == undefined ? "undefined" :
            this.startDate.toLocaleDateString("en-us", options);
        return "id=" + this.id + ",name='" + this.name + ",salary=" + this.salary +
            ",gender= " + this.gender + ",startDate= " + employeeDate;
    }
}

let newEmployeePayrollData = new EmployeePayrollData(1234, "Terisa", 30000, "F", new Date());
console.log(newEmployeePayrollData.toString());