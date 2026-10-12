import React from 'react';
import {useState} from 'react';import {Link,useLocation,useNavigate} from 'react-router-dom';import {Eye,EyeOff,Leaf,LockKeyhole,Mail,UserRound} from 'lucide-react';import {useAuth} from '../context/AuthContext.jsx';
export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isAdmin = new URLSearchParams(location.search).get('role') === 'admin';

  async function submit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const u = await login(email, password);

      if (isAdmin && u.role !== 'ADMIN') {
        setError('This account does not have admin access. Use an admin account.');
        return;
      }

      if (!isAdmin && u.role === 'ADMIN') {
        navigate('/admin');
        return;
      }

      navigate(
        new URLSearchParams(location.search).get('next') ||
        (u.role === 'ADMIN' ? '/admin' : '/menu')
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Could not sign in. Check your email, password, and backend.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title={isAdmin ? 'Admin sign in' : 'Welcome back!'}
      subtitle={
        isAdmin
          ? 'Sign in to manage canteen orders.'
          : 'Sign in and get back to the good stuff.'
      }
    >
      <form onSubmit={submit} className="auth-form">
        {error && <div className="alert alert-danger py-2">{error}</div>}

        <label className="form-label">Email address</label>
        <div className="auth-input">
          <Mail size={18} />
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder={isAdmin ? 'Admin email address' : 'you@college.edu'}
            required
          />
        </div>

        <label className="form-label mt-3">Password</label>
        <div className="auth-input">
          <LockKeyhole size={18} />
          <input
            type={show ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            onClick={() => setShow(!show)}
            aria-label="Toggle password visibility"
          >
            {show ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </div>

        <button className="btn btn-brand btn-lg w-100 mt-4" disabled={loading}>
          {loading ? 'Signing in…' : isAdmin ? 'Admin sign in' : 'Sign in'}
        </button>

        {!isAdmin && (
          <>
            <p className="auth-switch">
              New to GreenBite? <Link to="/register">Create an account</Link>
            </p>
            <p className="auth-switch">
              Are you an administrator? <Link to="/login?role=admin">Admin sign in</Link>
            </p>
          </>
        )}

        {isAdmin && (
          <p className="auth-switch">
            Student? <Link to="/login">Student sign in</Link>
          </p>
        )}
      </form>
    </AuthShell>
  );
}
export function Register(){const[form,setForm]=useState({name:'',email:'',studentId:'',password:''}),[error,setError]=useState(''),[loading,setLoading]=useState(false);const{register}=useAuth(),navigate=useNavigate();function update(e){setForm({...form,[e.target.name]:e.target.value})}async function submit(e){e.preventDefault();setError('');setLoading(true);try{await register(form);navigate('/menu')}catch(err){setError(err.response?.data?.message||'Could not register. Confirm the backend is running and check your details.')}finally{setLoading(false)}}return <AuthShell title="Join the table." subtitle="A few details and you're ready to order."><form onSubmit={submit} className="auth-form">{error&&<div className="alert alert-danger py-2">{error}</div>}<label className="form-label">Full name</label><div className="auth-input"><UserRound size={18}/><input name="name" value={form.name} onChange={update} placeholder="Your full name" required/></div><label className="form-label mt-3">College email</label><div className="auth-input"><Mail size={18}/><input type="email" name="email" value={form.email} onChange={update} placeholder="you@college.edu" required/></div><label className="form-label mt-3">Student ID</label><div className="auth-input"><UserRound size={18}/><input name="studentId" value={form.studentId} onChange={update} placeholder="e.g. STU001" required/></div><label className="form-label mt-3">Password</label><div className="auth-input"><LockKeyhole size={18}/><input type="password" name="password" minLength={8} value={form.password} onChange={update} placeholder="At least 8 characters" required/></div><button className="btn btn-brand btn-lg w-100 mt-4" disabled={loading}>{loading?'Creating account…':'Create student account'}</button><p className="auth-switch">Already registered? <Link to="/login">Sign in</Link></p></form></AuthShell>}
function AuthShell({title,subtitle,children}){return <main className="auth-page"><div className="auth-visual"><div className="auth-visual-content"><span className="auth-brand"><Leaf/> greenbite.</span><h2>Campus food,<br/>made <em>easy.</em></h2><p>Less waiting in line. More time to enjoy your break.</p><div className="auth-visual-photo"><img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85" alt="Fresh meal"/></div></div></div><div className="auth-panel"><div className="auth-panel-inner"><span className="eyebrow">YOUR CANTEEN, REIMAGINED</span><h1>{title}</h1><p className="auth-subtitle">{subtitle}</p>{children}</div></div></main>}

