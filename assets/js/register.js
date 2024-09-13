const handalsubmit = async () => {
    try {

        const fname = document.getElementById("fname").value
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value
        const age = document.getElementById("age").value
        const profile = document.getElementById("profile").src

        const obj = {
            fname,
            // profile_img,
            email,
            password,
            age,
            status: 'panding',
            profile,
            'createdAt': new Date().toString(),
            'updatedAt': new Date().toString(),
        }

        const response = await fetch("http://localhost:3000/user", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj)
        })
    } catch (error) {
        console.log(error.message);
    }

}
const handalimg = () => {
    // console.log("ffffffffff");
    const profile_img = document.getElementById("profile_img").value
    console.log(profile_img);

    let arr = profile_img.split("\\");
    // console.log(arr[arr.length-1]);


    const profile = document.getElementById("profile").src = './assets/images/user/' + arr[arr.length - 1]

    console.log(profile);



}
const registrationform = document.getElementById("registrationform")
registrationform.addEventListener("submit", handalsubmit)

const profileimg = document.getElementById("profile_img")
profileimg.addEventListener("change", handalimg) 