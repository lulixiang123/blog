import React, {useEffect, useState} from "react";
import {Card, Divider} from 'antd';
import {LaptopOutlined,VideoCameraOutlined,HolderOutlined} from "@ant-design/icons";
import Link from "next/link";
import Collection from "@/types/Collection";


type props={
    collection:Array<Collection>
}
const CollectionCard:React.FC<props> = (props) => {
    const collection:Array<Collection>=props.collection
    //分类收藏
    let [articleList,setArticleList]=useState<Array<Collection>>([])
    let [videoList,setVideoList]=useState<Array<Collection>>([])
    let [otherList,setOtherList]=useState<Array<Collection>>([])
    useEffect(()=>{
        //收藏分类
        articleList=[]
        videoList=[]
        otherList=[]
        for(let i=0;i<collection.length;i++){
            switch (collection[i].collectionType) {
                case 0:
                    articleList.push(collection[i])
                    break
                case 1:
                    videoList.push(collection[i])
                    break
                case 2:
                    otherList.push(collection[i])
                    break
            }
        }
        setArticleList([...articleList])
        setVideoList([...videoList])
        setOtherList([...otherList])
        //绘画
    },[collection])
    return (
        <div id={"collection"}>
            {
                articleList.length||videoList.length||otherList.length?(
                    <div>
                        <Card title={<div id={"title"}>个人收藏</div>}>
                            {
                                articleList.length?(
                                        <div>
                                            <Divider>
                                                <div><LaptopOutlined/> 文章收藏</div>
                                            </Divider>
                                            <div id={"articleList"}>
                                                <canvas id={"articleCanvas"}/>
                                                {
                                                    articleList.map((item,index)=>{
                                                        return (
                                                            <div key={item.collectionTitle} className={"collectionItem"}>
                                                                <Link href={item.collectionUrl} >
                                                                    <span>{item.collectionTitle}</span>
                                                                </Link>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>)
                                    :
                                    null
                            }

                            {
                                videoList.length?(
                                        <div>
                                            <Divider style={{marginTop:"30px"}}>
                                                <div><VideoCameraOutlined/> 视频收藏</div>
                                            </Divider>
                                            <div id={"videoList"}>
                                                {
                                                    videoList.map((item,index)=>{
                                                        return (
                                                            <div key={item.collectionTitle} className={"collectionItem"}>
                                                                <Link href={item.collectionUrl} >
                                                                    <span>{item.collectionTitle}</span>
                                                                </Link>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>)
                                    :
                                    null
                            }

                            {
                                otherList.length?(
                                        <div>
                                            <Divider style={{marginTop:"30px"}}>
                                                <div><HolderOutlined/> 其他收藏</div>
                                            </Divider>
                                            <div id={"otherList"}>
                                                {
                                                    otherList.map((item,index)=>{
                                                        return (
                                                            <div key={item.collectionTitle} className={"collectionItem"}>
                                                                <Link href={item.collectionUrl}>
                                                                    <span>{item.collectionTitle}</span>
                                                                </Link>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>)
                                    :
                                    null
                            }
                        </Card>
                    </div>
                ):null
            }
            <style jsx>
                {`
                    #title{
                      font-size: 2rem;
                    }
                    #collection{
                      margin-top: 20px;
                    }
                    #articleList,#videoList,#otherList{
                      color:dimgrey;
                      overflow:hidden;
                      text-overflow:ellipsis;
                      white-space: nowrap;
                      padding:0 0 10px;
                      border-bottom:2px solid #1890ff;
                      border-radius: 10%;
                    }
                    #articleCanvas{
                      position:absolute;
                    }
                    .collectionItem{
                      border-bottom:1px solid transparent;
                      text-align: center;
                      padding: 5px 0;
                    }
                    .collectionItem span{
                      font-weight: bold;
                      color: dimgrey;
                      text-decoration-line:none;
                      font-size: 1.8rem;
                    }  
                    .collectionItem span:hover{
                      border-bottom:1px solid black;
                    }
                `}
            </style>
        </div>
    );
};
export default CollectionCard;