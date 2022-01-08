import { Route, Routes } from 'react-router-dom'

import Benefits from './Benefits'
import BenefitsForm from './BenefitsForm'
import Dashboard from './Dashboard'
import GroupsOfClients from './GroupsOfClients'
import GroupsOfCompanies from './GroupsOfCompanies'
import GroupsOfProducts from './GroupsOfProducts'
import NewGroupForm from './NewGroupForm'
import PointsForm from './PointsForm'
import PointsOfSale from './PointsOfSale'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/novo-ponto-de-venda" element={<PointsForm />} />
      <Route path="/pontos-de-venda" element={<PointsOfSale />} />
      <Route path="/novo-grupo" element={<NewGroupForm />} />
      <Route path="/grupos-de-empresas" element={<GroupsOfCompanies />} />
      <Route path="/grupos-de-clientes" element={<GroupsOfClients />} />
      <Route path="/produtos" element={<GroupsOfProducts />} />
      <Route path="/beneficios" element={<Benefits />} />
      <Route path="/novo-beneficio" element={<BenefitsForm />} />
      <Route path="/novo-beneficio/:id" element={<BenefitsForm />} />
    </Routes>
  )
}

export default AppRoutes
