const handelSeat = async () => {
    // console.log("ok");
    // event.preventDefault()
    try {
        const cinema_id = localStorage.getItem("cinema_name");
        console.log(cinema_id);

        const movie_id = localStorage.getItem("movie_time");
        console.log(movie_id);

        const date = localStorage.getItem("Date");
        console.log(date);

        const time = localStorage.getItem("time");
        console.log(time);

        const response = await fetch('http://localhost:3000/seat');
        const data = await response.json();
        console.log(data);

        const seatObj = data.find((v) => (v.cinema_name === cinema_id && v.movie_data === movie_id));
        console.log(seatObj);

        const userDate = seatObj.seatData.find((v) => new Date(v.timeDate).toLocaleDateString() === new Date(date).toLocaleDateString());
        console.log(userDate)

        let print = "";
        userDate.seat.map((v, i) => {

            const status = v === 1 ? 'disabled' : 'active'
            if (v === 0) {
                print += `<button class="seatdesign"  type="button" id= "seat-${i}" class="btn btn-outline-info"  ${status} onclick="handelbutton(${i},${seatObj.price})">${i + 1}</button>`
            } else {
                print += `<button class="seatdesign"  type="button" id= "seat-${i}" class="btn btn-outline-info"  ${status}  onclick="handelbutton(${i},${seatObj.price})">${i + 1}</button>`
            }
        })
        document.getElementById("disp").innerHTML = print

    } catch (error) {
        console.log(error.message);
    }
}
let selectseat = [];
let totalprice = 0;
const handelbutton = (i, price) => {
    // console.log("fsdgf");
    // selectseat.push(i)

    // console.log(selectseat);


   

    if (selectseat.includes(i)) {
        // console.log("yes");
        let index = selectseat.findIndex((v) => v === i);
        console.log(index);

        selectseat.splice(index, 1)
    } else {
        selectseat.push(i);
        console.log(selectseat);
    }



    if (selectseat.some((v) => v === i)) {
        document.getElementById("seat-" + i).style.backgroundColor = "green"
    } else {
        document.getElementById("seat-" + i).style.backgroundColor = "black"
        document.getElementById("seat-" + i).style.color = "skyblue"
    }
    totalprice = selectseat.length * price;

    document.getElementById("price").innerHTML = totalprice;
}
const handalbtn = async () => {
    event.preventDefault()
    // console.log("fogd");
    const cinema_id = localStorage.getItem("cinema_name");
    console.log(cinema_id);

    const movie_id = localStorage.getItem("movie_time");
    console.log(movie_id);

    const date = localStorage.getItem("Date");
    console.log(date);

    const time = localStorage.getItem("time");
    console.log(time);

    const response = await fetch('http://localhost:3000/seat');
    const data = await response.json();
    console.log(data);

    const seatObj = data.find((v) => (v.cinema_name === cinema_id && v.movie_data === movie_id));
    console.log(seatObj);

    const userDate = seatObj.seatData.find((v) => new Date(v.timeDate).toLocaleDateString() === new Date(date).toLocaleDateString());
    console.log(userDate)

    userDate.seat.map((v, i) => {
        if (selectseat.includes(i)) {
            console.log(i);
            userDate.seat[i] = 1;
        }
    });
    console.log(userDate);

    if (userDate) {
        const response = await fetch("http://localhost:3000/seat/" + seatObj.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(seatObj)
        })
    }

    window.location.href = 'http://127.0.0.1:5500/succes.html'
}
window.onload = handelSeat;


