import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { useTheme } from './contexts/ThemeContent'
import './styles/app.scss'
import './styles/utilities.scss'
import { router } from './routes'

function App() {
  const { theme } = useTheme()

  return (
    <AuthProvider>
      <div className='app' id={theme}>
        <RouterProvider router={router}/>
      </div>
    </AuthProvider>
  )
}

export default App
