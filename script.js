const button = document.querySelector(".btn");
const title = document.querySelector(".title");
const text = document.querySelector(".text");
const image = document.querySelector(".img");
const video = document.querySelector(".video");

localStorage.test = "data";

async function fetchHandler(date) {
    if (date == null) {
        date = "";
    }
    try {
        const response = await fetch("https://api.nasa.gov/planetary/apod?date=" + date + "&api_key=C1JxCZ9Lzur3BBUN10SnVVDqO1uvDPkLV39aYmbb");
        if (response.ok) {
            const data = await response.json();
            if (data.url.includes("www.youtube.com")) {
                image.style.visibility = "hidden";
                video.style.visibility = "visible"
                video.src = data.url;
            } else {
                image.style.visibility = "visible";
                video.style.visibility = "hidden"
                image.src = data.url;
            }
            title.textContent = data.title;
            text.textContent = data.explanation
            localStorage.setItem("date", date);
        } else {
            alert("Day not found.");
            throw new Error("Day not found.");
        }

    } catch
        (error) {
        console.log(error);
    }

    document.querySelector(".container").classList.remove("loading");

}

button.addEventListener("click", () => {
    let isLoaded = image.complete;
    if (isLoaded) {
        fetchHandler(document.querySelector(".search-bar").value);
    }
});

document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            fetchHandler(document.querySelector(".search-bar").value);
        }
    });


fetchHandler(localStorage.getItem("date"));