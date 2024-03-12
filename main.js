const categoriesText = ["your app.", "your website.", "mixed reality.", "Your idea."]

let scrollState = 0
let waitingForAnimation = false

let containerLogo = document.getElementById("container-logo")
let logo = document.getElementById("logo-main")
let categories = document.getElementById("categories-text")

let startX, startY
let startTime

document.addEventListener("wheel", function (event) {

    const direction = event.deltaY * 0.01

    console.log(scrollState)

    advanceWebpage(direction)
})

document.addEventListener("touchstart", (event) => {
    startX = event.touches[0].pageX
    startY = event.touches[0].pageY
    startTime = event.timeStamp
})

document.addEventListener("touchend", (event) => {
    console.log(event)
    let endX = event.changedTouches[0].pageX
    let endY = event.changedTouches[0].pageY
    let endTime = event.timeStamp

    let duration = endTime - startTime

    let directionX = endX - startX
    let directionY = endY - startY

    let treshold = 50

    if (duration < 500) {
        if (directionY < -treshold) {
            advanceWebpage(1)
        }
        if (directionY > treshold) {
            advanceWebpage(-1)
        }
    }
})

let arrow = document.getElementById("arrow")

arrow.addEventListener("click", () => {
    advanceWebpage(1)
})

function advanceWebpage(direction) {
    if (waitingForAnimation == false) {
        scrollState = Math.min(Math.max(0, scrollState + direction), 10);
        switch (scrollState) {

            case 0:

                containerLogo.animate([{ top: "30px" }], { duration: 700, fill: "forwards", easing: "ease" })
                containerLogo.animate([{ fontSize: "calc(min(16vw,110px))" }], { duration: 700, fill: "forwards", easing: "ease" })
                categories.animate([{ opacity: 0 }], { duration: 300, fill: "forwards", easing: "ease" })

                setTimeout(() => {
                    if (scrollState == 0) {
                        categories.textContent = ""
                        logo.textContent = "ncode."
                    }
                }, 400)

                break
            case 1:

                logo.textContent = "ncode"
                containerLogo.animate([{ top: "40vh" }], { duration: 700, fill: "forwards", easing: "ease" })
                containerLogo.animate([{ fontSize: "calc(min(24vw,160px))" }], { duration: 700, fill: "forwards", easing: "ease" })

                if (direction > 0) {
                    waitingForAnimation = true
                    setTimeout(() => {
                        animateElementVerticalSwipe(categories, direction, categoriesText[0])
                    }, 100)
                } else {
                    animateElementVerticalSwipe(categories, direction, categoriesText[0])
                }

                break
            case 2:

                animateElementVerticalSwipe(categories, direction, categoriesText[1])
                break
            case 3:
                animateElementVerticalSwipe(categories, direction, categoriesText[2])
                break
            case 4:
                animateElementVerticalSwipe(categories, direction, categoriesText[3])
                break
            default:


                /*
                if (scrollState > 5) {
                    document.body.style.overflowY = "auto"
                    document.body.style.height = "auto"
                } else {
                    document.body.style.overflowY = "hidden"
                    document.body.style.height = "100%"
                }*/
                break;
        }
    }
}

function animateElementVerticalSwipe(element, direction, text) {
    waitingForAnimation = true
    element.animate([{ top: "0em" }, { top: -direction + "em" }, { top: direction + "em" }, { top: "0em" }], { duration: 400, fill: "forwards", easing: "ease" })
    element.animate([{ opacity: 1 }, { opacity: -1 }, { opacity: -1 }, { opacity: -1 }, { opacity: 1 }], { duration: 400, fill: "forwards", easing: "linear" })

    setTimeout(() => {
        element.textContent = text
        waitingForAnimation = false
    }, 200)
}