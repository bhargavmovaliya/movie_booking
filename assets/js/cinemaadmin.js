const handaleDlete = async (id) => {
    // console.log(id);
    await fetch("http://localhost:3000/cinema/" + id, {
        method: 'DELETE'
    })
}

const handelEdit = async (id) => {

    // console.log(id);
    try {
        const response = await fetch("http://localhost:3000/cinema");
        const data = await response.json();

        // console.log(data);
        const obj = data.find((v) => v.id === id)
        // console.log(obj);
        document.getElementById("id").value = obj.id;
        document.getElementById("cname").value = obj.cname;
        document.getElementById("address").value = obj.address;
        document.getElementById("number").value = obj.number;
        document.getElementById("email").value = obj.email;
        document.getElementById("cinema_img").src = obj.cinema_img;
    } catch (error) {
        console.log(error.message);
    }
}

const cinemaUser = async () => {
    const id = document.getElementById("id").value;
    const cname = document.getElementById("cname").value;
    const address = document.getElementById("address").value;
    const number = document.getElementById("number").value;
    const email = document.getElementById("email").value;
    const cinema_img = document.getElementById("cinema_img").src;
    // console.log(cinema_img);
    const newdata = {
        cname,
        address,
        number,
        email,
        cinema_img
    }
    // console.log(newdata);
    if (id) {
        console.log("update");
        // console.log(id);
        const response = await fetch("http://localhost:3000/cinema");
        const data = await response.json();

        console.log(data);

        await fetch("http://localhost:3000/cinema/" + id, {

            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newdata)
        });

    } else {
        console.log("add");
        const cname = document.getElementById("cname").value;
        const address = document.getElementById("address").value;
        const number = document.getElementById("number").value;
        const email = document.getElementById("email").value;
        const cinema_img = document.getElementById("cinema_img").src;

        const obj = {
            cname,
            address,
            number,
            email,
            cinema_img
        }
        // console.log(obj);

        const response = await fetch("http://localhost:3000/cinema", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj)
        })
    }

}

const cinemaDisplay = async () => {

    // console.log("ok");
    try {
        const response = await fetch("http://localhost:3000/cinema");
        const data = await response.json();

        // console.log(data);

        let print = '';

        print += `<table class="table" border = "1"><tr><th scope="col">cname</th><th scope="col">Profile</th><th scope="col">Address</th><th scope="col">Number</th><th scope="col">Email</th><th scope="col">Action</th></tr>`

        data.map((v) => {
            print += `<tr><td>${v.cname}</td><td><img src='${v.cinema_img}' width="100px" height="70px"/></td><td>${v.address}</td><td>${v.number}</td><td>${v.email}</td><td><i onclick="handaleDlete('${v.id}')" class="fa-solid fa-trash"></i>   
            <i onclick = "handelEdit('${v.id}')"class="fa-solid fa-pen-to-square"></i></td></tr>`
        })
        print += '</table>'

        document.getElementById("disp").innerHTML = print;

    } catch (error) {
        console.log(error.message);
    }

}

const handelImage = () => {
    console.log("yhju");

    const cinema_pic = document.getElementById("cinema_pic").value;
    console.log(cinema_pic);

    const arr = cinema_pic.split("\\");
    console.log(arr[arr.length - 1]);
    const cinema_img = document.getElementById("cinema_img").src = '../assets/images/cinema/' + arr[arr.length - 1];
    console.log(cinema_img);
}

const cinemaForm = document.getElementById("cinemaForm");
cinemaForm.addEventListener("submit", cinemaUser)

const cinema_pic = document.getElementById("cinema_pic");
cinema_pic.addEventListener("change", handelImage)

window.onload = cinemaDisplay;
