document.addEventListener('DOMContentLoaded', () => {
    initVLibras();
    initFontResize();
});

/* --- 1. WIDGET VLIBRAS --- */
function initVLibras() {
    // Cria a estrutura HTML necessária para o VLibras dinamicamente
    const vlibrasContainer = document.createElement('div');
    vlibrasContainer.innerHTML = `
        <div vw class="enabled">
            <div vw-access-button class="active"></div>
            <div vw-plugin-wrapper>
                <div class="vw-plugin-top-wrapper"></div>
            </div>
        </div>
    `;
    document.body.appendChild(vlibrasContainer);

    // Cria o script do VLibras
    const script = document.createElement('script');
    script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
    script.onload = () => {
        // Inicializa o widget assim que o script carregar
        new window.VLibras.Widget('https://vlibras.gov.br/app');
    };
    document.body.appendChild(script);
}

/* --- 2. CONTROLE DE TAMANHO DA FONTE (A+ / A-) --- */
function initFontResize() {
    // Vamos criar um botão flutuante discreto no canto inferior esquerdo
    const controls = document.createElement('div');
    controls.className = 'accessibility-controls';
    controls.innerHTML = `
        <button id="btn-decrease" title="Diminuir Fonte">A-</button>
        <button id="btn-reset" title="Tamanho Normal">A</button>
        <button id="btn-increase" title="Aumentar Fonte">A+</button>
    `;
    document.body.appendChild(controls);

    // Lógica de redimensionamento
    let currentSize = 100; // Porcentagem

    const setSize = (size) => {
        document.documentElement.style.fontSize = `${size}%`;
        localStorage.setItem('fontSize', size); // Salva preferência
    };

    // Recupera preferência salva
    const savedSize = localStorage.getItem('fontSize');
    if(savedSize) {
        currentSize = parseInt(savedSize);
        setSize(currentSize);
    }

    document.getElementById('btn-increase').addEventListener('click', () => {
        if(currentSize < 130) {
            currentSize += 5;
            setSize(currentSize);
        }
    });

    document.getElementById('btn-decrease').addEventListener('click', () => {
        if(currentSize > 80) {
            currentSize -= 5;
            setSize(currentSize);
        }
    });

    document.getElementById('btn-reset').addEventListener('click', () => {
        currentSize = 100;
        setSize(currentSize);
    });
}