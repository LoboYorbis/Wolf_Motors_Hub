import MostrarAutos from "./Filters.js";
import { autos } from "./Data.js";

// 1. FUNCIÓN PARA PINTAR LAS TARJETAS 
export function PintarTarjetasEURO(lista) { // <-- Le cambiamos el nombre para que no choque con USA
    const contenedor = document.getElementById("contenedor-cards-euro");

    if (!contenedor) {
        console.error("No encontré el contenedor 'contenedor-cards-euro'");
        return;
    }

    contenedor.innerHTML = "";

    lista.forEach(auto => {
        const card = document.createElement('div');
        card.classList.add('card-auto');

        card.innerHTML = `
            <img class="img-card-auto" src="${auto.img}" alt="${auto.modelo}">
            <div class="info-car">
                <h3>${auto.marca} ${auto.modelo}</h3>
                <p class="precio">${auto.precio}</p>
                <button class="btn-ver-detalles">Ver Detalles</button>
            </div>
        `;

        const btnDetalles = card.querySelector('.btn-ver-detalles');
        btnDetalles.addEventListener('click', () => {
            abrirDetallesWolfEURO(auto);
        });

        contenedor.appendChild(card);
    });
}

// 2. FUNCIÓN PARA EL MODAL 
function abrirDetallesWolfEURO(coche) { // <-- Nombre único
    let modalContainer = document.getElementById('wolf-modal-container-euro');

    if (!modalContainer) {
        modalContainer = document.createElement('div');
        modalContainer.id = 'wolf-modal-container-euro'; // <-- ID único
        document.body.appendChild(modalContainer);
    }

    modalContainer.innerHTML = `
        <div id="wolf-modal-euro" class="modal-overlay">
            <div class="modal-content">
                <button id="close-modal-euro" class="close-btn">&times;</button>
                
                <div class="modal-grid">
                    <div class="modal-image-container">
                        <img src="${coche.img}" alt="${coche.marca} ${coche.modelo}">
                        <div class="info-car">
                            <h2 class="wolf-title">${coche.marca} ${coche.modelo}</h2>
                            <p class="wolf-price">${coche.precio}</p>
                        </div>
                    </div>
                    
                    <div class="modal-specs">
                        <div class="specs-list">
                            <div class="spec-item">
                                <span class="spec-label">Motor:</span>
                                <span class="spec-value">${coche.specs}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Tipo de motor:</span>
                                <span class="spec-value">${coche.detail.tipo_motor}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Aceleración:</span>
                                <span class="spec-value">${coche.detail.aceleracion}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Torque:</span>
                                <span class="spec-value">${coche.detail.torque}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Transmisión:</span>
                                <span class="spec-value">${coche.detail.transmision}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Tipo de transmisión:</span>
                                <span class="spec-value">${coche.detail.tipo_transmision}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Frenos:</span>
                                <span class="spec-value">${coche.detail.frenos}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Consumo:</span>
                                <span class="spec-value">${coche.detail.consumo}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Medidas:</span>
                                <span class="spec-value">${coche.detail.medidas}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Seguridad:</span>
                                <span class="spec-value">${coche.detail.seguridad}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Airbags:</span>
                                <span class="spec-value">${coche.detail.airbags}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Extra:</span>
                                <span class="spec-value">${coche.detail.extra}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Categoría:</span>
                                <span class="spec-value">${coche.categoria}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    const btnCerrar = document.getElementById('close-modal-euro');
    const fondoModal = document.getElementById('wolf-modal-euro');

    btnCerrar.onclick = () => modalContainer.innerHTML = '';
    fondoModal.onclick = (e) => {
        if (e.target.id === 'wolf-modal-euro') modalContainer.innerHTML = '';
    };
}

// 3. GESTIÓN DE FILTROS JDM
let filtrosActivosEURO = { brand: "*", category: "*" };

function SetupFiltrosEURO() {
    const botonesMarca = document.querySelectorAll("#Page-EURO .btn-filter-brand");
    botonesMarca.forEach(boton => {
        boton.addEventListener("click", (e) => {
            filtrosActivosEURO.brand = e.target.dataset.value;
            ActualizarCatalogoJDM();
        });
    });

    const botonesCat = document.querySelectorAll("#Page-EURO .btn-filter-category");
    botonesCat.forEach(boton => {
        boton.addEventListener("click", (e) => {
            filtrosActivosEURO.category = e.target.dataset.value;
            ActualizarCatalogoEURO();
        });
    });
}

function ActualizarCatalogoEURO() {
    const resultados = MostrarAutos("europeos", filtrosActivosEURO.brand, filtrosActivosEURO.category);
    PintarTarjetasEURO(resultados);
}

// 4. LÓGICA DE NAVEGACIÓN
const btnEURO = document.getElementById("euro");
if (btnEURO) {
    btnEURO.addEventListener('click', () => {
        AbrirEURO();
    });
}

function AbrirEURO() {
    const content = document.getElementById("Page-EURO");
    const PageHome = document.getElementById("Page-Home");

    if (PageHome) PageHome.style.display = "none";
    if (content) content.style.display = "block";

    content.innerHTML = `
    <section class="Body-EURO">
        <section class="header-EURO">
            <div class="header-EURO-content">
                <h1 class="Title-Header-EURO">Wolf Dealers</h1>
                <div class="header-EURO-content-buttons">
                    <button id="btn-back-home-euro">Home</button>
                </div>
            </div>
        </section>

        <section class="Bienvenida-EURO">
            <div class="IMG-Bienvenida">
                <img class="img-principal" src="./Assent/EU/EURO-Bienvenida.jpg" alt="Supra Home">
            </div>
            <div class="Text-Bienvenida">
                <h2 class="Title-Container-Car-EURO">Wolf Motors EURO</h2>
                <p class="Parraf-Container-Car-EURO">Bienvenido a Wolf Dealer, el epicentro de la excelencia automotriz europea. 
                Aquí, la ingeniería alemana se encuentra con el diseño italiano y la sofisticación británica. Desde el rugido de un motor atmosférico 
                en Stuttgart hasta la precisión aerodinámica de las pistas de Nürburgring, nuestra selección representa la cumbre del rendimiento y el lujo. 
                No vendemos máquinas; ofrecemos el legado de décadas de dominio en el asfalto. Siente la precisión, vive la herencia.</p>
            </div>
        </section>

        <section class="History-Car-EURO">
            <div class="Div-History-Text-EURO">
                <h2>Crónicas del Asfalto: El Legado de la Ingeniería Europea</h2>
                <p class="Text-History-EURO">Detrás de cada volante y bajo cada capó de ingeniería europea, reside una narrativa de ambición y triunfo. 
                Esta sección no es solo un registro de fechas, sino un tributo a los visionarios que desafiaron los límites de la física y la estética. 
                Desde los talleres artesanales de principios del siglo XX hasta los laboratorios de alta tecnología de la actualidad, te invitamos a recorrer los 
                hitos que transformaron simples máquinas de metal en auténticas leyendas del asfalto. Bienvenidos al origen de la perfección.</p>
            </div>
            <div class="Div-EURO">
                <div class="Div-History-IMG-EURO"> 
                    <img src="./Assent/JDM/JDM-History-1.jpg" alt="">
                    <p class="Text-History-3-EURO">Benz (1886): Karl Benz patenta el primer auto de la historia; el Big Bang de la movilidad nació en Alemania.</p>
                    <img src="./Assent/JDM/JDM-History-1.jpg" alt="">
                    <p class="Text-History-3-EURO">Flechas de Plata: Los Mercedes imbatibles de los años 30 que forjaron la leyenda del dominio plateado en las pistas.</p>
                    <img src="./Assent/JDM/JDM-History-1.jpg" alt="">
                    <p class="Text-History-3-EURO">El Legado 911: En 1963 Porsche creó un diseño "imposible" que se convirtió en el estándar de todo deportivo moderno.</p>
                </div>
                <div class="Divisor-History-EURO">
                </div>
                <div class="Div-History-IMG-EURO">
                    <img src="./Assent/JDM/AE86.jpg" alt="">
                    <p class="Text-History-2-EURO">División M: BMW funda su brazo Motorsport en el '72, inyectando ADN de competición pura a los coches de calle.</p>
                    <img src="./Assent/JDM/JDM-History-1.jpg" alt="">
                    <p class="Text-History-2-EURO">Domino en Le Mans: La obsesión de marcas como Ferrari y Porsche por ganar la carrera de resistencia más dura del mundo.</p>
                    <img src="./Assent/JDM/NSX.jpg" alt="">
                    <p class="Text-History-2-EURO">Revolución Quattro: Audi cambió las reglas del Rally en los 80 con su tracción total, redefiniendo el control absoluto.</p>
                </div>
                <div class="Divisor-History-EURO">
                </div>
                <div class="Div-History-IMG-EURO">
                    <img src="./Assent/JDM/JDM-History-1.jpg" alt="">
                    <p class="Text-History-2-EURO">McLaren F1: El primer hypercar real de 1992; fibra de carbono y motor V12 para alcanzar la perfección mecánica.</p>
                    <img src="./Assent/JDM/JDM-History-1.jpg" alt="">
                    <p class="Text-History-2-EURO">La Santísima Trinidad: Ferrari, Porsche y McLaren lanzan sus hypercars híbridos en 2013, definiendo la velocidad del siglo XXI.</p>
                    <img src="./Assent/JDM/JDM-History-1.jpg" alt="">
                    <p class="Text-History-2-EURO">Nürburgring: El "Infierno Verde" como juez final; si un coche europeo no reina aquí, no es una leyenda.</p>
                </div>
            </div>
        </div>
        </section>

        <section class="container-cars-EURO">
            <div class="div-container-cars-EURO">
                <h2 class="Title-Container-Car-EURO">Nuestros Autos</h2>
                <div class="container-cars-filters-EURO">
                    <button class="btn-filter-brand" data-value="*">Todos</button>
                    <button class="btn-filter-brand" data-value="Bugatti">Bugatti</button>
                    <button class="btn-filter-brand" data-value="Lamborghini">Lamborghini</button>
                    <button class="btn-filter-brand" data-value="Ferrari">Ferrari</button>
                    <button class="btn-filter-brand" data-value="Koenigsegg">Koenigsegg</button>
                    <button class="btn-filter-brand" data-value="Mercedes-AMG">Mercedes-AMG</button>
                    <button class="btn-filter-brand" data-value="Audi">Audi</button>
                    <button class="btn-filter-brand" data-value="BMW">BMW</button>
                    <button class="btn-filter-brand" data-value="Porsche">Porsche</button>
                    <button class="btn-filter-brand" data-value="McLaren">McLaren</button>
                    <button class="btn-filter-brand" data-value="Aston-Martin">Aston-Martin</button>
                    <button class="btn-filter-brand" data-value="Pagani">Pagani</button>
                </div>
                <div class="container-cars-filters-buttons">
                    <a class="btn-filter-category" data-value="Sedan">Sedan</a>
                    <a class="btn-filter-category" data-value="SUV">SUV</a>
                    <a class="btn-filter-category" data-value="Wagon">Wagon</a>
                    <a class="btn-filter-category" data-value="Supercar">Supercar</a>
                    <a class="btn-filter-category" data-value="Hypercar">Hypercar</a>
                </div>
            </div>
            <div class="Divisor-EURO"></div>
            <div class="container-cars-cards" id="contenedor-cards-euro"></div>
        </section>       

        <section class="Footer-EURO">
            <div class="Footer-Content">
                <h2 class="text-Footer-EURO"><em>WOLF MOTOR HUB</em>: DONDE CADA CABALLO DE FUERZA TIENE UNA HISTORIA.</h2>
            </div>
            <div class="Divisor-Footer-EURO"></div>
            <div class="Footer-Content-EURO">
                <h2 class="text-Footer-EURO"><em>CONTACTO</em></h2>
                <ul>
                    <li class="Text-Footer-EURO">Stuttgart Studio</li>
                    <li class="Text-Footer-EURO">+49 (555) WOLF-AUTO</li>
                    <li class="Text-Footer-EURO">info@wolf-motor-hub.com</li>
                </ul>
            </div>
        </section>
    </section>
    `;

    // 5. INICIALIZACIÓN DE EVENTOS 
    SetupFiltrosEURO();
    PintarTarjetasEURO(autos.europeos);

    const btnBack = document.getElementById("btn-back-home-euro");
    if (btnBack) {
        btnBack.onclick = () => window.location.reload();
    }
}

export default AbrirEURO;