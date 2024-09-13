const handelseat = async () => {
    // console.log("ok");
    try {
        const response = await fetch("http://localhost:3000/cinema");
        const cinema_data = await response.json();
        // console.log(cinema_data);

        let print = "<option value = '0'>---select cinema---</option>";

        cinema_data.map((v) => {
            print += `<option value="${v.id}">${v.cname}</option>`
        })

        document.getElementById("cinema_name").innerHTML = print;

    } catch (error) {
        console.log(error);
    }

   
    handeldisp();
}

const handaleDlete = async (id) => {
    // console.log("ujhbn");
    await fetch("http://localhost:3000/seat/" + id, {
        method: 'DELETE',
    });
}

const handelEdit = async (id) => {
    console.log(id);
    try {
        const response = await fetch("http://localhost:3000/seat");
        const data = await response.json();
        // console.log(data);
        const obj = data.find((v) => v.id === id)
        console.log(obj);

        document.getElementById("id").value = obj.id;
        document.getElementById("cinema_name").value = obj.cinema_name;

        handlmoviedata(obj.cinema_name);

        document.getElementById("movie_data").value = obj.movie_data;
        document.getElementById("movie_time").value = obj.movie_time;
        document.getElementById("seat_id").value = obj.seat_id;
        document.getElementById("price").value = obj.price;

        handleTime(obj.movie_data, obj.movie_time);

    } catch (error) {
        console.log(error.message);
    }
}

const handelSubmit = async () => {
    // console.log("ok");   
    event.preventDefault();

    const id = document.getElementById("id").value;
    const cinema_name = document.getElementById("cinema_name").value;
    const movie_data = document.getElementById("movie_data").value;
    const movie_time = document.getElementById("movie_time").value;
    const seat_id = document.getElementById("seat_id").value;
    const price = document.getElementById("price").value;
   

    // console.log(time);
    const newdata = {
        cinema_name,
        movie_data,
       
        movie_time,
        price,
        seat_id,
       
    }
    // console.log(newdata);

    if (id) {
        await fetch("http://localhost:3000/seat/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newdata)
        });
    } else {
        // const id = document.getElementById("id").value;
        const cinema_name = document.getElementById("cinema_name").value;
        const movie_data = document.getElementById("movie_data").value;
        const movie_time = document.getElementById("movie_time").value;
        const seat_id = document.getElementById("seat_id").value;
        const price = document.getElementById("price").value;
        // const date = document.getElementById("date").value;
        const arrset = new Array(parseInt(seat_id)).fill(0);
        console.log(arrset);

        let seatData = [];

        // console.log(time);

        try {
            const response = await fetch("http://localhost:3000/time")
            const data = await response.json();
            console.log(data);

            
            const obj = data.find((v) => v.cinema_name === cinema_name && v.movie_data === movie_data);
            console.log(obj);

            let createAt = new Date(obj.creatAt);
            console.log(createAt);

            let expireDate = new Date(obj.date);

        
            console.log(expireDate);

            while (createAt <= expireDate) {
                console.log(createAt, expireDate);
                let obj = {
                    timeDate: new Date(createAt).toLocaleDateString(),
                    seat: arrset
                }
                // console.log(obj);
                seatData.push(obj);
                createAt.setDate(createAt.getDate() + 1)
            }

            const newdata = {
                cinema_name,
                movie_data,
                // date,
                movie_time,
                price,
                seat_id,
                seatData,
                createAt: new Date().toString(),
                updateAt: new Date().toString()
            }

            const response1 = await fetch("http://localhost:3000/seat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newdata),
            });

        } catch (error) {
            console.log(error);
        }

    }
}

const handeldisp = async () => {

    const response1 = await fetch("http://localhost:3000/cinema");
    const cinema_data = await response1.json();
    console.log(cinema_data);

    const response2 = await fetch("http://localhost:3000/movie");
    const movie_data = await response2.json();
    console.log(movie_data);

    const response3 = await fetch("http://localhost:3000/time");
    const time_data = await response3.json();
    console.log(time_data);

    const response4 = await fetch("http://localhost:3000/seat");
    const seat_data = await response4.json()
    console.log(seat_data);

    let print = '';

    print += `<table class="table" border = "1"><tr><th scope="col">cinema name</th><th scope="col">Movie Name</th><th scope="col">Time</th><th scope="col">Seat Number</th><th scope="col">Price</th><th scope="col">Action</th></tr>`

    seat_data.map((v) => {
        print += `<tr><td>${cinema_data.find((v1) => v1.id === v.cinema_name)?.cname}</td><td>${movie_data.find((v1) => v1.id === v.movie_data)?.name}</td><td>${v.movie_time}</td><td>${v.seat_id}</td><td>${v.price}</td><td><i onclick="handaleDlete('${v.id}')" class="fa-solid fa-trash"></i>   
        <i onclick = "handelEdit('${v.id}')"class="fa-solid fa-pen-to-square"></i></td></tr>`
    });
    print += '</table>'

    // time_data.find((v1)=>v1.id===movie_time)?.all_time

    document.getElementById("disp").innerHTML = print

}

const handlmoviedata = async (id = null) => {
    // event.preventDefault();
    // console.log(id);

    try {
        let cinema_name;
        if (typeof id === 'string') {
            cinema_name = id;
        } else {
            cinema_name = document.getElementById("cinema_name").value;
        }
        console.log(cinema_name);

        const response = await fetch("http://localhost:3000/movie");
        const data = await response.json();
        console.log(data);

        const newdata = data.filter((v) => v.cinema_name === cinema_name);
        console.log(newdata);

        let print = "<option value = '0'>---select Movie---</option>";

        newdata.map((v) => {
            print += `<option value="${v.id}">${v.name}</option>`
        })

        document.getElementById("movie_data").innerHTML = print;

        if (typeof id === 'string') {
            document.getElementById("movie_data").value = newdata[0].id;
        }
    } catch (error) {
        console.log(error);
    }
}

const handleTime = async (id = null, movie_time = null) => {
    console.log("iknju", id);
    try {
        if (typeof id === 'string') {
            movie_data = id;
        } else {
            movie_data = document.getElementById("movie_data").value;
        }
        console.log(movie_data);

        const response = await fetch("http://localhost:3000/time")
        const data = await response.json();
        console.log(data);

        const newdata = data.filter((v) => v.movie_data === movie_data);
        console.log(newdata);

        let print = "<option value = '0'>---select Time---</option>";

        newdata[0].all_time.map((v) => {
            print += `<option value="${v}">${v}</option>`
        })

        document.getElementById("movie_time").innerHTML = print;

        if (typeof id === 'string') {
            document.getElementById("movie_time").value = movie_time;
        }
    } catch (error) {
        console.log(error);
    }
}

const movieTime = document.getElementById("movie_data");
movieTime.addEventListener("change", handleTime)

const cinemadata = document.getElementById("cinema_name");
cinemadata.addEventListener("change", handlmoviedata);

const seatUser = document.getElementById("setForm");
seatUser.addEventListener("submit", handelSubmit)

window.onload = handelseat;