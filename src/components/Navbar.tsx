import React from "react";
import Link from "next/link";
import {SearchOutlined} from '@ant-design/icons'
import {useRouter} from "next/router";
const Navbar:React.FC = () => {
    const linkList:Array<{
        href:string,
        name:string
    }>=[{
        href:"/",
        name:"Home"
    },{
        href:"/Blog",
        name:"Blog"
    },{
        href:"/Other",
        name:"Other"
    }]
    const router=useRouter()
    return (
        <>
            <nav>
                <div id="navTitle">
                    Hydration Error
                </div>
                <div id="navList">
                    <div id="pc">
                        {
                            linkList.map((item)=>{
                                return (
                                    <Link key={item.href} href={item.href}>
                                        <span className={"linkItem"}>{item.name}</span>
                                    </Link>
                                )
                            })
                        }
                    </div>
                    <div id="mobile">
                        <div id="mobileIcon">
                            <SearchOutlined  onClick={()=>{router.push("/Blog")}}/>
                        </div>
                    </div>
                </div>

            </nav>
            <style jsx>
                {`
                  nav{
                    width: 100%;
                    background: #215c8c;
                    display: flex;
                    justify-content: space-between;
                    padding: 10px 15%;
                    position: fixed;
                    z-index: 10;
                  }
                  #navTitle{
                    font-size: 2.4rem;
                    color: white;
                    display: flex;
                    align-items: center;
                  }
                  #navList{
                    display: flex;
                    align-items: center;
                  }
                  .linkItem{
                    font-size: 1.6rem;
                    font-weight: bold;
                    padding:0 15px;
                    color: white;
                    transition: all 200ms;
                  }
                  .linkItem:hover{
                    color: #47a2ff;
                  }
                  #mobile{
                    display: none;
                  }
                  #mobile #mobileIcon{
                    color: white;
                    font-size: 2rem;
                  }
                  @media screen and (max-width: 800px){
                    nav{
                      padding: 5px 5%;
                    }
                    #pc{
                      display: none;
                    }
                    #mobile{
                      display: block;
                    }
                  }
                `}
            </style>
        </>
    );
};

export default Navbar;