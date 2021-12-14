import { Route, Routes } from 'react-router-dom'

import BenefitsForm from './BenefitsForm'
import Dashboard from './Dashboard'
import NewGroupForm from './NewGroupForm'
import PointsForm from './PointsForm'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/novo-ponto-de-venda" element={<PointsForm />} />
      <Route path="/novo-grupo" element={<NewGroupForm />} />
      <Route path="/novo-beneficio" element={<BenefitsForm />} />
    </Routes>
  )
}

export default AppRoutes
