const categoriesText = ["your app.", "your website.", "mixed reality.", "Your idea."]

var scrollState = 0
let waitingForAnimation = false

let containerLogo = document.getElementById("container-logo")
let logo = document.getElementById("logo-main")
let categories = document.getElementById("categories-text")
let buttons = document.getElementById("buttons")
let arrow = document.getElementById("arrow")

let startX, startY
let startTime

document.addEventListener("wheel", function (event) {

    const direction = 1 * Math.sign(event.deltaY)

    console.log(scrollState)

    advanceWebpage(direction)

    console.log(scrollState)
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

    if (duration < 800) {
        if (directionY < -treshold) {
            advanceWebpage(1)
        }
        if (directionY > treshold) {
            advanceWebpage(-1)
        }
    }
})

arrow.addEventListener("click", () => {
    advanceWebpage(1)
})

function advanceWebpage(direction) {
    if (waitingForAnimation == false) {
        scrollState = Math.min(Math.max(0, scrollState + direction), 7);
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
                buttons.animate([{ color: "#FFFFFF" }], { duration: 700, fill: "forwards", easing: "ease" })

                containerLogo.animate([{ color: "#FFFFFF" }], { duration: 700, fill: "forwards", easing: "ease" })

                arrow.animate([{ borderBottom: "2px solid white" }], { duration: 700, fill: "forwards", easing: "ease" })
                arrow.animate([{ borderRight: "2px solid white" }], { duration: 700, fill: "forwards", easing: "ease" })

                if (direction < 0) {
                    logo.textContent = "ncode"
                    containerLogo.animate([{ top: "40vh" }], { duration: 700, fill: "forwards", easing: "ease" })
                    containerLogo.animate([{ fontSize: "calc(min(24vw,160px))" }], { duration: 700, fill: "forwards", easing: "ease" })
                }

                document.getElementById("cards").style.display = "none"
                document.getElementById("info").style.display = "none"
                break
            case 5:
                animateElementVerticalSwipe(categories, direction, "")
                buttons.animate([{ color: "#000000" }], { duration: 700, fill: "forwards", easing: "ease" })

                containerLogo.animate([{ top: "30px" }], { duration: 700, fill: "forwards", easing: "ease" })
                containerLogo.animate([{ fontSize: "calc(min(16vw,110px))" }], { duration: 700, fill: "forwards", easing: "ease" })
                containerLogo.animate([{ color: "#000000" }], { duration: 700, fill: "forwards", easing: "ease" })

                arrow.animate([{ borderBottom: "2px solid black" }], { duration: 700, fill: "forwards", easing: "ease" })
                arrow.animate([{ borderRight: "2px solid black" }], { duration: 700, fill: "forwards", easing: "ease" })

                setTimeout(() => {
                    if (scrollState == 5) {
                        categories.textContent = ""
                        logo.textContent = "ncode."
                    }
                }, 400)

                document.getElementById("cards").style.display = "block"
                document.getElementById("info").style.display = "none"
                break
            case 6:
                document.getElementById("cards").style.display = "none"
                document.getElementById("info").style.display = "block"
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