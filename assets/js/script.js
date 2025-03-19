const imgs = {
    k9tin: [
        "./assets/img/k9tin/picture-1.jpg",
        "./assets/img/k9tin/picture-2.jpg",
        "./assets/img/k9tin/picture-3.jpg",
        "./assets/img/k9tin/picture-4.jpg",
    ],
    k10tin: [
        "./assets/img/k10tin/k10tin-1.jpg",
        "./assets/img/k10tin/k10tin-2.jpg",
        "./assets/img/k10tin/k10tin-3.jpg",
    ],
    k3tn: [
        "./assets/img/k3tn/k3tn-1.jpg",
        "./assets/img/k3tn/k3tn-2.jpg",
        "./assets/img/k3tn/k3tn-3.jpg",
    ],
};

const previousBtn = document.getElementById("previous");
const nextBtn = document.getElementById("next");
const slider = document.getElementById("slider");
const btnGrade = document.querySelectorAll("a.grade__item");
const btnHeroGrade = document.querySelectorAll("div.hero__grade-item");

let cnt = 0;
let idImg = "k9tin";

btnGrade.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        btnGrade.forEach((btn) => btn.classList.remove("active"));
        btn.classList.add("active");
    });
});

btnHeroGrade.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        btnHeroGrade.forEach((btn) => btn.classList.remove("active"));
        btn.classList.add("active");
        idImg = btn.getAttribute("id");
        changeImage(0);
    });
});

function changeImage(newIndex) {
    slider.style.opacity = 0;
    setTimeout(() => {
        cnt = newIndex;
        slider.src = imgs[idImg][cnt];
        slider.style.opacity = 1;
    }, 800);
}

function changeImageInterval() {
    let newIndex = cnt + 1 >= imgs[idImg].length ? 0 : cnt + 1;
    changeImage(newIndex);
}

previousBtn.addEventListener("click", () => {
    let newIndex = cnt - 1 < 0 ? imgs[idImg].length - 1 : cnt - 1;
    changeImage(newIndex);
});

nextBtn.addEventListener("click", () => {
    let newIndex = cnt + 1 >= imgs[idImg].length ? 0 : cnt + 1;
    changeImage(newIndex);
});

setInterval(() => {
    changeImageInterval();
}, 10000);

const API_URL =
    "https://script.google.com/macros/s/AKfycbzta_GQnwvifHX-MmDrvQoPsIzz4JQHmnMSFw72Xlp3-0-LEJ5GgAjnj244IQqHKHVKbg/exec";

async function loadComments() {
    try {
        let response = await fetch(API_URL + "?action=get");
        if (!response.ok) throw new Error("Lỗi API");

        let data = await response.json();

        let commentSection = document.getElementById("comments");
        commentSection.innerHTML = "";

        data.forEach((comment) => {
            let div = document.createElement("div");
            div.classList.add("comment__item");
            div.innerHTML = `
                    <div class="comment__avatar">
                        <img src="./assets/icon/user.svg" alt=""/>
                    </div>
                    <p class="comment__text">${comment.comment}</p>
                    <button class="comment__btn" onclick="deleteComment(${comment.id})">Xóa</button>
                `;
            commentSection.insertBefore(div, commentSection.firstChild);
        });
    } catch (error) {
        console.error("Lỗi tải bình luận:", error);
    }
}

async function submitComment() {
    let comment = document.getElementById("comment__text").value;
    if (!comment.trim()) return;

    let button = document.getElementById("add__comment");
    button.disabled = true;

    try {
        await fetch(API_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ comment: comment }),
        });

        document.getElementById("comment__text").value = "";
        loadComments();
    } catch (error) {
        console.error("Lỗi gửi bình luận:", error);
    } finally {
        button.disabled = false;
    }
}

async function deleteComment(id) {
    try {
        await fetch(API_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "delete", id: id }),
        });

        loadComments();
    } catch (error) {
        console.error("Lỗi xóa bình luận:", error);
    }
}

document
    .getElementById("add__comment")
    .addEventListener("click", submitComment);
window.onload = loadComments;

const videoWrap = document.querySelector(".video__wrap");
const video = document.querySelector(".video");
const playBtn = document.querySelector(".video__play-btn");
console.log(playBtn);
playBtn.addEventListener("click", () => {
    playBtn.style.display = "none";
    video.play();
});

video.addEventListener("ended", () => {
    playBtn.style.display = "block";
    video.pause();
});

videoWrap.addEventListener("click", () => {
    playBtn.style.display = "none";

    if (video.paused) {
        video.play();
    } else {
        video.pause();
        playBtn.style.display = "block";
    }
});
