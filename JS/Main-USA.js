import autos from "./Data.js";

document.getElementById("usa").addEventListener('click', AbrirUSA);

function AbrirUSA() {
    const content = document.getElementById("Page-USA");
    const PageHome = document.getElementById("Page-Home");

    PageHome.style.display = "none";

    content.innerHTML = `
    <div class="fade-USA">
    <section class="header-USA">
        <div class="header-USA-content">
            <h2>Wolf Motors USA</h2>
            <div class="header-USA-content-buttons">
                <button>Menu</button>
                <button onclick="AbrirHome()">Home</button>
                <button>Contact</button>
            </div>
        </div>
    </section>
    <section class="Bienvenida-USA">
        <div class="IMG-Bienvenida">
            <img class="img-principal" src="./Assent/US/Dodge-Home.jpg" alt="">
        </div>
        <div class="Text-Bienvenida">
            <h2 class="Title-Container-Car">Wolf Motors USA</h2>
            <p>No es solo metal desplazándose; es fuerza bruta domando el asfalto. 
            Un V8 americano es el rugido de la libertad y el orgullo de un chasis que 
            no conoce la sutileza. Aquí no hay espacio para lo frágil: es potencia indomable, 
            torque puro y el carácter necesario para convertir el caos en velocidad absoluta.</p>
        </div>
    </section>
    <section class="History-Car-USA">
    <div class="Div-History-Text">
    <h2>EL LEGADO DEL ASFALTO</h2>
    <p class="Text-History">La historia del automovilismo americano no se escribe con tinta, sino con aceite, caucho quemado
     y el rugido inconfundible de un bloque V8. Desde las líneas de montaje de Detroit hasta las infinitas 
     carreteras que cruzan el continente, estas máquinas nacieron de una obsesión: la libertad absoluta a través 
     de la potencia bruta. Lo que comenzó como un sueño de ingeniería se convirtió en una cultura de rebeldía y músculo, 
     donde cada chasis cuenta la historia de un país que se atrevió a desafiar los límites de la velocidad. Bienvenido al 
     origen de la fuerza;<em>bienvenido al legado que domina el camino.</em></p>
    </div>
    <div class="Div-History-IMG">
    <img class="IMG-History" src="./Assent/US/FordT.jpg" alt="" >
    <p class="Text-History-3">1908 – El Origen: Henry Ford lanza el Model T, poniendo al mundo sobre ruedas y estableciendo las bases de la producción en masa en Detroit.</p>
    <img class="IMG-History" src="./Assent/US/V8-clasico.jpg" alt="" >
    <p class="Text-History-3">1949 – El Primer Motor Moderno: Oldsmobile presenta el motor Rocket V8, el ancestro directo de la potencia americana moderna, diseñado para la velocidad en la postguerra.</p>
    <img class="IMG-History" src="./Assent/US/Pony-Car.jpg" alt="" >
    <p class="Text-History-3">1964 – La Era del Pony Car: El lanzamiento del Ford Mustang crea una nueva categoría de autos deportivos accesibles, desatando una fiebre de personalización y estilo.</p>
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
            <h2 class="Title-Container-Car" >Nuestros Autos</h2>
            <p>Descubre nuestra colección de autos americanos</p>
            <div class="container-cars-filters">
                <button>Todos</button>
                <button>Dodge</button>
                <button>Ford</button>
                <button>Chevrolet</button>
            </div>
            <div class="container-cars-filters-buttons">
                <a id="Sedan">Sedan</a>
                <a id="Coupe">Coupe</a>
                <a id="SUV">SUV</a>
                <a id="Pickup">Pickup</a>
                <a id="Muscle">Muscle</a>
            </div>
        </div>
        <div class="Divisor" ></div>
        <div class="container-cars-cards">
        </div>
    </section>       
    <section class="Footer-USA">
    <div class="Footer-USA-Content">
    <h2 class="text-Footer-Title">WOLF MOTOR HUB: DONDE CADA CABALLO DE FUERZA TIENE UNA HISTORIA.</h2>
    </div>
    <div class="Divisor-Footer">
    </div>
    <div class="Footer-USA-Content">
     <h2 class="text-Footer-Title">CONTACTO</h2>
        <ul>
            <li class="Text-Footer"><i class="fas fa-map-marker-alt"></i> Detroit Studio </li>
            <li class="Text-Footer"><i class="fas fa-phone"></i> +1 (555) WOLF-AUTO</li>
            <li class="Text-Footer"><i class="fas fa-envelope"></i> info@wolf-motor-hub.com</li>
        </ul>
    </div>
    </section>
    </div>
    `;
}

function MostrarAutos(country, brand, category) {
    console.log(autos[country]);
    console.log(autos[country].filter(auto => brand === "*" ? autos[country] : auto.marca === brand));
}
category === "*" ? autos[country] : auto.categoria === category

MostrarAutos("americanos", "*", "SUV");

export default AbrirUSA;

