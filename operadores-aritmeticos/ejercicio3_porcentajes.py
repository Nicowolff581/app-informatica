# Ejercicio 3 - Porcentajes: Hugo, Paco y Luis compran un Play Station 5

precio = 3200000
descuento = 8 / 100

# Porcentajes que aporta cada uno
porcentaje_tio = 20 / 100
porcentaje_hugo = 50 / 100
porcentaje_paco = 17 / 100

# --- Compra en febrero (con descuento) ---
precio_febrero = precio - precio * descuento

tio_febrero = precio_febrero * porcentaje_tio
hugo_febrero = precio_febrero * porcentaje_hugo
paco_febrero = precio_febrero * porcentaje_paco
luis_febrero = precio_febrero - tio_febrero - hugo_febrero - paco_febrero

# --- Compra en marzo (sin descuento) ---
tio_marzo = precio * porcentaje_tio
hugo_marzo = precio * porcentaje_hugo
paco_marzo = precio * porcentaje_paco
luis_marzo = precio - tio_marzo - hugo_marzo - paco_marzo

# --- Tío Rico da $1.500.000 el 25 de febrero y los sobrinos ponen lo mismo ---
regalo_tio = 1500000
cada_sobrino = (precio_febrero - regalo_tio) / 3

print("¿Cuánto vale la consola comprada en febrero?")
print("  $", precio_febrero)

print("¿Cuánto pone cada persona si compran en febrero?")
print("  Tío Rico: $", tio_febrero)
print("  Hugo: $", hugo_febrero)
print("  Paco: $", paco_febrero)
print("  Luis: $", luis_febrero)

print("¿Cuánto pone cada persona si compran en marzo?")
print("  Tío Rico: $", tio_marzo)
print("  Hugo: $", hugo_marzo)
print("  Paco: $", paco_marzo)
print("  Luis: $", luis_marzo)

print("Si Tío Rico da $1.500.000 el 25 de febrero, ¿cuánto pone cada sobrino?")
print("  Cada sobrino: $", round(cada_sobrino, 2))
