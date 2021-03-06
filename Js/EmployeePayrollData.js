class EmployeePayrollData {

    get id() {
        return this._id;
    }

    set id(id) {
        this._id=id;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z]{3,}$');
        if (nameRegex.test(name)) {
            this._name = name;
        }
        else {
            throw "Name is Incorrect";
        }
    }

    get profile() { return this._profile; }

    set profile(profile) {
        this._profile= profile;
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
        let genderRegex = RegExp('^[A-Za-z]*$');
        if (genderRegex.test(gender)) {
            this._gender = gender;
        }
        else {
            throw new Error("gender is Incorrect");
        }
    }
    get department() { return this._department; }

    set department(department) {
        this._department = department;
    }
    get note() { return this._note; }
    set note(note) {
        this._note = note;
    }
    get startDate() {
        return this._startDate;
    }
    set startDate(startDate) {
        const days=Math.abs(startDate - new Date())/(1000*60*60*24);
        if ((startDate <= new Date()) && days < 30)
            this._startDate = startDate;
        else throw 'Invalid date';
    }

    toString() {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const empDate = !this.startDate ? "undefined" : this.startDate.toLocaleDateString("en-US", options);
        return "id=" + this.id + "name='" + this.name + ",salary=" + this.salary +
            ",gender= " + this.gender + ",profile pic= " + this.profile + ",department = " + this.department + ",startDate= " + this.startDate + ", note =" + this.note;
    }
}
