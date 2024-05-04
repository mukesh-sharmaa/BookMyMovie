import React, { useState } from "react";
import '../header/Header.css'
import logo from './../../assets/logo.svg'
import { Button, Tabs, Tab, FormControl, TextField } from "@material-ui/core";
import Modal from "react-modal";

export default function Header(){

    const [loginData, setLoginData] = useState(
        {
            username:'',
            password:''
        }
    )

    const [registerData, setRegisterData] = useState(
        {
            firstName:'',
            lastName:'',
            email:'',
            password:'',
            contactNo:''
        }
    )
    const [showModal, setShowModal] = useState(false);
    const [selectedTab, setSelectedTab] = useState(0);
    const [message, setMessage] = useState('');

    function openModal(){
        setShowModal(true);
    }

    function closeModal(){
        setShowModal(false)

        setLoginData({
            username:'',
            password:''
        })

        setRegisterData(
            {
                firstName:'',
                lastName:'',
                email:'',
                password:'',
                contactNo:''
            }
        )

        setMessage('')

    }

    function handleTabChange(event, newValue){
        setSelectedTab(newValue)
    }

    function handleLoginSubmission(e){
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.username === loginData.username && u.password === loginData.password);
        if (user) {
            console.log('Login successful');
            setMessage('Login successful');
            // Here you can redirect the user or set some state to indicate login
        } else {
            console.log('Invalid username or password')
            setMessage('Invalid username or password');
        }

    }

    function handleRegisterSubmission(e){
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const existingUser = users.find(u=> u.username === registerData.username);
        if(existingUser){
            setMessage('Username Already exist')
        }
        else{
            users.push(registerData);
            localStorage.setItem('users', JSON.stringify(users));
            setMessage('User Registered Succesfully')
        }

    }
    


    return(
        <div>
        <div className="header">
            <img className="logo" src={logo} alt="Logo" />
            <div className="login-button">
            <Button variant="contained"  color="default" onClick={openModal}>Login</Button>
            </div>
        </div>
        <Modal
         isOpen = {showModal}
         onRequestClose={closeModal}
         contentLabel="Login/Register Modal"
         style={{
            content:{
                color:'black',
                width:'25%',
                height:'70%',
                margin: 'auto',
            }
         }}
        >
        <Tabs value ={selectedTab} onChange={handleTabChange}>
            <Tab label="Login"/>
            <Tab label="Register"/>
        </Tabs>

         {selectedTab === 0 && (
            <div className="form-container">
            <FormControl  onSubmit={handleLoginSubmission}>
                <TextField 
                    style={{ marginBottom: '20px', marginTop:'20px'}}
                    label="Username"
                    required
                    value={loginData.username}
                    onChange={(e) => setLoginData({...loginData, username:e.target.value})}
                />
                <TextField 
                    style={{ marginBottom: '20px' }}
                    label="Password"
                    required
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password:e.target.value})}
                />
                <Button variant="contained" type="submit" style={{backgroundColor:'blue', color:'white', width:'25px', margin:'auto'}}>LOGIN</Button>
            </FormControl>
            </div>
         )}
         {selectedTab === 1 && (
            <div className="form-container">
            <form onSubmit={(e) =>handleRegisterSubmission(e)}>    
            <FormControl >
                <TextField 
                    style={{ marginBottom: '20px', marginTop:'20px'}}
                    label="First Name"
                    required
                    value={registerData.firstName}
                    onChange={(e)=> setRegisterData({...registerData, firstName:e.target.value})}
                    

                />
                <TextField 
                    style={{ marginBottom: '20px' }}
                    label="Last Name"
                    required
                    value={registerData.lastName}
                    onChange={(e)=> setRegisterData({...registerData, lastName:e.target.value})}
                />
                <TextField 
                    style={{ marginBottom: '20px' }}
                    label="Email"
                    required
                    type="email"
                    value={registerData.email}
                    onChange={(e)=> setRegisterData({...registerData, email:e.target.value})}
                />
                <TextField 
                    style={{ marginBottom: '20px' }}
                    label="Password"
                    required
                    type="password"
                    value={registerData.password}
                    onChange={(e)=> setRegisterData({...registerData, password:e.target.value})}
                />
                <TextField 
                    style={{ marginBottom: '20px' }}
                    label="Contact No"
                    required
                    value={registerData.contactNo}
                    onChange={(e)=> setRegisterData({...registerData, contactNo:e.target.value})}
                />
                <Button variant="contained" type="submit" style={{backgroundColor:'blue', color:'white'}}>REGISTER</Button>
            </FormControl>
            </form>
            </div>
         )}
        </Modal>

        </div>
    )
}