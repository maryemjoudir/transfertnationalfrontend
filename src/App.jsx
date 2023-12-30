import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from './components/Auth/Login'
import Register from './components/Auth/Register'

import Index from './components/Backoffice/Dashboard/Index';

import {Index as IndexAgents} from './components/Backoffice/Agents/Index';
import {Index as IndexClients} from './components/Backoffice/Clients/Index';
import {Index as IndexBeneficiaires} from './components/Backoffice/Beneficiaires/Index';

import {Detail as DetailClient} from './components/Backoffice/Clients/Detail';
import {Detail as DetailBeneficiaire} from './components/Backoffice/Beneficiaires/Detail';
import {Detail as DetailAgent} from './components/Backoffice/Agents/Detail';

import {Update as UpdateClient} from './components/Backoffice/Clients/Update';
import {Update as UpdateBeneficiaire} from './components/Backoffice/Beneficiaires/Update';
import {Update as UpdateAgent} from './components/Backoffice/Agents/Update';

import {Add as AddClient} from './components/Backoffice/Clients/Add';
import {Add as AddBeneficiaire} from './components/Backoffice/Beneficiaires/Add';
import {Add as AddAgent} from './components/Backoffice/Agents/Add';

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
        {/* <Route
          exact
          path="/admin/agent/detail/:id"
          element={<DetailAgent />}
        /> */}
        {/* <Route
          exact
          path="/admin/agent/update/:id"
          element={<UpdateAgent />}
        ></Route> */}
        <Route
          exact
          path="/admin/agents/add"
          element={<AddAgent />}
        ></Route>


        {/* Clients */}
        <Route
          exact
          path="/admin/clients/Index"
          element={<IndexClients />}
        ></Route>
        {/* <Route
          exact
          path="/admin/client/detail/:id"
          element={<DetailClient />}
        /> */}
        {/* <Route
          exact
          path="/admin/client/update/:id"
          element={<UpdateClient />}
        ></Route> */}
        <Route
          exact
          path="/admin/clients/add"
          element={<AddClient />}
        ></Route>


        {/* Clients */}
      
        <Route
          exact
          path="/admin/beneficiaire/add"
          element={<AddBeneficiaire />}
        ></Route>
      </Routes>
    </Router>

  )
}

export default App
