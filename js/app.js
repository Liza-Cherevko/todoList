// function repeatStringNumTimes(string, times) {
//     if (times <= 0) return string
//     if (times === 1) return string
//     else return string +repeatStringNumTimes(string, times -1)
//     let str = ''
//     while(times>0) {
//         str += string;
//         times --
//     }
//     return str
       
// }
// console.log(repeatStringNumTimes("abc", 3))


// Вам нужно удвоить целое число и вернуть его.
function doubleNum(num) { 
    return num*num
}
console.log(doubleNum(6))