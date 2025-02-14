import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { useTheme } from './contexts/ThemeContent'
import './styles/app.scss'
import './styles/utilities.scss'
import { router } from './routes'

function App() {
  const { appliedTheme } = useTheme()

  return (
    <AuthProvider>
      <div className='app' id={appliedTheme}>
        <RouterProvider router={router}/>
      </div>
    </AuthProvider>
  )
}

export default App
