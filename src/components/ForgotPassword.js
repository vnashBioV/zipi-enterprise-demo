import React, {useState, useEffect} from 'react'
import '../css/password.css';
import firebase from '../firebase-config';
import { Link, useNavigate  } from 'react-router-dom';


export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const passwordReset = (email) => {
        return firebase.auth().sendPasswordResetEmail(email).catch((error) => {
            alert(error.message);
          }).then(() => {
            alert("reset password email sent")
            navigate('/login')
        });

    }
    console.log("email", email);
  return (
    <div style={{
        display:"flex", 
        justifyContent:"center", 
        alignItems:"center",
        width:"100vw",
        height:"100vh",
}}
        className="password-container"  >
        <div style={{zIndex:"999"}}>
        <div style={{display:"flex", flexDirection:"column", textAlign:"center", width:"222px"}}>
            <h1 style={{marginBottom:"1rem", color:"#fff", fontSize:"16px"}}>To reset your password please provide the email bellow.</h1>
            <input type="text" style={{marginBottom:"1rem", padding:"0.2rem 0.5rem", borderRadius:"10px"}} onChange={(e) => setEmail(e.target.value)}/>
            <button style={{padding:"0.3rem 0.5rem", borderRadius:"10px", background:"#ffe200"}} onClick={() => passwordReset(email)}>Reset password</button>
        </div>
        </div>
    </div>
  )
}
