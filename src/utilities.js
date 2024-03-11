export function validarFormatoFecha (fecha) {
  const regex = /^\d{2}-\d{2}-\d{2}$/ // Expresión regular para el formato 'yy-mm-dd'

  if (regex.test(fecha)) {
    return true // La fecha tiene el formato correcto
  } else {
    return false // La fecha no tiene el formato correcto
  }
}

export function validateEmail (email) {
  const re = /\S+@\S+\.\S+/
  if (re.test(email)) {
    return true // el email tiene el formato correcto
  } else {
    return false // el email no tiene el formato correcto
  }
}

export function validarFormatoTelefono (telefono) {
  const regex = /^\d{3}-\d{3}-\d{4}$/ // Expresión regular para el formato '###-###-####'

  if (regex.test(telefono)) {
    return true // El teléfono tiene el formato correcto
  } else {
    return false // El teléfono no tiene el formato correcto
  }
}
