import http from 'node:http'
import { PORT } from './config.js'
import { exportarDatosUsuarios, importarDatosUsuarios, inicio, mostrarUsuarios, urlError } from './library.js'

const server = http.createServer((req, res) => {
  const { method, url } = req

  if (method === 'GET') {
    switch (url) {
      case '/':{
        // Ruta que maneja la pagina de inicio
        inicio(req, res)
        break
      }

      case '/api/usuarios':{
        // Ruta que maneja la muestra de los usuarios extraidos de la base de datos
        mostrarUsuarios(req, res)
        break
      }

      case '/api/usuarios/export':{
        // Ruta que exporta los datos de los usuarios de la base de datos y los almacena en un archivo csv
        exportarDatosUsuarios(req, res)
        break
      }

      case '/api/usuarios/import':{
        // Ruta que importa un archivo csv para almacenar los datos en la tabla usuarios en la base de datos
        importarDatosUsuarios(req, res)
        break
      }

      default:{
        // Ruta que maneja las rutas erroneas
        urlError(req, res)
        break
      }
    }
  }
})

server.listen(PORT, () => console.log(`Ser running on: http://localhost:${PORT}`))
