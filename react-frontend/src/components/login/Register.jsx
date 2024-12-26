import React, { useState } from 'react';
import DbService from '../../services/DbService';
import { useHistory } from 'react-router-dom';

function Register() {
    const [data, setData] = useState({
        uname: "",
        uPass: "",
    });

    const [usernameError, setUsernameError] = useState("");
    const navigate = useHistory();

    const submitForm = async (e) => {
        e.preventDefault();
        if (data.uname === "" || data.uPass === "") {
            alert('Please fill all fields');
        } else {
            let users = {
                username: data.uname,
                pswd: data.uPass
            };

            DbService.addUsers(users)
                .then(res => {
                    if (res.data) {
                        navigate.push('/');
                    } else {
                        setUsernameError("Username is already taken");
                    }
                })
                .catch(err => {
                    console.log(err);
                });

            setData({
                uname: "",
                uPass: "",
            });
        }
    };

    const cancel = (e) => {
        e.preventDefault();
        setData({
            uname: "",
            uPass: "",
        });
        setUsernameError("");
    };

    const handle = (e) => {
        const newdata = { ...data };
        newdata[e.target.id] = e.target.value;
        setData(newdata);
    };

    return (
        <div className="container">
            
            <div className="row mt-5">
                <div className="card col-md-6 offset-md-3">
                    <h3 className="text-center text-primary">Register New User</h3>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label>Username:</label><br />
                                <input
                                    placeholder='Enter your Name'
                                    name="uname"
                                    id="uname"
                                    className={`form-control ${usernameError ? 'is-invalid' : ''}`}
                                    value={data.uname}
                                    onChange={handle}
                                />
                                {usernameError && <div className="invalid-feedback">{usernameError}</div>}
                            </div>
                            <div className="form-group">
                                <label>Create Password:</label><br />
                                <input
                                    placeholder='Create password'
                                    name="uPass"
                                    id="uPass"
                                    type='password'
                                    className="form-control"
                                    value={data.uPass}
                                    onChange={handle}
                                />
                            </div>
                            <div className="form-group">
                                <a href="/" style={{ fontSize: '2vh' }}>You have an account? Click here</a>
                            </div>
                            <button type="submit" className="btn btn-success" onClick={submitForm}>Save</button>
                            <button className="btn btn-danger" onClick={cancel} style={{ marginLeft: "10px", marginRight: "10px" }}>Cancel</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
