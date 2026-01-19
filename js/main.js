// SCROLL FADEUP
document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        { threshold: 0.2 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach(el => {
        observer.observe(el);
    });
});



// COUNTDOWN
const weddingDate = new Date("2026-03-14T18:00:00").getTime();

setInterval(() => {
    const now = new Date().getTime();
    const difference = weddingDate - now;

    if (difference <= 0) {
        document.getElementById("countdown").innerHTML = 
        "<p>¡Llegó el gran día! 💍</p>";
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;

}, 1000);


// CARROUSEL
document.querySelectorAll(".carousel").forEach(carousel => {
    const track = carousel.querySelector(".carousel-track");
    let slides = Array.from(track.children);
    let index = 0;
    let slideWidth = slides[0].getBoundingClientRect().width;

    function cloneSlides() {
        slides.forEach(slide => {
            track.appendChild(slide.cloneNode(true));
        });
    }

    cloneSlides();

    function updateSizes() {
        slides = Array.from(track.children);
        slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${index * slideWidth}px)`;
    }

    function move() {
        index++;
        track.style.transform = `translateX(-${index * slideWidth}px)`;

        if (index >= slides.length / 2) {
            setTimeout(() => {
                track.style.transition = "none";
                index = 0;
                track.style.transform = "translateX(0)";
                track.offsetHeight;
                track.style.transition = "transform 0.6s ease";
            }, 600);
        }
    }

    setInterval(move, 3500);
    window.addEventListener("resize", updateSizes);
});



// CONFIRMAR ASISTENCIA

const form = document.getElementById("rsvp-form");
const toast = document.getElementById("toast");
const loader = document.getElementById("loader");

function showToast(text, type) {
    toast.textContent = text;
    toast.className = `toast ${type} show`;

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.classList.add("hidden"), 400);
    }, 3500);
}

function showLoader(show) {
    loader.classList.toggle("hidden", !show);
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const asistencia = form.asistencia.value;

    const data = {
        nombre: form.nombre.value,
        asistencia,
        alimentacion: form.alimentacion.value,
        comentarios: form.comentarios.value
    };

    showLoader(true);

    try {
        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbw-7Vl14ljtiWzOeldXpXz-wHV33EwkQupYIta0FukIacG6dlnBzD_d5UD9w0oeTA6sUg/exec",
            {
                method: "POST",
                body: JSON.stringify(data)
            }
        );

        showLoader(false);

        if (response.ok) {
            if (asistencia === "no") {
                showToast(
                    "Gracias por avisarnos 💛 Lamentamos no verte, pero entendemos.",
                    "success"
                );
            } else {
                showToast(
                    "¡Confirmación enviada! 💛 Te esperamos para celebrar juntos.",
                    "success"
                );
            }

            form.reset();
        } else {
            showToast(
                "Hubo un problema al enviar la confirmación.",
                "error"
            );
        }

    } catch (error) {
        showLoader(false);
        showToast(
            "No se pudo conectar. Intentá nuevamente.",
            "error"
        );
    }
});

const toggleBtn = document.getElementById("toggle-regalos");
const regalosBox = document.getElementById("datos-regalos");

toggleBtn.addEventListener("click", () => {
    regalosBox.classList.toggle("hidden");
});

document.querySelectorAll(".copy-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const targetId = btn.dataset.copy;
        const text = document.getElementById(targetId).textContent;

        navigator.clipboard.writeText(text);

        showToast("Copiado al portapapeles ✨", "success");
    });
});
