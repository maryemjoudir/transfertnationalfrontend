import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

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

import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ element, allowedRoles }) => {
  const isAuthenticated = localStorage.getItem('token') !== null;

  const decoded = isAuthenticated ? jwtDecode(localStorage.getItem('token')) : null;
  const userRole = decoded ? decoded.authorities[0] : null;

  const isRoleAllowed = allowedRoles.includes(userRole);

  return isAuthenticated && isRoleAllowed ? (
    element
  ) : (
    <Navigate to="/auth/login" replace />
  );
};

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
          path="/admin/dashboard"
          element={
            <ProtectedRoute
              element={<Index />}
              allowedRoles={['ADMIN']}
            />
          }
        />

        {/* Agents */}
        <Route
          path="/admin/agents/Index"
          element={
            <ProtectedRoute
              element={<IndexAgents />}
              allowedRoles={['ADMIN']}
            />
          }
        />
        <Route
          exact
          path="/admin/agents/add"
          element={
            <ProtectedRoute
              element={<AddAgent />}
              allowedRoles={['ADMIN']}
            />
          }
        ></Route>
        <Route
          exact
          path="/admin/agent/detail/:id"
          element={
            <ProtectedRoute
              element={<DetailAgent />}
              allowedRoles={['ADMIN']}
            />
          }
        />
        <Route
          exact
          path="/admin/agent/update/:id"
          element={<ProtectedRoute
            element={<UpdateAgent />}
            allowedRoles={['ADMIN']}
          />}
        ></Route>

        {/* Clients */}
        <Route
          exact
          path="/admin/clients/Index"
          element={<ProtectedRoute
            element={<IndexClients />}
            allowedRoles={['ADMIN']}
          />}
        ></Route>
        <Route
          exact
          path="/admin/clients/add"
          element={<ProtectedRoute
            element={<AddClient />}
            allowedRoles={['ADMIN']}
          />}
        ></Route>
        <Route
          exact
          path="/admin/client/detail"
          element={<ProtectedRoute
            element={<DetailClient />}
            allowedRoles={['ADMIN']}
          />}
        />
        <Route
          exact
          path="/admin/client/update/:id"
          element={<ProtectedRoute
            element={<UpdateClient />}
            allowedRoles={['ADMIN']}
          />}
        ></Route>

        {/* Beneficiaires */}
        <Route
          exact
          path="/admin/beneficiaires/Index"
          element={<ProtectedRoute
            element={<IndexBeneficiaires />}
            allowedRoles={['ADMIN']}
          />}
        ></Route>
        <Route
          exact
          path="/admin/beneficiaire/add"
          element={<ProtectedRoute
            element={<AddBeneficiaire />}
            allowedRoles={['ADMIN']}
          />}
        ></Route>
        <Route
          exact
          path="/admin/beneficiaire/detail/:id"
          element={<ProtectedRoute
            element={<DetailBeneficiaire />}
            allowedRoles={['ADMIN']}
          />}
        />
        <Route
          exact
          path="/admin/beneficiaire/update/:id"
          element={<ProtectedRoute
            element={<UpdateBeneficiaire />}
            allowedRoles={['ADMIN']}
          />}
        ></Route>

        {/* Parametre */}
        <Route
          exact
          path="/admin/parametre"
          element={<ProtectedRoute
            element={<IndexParametre />}
            allowedRoles={['ADMIN']}
          />}
        ></Route>

      </Routes>
    </Router>

  )
}

export default App
