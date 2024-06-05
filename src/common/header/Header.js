import React, { useState } from "react";
import "./Header.css";
import logo from "../../assets/logo.svg"
import { Button, Tab, Tabs, Typography, FormControl, InputLabel, Input, FormHelperText } from "@material-ui/core";
import Modal from "react-modal";


export default function Header(){

    const [modalState, setModalState] = useState(false);
    const [selectedTab, setSelectedTab] = useState(0);
    const [registerData, setRegisterData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        contactNo: ""
    })
    const [registerValidationMessage, setRegisterValidationMessage] = useState({});
    const [registerSuccessMessage, setRegisterSuccessMessage] = useState("");

    const [loginValidationMessage, setLoginValidationMessage] = useState({});
    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    });

    const [loginMessage, setLoginMessage] = useState("");

   

    function openModal(){
        setModalState(true);
    }

    function closeModal(){
        setModalState(false);
    }

    function handleTabChange(event, newValue){
        setSelectedTab(newValue);
        setRegisterSuccessMessage("");
        setLoginMessage("");
    }

    const validateForm = () =>{
        const message = {};
        if(!registerData.firstName) message.firstName = "Required";
        if(!registerData.lastName) message.lastName = "Required";
        if(!registerData.email) message.email = "Required";
        if(!registerData.contactNo) message.contactNo = "Required";
        if(!registerData.password) message.password = "Required";
        setRegisterValidationMessage(message);
        return Object.keys(message).length === 0;
    }

    const handleRegisterInputChange = (event) =>{
        const {id, value} = event.target;
        setRegisterData({ ...registerData, [id]:value})
        setRegisterValidationMessage({...registerValidationMessage, [id]: ""});
    }

    const validateLoginForm = () =>{
        const message = {}
        if(!loginData.username) message.username = "Required";
        if(!loginData.password) message.password = "Required";
        setLoginValidationMessage(message);
        return Object.keys(message).length === 0;
    }

    const handleLoginInputChange = (event) =>{
        const {id, value} = event.target;
        setLoginData({...loginData, [id]: value});
        setLoginValidationMessage({...loginValidationMessage, [id]: ""});
    }

    const handleLogin = () =>{
        if(validateLoginForm()){
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userExists = users.some(user => loginData.username === user.email && loginData.password === user.password);
            if(userExists){
                setLoginMessage("Login Success");
                setLoginData({
                    username: "",
                    password: ""
                })
                closeModal();
            }
            else{
                setLoginMessage("Login Failed");
            }
        }
    }

    const handleRegister = () =>{
       if(validateForm()){
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(registerData);
        localStorage.setItem('users', JSON.stringify(users));
        setRegisterSuccessMessage("Registration Successful. Please Login!");
        setRegisterData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            contactNo: ""
        });
       }
    }

    const handleLogout = () =>{
        setLoginMessage("");
    }
    

    return(
        <div>
            <header className="header">
                <img className="logo" src={logo} alt="Logo"/>

                { (loginMessage === "Login Failed" || loginMessage === "") && (
                    <Button className="button-login" variant="contained" color="default" onClick={openModal}>Login</Button> 
                )
                }
                
                {loginMessage === "Login Success" && (
                    <Button className="button-login" variant="contained" color="default" onClick={handleLogout}>Logout</Button> 
                )
                }
                
            </header>

            <Modal
            isOpen = {modalState}
            onRequestClose={closeModal} 
            style={{
                overlay: {
                  backgroundColor: 'rgba(0, 0, 0, 0.5)'
                },
                content: {
                  top: '50%',
                  left: '50%',
                  right: 'auto',
                  bottom: 'auto',
                  marginRight: '-50%',
                  transform: 'translate(-50%, -50%)',
                  maxWidth: 'auto',
                  textAlign: 'center'
        
                }
              }}
            >
                <div>
                    <Tabs value={selectedTab} onChange={handleTabChange}>
                        <Tab label="Login" />
                        <Tab label="Register" />
                    </Tabs>
                </div>
                {selectedTab === 0 && (
                    <div>
                        <FormControl error={!!loginValidationMessage.username}>
                            <InputLabel htmlFor="username" required>Username</InputLabel>
                            <Input id="username" onChange={handleLoginInputChange}/>
                            <FormHelperText>{loginValidationMessage.username}</FormHelperText>
                        </FormControl><br/>
                        <FormControl error={!!loginValidationMessage.password}>
                            <InputLabel htmlFor="password" required>Password</InputLabel>
                            <Input id="password" type="password" onChange={handleLoginInputChange}/>
                            <FormHelperText>{loginValidationMessage.password}</FormHelperText>
                        </FormControl><br/><br/>
                        {
                            loginMessage && (
                                <Typography>
                                    {loginMessage}
                                </Typography>
                            )
                        }<br/>
                        <Button className="modalButton" variant="contained" color="primary" onClick={handleLogin}>Login</Button>
                    </div>
                )}
                {selectedTab === 1 && (
                    <div>
                        <FormControl error={!!registerValidationMessage.firstName} >
                            <InputLabel htmlFor="firstName" required >First Name</InputLabel>
                            <Input id="firstName" value={registerData.firstName} onChange={handleRegisterInputChange} />
                            <FormHelperText>{registerValidationMessage.firstName}</FormHelperText>
                        </FormControl><br/>
                        <FormControl error={!!registerValidationMessage.lastName}>
                            <InputLabel htmlFor="lastName" required>Last Name</InputLabel>
                            <Input id="lastName" value={registerData.lastName} onChange={handleRegisterInputChange} />
                            <FormHelperText>{registerValidationMessage.lastName}</FormHelperText>
                        </FormControl><br/>
                        <FormControl error={!!registerValidationMessage.email}>
                            <InputLabel htmlFor="email" required>Email</InputLabel>
                            <Input id="email" value={registerData.email} onChange={handleRegisterInputChange} />
                            <FormHelperText>{registerValidationMessage.email}</FormHelperText>
                        </FormControl><br/>
                        <FormControl error={!!registerValidationMessage.password}>
                            <InputLabel htmlFor="password" required>Password</InputLabel>
                            <Input id="password" type="password" value={registerData.password} onChange={handleRegisterInputChange} />
                            <FormHelperText>{registerValidationMessage.password}</FormHelperText>
                        </FormControl><br/>
                        <FormControl error={!!registerValidationMessage.contactNo}>
                            <InputLabel htmlFor="contactNo" required>Contact No.</InputLabel>
                            <Input id="contactNo" value={registerData.contactNo} onChange={handleRegisterInputChange} />
                            <FormHelperText>{registerValidationMessage.contactNo}</FormHelperText>
                        </FormControl><br/><br/>
                        {
                            registerSuccessMessage && (
                                <Typography>
                                    {registerSuccessMessage}
                                </Typography>
                            )
                        }<br/>
                        <Button className="modalButton" variant="contained" color="primary" onClick={handleRegister}>Register</Button>
                    </div>
                )}
            </Modal>

           
        </div>
    )
}