import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const BG_IMG = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80';

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const handleSendOTP = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('OTP sent! (Check console for code)');
        if (data.otp) {
        
          console.log('Your OTP is:', data.otp);
          console.log("This Feature is only For testing purpose")
        }
        setStep(2);
      } else {
        toast.error(data.error || 'Failed to send OTP');
      }
    } catch (err) {
      toast.error('Failed to send OTP');
    }
  };

  const handleReset = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('Password reset successfully!');
        setStep(3);
      } else {
        toast.error(data.error || 'Failed to reset password');
      }
    } catch (err) {
      toast.error('Failed to reset password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative" style={{ backgroundImage: `url(${BG_IMG})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative z-10 w-full max-w-md mx-auto p-8 rounded-2xl shadow-2xl bg-white/90 backdrop-blur-md">
        <button onClick={handleBack} className="mb-4 text-red-600 hover:underline">&larr; Back</button>
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-4">Forgot Password</h2>
        {step === 1 && (
          <>
            <input
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white/80 mb-4"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleSendOTP} className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg shadow transition">
              Send OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white/80 mb-2"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <input
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white/80 mb-4"
              placeholder="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button onClick={handleReset} className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg shadow transition">
              Reset Password
            </button>
          </>
        )}

        {step === 3 && (
          <p className="text-green-600 text-center">You can now log in with your new password.</p>
        )}
      </div>
    </div>
  );
}
