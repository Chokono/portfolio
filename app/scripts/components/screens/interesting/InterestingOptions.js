import React from "react";
import { Link } from "react-router-dom";
import Literature from "./Literature";
import Sport from "./Sport";
import Games from "./Games";

const InterestingOptions = (props)=>{
    return (
        <div>
        <main className="shop_tables">
                <ul className="shop_menu">
                    <li>
                        <Link to={`/interesting/literature`}>Literature</Link>
                    </li>
                    <li>
                        <Link to={`/interesting/sport`}>Sport</Link>
                    </li>
                    <li>
                        <Link to={`/interesting/games`}>Video Games</Link>
                    </li>
                </ul>
                {props.routerProps.match.params.interestingOptions === `literature` ? (
                    <Literature />
                 ) : null}
                {props.routerProps.match.params.interestingOptions === `sport`? (
                    <Sport />
                ) : null}
                {props.routerProps.match.params.interestingOptions === `games`? (
                    <Games />
                ) : null}
            </main>
        </div>
    )
};

export default InterestingOptions;
