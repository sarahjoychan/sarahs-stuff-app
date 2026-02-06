import { SignUp, SignedIn } from '@clerk/clerk-react';

const SignUpPage1 = () => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      minHeight: '100vh',
      flexDirection: 'column',
      gap: '20px'
    }}>
      <h1>Create Your Account</h1>
      <SignUp 
        routing="path" 
        path="/sign-up"
        signInUrl="/"
        forceRedirectUrl="/app/user"
      />
      <SignedIn>
        <p>Redirecting...</p>
      </SignedIn>
    </div>
  );
};

export default SignUpPage1;