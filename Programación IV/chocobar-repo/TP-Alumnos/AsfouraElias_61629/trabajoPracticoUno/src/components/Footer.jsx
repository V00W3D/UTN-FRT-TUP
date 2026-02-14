import LogoGithub from "../assets/LogoGithub.svg"
import LogoLinkedin from "../assets/LogoLinkedin.png"
import "../styles/Footer.css"

const Footer = () => {

    return (
        <footer className="footer">
            <div className="footerItems">

                <a href="https://www.linkedin.com/in/hugo-el%C3%ADas-asfoura-assaff-ab9731303">
                    <img src={LogoLinkedin} alt="" />
                </a>
                <a href="https://github.com/EliasAsfoura">
                    <img src={LogoGithub} alt="" />
                </a>

            </div>
        </footer>
    )

}

export default Footer;