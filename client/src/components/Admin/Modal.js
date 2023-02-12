import { useEffect, useState } from 'react';
import axios from "axios";
import Swal from "sweetalert2";
const REACT_APP_SERVER_URL = "http://localhost:5000";

function Modal({ setShowModal, users, userId }) {
    const [inputValue, setInputValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [designationValue, setDesignationValue] = useState('');

    const onCancle = () => {
        setShowModal(false);
    }

    const showMessage = (message, type) => {
		Swal.fire({
			toast: true,
			icon: type,
			title: message,
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

    const updateEmployee = (e) => {
        e.preventDefault();
        axios
            .put(`${REACT_APP_SERVER_URL}/user/${userId}`, {
                name: inputValue,
                email: emailValue,
                password: passwordValue,
                designation: designationValue,
            })
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data.data);
                    showMessage("User has been updated successfully!", "success");
                }
            })
            .catch((err) => {
                // if (err.response?.data?.message === "ValidationError: email: is already taken.") {
                //     showMessage("User already exists with same email address!", "error");
                // } else {
                    showMessage("Failed to update user!", "error");
                // }
                console.log(err);
            });
    }

    
    useEffect(() => {
        const user = users.find(user => user._id === userId);
        setInputValue(user.name);
        setEmailValue(user.email);
        setPasswordValue(user.password);
        setDesignationValue(user.designation);
    }, [userId, users])


    return (
        <div className="modal-overlay   bg-slate-300 rounded-md absolute left-72 top-[82px] shadow-lg
        border-2 border-gray-300
        transition-all duration-800 ease-in-out
        
        ">
            <div className="modal-content">
                <form className='w-[1020px] h-[550px] flex flex-col' >
                    {/* Full Name */}
                    <input
                        type="text"
                        placeholder="Enter Full Name"
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        autoComplete="off"
                        className="py-4 p-2 outline-none mt-12
                        focus:outline-slate-200
                        rounded-md
                        bg-white
                        ml-8
                        mr-8
                        "
                    />

                    {/* Email */}
                    <input type="email"
                        placeholder="Enter Email"
                        value={emailValue}
                        onChange={e => setEmailValue(e.target.value)}
                        autoComplete="off"
                        className="py-4 p-2 outline-none mt-12
                        focus:outline-slate-200
                        rounded-md
                        bg-white
                        ml-8
                        mr-8"
                    />

                    {/* Password */}
                    <input type="password"
                        placeholder="Enter Password"
                        value={passwordValue}
                        onChange={e => setPasswordValue(e.target.value)}
                        autoComplete="off"
                        className="py-4 p-2 outline-none mt-12
                        focus:outline-slate-200
                        rounded-md
                        bg-white
                        ml-8
                        mr-8
                        "
                    />

                    {/* Designation */}
                    <select name="designation" id="designation" value={designationValue} onChange={e => setDesignationValue(e.target.value)}
                        className="py-4 p-2 outline-none mt-12
                        focus:outline-slate-200
                        rounded-md
                        bg-white
                        ml-8
                        mr-8"
                    >
                        <option value="Professor">Professor</option>
                        <option value="Assistant Professor">Assistant Professor</option>
                        <option value="Lecturer">Lecturer</option>
                    </select>
                    <button onClick={(e) => updateEmployee(e)} type="submit"
                        className='py-4 p-2 outline-none mt-12 
                        bg-slate-300
                        text-black 
                        border-2 border-gray-400
                        rounded-md
                        ml-8
                        mr-8
                        hover:bg-blue-400
                        transition-all duration-300 ease-in-out
                        hover:text-white
                        '
                    >Update</button>

                    <div className="absolute top-0 right-0 mt-2 mr-4 cursor-pointer "
                        onClick={onCancle}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default Modal;
