import { Routes, Route, Navigate } from "react-router-dom";
import AdminUsersPage from './components/pages/adminUsersPage';


function App() {


  return (
    <Routes>
      <Route path="/admin/users" element={<AdminUsersPage />}/>
      <Route path="*" element={<Navigate to="/admin/users" replace />}/>
    </Routes>
  );
}

export default App
