import { useSignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


//more custom signUp page
const SignUpPage2 = () => {
    const { signUp, setActive } = useSignUp();
    const navigate = useNavigate();

    //Form state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');

    //verificationState
    const [verifying, setVerifying] = useState(false);
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    //step1: create account and send verification email
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!signUp) return;

        try {
            //create the user account
            await signUp.create({
                emailAddress: email,
                password,
                firstName,
                lastName,
                username,
            });

            // send verification code to email
            await signUp.prepareEmailAddressVerification({
                strategy: 'email_code'
            });
            //show verification form
            setVerifying(true);
        } catch (err: any) {
            setError(err.errors?.[0]?.message || 'Failed to create account');
            console.error('Sign up error', err);
        }
    };

    //step 2: Verify Email with Code
    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!signUp) return;

        try {
            //verify the email with the code
            const result = await signUp.attemptEmailAddressVerification({ code });
            if (result.status === 'complete') {
                //set the active session
                await setActive({ session: result.createdSessionId });
                //redirect to home
                navigate('/home');
            } else {
                setError('Verification incomplete. Please try again.');
            }
        } catch (err: any) {
            setError(err.errors?.[0]?.message || 'Invalid verification code');
            console.error('Verification error:', err);
        }
    };
    // If Verifying, show verification form
    if (verifying) {
        return (
            <div style={{ 
                maxWidth: '400px', 
                margin: '50px auto',
                padding: '20px',
                border: '1px solid #ccc',
                borderRadius: '8px'
              }}>
                <h1>Verify your Email</h1>
                <p>We have sent a verification code to {email}</p>

                <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                    <input 
                        type="text"
                        placeholder="Enter Verifcation Code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                        style={{ padding: '10px', fontSize: '16px', textAlign: 'center', letterSpacing: '4px' }}
                        maxLength={6}
                    />

                    {error && <p style={{ color: 'red' }}>{error}</p>}
                     
                    <button
                        type="submit"
                        style={{ 
                            padding: '10px', 
                            fontSize: '16px',
                            cursor: 'pointer',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px'
                          }}
                    >
                        Verify Email
                    </button>
                    <button
                        type="button"
                        onClick={() => setVerifying(false)}
                        style={{ 
                            padding: '10px', 
                            fontSize: '14px',
                            cursor: 'pointer',
                            backgroundColor: 'transparent',
                            color: '#666',
                            border: '1px solid #ccc',
                            borderRadius: '4px'
                          }}
                    >
                        Back to Sign Up
                    </button>
                </form>
            </div>
        );
    }

    //show sign up form
    return (
        <div style={{ 
            maxWidth: '400px', 
            margin: '50px auto',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '8px'
          }}>
            <h1>Create Account</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                <input 
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    style={{ padding: '10px', fontSize: '16px' }}
                />
                <input 
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    style={{ padding: '10px', fontSize: '16px' }}
                />
                <input 
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={{ padding: '10px', fontSize: '16px' }}
                />
                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ padding: '10px', fontSize: '16px' }}
                />
                <input 
                    type="password"
                    placeholder="Password (min 8 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ padding: '10px', fontSize: '16px' }}
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button
                    type="submit"
                    style={{ 
                        padding: '12px', 
                        fontSize: '16px',
                        cursor: 'pointer',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontWeight: 'bold'
                      }}
                >
                    Sign Up
                </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
                Already have an account?{' '}
                <a
                    href="/"
                    style={{ 
                        color: '#4CAF50',
                        textDecoration: 'none',
                        fontWeight: 'bold'
                      }}
                >
                    Log in
                </a>
            </p>
        </div>
    );
};

export default SignUpPage2;