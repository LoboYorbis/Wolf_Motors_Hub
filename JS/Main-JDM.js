import MostrarAutos from "./Filters.js";
import { autos } from "./Data.js";

// 1. FUNCIÓN PARA PINTAR LAS TARJETAS 
export function PintarTarjetasJDM(lista) { // <-- Le cambiamos el nombre para que no choque con USA
    const contenedor = document.getElementById("contenedor-cards-jdm");

    if (!contenedor) {
        console.error("No encontré el contenedor 'contenedor-cards-jdm'");
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
            abrirDetallesWolfJDM(auto);
        });

        contenedor.appendChild(card);
    });
}

// 2. FUNCIÓN PARA EL MODAL 
function abrirDetallesWolfJDM(coche) { // <-- Nombre único
    let modalContainer = document.getElementById('wolf-modal-container-jdm');

    if (!modalContainer) {
        modalContainer = document.createElement('div');
        modalContainer.id = 'wolf-modal-container-jdm'; // <-- ID único
        document.body.appendChild(modalContainer);
    }

    modalContainer.innerHTML = `
        <div id="wolf-modal-jdm" class="modal-overlay">
            <div class="modal-content">
                <button id="close-modal-jdm" class="close-btn">&times;</button>
                
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

    const btnCerrar = document.getElementById('close-modal-jdm');
    const fondoModal = document.getElementById('wolf-modal-jdm');

    btnCerrar.onclick = () => modalContainer.innerHTML = '';
    fondoModal.onclick = (e) => {
        if (e.target.id === 'wolf-modal-jdm') modalContainer.innerHTML = '';
    };
}

// 3. GESTIÓN DE FILTROS JDM
let filtrosActivosJDM = { brand: "*", category: "*" };

function SetupFiltrosJDM() {
    const botonesMarca = document.querySelectorAll("#Page-JDM .btn-filter-brand");
    botonesMarca.forEach(boton => {
        boton.addEventListener("click", (e) => {
            filtrosActivosJDM.brand = e.target.dataset.value;
            ActualizarCatalogoJDM();
        });
    });

    const botonesCat = document.querySelectorAll("#Page-JDM .btn-filter-category");
    botonesCat.forEach(boton => {
        boton.addEventListener("click", (e) => {
            filtrosActivosJDM.category = e.target.dataset.value;
            ActualizarCatalogoJDM();
        });
    });
}

function ActualizarCatalogoJDM() {
    const resultados = MostrarAutos("japoneses", filtrosActivosJDM.brand, filtrosActivosJDM.category);
    PintarTarjetasJDM(resultados);
}

// 4. LÓGICA DE NAVEGACIÓN
const btnJDM = document.getElementById("jdm");
if (btnJDM) {
    btnJDM.addEventListener('click', () => {
        AbrirJDM();
    });
}

function AbrirJDM() {
    const content = document.getElementById("Page-JDM");
    const PageHome = document.getElementById("Page-Home");

    if (PageHome) PageHome.style.display = "none";
    if (content) content.style.display = "block";

    content.innerHTML = `
    <section class="Body-JDM">
        <section class="header-JDM">
            <div class="header-JDM-content">
                <h1 class="Title-Header-JDM">Wolf Imports</h1>
                <div class="header-JDM-content-buttons">
                    <button id="btn-back-home-jdm">Home</button>
                </div>
            </div>
        </section>

        <section class="Bienvenida-JDM">
            <div class="IMG-Bienvenida">
                <img class="img-principal" src="./Assent/JDM/JDM-Bienvenida.jpg" alt="Supra Home">
            </div>
            <div class="Text-Bienvenida">
                <h2 class="Title-Container-Car-JDM">Wolf Motors JDM</h2>
                <p class="Parraf-Container-Car-JDM">No es solo ingeniería; es la búsqueda obsesiva de la armonía perfecta entre hombre y máquina. 
                Mientras otros gritan, nosotros silbamos con el turbo. En Wolf Motors JDM, no medimos la potencia solo en caballos de fuerza, 
                sino en la capacidad de dominar cada curva con un equilibrio absoluto.</p>
            </div>
        </section>

        <section class="History-Car-JDM">
            <div class="Div-History-Text-JDM">
                <h2>EL ARTE DE LA PRECISIÓN NOCTURNA</h2>
                <p class="Text-History-JDM">Desde las calles iluminadas por neón de Tokio hasta los circuitos de Hakone, 
                estas máquinas nacieron de una obsesión diferente: la búsqueda de la perfección técnica y el equilibrio absoluto. 
                Bienvenido al legado que domina la noche con precisión quirúrgica.</p>
            </div>
            <div class="Div-JDM">
                <div class="Div-History-IMG-JDM"> 
                    <img src="./Assent/JDM/JDM-History-1.jpg" alt="">
                    <p class="Text-History-3-JDM">1908 – Los 60s - Perfección Humana: Nace la filosofía Monozukuri. Calidad obsesiva y fiabilidad antes que cantidad.</p>
                    <img src="./Assent/JDM/JDM-History-1.jpg" alt="">
                    <p class="Text-History-3-JDM">1949 – 1967 - Revolución Rotativa: Mazda lanza el Cosmo Sport. Japón demuestra que puede inventar su propia ingeniería (Motor Wankel).</p>
                    <img src="./Assent/JDM/JDM-History-1.jpg" alt="">
                    <p class="Text-History-3-JDM">1964 – 1969 - El Mito Hakosuka: Nace el primer Skyline GT-R. Comienza un legado de 50 victorias consecutivas en pista.</p>
                </div>
                <div class="Divisor-History-JDM">
                </div>
                <div class="Div-History-IMG-JDM">
                    <img src="./Assent/JDM/AE86.jpg" alt="">
                    <p class="Text-History-2-JDM">Los 80s - Dominio del Touge: El balance supera a la potencia. Coches como el AE86 demuestran que la agilidad es la clave en las montañas.</p>
                    <img src="./Assent/JDM/JDM-History-1.jpg" alt="">
                    <p class="Text-History-2-JDM">1989 - Pacto de Caballeros: Las marcas limitan sus coches a 276 HP. Nacen los "monstruos dormidos" subestimados por los ingenieros.</p>
                    <img src="./Assent/JDM/NSX.jpg" alt="">
                    <p class="Text-History-2-JDM">1990 - El "Ferrari Killer": Honda lanza el NSX. Aluminio, motor central y el ADN de Ayrton Senna humillan a los deportivos europeos.</p>
                </div>
                <div class="Divisor-History-JDM">
                </div>
                <div class="Div-History-IMG-JDM">
                    <img src="./Assent/JDM/JDM-History-1.jpg" alt="">
                    <p class="Text-History-2-JDM">Los 90s - Motores Inmortales: Época dorada del tuning. El 2JZ (Supra) y el RB26 (Skyline) se vuelven los motores más potentes del mundo.</p>
                    <img src="./Assent/JDM/JDM-History-1.jpg" alt="">
                    <p class="Text-History-2-JDM">Wangan Midnight - Alta Velocidad: Las autopistas de Tokio se vuelven pistas a +300 km/h. La aerodinámica y el turbo lo son todo.</p>
                    <img src="./Assent/JDM/JDM-History-1.jpg" alt="">
                    <p class="Text-History-2-JDM">4WD - Tracción Total: El sistema ATTESA del GTR y el Lancer Evolution enseñan que el poder no sirve sin control absoluto.</p>
                </div>
            </div>
        </div>
        </section>

        <section class="container-cars-JDM">
            <div class="div-container-cars-JDM">
                <h2 class="Title-Container-Car-JDM">Nuestros Autos</h2>
                <div class="container-cars-filters-JDM">
                    <button class="btn-filter-brand" data-value="*">Todos</button>
                    <button class="btn-filter-brand" data-value="Nissan">Nissan</button>
                    <button class="btn-filter-brand" data-value="Toyota">Toyota</button>
                    <button class="btn-filter-brand" data-value="Honda">Honda</button>
                    <button class="btn-filter-brand" data-value="Mazda">Mazda</button>
                    <button class="btn-filter-brand" data-value="Subaru">Subaru</button>
                    <button class="btn-filter-brand" data-value="Mitsubishi">Mitsubishi</button>
                    <button class="btn-filter-brand" data-value="Acura">Acura</button>
                    <button class="btn-filter-brand" data-value="Lexus">Lexus</button>
                    <button class="btn-filter-brand" data-value="Suzuki">Suzuki</button>
                </div>
                <div class="container-cars-filters-buttons">
                    <a class="btn-filter-category" data-value="Sedan">Sedan</a>
                    <a class="btn-filter-category" data-value="SUV">SUV</a>
                    <a class="btn-filter-category" data-value="Supercar">Supercar</a>
                    <a class="btn-filter-category" data-value="Deportivo">Deportivo</a>
                </div>
            </div>
            <div class="Divisor-JDM"></div>
            <div class="container-cars-cards" id="contenedor-cards-jdm"></div>
        </section>       

        <section class="Footer-JDM">
            <div class="Footer-Content">
                <h2 class="text-Footer-JDM"><em>WOLF MOTOR HUB</em>: DONDE CADA CABALLO DE FUERZA TIENE UNA HISTORIA.</h2>
            </div>
            <div class="Divisor-Footer-JDM"></div>
            <div class="Footer-Content-JDM">
                <h2 class="text-Footer-JDM"><em>CONTACTO</em></h2>
                <ul>
                    <li class="Text-Footer-JDM">Tokyo Studio</li>
                    <li class="Text-Footer-JDM">+81 (555) WOLF-AUTO</li>
                    <li class="Text-Footer-JDM">info@wolf-motor-hub.com</li>
                </ul>
            </div>
        </section>
    </section>
    `;

    // 5. INICIALIZACIÓN DE EVENTOS 
    SetupFiltrosJDM();
    PintarTarjetasJDM(autos.japoneses);

    const btnBack = document.getElementById("btn-back-home-jdm");
    if (btnBack) {
        btnBack.onclick = () => window.location.reload();
    }
}

export default AbrirJDM;
