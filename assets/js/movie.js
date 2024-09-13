const handaleDlete = async (id) => {
    // console.log("ujhbn");
    await fetch("http://localhost:3000/movie/" + id, {
        method: 'DELETE',
    });
}

const handelEdit = async (id) => {
    // console.log(id);
    try {
        const response = await fetch("http://localhost:3000/movie");
        const data = await response.json();
        // console.log(data);
        const obj = data.find((v) => v.id === id)
        // console.log(obj);

        document.getElementById("id").value = obj.id;
        document.getElementById("cinema_name").value = obj.cinema_name;
        document.getElementById("name").value = obj.name;
        document.getElementById("des").value = obj.des;
        document.getElementById("movie_img").src = obj.movie_img;
    } catch (error) {
        console.log(error.message);
    }
}

const handelSubmit = async () => {
    // console.log("ok");
    try {
        const id = document.getElementById("id").value;
        const cinema_name = document.getElementById("cinema_name").value;
        const name = document.getElementById("name").value;
        const des = document.getElementById("des").value;
        const movie_img = document.getElementById("movie_img").src;

        // console.log(profile_img);
        const newdata = {
            name,
            des,
            cinema_name,
            movie_img
        }
        console.log(newdata);

        if (id) {
            // console.log("update");

            await fetch("http://localhost:3000/movie/" + id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newdata)
            });
        } else {
            // console.log("add");
            const cinema_name = document.getElementById("cinema_name").value;
            const name = document.getElementById("name").value;
            const des = document.getElementById("des").value;
            const movie_img = document.getElementById("movie_img").src;

            // console.log(profile_img);
            const obj = {
                name,
                des,
                cinema_name,
                movie_img
            }
            console.log(obj);

            const response = await fetch("http://localhost:3000/movie", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj),
            });
        }
    } catch (error) {
        console.log(error.message);
    }
}

const handelCinema = async () => {
    // console.log("ok");
    try {
        const response = await fetch("http://localhost:3000/cinema");
        const cinema_data = await response.json();
        // console.log(cinema_data);

        let print = "<option value = '0'>---select movie---</option>";

        cinema_data.map((v) => {
            print += `<option value="${v.id}">${v.cname}</option>`
        })

        document.getElementById("cinema_name").innerHTML = print;
    } catch (error) {
        console.log(error);

    }
    try {
        const cinema_name = document.getElementById("cinema_name").value;
        // console.log(cinema_name);
        const name = document.getElementById("name").value;
        const des = document.getElementById("des").value;

        const obj = {
            cinema_name,
            name,
            des
        }
        // console.log(obj);

        const response1 = await fetch("http://localhost:3000/cinema");
        const cinema_data = await response1.json();
        console.log(cinema_data);


        const response = await fetch("http://localhost:3000/movie");
        const data = await response.json();

        console.log(data);

        let print = '';

        print += `<table class="table" border = "1"><tr><th scope="col">cinema name</th><th scope="col">Movie Img</th><th scope="col">Movie Name</th><th scope="col">Description</th><th scope="col">Action</th></tr>`

        data.map((v) => {
            print += `<tr><td>${cinema_data.find((v1) => v1.id === v.cinema_name)?.cname}</td><td><img src= '${v.movie_img}' width="100px" height="60px"/></td><td>${v.name}</td><td>${v.des}</td><td><i onclick="handaleDlete('${v.id}')" class="fa-solid fa-trash"></i>   
            <i onclick = "handelEdit('${v.id}')"class="fa-solid fa-pen-to-square"></i></td></tr>`
        });

        print += '</table>'

        document.getElementById("disp").innerHTML = print;

    } catch (error) {
        console.log(error.message);
    }
}

const handelImage = () => {
    console.log("yhju");

    const movie_pic = document.getElementById("movie_pic").value;
    // console.log(movie_pic);

    const arr = movie_pic.split("\\");
    console.log(arr[arr.length - 1]);
    const movie_img = document.getElementById("movie_img").src = '../assets/images/movie/' + arr[arr.length - 1];
    console.log(movie_img);
}

const movie_pic = document.getElementById("movie_pic");
movie_pic.addEventListener("change", handelImage)

const movieForm = document.getElementById("movieForm");
movieForm.addEventListener("submit", handelSubmit)

window.onload = handelCinema;