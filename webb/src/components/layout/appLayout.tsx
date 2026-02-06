import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./navbar";


const AppLayout = () => {
    return (
      <div>
        <Navbar />
        <main style={{ padding: '20px' }}>
          <Outlet />
        </main>
      </div>
    );
  };
  
  export default AppLayout;