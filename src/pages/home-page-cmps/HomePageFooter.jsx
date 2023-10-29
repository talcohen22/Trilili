import { FooterSvg } from "../../cmps/svg/ImgSvg" 

export function HomePageFooter() {
    return (
        <footer className="homepage-footer">
            <section className='upper-section'>
                <div className='footer-logo'>
                    <div className="inner-logo">
                        <div ><img src={'src//assets//img//trilili_dark-removebg.png'}/></div>
                        <button className='footer-login-btn'>Log in</button>
                    </div>
                </div>


                <div className="footer-info">
                    <ul>        
                    <li>
                        <span>About Trilili</span>
                        <p>What's behind the boards</p>
                    </li>
                    <li>
                        <span>Jobs</span>
                        <p>Learn about open roles on the Trilili team</p>
                    </li>
                    <li>
                        <span>Apps</span>
                        <p>
                            Download the Trilili App for your
                            Desktop or Mobile devices.
                        </p>
                    </li>
                    <li>
                        <span>Contact us</span>
                        <p>
                            Need anything?
                            Get in touch and we can help
                        </p>
                    </li>
                    </ul>
                </div>
            </section>

            <div className="footer-seperator"></div>

            <section className='lower-section'>
                <div className="language">
                    <a className='social-btn'>{FooterSvg.globe}</a>
                    <span>English</span>
                </div>

                <div className='policies'>
                    <a >Privacy policy</a>
                    <a >Terms</a>
                    <span>&copy; 2023 Trilili</span>
                </div>

                <div className='social-links'>
                    <a className='social-btn'>{ FooterSvg.instagram}</a>
                    <a className='social-btn'>{ FooterSvg.facebook}</a>
                    <a className='social-btn'>{ FooterSvg.linkedin}</a>
                    <a className='social-btn'> { FooterSvg.twitter}</a>
                    <a className='social-btn'>{ FooterSvg.youtube}</a>
                </div>
            </section>
        </footer>
    )
}