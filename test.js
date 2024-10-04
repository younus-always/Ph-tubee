// function convertTime(some) {
//     const a = parseInt(some / 3600);
//     const b = parseInt(some % 3600);
//     const c = parseInt(b /60)
//     return `${a} hour ${c} minute ago`
// }

// const result = convertTime(456456)
// console.log(result)


// function convertToTimeAgo(seconds) {
//     const minutes = Math.floor(seconds / 60);
//     console.log(minutes)
//     const hours = Math.floor(minutes / 60);
//     console.log(hours)
//     const days = Math.floor(hours / 24);
//     console.log(days)
  
//     if (days > 0) {
//       return `${days} days ago`;
//     } else if (hours > 0) {
//       return `${hours} hours ${minutes % 60} minutes ago`;
//     } else if (minutes > 0) {
//       return `${minutes} minutes ago`;
//     } else {
//       return `${seconds} seconds ago`;
//     }
//   }
  
//   const timeAgo = convertToTimeAgo(6756756); // Replace 3790 with any number
//   console.log(timeAgo); // Output: 1 hours 3 minutes ago
  


const numberToTime = (second) => {
    const minute = parseInt(second / 60);
    const remSecond = second % 60;
    console.log(remSecond, "second")

    const hour = parseInt(minute / 60);
    const remMinute = minute % 60;
    console.log(remMinute, "minute")

    const day = parseInt(hour / 24);
    const remHour = hour % 24;
    console.log(remHour, "hour")

    const month = parseInt(day / 30);
    const remMonth = day % 30;
    console.log(remMonth, "month")
    // console.log(parseInt(minute), parseInt(hour), parseInt(day), parseInt(month))

     if (month > 0) {
        return(`${month} months ago`)
    } else if (day > 0) {
        return(`${day} day  hours ago`)
    } else if (hour > 0) {
        return(`${hour} hours  ago`)
    }else if (minute > 0) {
        return(`${minute} minute ${second % 60} seconds ago`)
    }else {
        return(`${second} seconds ago`)
    }
}

const result = numberToTime(855000)
console.log(result)

