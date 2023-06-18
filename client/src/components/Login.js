// import logo from src folder
import logo from "../logo.png";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import http from "../api";
import { AuthContext, setAuth } from "../context_store";

function Login() {
	const authContext = useContext(AuthContext);
	const { setIsLoggedIn, setLoggedInUser } = authContext;

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
			http
				.post("/user/login", { email, password })
				.then((res) => {
					if (res.status === 200) {
						setAuth(res.data.data, { setIsLoggedIn, setLoggedInUser });
						showMessage("Login successful!", "success");
						if (res.data.data?.role === "admin") {
							return navigateTo("/admin/dashboard");
						} else if (res.data.data?.role === "store-keeper") {
							return navigateTo("/store");
						} else {
							return navigateTo("/user/dashboard");
						}
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
		// Reset the input values when the component mounts
		setEmail("");
		setPassword("");
	}, []);

	return (
		// main container
		<div className="bg-[#F7F7F7] min-h-screen flex flex-col items-center justify-center px-4">
			<div className="flex flex-col items-center justify-center mb-6">
				<img src={logo} className="w-40" alt="logo" />
				<h1 className="text-2xl font-semibold mb-2">Login</h1>
				<p className="mb-1 text-slate-600">Access to our dashboard</p>
			</div>
			{/* Div For Login Form */}
			<div className="shadow-md login_form w-full sm:w-96 md:w-[500px] lg:w-[600px] py-4 mt-2 mb-4 flex flex-col items-center justify-center bg-white">
				<div className="form w-full flex flex-col items-start justify-center px-8">
					<label htmlFor="email" className="mb-2">
						Email Address
					</label>
					<input
						type="email"
						value={email}
						onChange={(e) => handleInputChange(e)}
						placeholder="Enter your email"
						id="email"
						className="outline-none w-full sm:w-[90%] h-[40px] border-2 border-gray-300 rounded-md my-2 p-4"
						required
					/>
					<label htmlFor="password" className="mb-2">
						Password
					</label>
					<div className="relative w-full sm:w-[90%]">
						<input
							type={passwordType}
							value={password}
							onChange={(e) => handleInputChange(e)}
							placeholder="Enter your password"
							id="password"
							className="password outline-none w-full h-[40px] border-2 border-gray-300 rounded-md p-4"
							required
						/>
						<span
							className="password_span absolute top-[50%] right-[10px] -translate-y-1/2 cursor-pointer text-slate-600"
							onClick={showPassword}>
							<i className={`fas ${passIcon}`}></i>
						</span>
					</div>
					<button className="mt-4 bg-blue-500 text-white rounded-md px-8 py-2 font-semibold" onClick={handleLogin}>
						Login
					</button>
				</div>
			</div>
		</div>
	);
}

export default Login;
