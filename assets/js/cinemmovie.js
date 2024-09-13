const cinema = async () => {
    const cinemaget = localStorage.getItem("cinema_name");
    console.log(cinemaget);

    const response = await fetch('http://localhost:3000/cinema');
    const data = await response.json();
    console.log(data);

    const newData = data.find((v) => v.id === cinemaget);
    console.log(newData);

    // let print = '';
    // print += `<div>
    //     <h2>${newData.cname}</h2>
    //     <a href=""><img id="cinemaImage" src="${newData.cinema_img}" alt="${newData.name}"/></a>
    //      <p>${newData.address}</p>
    //         <p>${newData.number}</p>
    //         <p>${newData.email}</p>

    // </div>`;

    // document.getElementById("cinemaData").innerHTML = print;

    if (newData) {
        await movie(newData.id)
    }
}

const movie = async (cinema_name) => {
    // const cinemaget = localStorage.getItem("cinema_name");
    // console.log(cinemaget);

    const response = await fetch('http://localhost:3000/movie');
    const data = await response.json();

    const movie_print = data.filter((movie) => movie.cinema_name === cinema_name);
    console.log(movie_print);

    let print = '';

    movie_print.map((v) => {
        console.log(v);
        print += `<div class="cinemaCard">
            <div>${v.name}</div>
            <a href="#" onclick="handeltime('${v.id}')"><img id="cinemaImage" src="${v.movie_img}" /></a>
            <p>${v.des}</p>
        </div>`;
    });

    document.getElementById("movidata").innerHTML = print;

    // if (newData) {
    //     await movie(newData.id)
    // }
}
const handeltime = async (id) => {
    
    console.log("ok");
    console.log(id);

    localStorage.setItem("movie_time", id);
    console.log(localStorage);

    window.location.href = "http://127.0.0.1:5500/movietime.html";
}

window.onload = () => { 
    movie();
    cinema();
}