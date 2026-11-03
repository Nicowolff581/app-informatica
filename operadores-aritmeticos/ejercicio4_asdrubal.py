# Ejercicio 4 - Asdrubal: dólares en el bolsillo derecho, pesos en el izquierdo

dolares = float(input("¿Cuántos dólares tiene en el bolsillo derecho? "))
pesos = float(input("¿Cuántos pesos tiene en el bolsillo izquierdo? "))

dolares = dolares - 15    # 1. Pagó un DVD de 15 dólares
pesos = pesos - 2000      # 2. Pagó un pasaje por $2.000
pesos = pesos - 122000    # 3. Pagó el recibo de la luz $122.000
dolares = dolares - 26    # 4. Pagó un libro de 26 dólares
dolares = dolares + 7     # 5. Le pagaron 7 dólares
pesos = pesos - 35000     # 6. Pagó un almuerzo $35.000
pesos = pesos + 9000      # 7. Le pagaron $9.000
pesos = pesos - 18000     # 8. Pagó 2 entradas a cine por $18.000

print("A Asdrubal le quedaron", dolares, "dólares")
print("A Asdrubal le quedaron", pesos, "pesos")
