import React, {useEffect, useState} from "react";
import { Card,Divider } from 'antd';
import Image from "next/image";
import UserInfo from "@/types/UserInfo";
import Dictum from "@/types/Dictum";
interface props{
    userInfo : UserInfo,
    dictum : Array<Dictum>,
    avatar : string
}
const PersonalInfoCard:React.FC<props> = (props) => {
    const userInfo=props.userInfo
    //为了解决随机导致的水合问题,使用useState与useEffect
    // const dictum=props.dictum[Math.floor(Math.random()*props.dictum.length)]
    const [dictum,setDictum]=useState({
        dictumAuthor: "",
        dictumContent: ""
    })
    useEffect(()=>{
        setDictum(props.dictum[Math.floor(Math.random()*props.dictum.length)])
    },[])

    const avatar=props.avatar

    return (
        <div id={"PersonalInfoCard"}>
            <Card title={(<div id={"title"}>博客信息</div>)}>
                <div id={"avatar"}>
                    <Image src={avatar} alt={"头像"} fill sizes="100%"/>
                </div>
                <div id={"nickname"}>{userInfo.username}</div>
                <div id={"personalPosition"}>{userInfo.personalPosition}</div>
                <div id={"introduce"}>{userInfo.introduce}</div>
                <Divider>
                    <div id={"blogStatesTip"}>博客数据</div>
                </Divider>
                <div id={"blogStates"}>
                    <div className={"blogStateItem"}>
                        <div className={"blogStateName"}>- 博文数 -</div>
                        <div className={"blogStateCount"}>{userInfo.blogCount}</div>
                    </div>
                    <div className={"blogStateItem"}>
                        <div className={"blogStateName"}>- 总字数 -</div>
                        <div className={"blogStateCount"}>{userInfo.fontCount}</div>
                    </div>
                </div>
                <div className={"dictumTB"} style={{marginTop:"10px"}}>- 今日金句 -</div>
                <div id={"dictumContent"} >{dictum.dictumContent}</div>
                <div className={"dictumTB"}>- {dictum.dictumAuthor} -</div>
            </Card>
            <style jsx>
                {`
                      #PersonalInfoCard{
                        margin: 10px 0 0;
                      }
                      #title{
                        font-size: 2rem;
                      }
                      #avatar{
                        width: 60%;
                        max-width: 150px;
                        aspect-ratio:1/1;
                        margin: 0 auto;
                        overflow: hidden;
                        border-radius: 50%;
                        display: flex;
                        justify-content: center;
                        position: relative;
                      }
                      #nickname{
                        margin: 10px auto;
                        text-align: center; 
                        font-size: 2.6rem;
                        font-weight: bold;
                        letter-spacing: 1px;
                      }
                      #personalPosition{
                        margin: 10px auto;
                        text-align: center; 
                        font-size: 2rem;
                        color: dimgrey;
                      }
                      #introduce{
                        margin: 10px auto;
                        padding: 0 10px;
                        font-size: 1.8rem;
                      }
                      #blogStatesTip{
                        font-weight: bold;
                      }
                      #blogStates{
                        display: flex;
                        padding: 5px 0;
                        justify-content: space-around;
                        background: #1890ff;
                      }
                      .blogStateItem{
                        color:white;
                        text-align: center;
                        font-size: 1.8rem;
                      }
                      #dictumContent{
                        padding:5px 20px;
                        color: #888888;
                        font-size: 1.6rem;
                      }
                      .dictumTB{
                        color: darkgrey;
                        font-size: 1.6rem;
                        text-align: center;
                      }
                `}
            </style>
        </div>
    );
};
export default PersonalInfoCard;
