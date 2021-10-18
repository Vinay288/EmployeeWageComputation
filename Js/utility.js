const stringifyDate = (date) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const newDate = !date ? "undefined" :
        new Date(Date.parse(date)).toLocaleDateString('en-GB', options);
    return newDate;
}
const checkName = (name) => {
    let nameRegex = RegExp('^[A-Z]{1}[A-Za-z ]{3,}$');
    if (!nameRegex.test(name)) {
        throw "Name is Incorrect";
    }
    else
        return true;
}

const checkStartDate = (startDate) => {
    const days = Math.abs(startDate - new Date()) / (1000 * 60 * 60 * 24);
    if ((startDate <= new Date()) && days < 30)
        return true;
    else throw 'Invalid date';

}