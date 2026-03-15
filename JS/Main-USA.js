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
    <section class="Body-USA">
        <section class="header-USA">
            <div class="header-USA-content">
                <h1 class="Title-Header-USA">Wolf Automobiles</h1>
                <div class="header-USA-content-buttons">
                    <button id="btn-back-home-usa">Home</button>
                </div>
            </div>
        </section>

        <section class="Bienvenida-USA">
            <div class="IMG-Bienvenida">
                <img class="img-principal" src="./Assent/US/Dodge-Home.jpg" alt="Supra Home">
            </div>
            <div class="Text-Bienvenida">
                <h2 class="Title-Container-Car-USA">Wolf Motors USA</h2>
                <p class="Parraf-Container-Car-USA">Bienvenido a Wolf Automobile, el santuario donde el músculo americano se encuentra con la ingeniería de vanguardia. 
                Aquí no vendemos solo transporte; entregamos el rugido de Detroit, la fuerza bruta de los bloques V8 y la libertad indomable de la carretera abierta. 
                Desde los legendarios drag strips hasta las rutas transcontinentales, nuestra selección representa el pico de la potencia estadounidense. 
                Si buscas torque que mueva la tierra, estás en el lugar correcto.</p>
            </div>
        </section>

        <section class="History-Car-USA">
            <div class="Div-History-Text-USA">
                <h2>La Forja de un Imperio: Del Hierro al Asfalto</h2>
                <p class="Text-History-USA">La historia de Wolf Automobile nace de la obsesión por el torque y la velocidad pura en su estado más visceral. 
                En una era donde el acero dominaba las calles y la cilindrada lo era todo, nos propusimos curar los ejemplares más feroces de la industria norteamericana. 
                Nuestra trayectoria está marcada por el respeto a los clásicos que definieron a una generación de rebeldes y el hambre por las nuevas leyendas que hoy desafían los límites de la física con tecnología de competición. 
                No solo importamos coches; preservamos un legado de potencia que se siente en el pecho cada vez que giras la llave.</p>
            </div>
            <div class="Div-USA">
                <div class="Div-History-IMG-USA"> 
                    <img src="./Assent/JDM/JDM-History-1.jpg" alt="">
                    <p class="Text-History-3-USA">1964: El Nacimiento del Pony Car. Ford presenta el Mustang, creando la categoría "Pony Car": vehículos deportivos, compactos y asequibles que democratizaron el rendimiento y definieron la cultura juvenil de toda una generación.</p>
                    <img src="./Assent/JDM/JDM-History-1.jpg" alt="">
                    <p class="Text-History-3-USA">1966: La Conquista de Le Mans. El Ford GT40 logra el histórico 1-2-3 en las 24 Horas de Le Mans, demostrando al mundo que la ingeniería americana podía vencer a la élite europea en su propio terreno.</p>
                    <img src="./Assent/JDM/JDM-History-1.jpg" alt="">
                    <p class="Text-History-3-USA">1970: El Apogeo del Big Block. La era del músculo alcanza su pico con leyendas como el Chevelle SS 454, máquinas de cilindrada masiva diseñadas para dominar las calles con un torque brutal y presencia imponente.</p>
                </div>
                <div class="Divisor-History-USA">
                </div>
                <div class="Div-History-IMG-USA">
                    <img src="./Assent/JDM/AE86.jpg" alt="">
                    <p class="Text-History-2-USA">1987: El Regreso del Músculo Negro. Buick lanza el GNX, un V6 Turbo apodado "el coche de Darth Vader" que demostró que el ingenio tecnológico podía humillar a los exóticos italianos en el cuarto de milla.</p>
                    <img src="./Assent/JDM/JDM-History-1.jpg" alt="">
                    <p class="Text-History-2-USA">1992: El Veneno Crudo de Detroit. Nace el Dodge Viper RT/10, un monstruo con motor V10 y sin ayudas electrónicas que se convirtió en la interpretación más visceral, pura y peligrosa del sueño americano.</p>
                    <img src="./Assent/JDM/NSX.jpg" alt="">
                    <p class="Text-History-2-USA">2005: La Revolución Retro-Futurista. Ford revive el diseño clásico con el Mustang de quinta generación, disparando una nueva guerra de caballos de fuerza entre Detroit y reavivando la pasión por los Muscle Cars modernos.</p>
                </div>
                <div class="Divisor-History-USA">
                </div>
                <div class="Div-History-IMG-USA">
                    <img src="./Assent/JDM/JDM-History-1.jpg" alt="">
                    <p class="Text-History-2-USA">2015: La Invasión Hellcat. Dodge sacude la industria con el motor Hellcat de 707 HP, poniendo cifras de potencia de hiperdeportivos al alcance del público general y redefiniendo los límites de la producción masiva.</p>
                    <img src="./Assent/JDM/JDM-History-1.jpg" alt="">
                    <p class="Text-History-2-USA">2020: La Revolución del Motor Central. El Corvette C8 rompe 60 años de tradición al adoptar una configuración de motor central, transformándose en un "asesino de gigantes" capaz de competir con la élite europea.</p>
                    <img src="./Assent/JDM/JDM-History-1.jpg" alt="">
                    <p class="Text-History-2-USA">2024: El Último Grito del V8. El Dodge Demon 170 se despide con 1,025 HP de fábrica, marcando el final legendario de la era de combustión interna pura con el coche de aceleración más rápido del mundo.</p>
                </div>
            </div>
        </div>
        </section>

        <section class="container-cars-USA">
            <div class="div-container-cars-USA">
                <h2 class="Title-Container-Car-USA">Nuestros Autos</h2>
                <div class="container-cars-filters-USA">
                    <button class="btn-filter-brand" data-value="*">Todos</button>
                    <button class="btn-filter-brand" data-value="Jeep">Jeep</button>
                    <button class="btn-filter-brand" data-value="Ford">Ford</button>
                    <button class="btn-filter-brand" data-value="Chevrolet">Chevrolet</button>
                    <button class="btn-filter-brand" data-value="Dodge">Dodge</button>
                    <button class="btn-filter-brand" data-value="Ram">Ram</button>
                    <button class="btn-filter-brand" data-value="Hummer">Hummer</button>
                    <button class="btn-filter-brand" data-value="Shelby">Shelby</button>
                    <button class="btn-filter-brand" data-value="Cadillac">Cadillac</button>
                    <button class="btn-filter-brand" data-value="Corvette">Corvette</button>
                </div>
                <div class="container-cars-filters-buttons">
                    <a class="btn-filter-category" data-value="Sedan">Sedan</a>
                    <a class="btn-filter-category" data-value="SUV">SUV</a>
                    <a class="btn-filter-category" data-value="Pickup">Pickup</a>
                    <a class="btn-filter-category" data-value="Muscle Car">Muscle Car</a>
                    <a class="btn-filter-category" data-value="SuperCar">SuperCar</a>
                </div>
            </div>
            <div class="Divisor-USA"></div>
            <div class="container-cars-cards" id="contenedor-cards-usa"></div>
        </section>       

        <section class="Footer-USA">
            <div class="Footer-Content">
                <h2 class="text-Footer-USA"><em>WOLF MOTOR HUB</em>: DONDE CADA CABALLO DE FUERZA TIENE UNA HISTORIA.</h2>
            </div>
            <div class="Divisor-Footer-USA"></div>
            <div class="Footer-Content-USA">
                <h2 class="text-Footer-USA"><em>CONTACTO</em></h2>
                <ul>
                    <li class="Text-Footer-USA">Detroit Studio</li>
                    <li class="Text-Footer-USA">+1 (555) WOLF-AUTO</li>
                    <li class="Text-Footer-USA">info@wolf-motor-hub.com</li>
                </ul>
            </div>
        </section>
    </section>
    `;

    // 5. INICIALIZACIÓN DE EVENTOS TRAS CARGAR EL HTML
    SetupFiltros();
    PintarTarjetas(autos.americanos);

    // Evento para volver al Home (si tienes la función AbrirHome definida globalmente)
    const btnBack = document.getElementById("btn-back-home-usa");
    if (btnBack) {
        btnBack.onclick = () => window.location.reload(); // O tu función AbrirHome()
    }
}

export default AbrirUSA;

