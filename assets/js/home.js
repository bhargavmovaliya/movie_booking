
const cinema = async () => {

    console.log("huythj");
    const response = await fetch('http://localhost:3000/cinema');
    const data = await response.json();

    console.log(data);

    let print = '';

    data.map((v) => {
        print += `<div class="swiper-slide">
       <div class="cinemaCard">
       <div>${v.cname}</div>
       <a href="#" onclick="handelcinema('${v.id}')">
            <img id="cinemaImage" width='200px' height='200px'src="${v.cinema_img}" alt="${v.name}"/></a>
            <p>${v.address}</p>
            <p>${v.number}</p>
            <p>${v.email}</p>
        </div>
        </div>`;
    })

    document.getElementById("cinemaData").innerHTML = print;
}

const movie = async () => {
    console.log("ok");
    const response = await fetch('http://localhost:3000/movie');
    const data = await response.json();

    console.log(data);

    let print = '';

    data.map((v) => {
        print += `<div class="swiper-slide">
        <div class="movieCard">
            <div>${v.name}</div>
            <a href="#">
            <img id="movieImage" width='300px' height='250px'src="${v.movie_img}" alt="${v.name}"/>
            </a>
            <p>${v.des}</p>
            </div>
            
        </div>`;
    })

    document.getElementById("movieData").innerHTML = print;
}

// const handelcinema = async(id) => {
//     // console.log("ok");
//     console.log(id);

//     // localStorage = setItem()
// }

const handelcinema = async (id) => {

    console.log("ok");
    console.log(id);
    localStorage.setItem("cinema_name", id);
    // console.log(cinema_name);
    window.location.href = "http://127.0.0.1:5500/cinemmovie.html"
}

// const handelmovie = async (id) => {
//     console.log("ok");
//     console.log(id);
//     localStorage.setItem("name", id);
//     console.log(localStorage);

//     window.location.href = "movie.html";
// }

window.onload = () => {
    cinema();
    movie();
}
