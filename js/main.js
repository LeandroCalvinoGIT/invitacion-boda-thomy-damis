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
