import fs from 'node:fs/promises'
import path from 'node:path'
import { pool } from './db.js'
import { validarFormatoFecha, validarFormatoTelefono, validateEmail } from './utilities.js'

export const inicio = async (req, res) => {
  try {
    const pathToFile = path.resolve('./public/inicio.html')
    const htmlPromise = fs.readFile(pathToFile, 'utf-8')

    const html = await htmlPromise

    res.writeHead(200, { 'Content-type': 'text/html' })
    res.end(html)
  } catch (error) {
    const pathToFile500 = path.resolve('./public/500.html')
    const html500 = await fs.readFile(pathToFile500, 'utf-8')

    res.writeHead(500, { 'content-type': 'text/html' })
    res.end(html500)
  }
}

export const mostrarUsuarios = async (req, res) => {
  try {
    const data = await pool.query('SELECT id, nombres, apellidos, direccion, correo_electronico, dni, edad, DATE_FORMAT(fecha_creacion, "%y-%m-%d") AS fecha_creacion, telefono FROM usuarios')
    res.writeHead(200, { 'content-type': 'application/json' })
    res.end(JSON.stringify(data[0]))
  } catch (error) {
    res.writeHead(500, { 'content-type': 'application/json' })
    res.end(JSON.stringify({ message: 'Error interno' }))
  }
}

export const exportarDatosUsuarios = async (req, res) => {
  try {
    const data = await pool.query('SELECT id, nombres, apellidos, direccion, correo_electronico, dni, edad, DATE_FORMAT(fecha_creacion, "%y-%m-%d") AS fecha_creacion, telefono FROM usuarios')

    let textData = ''
    const headers = Object.keys(data[0][0]).join(',') + '\n'
    textData += headers

    data[0].forEach(row => {
      const values = Object.values(row).map(value => `${value}`).join(',')
      textData += values + '\n'
    })

    await fs.writeFile('usuarios.csv', textData)
    await pool.query('TRUNCATE TABLE `funval_api`.`usuarios`')
    res.writeHead(200, { 'content-type': 'application/json; charset="utf-8"' })
    res.end(JSON.stringify({ message: 'Datos guardados correctamente' }))
  } catch (error) {
    res.writeHead(500, { 'content-type': 'application/json' })
    res.end(JSON.stringify({ message: 'Error interno al exportar datos' }))
  }
}

export const importarDatosUsuarios = async (req, res) => {
  try {
    res.writeHead(200, { 'content-type': 'application/json; charset="utf-8"' })
    const pathToCsv = path.resolve('./usuarios.csv')
    const csv = await fs.readFile(pathToCsv, 'utf-8')

    const csvData = csv.split('\n').map(row => row.trim().replace('\r', ''))
    csvData.shift()
    const ultimoElemento = csvData[csvData.length - 1]

    if (ultimoElemento === '') {
      csvData.pop()
    }

    const dataToVerify = await pool.query('SELECT id, nombres, apellidos, direccion, correo_electronico, dni, edad, DATE_FORMAT(fecha_creacion, "%y-%m-%d") AS fecha_creacion, telefono FROM usuarios')

    let DataExisteEnBD

    if (!(dataToVerify[0][0] === undefined)) {
      let textData = ''
      dataToVerify[0].forEach(row => {
        const values = Object.values(row).map(value => `${value}`).join(',')
        textData += values + '\n'
      })
      DataExisteEnBD = textData.split('\n').map(row => row.trim().replace('\r', ''))
    } else {
      DataExisteEnBD = []
    }

    const filteredData = []
    csvData.forEach((row, index) => {
      const rowData = row.split(',')

      // Validar formato de los datos
      const id = parseInt(rowData[0])
      const correo = rowData[4]
      const dni = parseInt(rowData[5])
      const edad = parseInt(rowData[6])
      const fecha = rowData[7]
      const telefono = rowData[8]

      const isIdValid = !isNaN(id)
      const isCorreoValid = validateEmail(correo)
      const isDniValid = (dni.toString().length === 7) && (!isNaN(dni))
      const isEdadValid = (!isNaN(edad)) && (edad > 0)
      const isFechaValid = validarFormatoFecha(fecha)
      const isTelefonoValid = validarFormatoTelefono(telefono)
      const datosValidados = isIdValid && isCorreoValid && isDniValid && isEdadValid && isFechaValid && isTelefonoValid
      const datoNoRepetido = !filteredData.some(item => ((item.split(',')[0] === id.toString()) || (item.split(',')[4] === correo) || (item.split(',')[5] === dni.toString()) || (item.split(',')[8] === telefono)))
      const datoNoExisteEnDb = !DataExisteEnBD.some(item => ((item.split(',')[0] === id.toString()) || (item.split(',')[4] === correo) || (item.split(',')[5] === dni.toString()) || (item.split(',')[8] === telefono)))

      if (datosValidados) {
        if (datoNoExisteEnDb && datoNoRepetido) {
          filteredData.push(row)
        } else {
          res.write(JSON.stringify({ message: `Fila ${index + 1} omitida por estar repetida` }) + '\n')
        }
      } else {
        res.write(JSON.stringify({ message: `Fila ${index + 1} omitida por formatos o datos invalidos` }) + '\n')
      }
    })

    filteredData.forEach(row => {
      const data = row.split(',')
      const query = 'INSERT INTO usuarios(id, nombres, apellidos, direccion, correo_electronico, dni, edad, fecha_creacion, telefono) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
      pool.execute(query, data)
    })

    res.end(JSON.stringify({ message: 'Datos importados correctamente' }))
  } catch (error) {
    res.writeHead(500, { 'content-type': 'application/json' })
    res.end(JSON.stringify({ message: 'Error interno al importar datos' }))
  }
}

export const urlError = async (req, res) => {
  res.writeHead(404, { 'content-type': 'application/json' })
  res.end(JSON.stringify({ message: 'Not found' }))
}
