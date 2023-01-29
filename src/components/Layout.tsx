import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
type Props = {
    children?: React.ReactNode
};
const Layout:React.FC<Props> = ({children}) => {
    return (
        <>
            <div id={"layout"}>
                <div>
                    <Navbar/>
                </div>
                <main>
                    <div id={"contents"}>
                        {children}
                    </div>
                </main>
                <Footer/>
            </div>
            <style jsx>
                {`
                  main{
                    background: #f7f9fa;
                    min-height: 100vh;
                    padding: 60px 0 20px;
                  }  
                  #contents{
                    background: white;
                    width: 80%;
                    margin: 0 auto;
                    overflow: hidden;
                  }
                  @media screen and (max-width: 800px){
                      #contents{
                        width: 100%;
                      }
                    }
                `}
            </style>
        </>
    );
};

export default React.memo(Layout);