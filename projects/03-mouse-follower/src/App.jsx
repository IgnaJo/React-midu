import React, { useEffect, useState } from 'react'

const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    console.log('efecto')
    const handleMove = (event) => {
      const { clientX, clientY } = event
      console.log('handleMove', { clientX, clientY })
      setPosition({ x: clientX, y: clientY })
    }

    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }
    // Limpiar estado, se ejecuta cada vez que el componente se desmonta
    // cuando se cambian las dependencias
    return () => {
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled])
  return (
    <>
      <main>
        <div
          style={{
            position: 'absolute',
            background: '#89f',
            borderRadius: '56%',
            opacity: 0.8,
            pointerEvents: 'none',
            left: -20,
            top: -20,
            width: 40,
            height: 40,
            transform: `translate(${position.x}px, ${position.y}px)`
          }}
        />

        <h1>Proyecto 03</h1>
        <button onClick={() => setEnabled(!enabled)}>
          {enabled ? 'Desactivar' : 'Activar'}
          Seguir Puntero
        </button>
      </main>
    </>
  )
}

const App = () => {
  return (
    <main>
      <FollowMouse />
    </main>
  )
}

export default App
