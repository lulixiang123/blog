import React from "react";

const Footer:React.FC = () => {
    return (
        <>
            <footer className={"bg-gray-900 w-full text-center pt-8 pb-8 text-white text-xl lg:pl-96 lg:text-left"}>
                <div id="tip">博客每十分钟打包一次,兄弟们缓缓</div>
                <div id="message">京ICP备 2021029920号</div>
            </footer>
            <style jsx>
                {`
                  footer{
                    background: #22292d;
                    padding: 20px 15%;
                    font-size: 1.8rem;
                  }  
                  #tip{
                    color:#887d63;
                    padding: 5px;
                  }
                  #message{
                    color: #aebece;
                    padding: 5px;
                  }
                `}
            </style>
        </>
    );
};
export default Footer;