import React, {useEffect, useState} from "react";
import { Card,Divider } from 'antd';
import Image from "next/image";
import PersonInfo from "@/types/PersonInfo";
import Dictum from "@/types/Dictum";
type props={
    personInfo : PersonInfo,
    dictum : Array<Dictum>
}
const PersonalInfoCard:React.FC<props> = (props) => {
    const personInfo=props.personInfo
    //为了解决随机导致的水合问题,使用useState与useEffect
    // const dictum=props.dictum[Math.floor(Math.random()*props.dictum.length)]
    const [dictum,setDictum]=useState({
        dictumAuthor: "",
        dictumContent: ""
    })
    useEffect(()=>{
        setDictum(props.dictum[Math.floor(Math.random()*props.dictum.length)])
    },[])
    return (
        <div id={"PersonalInfoCard"}>
            <Card title={(<div id={"title"}>博客信息</div>)}>
                <div id={"avatar"}>
                    <Image src={personInfo.avatarUrl} alt={"头像"} layout="fill"/>
                </div>
                <div id={"nickname"}>{personInfo.nickname}</div>
                <div id={"personalPosition"}>{personInfo.personalPosition}</div>
                <div id={"introduce"}>{personInfo.introduce}</div>
                <Divider>
                    <div id={"blogStatesTip"}>博客数据</div>
                </Divider>
                <div id={"blogStates"}>
                    <div className={"blogStateItem"}>
                        <div className={"blogStateName"}>- 博文数 -</div>
                        <div className={"blogStateCount"}>{personInfo.blogCount}</div>
                    </div>
                    <div className={"blogStateItem"}>
                        <div className={"blogStateName"}>- 总字数 -</div>
                        <div className={"blogStateCount"}>{personInfo.fontCount}</div>
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