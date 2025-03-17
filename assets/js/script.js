const imgs = [
    "./assets/img/k9tin/picture-1.jpg",
    "./assets/img/k9tin/picture-2.jpg",
    "./assets/img/k9tin/picture-3.jpg",
    "./assets/img/k9tin/picture-4.jpg",
];

const previousBtn = document.getElementById("previous");
const nextBtn = document.getElementById("next");
const slider = document.getElementById("slider");

let cnt = 0;

function changeImage(newIndex) {
    slider.style.opacity = 0;
    setTimeout(() => {
        cnt = newIndex;
        slider.src = imgs[cnt];
        slider.style.opacity = 1;
    }, 800);
}

function changeImageInterval() {
    let newIndex = cnt + 1 >= imgs.length ? 0 : cnt + 1;
    changeImage(newIndex);
}

previousBtn.addEventListener("click", () => {
    let newIndex = cnt - 1 < 0 ? imgs.length - 1 : cnt - 1;
    changeImage(newIndex);
});

nextBtn.addEventListener("click", () => {
    let newIndex = cnt + 1 >= imgs.length ? 0 : cnt + 1;
    changeImage(newIndex);
});

setInterval(() => {
    changeImageInterval();
}, 10000);
