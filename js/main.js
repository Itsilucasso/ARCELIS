const elementos = document.querySelectorAll(".typewriter");

const velocidadeEscrita = 60;
const velocidadeApagar = 40;
const tempoEspera = 1200;

elementos.forEach((elemento) => {

    const textoOriginal = elemento.textContent.trim();
    elemento.textContent = "";

    let index = 0;
    let apagando = false;

    function animar() {

        if (!apagando) {
            if (index < textoOriginal.length) {
                elemento.textContent += textoOriginal.charAt(index);
                index++;
                setTimeout(animar, velocidadeEscrita);
            } else {
                setTimeout(() => apagando = true, tempoEspera);
                setTimeout(animar, tempoEspera);
            }

        } else {
            if (index > 1) {
                elemento.textContent = textoOriginal.substring(0, index - 1);
                index--;
                setTimeout(animar, velocidadeApagar);
            } else {
                apagando = false;
                setTimeout(animar, 300);
            }
        }
    }

    animar();
});