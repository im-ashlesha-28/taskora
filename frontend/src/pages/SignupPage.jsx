import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Sparkles, ArrowRight, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/api';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await authService.signup(formData);
      login(res.data.user, res.data.token);
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-sage-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <div className="inline-flex p-4 rounded-3xl bg-sage-900 text-white mb-6 shadow-hover">
            <Sparkles size={32} />
          </div>
          <h2 className="text-4xl font-heading font-bold text-sage-900 mb-2">Join Taskora</h2>
          <p className="text-sage-500 font-medium italic">"Start your mindful journey today." ✨</p>
        </div>

        <div className="cozy-card bg-white p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-sage-400 uppercase tracking-widest ml-4 flex items-center gap-2">
                <User size={14} /> Full Name
              </label>
              <input
                type="text"
                required
                className="soft-input"
                placeholder="Alex Garden"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-sage-400 uppercase tracking-widest ml-4 flex items-center gap-2">
                <Mail size={14} /> Email Address
              </label>
              <input
                type="email"
                required
                className="soft-input"
                placeholder="hello@sanctuary.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-sage-400 uppercase tracking-widest ml-4 flex items-center gap-2">
                <Lock size={14} /> Password
              </label>
              <input
                type="password"
                required
                className="soft-input"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            {error && (
              <p className="text-rose-500 text-sm font-bold text-center bg-rose-50 p-3 rounded-2xl border border-rose-100">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full sage-button !py-5 !text-lg"
            >
              {loading ? 'Creating Sanctuary...' : (
                <>
                  <UserPlus size={20} /> Join Now
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sage-500 text-sm font-medium">
              Already have an account?{' '}
              <Link to="/login" className="text-sage-900 font-bold hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
