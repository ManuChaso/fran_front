export const getImageUrl = (user) => {
  if (!user) return '/default-avatar.png'

  if (typeof user === 'string') {
    return '/default-avatar.png'
  }

  if (user.avatar && user.avatar !== 'default-avatar.jpg') {
    if (
      user.avatar.includes('cloudinary.com') ||
      user.avatar.startsWith('http')
    ) {
      return user.avatar
    }

    return `http://localhost:5000/uploads/${user.avatar}`
  }

  if (user.imagen && user.imagen !== 'default-avatar.jpg') {
    if (
      user.imagen.includes('cloudinary.com') ||
      user.imagen.startsWith('http')
    ) {
      return user.imagen
    }

    return `http://localhost:5000/uploads/${user.imagen}`
  }

  return '/default-avatar.png'
}
