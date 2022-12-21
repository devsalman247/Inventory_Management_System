// import logo from src folder
import logo from "../logo.png";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login()
{
    const [password, setPassword] = useState('password');
    const [passIcon, setPassIcon] = useState('fa-eye-slash');

    const showPassword = () => {
        if (password === 'password') {
            setPassword('text');
            setPassIcon('fa-eye');
        } else {
            setPassword('password');
            setPassIcon('fa-eye-slash');
        }
    }

    const history = useNavigate();

    return (
        // main container
        <div className=" bg-[#F7F7F7] main_container  w-screen h-screen flex flex-col items-center justify-center ">
            <img src={logo} className="w-40 App-logo absolute top-8 " alt="logo" />
            {/* Div For Login Form */}
            <div className=" shadow-md login_form w-[500px] h-[450px] mt-32 flex flex-col items-center justify-center bg-white">
                <h1 className=" relative bottom-6 text-2xl font-semibold ">Login</h1>
                <p className='relative bottom-4 text-slate-600 ' >Access to our dashboard</p>
                <div className="form w-full h-1/2 flex flex-col items-center justify-center">
                    <label htmlFor="email" className='absolute top-[300px] left-[460px] mb-10 ' >Email Address</label>
                    <input type="email" placeholder="username123@gmail.com" className=" outline-none  w-[90%] h-[40px] border-2 border-gray-300 rounded-md mt-4 mb-10 p-4 " required />
                    <label htmlFor="password" className='absolute top-[362px] mt-4 left-[460px]' >Password</label>
                    <input type={password} placeholder="Password" className="password p-4 outline-none w-[90%] h-[40px] border-2 border-gray-300 rounded-md" required
                    />

                    <span className=" password_span cursor-pointer absolute top-[415px] right-[470px] text-slate-600 " onClick={() => showPassword()}><i className={`fas ${passIcon}`}></i></span>

                    <button className="h-1/4 text-lg font-semibold bg-blue-500 text-white rounded-md w-[90%] relative top-8 "
                        onClick={() => history('/admin')}
                    >Login</button>

                    {/* don't have an account */}
                    <div className="relative top-10 text-md text-slate-600 ">
                        <p>Don't have an account? <span className="text-blue-500 font-semibold cursor-pointer"
                            onClick={() => history('/signup')}
                        >Sign Up</span></p>
                    </div>
                </div>
            </div>
        </div>
    ); 
}

export default Login;