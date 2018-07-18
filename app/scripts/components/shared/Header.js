import React from "react";
import { Link } from "react-router-dom";

const Header = (props) => {
    return (
        <header className={`header ${props.className}`}>
            <div className="headerBlock">
                <div className="row">
                    <ul className="menu">
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
                            <ul className="subMenu">
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
                </div>
            </div>
        </header>
    )
}

export default Header;