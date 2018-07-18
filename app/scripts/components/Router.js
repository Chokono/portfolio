import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeComp from './screens/home/HomeComp';
import Header from './shared/Header';
import Footer from './shared/Footer';
import InterestingComp from "./screens/interesting/InterestingComp";
import InterestingOptions from "./screens/interesting/InterestingOptions";
import Technology from "./screens/technology/Technology";

const RouteComp = (props) => {
    return(
        <Router>
            <div>
                <Header />
                <Route exact path="/" render={()=><HomeComp /> } />
                <Route path="/technology" render={()=><Technology /> } />
                <Route path="/biography" render={()=><Biography />} />
                <Route path="/interesting" render={()=><Interesting />} />
                <Footer />
            </div>
        </Router>
    )
};

const Interesting = ()=>{
    return(
        [
            <Route key="1" exact path="/interesting" render={()=>{
                return(
                    <InterestingComp />
                )
            }} />,
            <Route key="2" path={`/interesting/:interestingOptions`} render={(routerProps)=>{
                return(
                    <InterestingOptions routerProps={routerProps} />
                )
            }}/>
        ]
    )
}

export default RouteComp;
