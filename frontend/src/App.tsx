import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./components/MainLayout";
import { CashierPage } from "./components/pages/Cashier";
import { OrderPage } from "./components/pages/Orders";
import ProductPage from "./components/pages/Product";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import DashboardPage from "./components/pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin", "owner"]}>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="cashier"
            element={
              <ProtectedRoute allowedRoles={["admin", "owner", "cashier"]}>
                <CashierPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="products"
            element={
              <ProtectedRoute allowedRoles={["admin", "owner"]}>
                <ProductPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="order"
            element={
              <ProtectedRoute allowedRoles={["admin", "owner", "cashier"]}>
                <OrderPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
