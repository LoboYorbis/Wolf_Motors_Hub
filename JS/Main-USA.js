import MostrarAutos from "./Filters.js";
import { autos } from "./Data.js";

// 1. FUNCIÓN PARA PINTAR LAS TARJETAS (REDISEÑADA PARA EVENTOS)
export function PintarTarjetas(lista) {
    const contenedor = document.getElementById("contenedor-cards-usa");

    if (!contenedor) {
        console.error("No encontré el contenedor 'contenedor-cards-usa'");
        return;
    }

    contenedor.innerHTML = ""; // Limpiamos el contenedor antes de pintar

    lista.forEach(auto => {
        // Creamos el elemento div de la tarjeta
        const card = document.createElement('div');
        card.classList.add('card-auto');

        // Inyectamos el contenido base
        card.innerHTML = `
            <img class="img-card-auto" src="${auto.img}" alt="${auto.modelo}">
            <div class="info-car">
                <h3>${auto.marca} ${auto.modelo}</h3>
                <p class="precio">${auto.precio}</p>
                <button class="btn-ver-detalles">Ver Detalles</button>
            </div>
        `;

        // ASIGNAR EVENTO AL BOTÓN DE CADA TARJETA
        const btnDetalles = card.querySelector('.btn-ver-detalles');
        btnDetalles.addEventListener('click', () => {
            abrirDetallesWolf(auto); // Abrimos el modal con la info del auto
        });

        contenedor.appendChild(card);
    });
}

// 2. FUNCIÓN PARA EL MODAL (INFO PROFUNDA) - TODO POR JS
function abrirDetallesWolf(coche) {
    let modalContainer = document.getElementById('wolf-modal-container');

    if (!modalContainer) {
        modalContainer = document.createElement('div');
        modalContainer.id = 'wolf-modal-container';
        document.body.appendChild(modalContainer);
    }

    // Inyectamos el diseño del modal
    modalContainer.innerHTML = `
        <div id="wolf-modal" class="modal-overlay">
            <div class="modal-content">
                <button id="close-modal" class="close-btn">&times;</button>
                
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
                    <button class="btn-buy">Solicitar Cotización VIP</button>
                </div>
            </div>
        </div>
    `;

    // Lógica para cerrar el modal
    const btnCerrar = document.getElementById('close-modal');
    const fondoModal = document.getElementById('wolf-modal');

    btnCerrar.onclick = () => modalContainer.innerHTML = '';

    fondoModal.onclick = (e) => {
        if (e.target.id === 'wolf-modal') modalContainer.innerHTML = '';
    };
}

// 3. GESTIÓN DE FILTROS
let filtrosActivos = {
    brand: "*",
    category: "*"
};

function SetupFiltros() {
    // Manejar botones de MARCA
    const botonesMarca = document.querySelectorAll(".btn-filter-brand");
    botonesMarca.forEach(boton => {
        boton.addEventListener("click", (e) => {
            filtrosActivos.brand = e.target.dataset.value;
            ActualizarCatalogo();
        });
    });

    // Manejar botones de CATEGORÍA
    const botonesCat = document.querySelectorAll(".btn-filter-category");
    botonesCat.forEach(boton => {
        boton.addEventListener("click", (e) => {
            filtrosActivos.category = e.target.dataset.value;
            ActualizarCatalogo();
        });
    });
}

function ActualizarCatalogo() {
    // Filtramos usando tu lógica de Filters.js
    const resultados = MostrarAutos("americanos", filtrosActivos.brand, filtrosActivos.category);
    // Pintamos de nuevo
    PintarTarjetas(resultados);
}

// 4. LÓGICA DE NAVEGACIÓN Y PÁGINA USA
const btnUSA = document.getElementById("usa");
if (btnUSA) {
    btnUSA.addEventListener('click', () => {
        AbrirUSA();
    });
}

