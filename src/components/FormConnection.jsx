import { useState } from 'react';


function FormConnection({ setUserConnected, setDisplayForm }) {

    const [loginOrSignin, setLoginOrSignin] = useState('login');
    const [msg, setMsg] = useState('');

    const [signinFormData, setSigninformData] = useState({
        email: '',
        password: '',
        passwordConfirm: ''
    });

    const [loginFormData, setLoginformData] = useState({
        email: '',
        password: ''
    });

    const handleSigninChange = (e) => {
        setSigninformData({
            ...signinFormData,
            [e.target.name]: e.target.value
        })
    }

    const handleLoginChange = (e) => {
        console.log(loginFormData);
        setLoginformData({
            ...loginFormData,
            [e.target.name]: e.target.value
        })
    }

    const handleSigninSubmit = async (e) => {
        e.preventDefault();
        console.log(e.target);
        const formData = new FormData();
        formData.append('email', signinFormData.email);
        formData.append('password', signinFormData.password);
        formData.append('passwordConfirm', signinFormData.passwordConfirm);

        const response = await fetch('http://localhost/calculator9000/backend/authentication.php?signin=true', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        const data = await response.json();
        setMsg(data.message);
        if (data.success) {
            setTimeout(() => {
                setMsg('');
                setLoginOrSignin('login');
            }, 2000);
        }
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', loginFormData.email);
        formData.append('password', loginFormData.password);

        const response = await fetch('http://localhost/calculator9000/backend/authentication.php?login=true', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        const data = await response.json();
        setMsg(data.message);
        if (data.success) {
            setUserConnected({
                isUserConnected: true,
                user: data.user,
                sessionId: data.sessionId
            });
            setTimeout(() => {
                setMsg('');
                setDisplayForm(false);
            }, 2000);
        }
    }

    const changeForm = () => {
        loginOrSignin == 'login' ? setLoginOrSignin('signin') : setLoginOrSignin('login');
    }

    return (
        <>
            <div className="modal">
                <p className='auth_msg'>{msg}</p>
                {loginOrSignin === 'login' ?
                    (
                        <div className="login">
                            <h2>Connection</h2>
                            <form onChange={handleLoginChange} onSubmit={handleLoginSubmit}>
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" />
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" name="password" />
                                <button type="submit">Submit</button>
                            </form>
                            <button onClick={changeForm}>Inscription</button>
                        </div>
                    ) : (
                        <div className="signin">
                            <h2>Inscription</h2>
                            <form onChange={handleSigninChange} onSubmit={handleSigninSubmit}>
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" />
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" name="password" />
                                <label htmlFor="password_confirm">Password</label>
                                <input type="password" id="password_confirm" name="passwordConfirm" />
                                <button type="submit">Sign in</button>
                            </form>
                            <button onClick={changeForm}>Connection</button>
                        </div>
                    )
                }
            </div >
        </>
    )
}

export default FormConnection;