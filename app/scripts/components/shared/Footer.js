import React from "react";
import { Link } from "react-router-dom";

const Footer = (props)=>{
  	return (
    	<footer className="footer">
            <div className="row">
                <ul className="footer_menu">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/technology">Technology</Link>
                    </li>
                    <li>
                        <Link to="/biography">Biography</Link>
                    </li>
                    <li>
                        <Link to="/interesting">Interesting</Link>
                        <ul>
                            <li>
                                <Link to="/interesting/literature">Literature</Link>
                            </li>
                            <li>
                                <Link to="/interesting/sport">Sport</Link>
                            </li>
                            <li>
                                <Link to="/interesting/games">Video Games</Link>
                            </li>
                        </ul>
                    </li>
                </ul>
                <p>
                    2018 Copyright. All Rights Reserved.
                    <br />
                    The Sponsored Listings displayed above are served automatically by a third party. Neither the service provider nor the domain owner maintain any relationship with the advertisers. In case of trademark issues please contact the domain owner directly (contact information can be found in whois).
                    <br />
                    Privacy Policy
                </p>
            </div>
        </footer>
  	)
}
export default Footer;
