const movieTime = async () => {
    // console.log("ok");

    const movie_id = localStorage.getItem("movie_time");
    // console.log(movie_id);

    const response = await fetch('http://localhost:3000/time');
    const data = await response.json();
    // console.log(data);

    const newData = data.find((v) => v.movie_data === movie_id);
    // console.log(newData);

    document.getElementById("admin_date").value = newData.date;

    let print = '';

    newData.all_time.map((time) => {
        print += `<li><input type="radio" name="time"   value="${time}" onclick="handleTime('${time}')">${time}</li>`
    });

    document.getElementById("time").innerHTML = print;

}

const handleTime = (selectedTime) => {
    // You can do something with the selected time here if needed
    console.log("Selected Time:", selectedTime);
}

const movieDate = async () => {
    event.preventDefault()
    // console.log("ok");

    const timeDate = document.getElementById("date").value;
    const selectedTime = document.querySelector('input[name="time"]:checked').value;
    const adminDate = document.getElementById("admin_date").value;
    console.log(selectedTime);
    console.log(adminDate);
    console.log(timeDate);

    // const cinema_id = localStorage.getItem("cinema");
    // console.log(cinema_id);

    // const cinema_id = localStorage.getItem("cinema_name");
    // console.log(cinema_id);

    // const movie_time = localStorage.getItem("movie_time");
    // console.log(movie_time);

    // const response = await fetch("http://localhost:3000/time");
    // const data = await response.json();
    // console.log(data);

    // const newdata = data.filter((v) => v.cinema_name === cinema_id && v.movie_data === movie_time);
    // console.log(newdata);

    const obj = {
        selectedTime,
        timeDate,
        "EndDate": adminDate
    };
    console.log(obj);

    let dateN = new Date (timeDate).toLocaleDateString();
    let time=document.getElementsByName("all_time")
    
    
    let time_data = "";
    for (let i = 0; i < time.length; i++) {
        if (time[i].checked)
            time_data += time[i].value;
    }

    if (timeDate < adminDate) {
        console.log(adminDate);
        console.log(timeDate);
        localStorage.setItem("time", selectedTime)
        localStorage.setItem("Date", timeDate);
            } else {
        console.log("xdcfvg");
        localStorage.setItem("time", selectedTime)
        localStorage.setItem("Date", dateN);

        
    }
    window.location.href = 'http://127.0.0.1:5500/seatuser.html';
}

const handelDate = document.getElementById("movietime");
handelDate.addEventListener("submit", movieDate);

window.onload = () => {
    movieTime();
}