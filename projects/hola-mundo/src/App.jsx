import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <article>
      <header>
        <img alt="el avatar de Tay" src='https://i1.sndcdn.com/avatars-000697977958-ap5lr4-t500x500.jpg'/>
        <div>
          <strong>Taylor Swift</strong>
          <span>@taytay</span>
        </div>
      </header>

      <aside>
        <button>
            Seguir
        </button>
      </aside>
    </article>
  )
}

export default App
