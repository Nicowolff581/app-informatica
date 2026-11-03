# Ejercicio 2 - Operaciones con los dos últimos dígitos de la cédula

numero = int(input("Ingrese los dos últimos dígitos de su cédula: "))

suma = numero + 11
resta = numero - 11
multiplicacion = numero * 11
division_entera = numero // 11
division = numero / 11
potencia = numero ** 11
modulo = numero % 11

print("Número sumado más 11:", suma)
print("Número restado 11:", resta)
print("Número multiplicado por 11:", multiplicacion)
print("Número dividido por 11 (entero):", division_entera)
print("Número dividido por 11 (flotante):", division)
print("Número elevado a la potencia 11:", potencia)
print("Número módulo 11:", modulo)
