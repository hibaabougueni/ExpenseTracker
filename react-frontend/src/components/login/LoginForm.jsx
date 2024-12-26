import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import DbService from '../../services/DbService'


function LoginForm() {

    const [usersName, setUsersName] = useState([]);

    useEffect(() => {
        DbService.getUsers()
            .then(res => {
                setUsersName(res.data)
             
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const navigate = useHistory();
    function loginSuccess() {
        var uname = document.getElementById("username").value;
        var pass = document.getElementById("psw").value;

        const usercheck = usersName.find(user => (user.username === uname && user.pswd === pass))
        if (usercheck) {
            localStorage.setItem("id", usercheck.id);
            localStorage.setItem("username",uname);
            localStorage.setItem("pswd",pass);
            navigate.push('transactions');
            
        }
        else {
            alert("Username does not exist");
        }
    }
    return (
        <div className="container">
       
        <div className="row mt-5">
                <div className="card col-md-6 offset-md-3">
                    <h3 className="text-center text-primary">Login</h3>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                            <label htmlFor="username"><b>Username</b></label>
                            <input
                                type="text"
                                placeholder="Enter Username"
                                id="username"
                                required
                                className="form-control text-dark"
                            />
                        </div>
    
                        <div className="form-group">
                            <label htmlFor="psw"><b>Password</b></label>
                            <input
                                type="password"
                                placeholder="Enter Password"
                                id="psw"
                                required
                                className="form-control text-dark"
                            />
                        </div>
                        
                        <div className="form-group">
                            <a href="/register" style={{fontSize: '2vh' }}>New user? Click to register</a>
                        </div>
                        
                        <div className="form-group">
                            <button type="submit" className="btn btn-success w-90 rounded " onClick={loginSuccess}>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    
    )
}

export default LoginForm