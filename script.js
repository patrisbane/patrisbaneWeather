let button = document.getElementById("button");
let ricardo = document.getElementById("ricardo");

const randomNum = (num) => {
    return Math.floor(Math.random() * num);
}

const randomDimension = (num) => {
    let dimension = randomNum(num) + "px";
    return dimension;
}

const randomColor = (differentColor) => {
    let color;
    if (!differentColor) {
        let num = randomNum(7);
        switch (num) {
            case 0:
                color = "red";
                break;
            case 1:
                color = "orange";
                break;
            case 2:
                color = "yellow";
                break;
            case 3:
                color = "green";
                break;
            case 4:
                color = "blue";
                break;
            case 5:
                color ="black";
                break;
            default:
                color = "purple";
                break;
        };
    } else {
        do {
            let num = randomNum(7);
            switch (num) {
                case 0:
                    color = "red";
                    break;
                case 1:
                    color = "orange";
                    break;
                case 2:
                    color = "yellow";
                    break;
                case 3:
                    color = "green";
                    break;
                case 4:
                    color = "blue";
                    break;
                case 5:
                    color ="black";
                    break;
                default:
                    color = "purple";
                    break;
            };
        } while  (color === differentColor);
    }
    return color;
}

const randomColors = (color) => {
    button.style.backgroundColor = randomColor();
    button.style.color = randomColor(button.style.backgroundColor);
}

const randomDimensions = (num) => {
    ricardo.style.width = randomDimension(num);
    ricardo.style.height = randomDimension(num);
}
button.onwheel = function() {
    randomDimensions(500);
    randomColors();
}
