import { useState } from 'react';


function FormConnection({ setUserConnected, setDisplayForm }) {

    const [loginOrSignin, setLoginOrSignin] = useState('login');
    const [msg, setMsg] = useState('');

    const handleSigninSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', e.target.email.value);
        formData.append('password', e.target.password.value);
        formData.append('passwordConfirm', e.target.passwordConfirm.value);

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
        formData.append('email', e.target.email.value);
        formData.append('password', e.target.password.value);

        const response = await fetch('http://localhost/calculator9000/backend/authentication.php?login=true', {
            method: 'POST',
            body: formData,
            credentials: 'include',
            headers: {
                'Accept': 'application/json'
            }
        });
        const data = await response.json();
        setMsg(data.message);
        if (data.success) {
            setUserConnected({
                isUserConnected: true,
                user: data.user
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
            <div className="modal_container">
                <div className="modal">
                    <button className="close_button" onClick={() => setDisplayForm(false)}>X</button>
                    <p className='auth_msg'>{msg}</p>
                    {loginOrSignin === 'login' ?
                        (
                            <div className="form_container">
                                <h2>Connection</h2>
                                <form onSubmit={handleLoginSubmit}>
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" name="email" />
                                    <label htmlFor="password">Password</label>
                                    <input type="password" id="password" name="password" />
                                    <button type="submit">Login</button>
                                </form>
                                <button onClick={changeForm} className='switch_button'>Inscription</button>
                            </div>
                        ) : (
                            <div className="form_container">
                                <h2>Inscription</h2>
                                <form onSubmit={handleSigninSubmit}>
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" name="email" />
                                    <label htmlFor="password">Password</label>
                                    <input type="password" id="password" name="password" />
                                    <label htmlFor="password_confirm">Password</label>
                                    <input type="password" id="password_confirm" name="passwordConfirm" />
                                    <button type="submit">Sign in</button>
                                </form>
                                <button onClick={changeForm} className='switch_button'>Connection</button>
                            </div>
                        )
                    }
                </div >
            </div>
        </>
    )
}

export default FormConnection;