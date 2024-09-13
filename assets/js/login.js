
const hanalsubmit = async () => {
    // console.log("skdjisi");
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    const response = await fetch("http://localhost:3000/user");
    const data = await response.json();
    // console.log(data);

    let flag = 0;
    data.map((v) => {

        if (v.email === email && v.password === password) {
            // console.log('login suss');
            if (v.status === 'active') {
                flag = 1;

            } else {
                flag = 2;
            }
        }
    });

    if (flag === 0) {
        console.log("invalid ");
    } else if (flag === 1) {
        console.log("login successfully");
        window.location.href = 'http://127.0.0.1:5500/home.html'
    } else if (flag === 2) {
        console.log("not active");
    }
}

const loginform = document.getElementById("login_form");
loginform.addEventListener("submit", hanalsubmit)