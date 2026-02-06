import { SignIn, SignedIn, useUser } from "@clerk/clerk-react";

export default function LoginPage() {
    //const { isSignedIn } = useUser(); 

    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            minHeight: '100vh',
            flexDirection: 'column',
            gap: '20px'
        }}>
            <h1>Welcome Back!</h1>
            <SignIn 
                signUpUrl="/"
                fallbackRedirectUrl="/app/user"
            />
            <SignedIn>
                <p>Redirecting...</p>
            </SignedIn>
        </div>
    );
}