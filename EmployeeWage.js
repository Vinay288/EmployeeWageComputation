const ABSENT=0

let empValue=Math.floor(Math.random()*10)%2;
if(empValue==ABSENT)
{
    console.log("Employee is Absent");
    return
}
else
{
    console.log("Employee is Present");
}