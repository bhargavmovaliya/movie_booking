const handledelete = async (id) => {
    try {
        await fetch("http://localhost:3000/user/" + id, {
            method: 'DELETE'

        });
        // console.log(id);
    } catch (error) {
        console.log(error.message);
    }


}
const handleUpdate = async (id) => {
    // console.log(id);
    const response = await fetch("http://localhost:3000/user/")
    const data = await response.json();
    // console.log(data);
    const obj = data.find((v) => v.id === id)

    document.getElementById("id").value = obj.id
    document.getElementById("fname").value = obj.fname
    // document.getElementById("profile_img").value = obj.profile_img
    document.getElementById("email").value = obj.email
    document.getElementById("age").value = obj.age
    document.getElementById("status").value = obj.status
    document.getElementById("profile").src = obj.profile
   
}
const handaldisplay = async () => {

    try {
        const response = await fetch("http://localhost:3000/user")
        const data = await response.json();
        // console.log(data);

        let print = "";
        print += '<table class="table" border = "1"><tr><th scope="col">Name</th><th scope="col">Image</th><th scope="col">Email</th><th scope="col">Age</th><th scope="col">Status</th><th scope="col">Action</th></tr>';

        data.map((v) => {
            print += `<tr><td>${v.fname}</td><td><img width="70px" height="50px" src='${v.profile}'/></td><td>${v.email}</td><td>${v.age}</td><td>${v.status}</td><td><i onclick = handleUpdate('${v.id}') class="fa-solid fa-pen-to-square"></i>      <i onclick = handledelete('${v.id}') class="fa-solid fa-trash"></i></td></tr>`
        })
        document.getElementById("disp").innerHTML = print;
    } catch (error) {
        console.log(error.message);
    }

}


const handalsubmit = async () => {

    const id = document.getElementById("id").value
    const status = document.getElementById("status").value
    const profile = document.getElementById("profile").src
    // console.log(profile);
    try {
        if (id) {
            const response = await fetch("http://localhost:3000/user");
            const data = await response.json();
            // console.log(data);

            const obj = data.find((v) => v.id === id)
            console.log(obj);

            await fetch("http://localhost:3000/user/" + id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...obj, status,profile})
            });
        } else {

        }
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


    const profile = document.getElementById("profile").src = '../assets/images/user/' + arr[arr.length - 1]

    console.log(profile);



}

const userregiform = document.getElementById("userregiform")
userregiform.addEventListener("submit", handalsubmit)


const profileimg = document.getElementById("profile_img")
profileimg.addEventListener("change", handalimg) 
window.onload = handaldisplay;


