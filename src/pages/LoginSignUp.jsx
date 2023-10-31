import { useEffect, useState } from "react"
import { loadUsers, login, signup } from "../store/user.actions"
import { useNavigate } from 'react-router-dom'


export function LoginSignUp() {
    const [credentials, setCredentials] = useState({ email: '', password: '' })
    const [isSignup, setIsSignup] = useState(sessionStorage.getItem(''))
    const navigate = useNavigate()

    useEffect(() => {
        loadUsers()
        sessionStorage.removeItem('')
    }, [])

    async function onLogin(ev) {
        if (ev) ev.preventDefault()
        try {
            console.log('login: ', credentials);
            await login(credentials)
            navigate(`/workspace`)
        } catch (err) {
            console.log('cannot login')
        }
    }

    async function onSignup(ev) {
        if (ev) ev.preventDefault()
        try {
            await signup(credentials)
            navigate(`/workspace`)
            clearState()
        } catch (err) {
            console.log('cannot sign up')
        }
    }

    function clearState() {
        setCredentials({ email: '', password: '', fullname: '' })
        setIsSignup(false)
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }

    function toggleSignup() {
        setIsSignup(!isSignup)
    }
    return (
        <div className="login-signup-page">
            <section className="main-login">

                <div className="login-container">
                    <div className="login-container-layout flex column">
                        <img src={"src//assets//img//trilili_light-removebg.png"} />
                        {!isSignup && (
                            <div>

                                <h1 className="login-signup-title">Log in to continue</h1>
                                <div className="login-password-container">
                                    <form className="login-form" onSubmit={(e) => onLogin(e)}>
                                        <input
                                            className="email-input login-input"
                                            type="email"
                                            placeholder="Enter email"
                                            name="email"
                                            value={credentials.email}
                                            onChange={handleChange}
                                        />
                                        <input
                                            className="email-input login-input"
                                            type="password"
                                            placeholder="Enter password"
                                            name="password"
                                            value={credentials.password}
                                            onChange={handleChange}
                                        />
                                        <button className="btn-action login-btn flex center">Log in</button>
                                    </form>

                                    <p className="gray-text">OR</p>
                                </div>

                            </div>
                        )}
                        {isSignup && (
                            <div>
                                <h1 className="login-signup-title">Sign up to continue</h1>
                                <div className="login-password-container">
                                    <form className="login-form" onSubmit={(e) => onSignup(e)}>
                                        <input
                                            className="email-input signup-input"
                                            type="email"
                                            placeholder="Enter email"
                                            name="email"
                                            value={credentials.email}
                                            onChange={handleChange}
                                        />


                                        <input
                                            className="email-input login-input"
                                            type="text"
                                            placeholder="Enter full name"
                                            name="fullname"
                                            value={credentials.fullname}
                                            onChange={handleChange}
                                        />

                                        <input
                                            className="email-input login-input"
                                            type="password"
                                            placeholder="Enter password"
                                            name="password"
                                            value={credentials.password}
                                            onChange={handleChange}
                                        />
                                        <p className="legal-message">
                                            By signing up, I accept the Atlassian <span className="policy-btn">Cloud Terms of Service</span> and acknowledge <span className="policy-btn">the Privacy Policy</span>.
                                        </p>
                                        <button className="btn-action login-btn flex center">Sign up</button>
                                    </form>
                                </div>
                            </div>
                        )}

                        <hr />

                        <button className={'account-btn'} onClick={toggleSignup}>
                            {!isSignup ? 'Create an account' : 'Already have an account? Log in'}
                        </button>

                    </div>
                </div>

            </section>
            <footer>
                <div className="img-footer-container">
                    <div className="footer-img-left">
                        <img src={"src//assets//img//left footer.svg"} alt="footer image" />
                    </div>
                    <div className="footer-img-right">
                        <img src={"src//assets//img//right footer.svg"} alt="footer image" />
                    </div>
                </div>
            </footer>
        </div>
    )
}