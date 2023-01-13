import logo from "../logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
	const [password, setPassword] = useState("password");
	const [passIcon, setPassIcon] = useState("fa-eye-slash");

	const showPassword = () => {
		if (password === "password") {
			setPassword("text");
			setPassIcon("fa-eye");
		} else {
			setPassword("password");
			setPassIcon("fa-eye-slash");
		}
	};

	// useHistory hook for redirecting to another page
	const history = useNavigate();

	return (
		// main container
		<div className=" bg-[#F7F7F7] main_container  w-screen h-screen flex flex-col items-center justify-center ">
			<img src={logo} className=" w-40 App-logo absolute top-2" alt="logo" />
			{/* Div For Login Form */}
			<div className=" shadow-md login_form w-[500px] h-[500px] mt-24 flex flex-col items-center justify-center bg-white">
				<h1 className=" relative bottom-6 text-2xl font-semibold ">Register</h1>
				<p className="relative bottom-4 text-slate-600 ">Access to our dashboard</p>
				<div className="form w-full h-1/2 flex flex-col items-center">
					<label htmlFor="email" className="absolute top-[275px] left-[460px]">
						Email Address
					</label>
					<input
						type="email"
						placeholder="username123@gmail.com"
						className=" outline-none  w-[90%] h-[40px] border-2 border-gray-300 rounded-md mt-4 p-4"
						required
					/>

					{/* password */}
					<label htmlFor="password" className="relative mt-4 right-[185px]">
						Password
					</label>
					<input
						type={password}
						placeholder="Password"
						className="password p-4 outline-none w-[90%] h-[40px] border-2 border-gray-300 rounded-md "
						required
					/>

					<span
						className=" password_span cursor-pointer relative left-[180px] bottom-8 text-slate-600 "
						onClick={() => showPassword()}>
						<i className={`fas ${passIcon}`}></i>
					</span>

					{/* confirm password */}
					<label htmlFor="password" className="relative right-[155px]">
						Confirm Password
					</label>
					<input
						type={password}
						placeholder="Password"
						className="password p-4 outline-none w-[90%] h-[40px] border-2 border-gray-300 rounded-md"
						required
					/>

					<button className=" py-3 text-lg font-semibold bg-blue-500 text-white rounded-md w-[90%] relative top-2">
						Register
					</button>

					{/* Have an account */}
					<div className="relative top-4 text-md text-slate-600">
						<p>
							Already have an account?
							<span
								className="text-blue-500 font-semibold cursor-pointer"
								// on Click Login go to Login page
								onClick={() => history("/")}>
								Login
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Signup;
