import { API_BASE_URL, handleApiError, checkResponse } from './config'

export const obtenerProductos = async (
  page = 1,
  limit = 12,
  categoria = '',
  ordenar = 'destacado'
) => {
  try {
    let url = `${API_BASE_URL}/productos?page=${page}&limit=${limit}`

    if (categoria) {
      url += `&categoria=${categoria}`
    }

    if (ordenar) {
      url += `&sort=${
        ordenar === 'destacado'
          ? '-destacado'
          : ordenar === 'precio-asc'
          ? 'precio'
          : '-precio'
      }`
    }

    const response = await fetch(url)
    return await checkResponse(response)
  } catch (error) {
    handleApiError(error, 'Error al obtener productos:')
  }
}

export const buscarProductos = async (query) => {
  try {
    const response = await fetch(`${API_BASE_URL}/productos/search?q=${query}`)
    return await checkResponse(response)
  } catch (error) {
    handleApiError(error, 'Error en la búsqueda de productos:')
  }
}

export const obtenerProductosAdmin = async (
  token,
  page = 1,
  limit = 8,
  categoria = ''
) => {
  try {
    let url = `${API_BASE_URL}/productos?page=${page}&limit=${limit}`

    if (categoria) {
      url += `&categoria=${categoria}`
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return await checkResponse(response)
  } catch (error) {
    handleApiError(error, 'Error al obtener productos para administración:')
  }
}

export const buscarProductosAdmin = async (token, query) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/productos/search?q=${query}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    return await checkResponse(response)
  } catch (error) {
    handleApiError(error, 'Error en la búsqueda de productos:')
  }
}

export const crearProducto = async (token, productData, imageFile) => {
  try {
    const formData = new FormData()
    const numericFields = ['precio', 'stock']

    console.log('Product Data:', productData)
    console.log('Image File:', imageFile)
    console.log('Token:', token)

    Object.keys(productData).forEach((key) => {
      if (key === 'imagen') {
        return
      } else if (numericFields.includes(key)) {
        formData.append(key, Number(productData[key]))
      } else if (key === 'destacado') {
        formData.append(key, productData[key].toString())
      } else {
        formData.append(key, productData[key])
      }
    })

    if (imageFile instanceof File) {
      formData.append('imagen', imageFile)
    }

    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1])
    }

    const response = await fetch(`${API_BASE_URL}/productos`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    })

    console.log('Response status:', response.status)
    console.log('Response headers:', response.headers)

    if (response.status === 500) {
      const errorText = await response.text()
      console.error('Server error details:', errorText)
      throw new Error(`Error del servidor: ${errorText}`)
    }

    return await checkResponse(response)
  } catch (error) {
    console.error('Full error details:', error)
    handleApiError(error, 'Error al crear producto:')
  }
}

export const actualizarProducto = async (
  token,
  productId,
  productData,
  imageFile
) => {
  try {
    const formData = new FormData()
    const numericFields = ['precio', 'stock']

    Object.keys(productData).forEach((key) => {
      if (key === 'imagen') {
        return
      } else if (numericFields.includes(key)) {
        formData.append(key, Number(productData[key]))
      } else if (key === 'destacado') {
        formData.append(key, productData[key].toString())
      } else {
        formData.append(key, productData[key])
      }
    })

    if (imageFile instanceof File) {
      formData.append('imagen', imageFile)
    }

    const response = await fetch(`${API_BASE_URL}/productos/${productId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    })

    return await checkResponse(response)
  } catch (error) {
    handleApiError(error, 'Error al actualizar producto:')
  }
}

export const eliminarProducto = async (token, productId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/productos/${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return await checkResponse(response)
  } catch (error) {
    handleApiError(error, 'Error al eliminar producto:')
  }
}

export const cambiarEstadoProducto = async (token, productId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/productos/${productId}/estado`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )

    return await checkResponse(response)
  } catch (error) {
    handleApiError(error, 'Error al cambiar estado del producto:')
  }
}
