function generarInputs() {
    let filas1 = parseInt(document.getElementById("filas1").value);
    let columnas1 = parseInt(document.getElementById("columnas1").value);
    let filas2 = parseInt(document.getElementById("filas2").value);
    let columnas2 = parseInt(document.getElementById("columnas2").value);

    if (filas1 < 1 || columnas1 < 1 || filas2 < 1 || columnas2 < 1) {
        alert("Las filas y columnas deben ser mayores a 0.");
        return;
    }

    if (columnas1 !== filas2) {
        alert("El número de columnas de la Matriz 1 debe ser igual al número de filas de la Matriz 2.");
        return;
    }

    let contenedor = document.getElementById("matrices");
    contenedor.innerHTML = "";

    function crearMatriz(nombre, filas, columnas, matrizIndex) {
        let divMatriz = document.createElement("div");
        divMatriz.innerHTML = `<h3>${nombre}</h3>`;
        for (let i = 0; i < filas; i++) {
            let row = document.createElement("div");
            for (let j = 0; j < columnas; j++) {
                let input = document.createElement("input");
                input.type = "number";
                input.id = `matriz${matrizIndex}-${i}-${j}`;
                input.className = `matriz${matrizIndex}-input`; // Se agrega una clase para facilitar la selección
                row.appendChild(input);
            }
            divMatriz.appendChild(row);
        }
        contenedor.appendChild(divMatriz);
    }

    crearMatriz("Matriz 1", filas1, columnas1, 1);
    crearMatriz("Matriz 2", filas2, columnas2, 2);

    document.getElementById("calcular").style.display = "block";
}

function multiplicarMatrices() {
    let filas1 = parseInt(document.getElementById("filas1").value);
    let columnas1 = parseInt(document.getElementById("columnas1").value);
    let filas2 = parseInt(document.getElementById("filas2").value);
    let columnas2 = parseInt(document.getElementById("columnas2").value);

    let matriz1 = [];
    let matriz2 = [];

    // Obtener los valores de la matriz 1
for (let i = 0; i < filas1; i++) {
    let row = [];
    for (let j = 0; j < columnas1; j++) {
        let input = document.getElementById(`matriz1-${i}-${j}`);
        console.log(`matriz1-${i}-${j}:`, input ? input.value : "Input no encontrado"); // Depuración
        if (input && input.value !== '') { // Verificamos si el input existe y tiene valor
            let value = parseFloat(input.value);
            row.push(value);
        } else {
            row.push(0); // Si el input está vacío, asignamos 0
        }
    }
    matriz1.push(row);
}

// Obtener los valores de la matriz 2
for (let i = 0; i < filas2; i++) {
    let row = [];
    for (let j = 0; j < columnas2; j++) {
        let input = document.getElementById(`matriz2-${i}-${j}`);
        console.log(`matriz2-${i}-${j}:`, input ? input.value : "Input no encontrado"); // Depuración
        if (input && input.value !== '') { // Verificamos si el input existe y tiene valor
            let value = parseFloat(input.value);
            row.push(value);
        } else {
            row.push(0); // Si el input está vacío, asignamos 0
        }
    }
    matriz2.push(row);
}

    // Verificar si las matrices se están llenando correctamente
    console.log("Matriz 1: ", matriz1);
    console.log("Matriz 2: ", matriz2);

    // Verificamos si alguna de las matrices está vacía
    if (matriz1.length === 0 || matriz2.length === 0 || matriz1[0].length === 0 || matriz2[0].length === 0) {
        document.getElementById("resultado").innerText = "Las matrices no pueden estar vacías.";
        return;
    }

    // Realizar la solicitud AJAX para multiplicar las matrices
    fetch('/multiplicar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            matriz1: matriz1,
            matriz2: matriz2
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById("resultado").innerText = "Error: " + data.error;
        } else {
            let resultadoHTML = "<h4>Resultado:</h4><table>";
            data.resultado.forEach(row => {
                resultadoHTML += "<tr>";
                row.forEach(cell => {
                    resultadoHTML += `<td>${cell}</td>`;
                });
                resultadoHTML += "</tr>";
            });
            resultadoHTML += "</table>";
            document.getElementById("resultado").innerHTML = resultadoHTML;
        }
    })
    .catch(error => {
        console.error("Error al realizar la multiplicación:", error);
    });
}
