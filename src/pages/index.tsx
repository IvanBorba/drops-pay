import { Route, Routes } from 'react-router-dom'

import Benefits from './Benefits'
import BenefitsForm from './BenefitsForm'
import Dashboard from './Dashboard'
import GroupsOfCompanies from './GroupsOfCompanies'
import NewGroupForm from './NewGroupForm'
import PointsForm from './PointsForm'
import PointsOfSale from './PointsOfSale'
import Products from './Products'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/novo-ponto-de-venda" element={<PointsForm />} />
      <Route path="/pontos-de-venda" element={<PointsOfSale />} />
      <Route path="/novo-grupo" element={<NewGroupForm />} />
      <Route path="/grupos-de-empresas" element={<GroupsOfCompanies />} />
      <Route path="/products" element={<Products />} />
      <Route path="/beneficios" element={<Benefits />} />
      <Route path="/novo-beneficio" element={<BenefitsForm />} />
    </Routes>
  )
}

export default AppRoutes
