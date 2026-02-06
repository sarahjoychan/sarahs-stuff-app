import { Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import LoginPage from "./components/pages/loginPage";
import SignUpPage1 from "./components/pages/signUpPage1";
import UserHomePage from "./components/pages/userHomePage";
import AppLayout from "./components/layout/appLayout";

//Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode}) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<LoginPage />}/>
      <Route path="/sign-up" element={<SignUpPage1 />} />

      {/* Authenticated Area */}  
      <Route path="/app" element={
        <ProtectedRoute>
            <AppLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="user" replace />} />
        <Route path="user" element={<UserHomePage />}/>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />}/>

    </Routes>
  );
}

export default App
