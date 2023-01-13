// import logo from src folder
import logo from "../logo.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function Login({ setIsLoggedIn, token }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordType, setPasswordType] = useState("password");
	const [passIcon, setPassIcon] = useState("fa-eye-slash");

	const showPassword = () => {
		if (passwordType === "password") {
			setPasswordType("text");
			setPassIcon("fa-eye");
		} else {
			setPasswordType("password");
			setPassIcon("fa-eye-slash");
		}
	};

	const navigateTo = useNavigate();

	const handleInputChange = (e) => {
		const { id, value } = e.target;
		if (id === "email") {
			setEmail(value);
		}
		if (id === "password") {
			setPassword(value);
		}
	};

	const showMessage = (message, type) => {
		Swal.fire({
			toast: true,
			icon: type,
			title: message,
			animation: false,
			position: "bottom",
			showConfirmButton: false,
			timer: 3000,
			timerProgressBar: true,
			didOpen: (toast) => {
				toast.addEventListener("mouseenter", Swal.stopTimer);
				toast.addEventListener("mouseleave", Swal.resumeTimer);
			},
		});
	};

	const handleLogin = () => {
		if (!email) {
			showMessage("Please enter email...!", "error");
			return;
		} else if (!password) {
			showMessage("Please enter password...!", "error");
			return;
		} else {
			axios
				.post("http://localhost:5000/user/login", { email, password })
				.then((res) => {
					if (res.status === 200) {
						localStorage.setItem("user", JSON.stringify(res.data.data));
						showMessage("Login successful!", "success");
						setIsLoggedIn(true);
						return navigateTo("/admin");
					} else {
						showMessage("Login failed...!", "error");
					}
				})
				.catch((err) => {
					console.log(err);
					showMessage(err.response.data.message, "error");
					console.log(err);
				});
		}
	};

	useEffect(() => {
		if (token) {
			axios
				.get("http://localhost:5000/user/authenticate", {
					headers: { Authorization: `Token ${token}` },
				})
				.then((res) => {
					if (res.status === 200) {
						setIsLoggedIn(true);
						navigateTo("/admin");
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, []);

	return (
		// main container
		<div className=" bg-[#F7F7F7] main_container  w-screen h-screen flex flex-col items-center justify-center ">
			<img src={logo} className="w-40 App-logo absolute top-8 " alt="logo" />
			{/* Div For Login Form */}
			<div className=" shadow-md login_form w-[500px] h-[450px] mt-32 flex flex-col items-center justify-center bg-white">
				<h1 className=" relative bottom-6 text-2xl font-semibold ">Login</h1>
				<p className="relative bottom-4 text-slate-600 ">Access to our dashboard</p>
				<div className="form w-full h-1/2 flex flex-col items-center justify-center">
					<label htmlFor="email" className="absolute top-[300px] left-[460px] mb-10 ">
						Email Address
					</label>
					<input
						type="email"
						value={email}
						onChange={(e) => handleInputChange(e)}
						placeholder="username123@gmail.com"
						id="email"
						className=" outline-none  w-[90%] h-[40px] border-2 border-gray-300 rounded-md mt-4 mb-10 p-4 "
						required
					/>
					<label htmlFor="password" className="absolute top-[362px] mt-4 left-[460px]">
						Password
					</label>
					<input
						type={passwordType}
						value={password}
						onChange={(e) => handleInputChange(e)}
						placeholder="Password"
						id="password"
						className="password p-4 outline-none w-[90%] h-[40px] border-2 border-gray-300 rounded-md"
						required
					/>

					<span
						className=" password_span cursor-pointer absolute top-[415px] right-[470px] text-slate-600 "
						onClick={() => showPassword()}>
						<i className={`fas ${passIcon}`}></i>
					</span>

					<button
						className="h-1/4 text-lg font-semibold bg-blue-500 text-white rounded-md w-[90%] relative top-8 "
						onClick={handleLogin}>
						Login
					</button>

					{/* don't have an account */}
					<div className="relative top-10 text-md text-slate-600 ">
						<p>
							Don't have an account?
							<span className="text-blue-500 font-semibold cursor-pointer" onClick={() => navigateTo("/signup")}>
								Sign Up
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
