# Recibir el número del usuario
numero = int(input("Introduce un número para verificar si es primo: "))

def es_primo(numero):

    # Validamos que el numero ingresado sera mayor a 1
    if numero <= 1:
        return False

    # Itero y obtengo contador desde el 2
    for n in range(2, numero):
        if numero % n == 0:
            print("No es primo", n, "es divisor")
            return False
    print("Es primo")
    return True

# Verificar si es primo y mostrar el resultado
if es_primo(numero):
    print(f"{numero} es primo")
else:
    print(f"{numero} no es primo")
