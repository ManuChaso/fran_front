import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../../../components/Header/Header'
import {
  loadChatMessages,
  createSocketConnection,
  updateChatMessage,
  deleteChatMessage,
  deleteAllChatMessages
} from '../../../../services/Api/index'
import Button from '../../../../components/Button/Button'
import './Chat.css'

const socket = createSocketConnection()

const Chat = () => {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentUserName, setCurrentUserName] = useState('Usuario')
  const [currentUserId, setCurrentUserId] = useState('')
  const [userRole, setUserRole] = useState('')
  const [editingMessageId, setEditingMessageId] = useState(null)
  const [editText, setEditText] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  useEffect(() => {
    const nombre = localStorage.getItem('nombre')
    const userId = localStorage.getItem('userId')
    const rol = localStorage.getItem('rol')

    if (nombre) {
      setCurrentUserName(nombre)
    }

    if (userId) {
      setCurrentUserId(userId)
    }

    if (rol) {
      setUserRole(rol)
    }
  }, [])

  const fetchInitialMessages = async () => {
    try {
      const token = localStorage.getItem('token')
      const data = await loadChatMessages(token)

      if (data && Array.isArray(data)) {
        setMessages(data)
      }

      setIsLoading(false)
      scrollToBottom()
    } catch (error) {
      console.error('Error al cargar mensajes:', error.message)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchInitialMessages()

    const handleChatHistory = (history) => {
      setMessages(history)
      setIsLoading(false)
      scrollToBottom()
    }

    const handleNewMessage = (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage])
      scrollToBottom()
    }

    const handleMessageUpdated = (updatedMessage) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg._id === updatedMessage._id ? updatedMessage : msg
        )
      )
    }

    const handleMessageDeleted = (deletedMessage) => {
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg._id !== deletedMessage._id)
      )
    }

    socket.on('chatHistory', handleChatHistory)
    socket.on('chatMessage', handleNewMessage)
    socket.on('messageUpdated', handleMessageUpdated)
    socket.on('messageDeleted', handleMessageDeleted)
    socket.on('error', (error) => console.error('Error del socket:', error))

    return () => {
      socket.off('chatHistory', handleChatHistory)
      socket.off('chatMessage', handleNewMessage)
      socket.off('messageUpdated', handleMessageUpdated)
      socket.off('messageDeleted', handleMessageDeleted)
      socket.off('error')
    }
  }, [])

  const sendMessage = async (e) => {
    e.preventDefault()
    if (message.trim()) {
      try {
        const messageData = {
          text: message,
          userId: currentUserId,
          userName: currentUserName
        }

        socket.emit('chatMessage', messageData)
        setMessage('')
      } catch (error) {
        console.error('Error al enviar mensaje:', error)
      }
    }
  }

  const startEditing = (msg) => {
    setEditingMessageId(msg._id)
    setEditText(msg.text)
  }

  const cancelEditing = () => {
    setEditingMessageId(null)
    setEditText('')
  }

  const saveEdit = async () => {
    if (editText.trim() && editingMessageId) {
      try {
        const token = localStorage.getItem('token')
        await updateChatMessage(editingMessageId, editText, token)
        cancelEditing()
      } catch (error) {
        console.error('Error al actualizar mensaje:', error)
        alert('Error al actualizar el mensaje: ' + error.message)
      }
    }
  }

  const handleDeleteMessage = async (messageId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este mensaje?')) {
      try {
        const token = localStorage.getItem('token')
        await deleteChatMessage(messageId, token)
      } catch (error) {
        console.error('Error al eliminar mensaje:', error)
        alert('Error al eliminar el mensaje: ' + error.message)
      }
    }
  }

  const handleDeleteAllMessages = async () => {
    if (
      window.confirm(
        '¿Estás seguro de que quieres eliminar TODOS los mensajes? Esta acción no se puede deshacer.'
      )
    ) {
      try {
        const token = localStorage.getItem('token')
        await deleteAllChatMessages(token)
      } catch (error) {
        console.error('Error al eliminar todos los mensajes:', error)
        alert('Error al eliminar todos los mensajes: ' + error.message)
      }
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)

    const formattedDate = date.toLocaleDateString()

    const formattedTime = date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })

    return { date: formattedDate, time: formattedTime }
  }

  const canModifyMessage = (msg) => {
    return msg.userId === currentUserId || userRole === 'admin'
  }

  return (
    <div className='chat-container'>
      <Header />
      <div className='chat-header-actions'>
        <Button
          variant='secondary'
          onClick={() => navigate('/dashboard')}
          leftIcon={<span>←</span>}
        >
          Volver al Dashboard
        </Button>

        {userRole === 'admin' && (
          <Button variant='secondary' onClick={handleDeleteAllMessages}>
            Eliminar Todos los Mensajes
          </Button>
        )}
      </div>

      <div className='chat-content'>
        <h2 className='chat-title'>Chat en Vivo</h2>
        <div className='chat-box'>
          {isLoading ? (
            <div className='loading-messages'>Cargando mensajes...</div>
          ) : messages.length === 0 ? (
            <div className='no-messages'>No hay mensajes aún</div>
          ) : (
            messages.map((msg, index) => {
              const { date, time } = formatDate(msg.createdAt)
              const displayName = msg.userName || 'Usuario'
              const isEditing = editingMessageId === msg._id
              const isOwnMessage = msg.userId === currentUserId

              return (
                <div
                  key={msg._id || index}
                  className={`message-wrapper ${
                    isOwnMessage ? 'own-message' : ''
                  }`}
                >
                  <div className='message'>
                    <div className='message-header'>
                      <span className='message-username'>{displayName}</span>
                      <span className='message-date'>{date}</span>
                    </div>

                    {isEditing ? (
                      <div className='message-edit'>
                        <textarea
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className='edit-textarea'
                        />
                        <div className='edit-buttons'>
                          <button onClick={saveEdit} className='edit-save-btn'>
                            Guardar
                          </button>
                          <button
                            onClick={cancelEditing}
                            className='edit-cancel-btn'
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className='message-body'>{msg.text}</div>
                        <div className='message-footer'>
                          <span className='message-time'>{time}</span>

                          {canModifyMessage(msg) && (
                            <div className='message-actions'>
                              <button
                                onClick={() => startEditing(msg)}
                                className='message-action-btn edit-btn'
                                title='Editar mensaje'
                              >
                                ✏️
                              </button>
                              <button
                                onClick={() => handleDeleteMessage(msg._id)}
                                className='message-action-btn delete-btn'
                                title='Eliminar mensaje'
                              >
                                🗑️
                              </button>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )
            })
          )}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={sendMessage} className='chat-input-container'>
          <input
            className='chat-input'
            type='text'
            placeholder='Escribe un mensaje...'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button type='submit' variant='primary' size='md'>
            Enviar
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Chat
