import { useEffect, useState } from "react"
import { loadUsers, login, signup } from "../store/user.actions"
import { useNavigate, useLocation } from 'react-router-dom'
import { AlertSvg, WarningSvg } from "../cmps/svg/ImgSvg"


export function LoginSignUp() {
    const [credentials, setCredentials] = useState({ email: '', password: '', fullname: '' })
    const [isSignup, setIsSignup] = useState(false)
    const [isLoginCredentialsWrong, setIsLoginCredentialsWrong] = useState(false)
    const [isSignUpCredentialsWrong, setIsSignUpCredentialsWrong] = useState(false)
    const [isPasswordEmpty, setIsPasswordEmpty] = useState(false)
    const [isEmailEmpty, setIsEmailEmpty] = useState(false)
    const [isFullNameEmpty, setIsFullNameEmpty] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (location.state) {
            console.log(location.state)
            setIsSignup(true)
            setCredentials({ ...credentials, email: location.state })
        }
        loadUsers()
        sessionStorage.removeItem('')
    }, [])

    async function onLogin(ev) {
        ev.preventDefault()
        try {
            await login(credentials)
            navigate(`/workspace`)
        } catch (err) {
            console.log('cannot login')
            setIsLoginCredentialsWrong(true)
            if (!credentials.email)setIsEmailEmpty(true)
            if (!credentials.password) setIsPasswordEmpty(true)
            throw err
        }
    }

    async function onSignup(ev) {
        ev.preventDefault()
        try {
            await signup(credentials)
            navigate(`/workspace`)
            clearState()
        } catch (err) {
            setIsSignUpCredentialsWrong(true)
            if (!credentials.email) setIsEmailEmpty(true)
            if (!credentials.password) setIsPasswordEmpty(true)
            if (!credentials.fullname) setIsFullNameEmpty(true)
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
                        <img src={"src//assets//img//Trilili light logo.svg"} />
                        {!isSignup && (
                            <div>
                                <h1 className="login-signup-title">Log in to continue</h1>

                                {isLoginCredentialsWrong &&
                                    <div className="credentials-warning">
                                        <div className="warning-icon"><WarningSvg /></div>
                                        <div><p>Incorrect email address and / or password.</p></div>

                                    </div>
                                }

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

                                    {(isEmailEmpty && isLoginCredentialsWrong) &&
                                            <div className="empty-input">
                                                <span className="alert-icon">
                                                    <AlertSvg />
                                                </span>
                                                <span>Enter your email</span>
                                            </div>}

                                        <input
                                            className="email-input login-input"
                                            type="password"
                                            placeholder="Enter password"
                                            name="password"
                                            value={credentials.password}
                                            onChange={handleChange}
                                        />
                                        {(isPasswordEmpty && isLoginCredentialsWrong) &&
                                            <div className="empty-input">
                                                <span className="alert-icon">
                                                    <AlertSvg />
                                                </span>
                                                <span>Enter your password</span>
                                            </div>}

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
                                        {(isEmailEmpty && isSignUpCredentialsWrong) &&
                                            <div className="empty-input">
                                                <span className="alert-icon">
                                                    <AlertSvg />
                                                </span>
                                                <span>Please enter an email address</span>
                                            </div>}

                                        <input
                                            className="email-input login-input"
                                            type="text"
                                            placeholder="Enter full name"
                                            name="fullname"
                                            value={credentials.fullname}
                                            onChange={handleChange}
                                        />

                                        {(isFullNameEmpty && isSignUpCredentialsWrong) &&
                                            <div className="empty-input">
                                                <span className="alert-icon">
                                                    <AlertSvg />
                                                </span>
                                                <span>Please enter full name</span>
                                            </div>}

                                        <input
                                            className="email-input login-input"
                                            type="password"
                                            placeholder="Enter password"
                                            name="password"
                                            value={credentials.password}
                                            onChange={handleChange}
                                        />
                                        
                                        {(isPasswordEmpty && isSignUpCredentialsWrong) &&
                                            <div className="empty-input">
                                                <span className="alert-icon">
                                                    <AlertSvg />
                                                </span>
                                                <span>Please enter password</span>
                                            </div>}

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