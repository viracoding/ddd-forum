import { BrowserRouter, Route, Routes } from 'react-router'
import { MainPage } from '@/pages/mainPage.tsx'
import { RegistrationPage } from '@/pages/registrationPage.tsx'
import { Layout } from '@/components/layout'
import { UserProvider } from '@/contexts/usersContext.tsx'

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/join" element={<RegistrationPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
