import React, {ReactNode, useState} from "react";
import Link from "next/link";
import {HomeOutlined,FileMarkdownOutlined,ToolOutlined,NotificationOutlined,MenuOutlined,SearchOutlined} from '@ant-design/icons'
import {Button, Input, Modal} from 'antd';
import {useRouter} from "next/router";
const { Search } = Input;
const Navbar:React.FC = () => {
    const linkList:Array<{
        href:string,
        name:string,
        icon:ReactNode
    }>=[{
        href:"/",
        name:"首页",
        icon:(<NotificationOutlined/>)
    },{
        href:"/Blog",
        name:"博客",
        icon:(<FileMarkdownOutlined/>)
    },{
        href:"/Other",
        name:"其他",
        icon:(<NotificationOutlined/>)
    }]
    const router=useRouter()
    return (
        <>
            <nav>
                <div id="navTitle">
                    卢力翔的博客
                </div>
                <div id="navList">
                    <div id="pc">
                        {
                            linkList.map((item)=>{
                                return (
                                    <Link key={item.href} href={item.href}>
                                        <span className={"linkItem"}>{item.icon} {item.name}</span>
                                    </Link>
                                )
                            })
                        }
                    </div>
                    <div id="mobile">
                        <div>
                            <Button type="primary" onClick={()=>{router.push("/Blog")}}>
                                <SearchOutlined/>
                            </Button>
                        </div>
                    </div>
                </div>

            </nav>
            <style jsx>
                {`
                  nav{
                    width: 100%;
                    background: white;
                    display: flex;
                    justify-content: space-between;
                    border-bottom: 2px solid #e8e9ea;
                    padding: 10px 15%;
                    position: fixed;
                    z-index: 10;
                  }
                  #navTitle{
                    font-size: 2.4rem;
                    color: #47a2ff;
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                  }
                  #navList{
                    display: flex;
                    align-items: center;
                  }
                  .linkItem{
                    font-size: 1.8rem;
                    padding:0 15px;
                    color: black;
                    transition: all 200ms;
                  }
                  .linkItem:hover{
                    color: #47a2ff;
                  }
                  @media screen and (max-width: 800px){
                    nav{
                      padding: 5px 5%;
                    }
                    #pc{
                      display: none;
                    }
                  }
                `}
            </style>
        </>
    );
};

export default Navbar;