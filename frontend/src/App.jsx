import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home';
import Register from './pages/Register';
import OtpVerify from './pages/OtpVerify';
import AddExpense from './pages/AddExpense';
import EditExpense from './pages/EditExpense';
import DummyExpense from './pages/DummyExpense';
import Skelton from './pages/Skelton';
import ProtectedRouter from "./Router/protectedRouter";


const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/register", element: <Register /> },
  { path: "/verify", element: <OtpVerify /> },
  {
    path: "/add-expense", element:
      <ProtectedRouter>
        <AddExpense />
      </ProtectedRouter>
  },
  { path: "/edit", element: <EditExpense /> },
  {
    path: "/dummy", element:
      <ProtectedRouter>
        <DummyExpense />
      </ProtectedRouter>
  },
  { path: "/view", element: <Skelton /> },





]);

const App = () => {
  return <RouterProvider router={router} />
}

export default App