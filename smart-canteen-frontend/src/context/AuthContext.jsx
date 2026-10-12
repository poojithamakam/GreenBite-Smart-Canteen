import React from 'react';
import { createContext, useContext, useMemo, useState } from 'react';
import api from '../api/client.js';
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
 const [user,setUser]=useState(()=>{try{return JSON.parse(localStorage.getItem('smartcanteen_user'))||null}catch{return null}});
 async function login(email,password){const {data}=await api.post('/auth/login',{email,password});localStorage.setItem('smartcanteen_token',data.token);const u={id:data.user.id,name:data.user.fullName,email:data.user.email,role:data.user.role};localStorage.setItem('smartcanteen_user',JSON.stringify(u));setUser(u);return u;}
 async function register(form){const {data}=await api.post('/auth/register',{fullName:form.name,email:form.email,studentId:form.studentId,password:form.password});localStorage.setItem('smartcanteen_token',data.token);const u={id:data.user.id,name:data.user.fullName,email:data.user.email,role:data.user.role};localStorage.setItem('smartcanteen_user',JSON.stringify(u));setUser(u);return u;}
 function logout(){setUser(null);localStorage.removeItem('smartcanteen_user');localStorage.removeItem('smartcanteen_token');}
 const value=useMemo(()=>({user,login,register,logout}),[user]);return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth(){const v=useContext(AuthContext);if(!v)throw new Error('useAuth must be used inside AuthProvider');return v;}
