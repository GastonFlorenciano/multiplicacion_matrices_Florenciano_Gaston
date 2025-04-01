from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

def multiplicar_matrices(matriz1, matriz2):
    if not matriz1 or not matriz2 or not matriz1[0] or not matriz2[0]:
        return "Las matrices no pueden estar vacías"
    
    # Validar que todos los elementos de las matrices sean números
    for fila in matriz1 + matriz2:
        for elemento in fila:
            if not isinstance(elemento, (int, float)):
                return "Las matrices deben contener solo números"

    filas_m1 = len(matriz1)
    columnas_m1 = len(matriz1[0])
    filas_m2 = len(matriz2)
    columnas_m2 = len(matriz2[0])

    if columnas_m1 != filas_m2:
        return "El número de columnas de la Matriz 1 debe ser igual al número de filas de la Matriz 2."

    resultado = [[0] * columnas_m2 for _ in range(filas_m1)]

    for i in range(filas_m1):
        for j in range(columnas_m2):
            for k in range(columnas_m1):
                resultado[i][j] += matriz1[i][k] * matriz2[k][j]

    return resultado


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/multiplicar', methods=['POST'])
def multiplicar():
    data = request.json
    matriz1 = data.get('matriz1', [])
    matriz2 = data.get('matriz2', [])

    resultado = multiplicar_matrices(matriz1, matriz2)
    if isinstance(resultado, str):
        return jsonify({'error': resultado})
    
    return jsonify({'resultado': resultado})

if __name__ == '__main__':
    app.run(debug=True)
