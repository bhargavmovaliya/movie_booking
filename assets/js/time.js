const handaleDlete = async (id) => {
    // console.log("ujhbn");
    await fetch("http://localhost:3000/time/" + id, {
        method: 'DELETE',
    });
}

const handeltimeUser = async () => {
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

    try {
        const response = await fetch("http://localhost:3000/movie");
        const movie_data = await response.json();
        // console.log(movie_data);

        let print = "<option value = '0'>---select Movie---</option>";

        movie_data.map((v) => {
            print += `<option value="${v.id}">${v.name}</option>`
        })

        document.getElementById("movie_data").innerHTML = print;

    } catch (error) {
        console.log(error);
    }
    handaldisp()
}

const handelEdit = async (id, event) => {
    console.log(id);
    try {
        const response = await fetch("http://localhost:3000/time");
        const data = await response.json();
        // console.log(data);
        const obj = data.find((v) => v.id === id);

        // console.log(obj, time);

        document.getElementById("id").value = obj.id;
        document.getElementById("cinema_name").value = obj.cinema_name;
        document.getElementById("movie_data").value = obj.movie_data;
        document.getElementById("date").value = obj.date;
        // document.getElementById("movie_time").value = obj.movie_time;
        // document.getElementsByName("movietime");

        document.getElementById("allTimes").innerHTML = '';

        for (i = 0; i < obj.all_time.length; i++) {
            // console.log(obj.time[i]);    
            handelAddTime(event, obj.all_time[i]);
        }
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
    const date = document.getElementById("date").value;
    // const movie_time = document.getElementById("movie_time").value;

    let all_time = [];

    const time = document.getElementsByName("movietime");
    // console.log(time[0].value);

    for (let i = 0; i < time.length; i++) {
        // console.log(time[0].value);
        all_time.push(time[i].value)
    }

    console.log(all_time);

    // console.log(time);
    const newdata = {
        id,
        cinema_name,
        movie_data,
        date,
        all_time,
        "creatAt": new Date().toString(),
        "updateAt": new Date().toString()
    }

    console.log(newdata);

    if (id) {
        await fetch("http://localhost:3000/time/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newdata)
        });

    } else {
        const id = document.getElementById("id").value;
        const cinema_name = document.getElementById("cinema_name").value;
        const movie_data = document.getElementById("movie_data").value;
        const date = document.getElementById("date").value;

        // let all_time = [];

        // const time = document.getElementsByName("movietime");
        // // console.log(time[0].value);

        // for (let i = 0; i < time.length; i++) {
        //     // console.log(time[0].value);
        //     all_time.push(time[i].value)
        // }

        // console.log(all_time);

        const newdata = {
            cinema_name,
            movie_data,
            date,
            movie_time,
            all_time,
            "creatAt": new Date().toString(),
            "updateAt": new Date().toString()
        }

        // console.log(newdata);
        // console.log(movie_time);

        try {
            await fetch("http://localhost:3000/time", {
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

const handaldisp = async () => {
    const response1 = await fetch("http://localhost:3000/cinema");
    const cinema_data = await response1.json();
    console.log(cinema_data);

    const response2 = await fetch("http://localhost:3000/movie");
    const movie_data = await response2.json();

    console.log(movie_data);

    const response = await fetch("http://localhost:3000/time");
    const data = await response.json();

    console.log(data);

    let print = '';

    print += `<table class="table" border = "1"><tr><th scope="col">cinema name</th><th scope="col">Movie Name</th><th scope="col">Date</th><th scope="col">Time</th><th scope="col">Action</th></tr>`

    data.map((v) => {
        print += `<tr><td>${cinema_data.find((v1) => v1.id === v.cinema_name)?.cname}</td><td>${movie_data.find((v1) => v1.id === v.movie_data)?.name}</td><td>${v.date}</td><td>${v.all_time}</td><td><i onclick="handaleDlete('${v.id}')" class="fa-solid fa-trash"></i>   
        <i onclick = "handelEdit('${v.id}',event)"class="fa-solid fa-pen-to-square"></i></td></tr>`
    });
    // cinema_data.find((v1) => v1.id === v.cinema_name).cname
    // movie_data.find((v1) => v1.id === v.movie_data).name

    print += '</table>'

    document.getElementById("disp").innerHTML = print
}

const handelRmoveTime = (id) => {
    console.log(id);
    document.getElementById("row-" + id).remove();
}

const handelAddTime = (event, value) => {
    // console.log("tyu");
    event.preventDefault();

    const rNo = Math.floor(Math.random() * 1000);
    // console.log(rNo);

    const divEle = document.createElement("div");
    divEle.setAttribute("id", "row-" + rNo);

    const inputEle = document.createElement("input");
    inputEle.setAttribute("type", "time")
    inputEle.setAttribute("name", "movietime");
    inputEle.setAttribute("value", value);

    const plusbtn = document.createElement("button");
    plusbtn.setAttribute("onclick", "handelAddTime(event)");
    const btnText = document.createTextNode("+");
    plusbtn.appendChild(btnText);

    divEle.appendChild(inputEle);
    divEle.appendChild(plusbtn);

    if (document.getElementById("allTimes").children.length > 0) {
        const minusbtn = document.createElement("button");
        minusbtn.setAttribute("onclick", `handelRmoveTime(${rNo})`);
        const rmoveText = document.createTextNode("-");
        minusbtn.appendChild(rmoveText);
        divEle.appendChild(minusbtn)
    }

    document.getElementById("allTimes").appendChild(divEle);
}

const handlmoviedata = async () => {
    try {
        const cinema_name = document.getElementById("cinema_name").value;
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

    } catch (error) {
        console.log(error);
    }
}

const cinemadata = document.getElementById("cinema_name");
cinemadata.addEventListener("change", handlmoviedata);

const timeUser = document.getElementById("time");
timeUser.addEventListener("submit", handelSubmit);

window.onload = handeltimeUser;
