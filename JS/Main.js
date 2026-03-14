import AbrirUSA from "./Main-USA.js";
import AbrirJDM from "./Main-JDM.js";
import MostrarAutos from "./Filters.js";


/*export function DibujarAutos(lista) {
    const contenedor = document.getElementById("contenedor-cards-usa");
    if (!contenedor) return;

    contenedor.innerHTML = "";

    lista.forEach(auto => {
        contenedor.innerHTML += `
            <div class="card-auto-premium">
                <img class="img-card-auto" src="${auto.img}" alt="${auto.modelo}">
                <div class="info-car">
                    <h3>${auto.marca} ${auto.modelo}</h3>
                    <p class="precio">${auto.precio}</p>
                    <span class="badge">${auto.categoria}</span>
                </div>
            </div>
        `;
    });
}*/