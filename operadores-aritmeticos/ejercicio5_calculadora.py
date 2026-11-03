# Ejercicio 5 - Calculadora con dos números

numero1 = float(input("Ingrese el primer número: "))
numero2 = float(input("Ingrese el segundo número: "))

suma = numero1 + numero2
resta = numero1 - numero2
multiplicacion = numero1 * numero2
potencia = numero1 ** numero2

if numero2 != 0:
    division = numero1 / numero2
else:
    division = "No se puede dividir por cero"

print("Suma:", suma)
print("Resta:", resta)
print("Multiplicación:", multiplicacion)
print("División:", division)
print("Potencia:", potencia)
