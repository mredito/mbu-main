import React from "react";
import { Button } from "./components/ui/button";
import {Link} from "react-router-dom";

const Home = () => {

    return (
    <div>
    <div className="flex justify-center mt-10">
        <h1 className="">Welcome to CheapZone</h1>

    </div>

    <div className="flex justify-center">
    <Button className="text-lg mt-5">
        <Link to={"/products"}>Shop Now </Link>
        </Button>

    
    </div>
    </div>
    );
};

export default Home;