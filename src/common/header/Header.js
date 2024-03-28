import React, { useState } from "react";
import '../header/Header.css'
import logo from './../../assets/logo.svg'
import { Button, Tabs, Tab, FormControl, TextField } from "@material-ui/core";
import Modal from "react-modal";

export default function Header(){

    const [showModal, setShowModal] = useState(false);
    const [selectedTab, setSelectedTab] = useState(0);

    function openModal(){
        setShowModal(true);
    }

    function closeModal(){
        setShowModal(false)
    }

    function handleTabChange(event, newValue){
        setSelectedTab(newValue)
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
            <FormControl >
                <TextField 
                    style={{ marginBottom: '20px', marginTop:'20px'}}
                    label="Username"
                    required="true"
                />
                <TextField 
                    style={{ marginBottom: '20px' }}
                    label="Password"
                    required="true"
                    type="password"
                />
                <Button variant="contained" style={{backgroundColor:'blue', color:'white', width:'25px', margin:'auto'}}>LOGIN</Button>
            </FormControl>
            </div>
         )}
         {selectedTab === 1 && (
            <div className="form-container">
            <FormControl >
                <TextField 
                    style={{ marginBottom: '20px', marginTop:'20px'}}
                    label="First Name"
                    required="true"
                />
                <TextField 
                    style={{ marginBottom: '20px' }}
                    label="Last Name"
                    required="true"
                />
                <TextField 
                    style={{ marginBottom: '20px' }}
                    label="Email"
                    required="true"
                    type="email"
                />
                <TextField 
                    style={{ marginBottom: '20px' }}
                    label="Password"
                    required="true"
                    type="password"
                />
                <TextField 
                    style={{ marginBottom: '20px' }}
                    label="Contact No"
                    required="true"
                />
                <Button variant="contained" style={{backgroundColor:'blue', color:'white'}}>REGISTER</Button>
            </FormControl>
            </div>
         )}
        </Modal>

        </div>
    )
}