function AbrirUSA() {
    const content = document.getElementById("Page-USA");
    const PageHome = document.getElementById("Page-Home");

    if (PageHome) PageHome.style.display = "none";
    if (content) content.style.display = "block";

    content.innerHTML = `
    <div class="fade-USA">
        <section class="header-USA">
            <div class="header-USA-content">
                <h1 class="Title-Header-USA"><em>Wolf Motors USA</em></h1>
                <div class="header-USA-content-buttons">
                    <button id="btn-back-home">Home</button>
                </div>
            </div>
        </section>

        <section class="Bienvenida-USA">
            <div class="IMG-Bienvenida">
                <img class="img-principal" src="./Assent/US/Dodge-Home.jpg" alt="Dodge Home">
            </div>
            <div class="Text-Bienvenida">
                <h2 class="Title-Container-Car">Wolf Motors USA</h2>
                <p class="Parraf-Container-Car">No es solo metal desplazándose; es fuerza bruta domando el asfalto. 
                Un V8 americano es el rugido de la libertad. Aquí no hay espacio para lo frágil: 
                es potencia indomable y torque puro.</p>
            </div>
        </section>

        <section class="History-Car-USA">
            <div class="Div-History-Text">
                <h2>EL LEGADO DEL ASFALTO</h2>
                <p class="Text-History">Desde Detroit hasta las infinitas carreteras, estas máquinas nacieron de una obsesión: 
                la libertad absoluta. Bienvenido al origen de la fuerza; <em>bienvenido al legado que domina el camino.</em></p>
            </div>
            <div class="Div-History-IMG">
                <img class="IMG-History" src="./Assent/US/FordT.jpg" alt="Ford T">
                <p class="Text-History-3">1908 – El Origen: Henry Ford lanza el Model T.</p>
                <img class="IMG-History" src="./Assent/US/V8-clasico.jpg" alt="V8 Clásico">
                <p class="Text-History-3">1949 – El Primer Motor Moderno: Oldsmobile presenta el Rocket V8.</p>
                <img class="IMG-History" src="./Assent/US/Pony-Car.jpg" alt="Pony Car">
                <p class="Text-History-3">1964 – La Era del Pony Car: El lanzamiento del Ford Mustang.</p>
            </div>
            <div class="Divisor-Large Divisor-History">
            </div>
            <div class="Div-History-IMG">
                <p class="Text-History-2">1966-1970 – La Guerra del Torque: Los años dorados. Aparecen leyendas como el Dodge Charger, el Chevelle SS y el Plymouth Hemi 'Cuda'. Es la época del "no hay sustituto para la cilindrada".</p>
                <img class="IMG-History" src="./Assent/US/Dart-1970.jpg" alt="" >
                <p class="Text-History-2">1987 – El Renacimiento: Tras una década difícil por la crisis del petróleo, el Buick GNX demuestra que el músculo americano está de vuelta, ahora con tecnología de turbocompresores.</p>
                <img class="IMG-History" src="./Assent/US/Buik-GNX.webp" alt="" >
                <p class="Text-History-2">2015-Presente – La Era del Hiper-Músculo: Con el Dodge Hellcat y el Shelby GT500, los americanos rompen la barrera de los 700 caballos de fuerza de fábrica, llevando el legado del V8 a niveles de superdeportivo.</p>
                <img class="IMG-History" src="./Assent/US/Shelby-gt500.jpg" alt="" >
            </div>
        </section>

        <section class="container-cars">
            <div class="div-container-cars">
                <h2 class="Title-Container-Car">Nuestros Autos</h2>
                <div class="container-cars-filters">
                    <button class="btn-filter-brand" data-value="*">Todos</button>
                    <button class="btn-filter-brand" data-value="Dodge">Dodge</button>
                    <button class="btn-filter-brand" data-value="Ford">Ford</button>
                    <button class="btn-filter-brand" data-value="Chevrolet">Chevrolet</button>
                    <button class="btn-filter-brand" data-value="Shelby">Shelby</button>
                    <button class="btn-filter-brand" data-value="Ram">Ram</button>
                    <button class="btn-filter-brand" data-value="Hummer">Hummer</button>
                    <button class="btn-filter-brand" data-value="Jeep">Jeep</button>
                    <button class="btn-filter-brand" data-value="Cadillac">Cadillac</button>
                </div>
                <div class="container-cars-filters-buttons">
                    <a class="btn-filter-category" data-value="Sedan">Sedan</a>
                    <a class="btn-filter-category" data-value="SUV">SUV</a>
                    <a class="btn-filter-category" data-value="Pickup">Pickup</a>
                    <a class="btn-filter-category" data-value="Muscle Car">Muscle</a>
                </div>
            </div>
            <div class="Divisor"></div>
            <div class="container-cars-cards" id="contenedor-cards-usa"></div>
        </section>       

        <section class="Footer-USA">
            <div class="Footer-USA-Content">
                <h2 class="text-Footer-Title">WOLF MOTOR HUB: DONDE CADA CABALLO DE FUERZA TIENE UNA HISTORIA.</h2>
            </div>
            <div class="Divisor-Footer"></div>
            <div class="Footer-USA-Content">
                <h2 class="text-Footer-Title">CONTACTO</h2>
                <ul>
                    <li class="Text-Footer">Detroit Studio</li>
                    <li class="Text-Footer">+1 (555) WOLF-AUTO</li>
                    <li class="Text-Footer">info@wolf-motor-hub.com</li>
                </ul>
            </div>
        </section>
    </div>
    `;

    // 5. INICIALIZACIÓN DE EVENTOS TRAS CARGAR EL HTML
    SetupFiltros();
    PintarTarjetas(autos.americanos);

    // Evento para volver al Home (si tienes la función AbrirHome definida globalmente)
    const btnBack = document.getElementById("btn-back-home");
    if (btnBack) {
        btnBack.onclick = () => window.location.reload(); // O tu función AbrirHome()
    }
}

export default AbrirUSA;

