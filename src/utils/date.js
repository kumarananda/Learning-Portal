// format == 10 Mar 2023 10:58:13 PM
export const showDateDetails = (data) => {
    const date = new Date(data)

    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let day = date.getDate()
    let month = months[date.getMonth()]
    let year = date.getFullYear()
    let hour = date.getHours() 
    let min = date.getMinutes()
    let sec = date.getSeconds()
    let ampm = hour >= 12 ? 'PM' : 'AM';

    return (day + " " + month + " " + year+ " " + hour+":"+min+":" +sec+" "+ampm)

} 
// format == 10 Mar 2023 10:58:13 PM
export const showDateMonthYear = (data) => {
    const date = new Date(data)

    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let day = date.getDate()
    let month = months[date.getMonth()]
    let year = date.getFullYear()

    return (day + " " + month + " " + year)

} 

