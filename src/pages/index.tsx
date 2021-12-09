import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Dashboard from './Dashboard'
import PointsForm from './PointsForm'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/novo-ponto-de-venda" element={<PointsForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
