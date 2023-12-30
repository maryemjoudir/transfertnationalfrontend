import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from './components/Auth/Login'
import Register from './components/Auth/Register'

import Index from './components/Backoffice/Dashboard/Index';

import IndexAgents from './components/Backoffice/Agents/Index';
import IndexClients from './components/Backoffice/Clients/Index';
import IndexBeneficiaires from './components/Backoffice/Beneficiaires/Index';

import DetailClient from './components/Backoffice/Clients/Detail';
import DetailBeneficiaire from './components/Backoffice/Beneficiaires/Detail';
import DetailAgent from './components/Backoffice/Agents/Detail';

import UpdateClient from './components/Backoffice/Clients/Update';
import UpdateBeneficiaire from './components/Backoffice/Beneficiaires/Update';
import UpdateAgent from './components/Backoffice/Agents/Update';

import AddClient from './components/Backoffice/Clients/Add';
import AddBeneficiaire from './components/Backoffice/Beneficiaires/Add';
import AddAgent from './components/Backoffice/Agents/Add';


import IndexParametre from './components/Backoffice/Parametres/Index';
function App() {

  return (

    <Router>
      <Routes>

        {/* Authentication */}
        <Route
          exact
          path="/auth/login"
          element={<Login />}
        ></Route>
        <Route
          exact
          path="/auth/register"
          element={<Register />}
        ></Route>

        {/* Dashboard */}
        <Route
          exact
          path="/admin/dashboard"
          element={<Index />}
        ></Route>

        {/* Agents */}
        <Route
          exact
          path="/admin/agents/Index"
          element={<IndexAgents />}
        ></Route>
        <Route
          exact
          path="/admin/agents/add"
          element={<AddAgent />}
        ></Route>
        <Route
          exact
          path="/admin/agent/detail/:id"
          element={<DetailAgent />}
        />
        <Route
          exact
          path="/admin/agent/update/:id"
          element={<UpdateAgent />}
        ></Route>

        {/* Clients */}
        <Route
          exact
          path="/admin/clients/Index"
          element={<IndexClients />}
        ></Route>
        <Route
          exact
          path="/admin/clients/add"
          element={<AddClient />}
        ></Route>
        <Route
          exact
          path="/admin/client/detail"
          element={<DetailClient />}
        />
        <Route
          exact
          path="/admin/client/update/:id"
          element={<UpdateClient />}
        ></Route>

        {/* Beneficiaires */}
        <Route
          exact
          path="/admin/beneficiaires/Index"
          element={<IndexBeneficiaires />}
        ></Route>
        <Route
          exact
          path="/admin/beneficiaire/add"
          element={<AddBeneficiaire />}
        ></Route>
        <Route
          exact
          path="/admin/beneficiaire/detail/:id"
          element={<DetailBeneficiaire />}
        />
        <Route
          exact
          path="/admin/beneficiaire/update/:id"
          element={<UpdateBeneficiaire />}
        ></Route>

        {/* Parametre */}
        <Route
          exact
          path="/admin/parametre"
          element={<IndexParametre />}
        ></Route>

      </Routes>
    </Router>

  )
}

export default App
