# Ejercicio 1 - Construir resultados usando solo las variables a, b, c, d, e

a = 1
b = 2
c = 3
d = 4
e = 5

# 1. Resultado 31: 5^2 + 2*3 = 25 + 6
resultado1 = e ** 2 + b * c

# 2. Resultado 46: 5^2 * 2 - 4 = 50 - 4
resultado2 = e ** 2 * b - d

# 3. Resultado 19: 4 * 5 - 1 = 20 - 1
resultado3 = d * e - a

# 4. Resultado 122: 5^3 - 3 = 125 - 3
resultado4 = e ** 3 - c

# 5. Resultado 1.2: (1 + 5) / 5 = 6 / 5
resultado5 = (a + e) / e

print("1. e ** 2 + b * c =", resultado1)
print("2. e ** 2 * b - d =", resultado2)
print("3. d * e - a =", resultado3)
print("4. e ** 3 - c =", resultado4)
print("5. (a + e) / e =", resultado5)
