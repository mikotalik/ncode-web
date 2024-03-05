const categoriesText = ["your website.", "your e-shop.", "your app.", "Mixed Reality."]

let scrollState = 0;

let containerLogo = document.getElementById("container-logo")
let logo = document.getElementById("logo-main")
let categories = document.getElementById("categories-text")

document.addEventListener("wheel", function (event) {
    const direction = event.deltaY * 0.01

    scrollState = Math.min(Math.max(0, scrollState + direction), 10);

    console.log(scrollState)

    switch (scrollState) {
        case 0:
            
            containerLogo.animate([{ top: "30px" }], { duration: 900, fill: "forwards", easing: "ease" })
            containerLogo.animate([{ fontSize: "6em" }], { duration: 900, fill: "forwards", easing: "ease" })
            categories.animate([{opacity:0}], { duration: 300, fill: "forwards", easing: "ease" })

            setTimeout(() => {
                if (scrollState == 0) {
                    categories.textContent = ""
                    logo.textContent = "ncode."
                }
            }, 800)
            break;
        case 1:
            logo.textContent = "ncode"
            containerLogo.animate([{ top: "40vh" }], { duration: 900, fill: "forwards", easing: "ease" })
            containerLogo.animate([{ fontSize: "10em" }], { duration: 900, fill: "forwards", easing: "ease" })
            

            setTimeout(() => {
                if (scrollState == 1) {
                    categories.textContent = categoriesText[0]
                    categories.animate([{opacity:1}], { duration: 300, fill: "forwards", easing: "ease" })
                }
            }, 800)

        default:
            break;
    }
})