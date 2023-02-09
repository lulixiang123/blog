import type { GetStaticProps, NextPage} from 'next'
import Head from 'next/head'
import styles from '../../styles/Other.module.css'
import React from "react";
import {Card, Descriptions} from "antd";
type checkboxRule={
    title:string,
    complete:boolean
}
type timeTreeRule={
    date:string,
    content:string,
    img?:string
}
type Descriptions={
    title:string,
    content:string
}
type props={
    fontFunctionPoint:Array<checkboxRule>,
    fontPages:Array<checkboxRule>
    fontSelfEvaluation:Array<timeTreeRule>,
    fontSelfEvaluationTechnology:Array<Descriptions>,
    backSelfEvaluationTechnology:Array<Descriptions>,
    backFunctionPoint:Array<checkboxRule>,
    backSelfEvaluation:Array<timeTreeRule>
}
const Friend: NextPage<props> = (props) => {
    return (
        <div>
            <Head>
                <title>Hydration Error 的博客</title>
                <meta name="home" content="Hydration Error 的博客" />
                <link rel="icon" href="/chook.svg" />
            </Head>
            <div className={styles.main}>
                <Card title={(<h2>前端设计</h2>)}>
                    <div className={styles.title}>使用技术</div>
                    <div className={styles.content} style={{paddingTop:'20px'}}>
                        <Descriptions>
                            {
                                props.fontSelfEvaluationTechnology.map((item)=>{
                                    return (
                                        <Descriptions.Item key={item.title} label={item.title}>{item.content}</Descriptions.Item>
                                    )
                                })
                            }
                        </Descriptions>
                    </div>
                    <div className={styles.title}>功能点</div>
                    <div className={styles.content}>
                        {
                            props.fontFunctionPoint.map((item,index)=>{
                                return (
                                    <div key={item.title}>
                                        {index+1} .  <input type={"checkbox"}  checked={item.complete} readOnly/>
                                        <span style={{marginLeft:'10px'}}>{item.title}</span>
                                        <br/>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={styles.title}>页面</div>
                    <div className={styles.content}>
                        {
                            props.fontPages.map((item,index)=>{
                                return (
                                    <div key={item.title}>
                                        {index+1} . <input type={"checkbox"}  checked={item.complete} readOnly/>
                                        <span style={{marginLeft:'10px'}}>{item.title}</span>
                                        <br/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </Card>

                <Card title={(<h2>后端设计</h2>)} style={{marginTop:'20px'}}>
                    <div className={styles.title}>使用技术</div>
                    <div className={styles.content} style={{paddingTop:'20px'}}>
                        <Descriptions>
                            {
                                props.backSelfEvaluationTechnology.map((item)=>{
                                    return (
                                        <Descriptions.Item key={item.title} label={item.title}>{item.content}</Descriptions.Item>
                                    )
                                })
                            }
                        </Descriptions>
                    </div>
                    <div className={styles.title}>功能点</div>
                    <div className={styles.content}>
                        {
                            props.backFunctionPoint.map((item,index)=>{
                                return (
                                    <div key={item.title}>
                                        {index+1} . <input type={"checkbox"}  checked={item.complete} readOnly/>
                                        <span style={{marginLeft:'10px'}}>{item.title}</span>
                                        <br/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </Card>
            </div>
        </div>
    )
}
export const getStaticProps:GetStaticProps =async ()=> {
    //功能点
    const fontFunctionPoint:Array<checkboxRule>=[
        {
            title:'个人信息展示',
            complete:true
        },
        {
            title:'博客查看',
            complete:true
        },
        {
            title:'收藏展示',
            complete:true
        },
        {
            title:'往期作品查看',
            complete:false
        },
        {
            title:'留言板',
            complete:false
        },
        {
            title:'进行留言',
            complete:false
        },
        {
            title:'音乐播放器',
            complete:false
        },
        {
            title:'小游戏',
            complete:false
        }
    ]
    //后端功能点
    const backFunctionPoint:Array<checkboxRule>=[
        {
            title:'个人信息修改',
            complete:true
        },
        {
            title:'博客增删改查',
            complete:true
        },
        {
            title:'工具增删改查',
            complete:true
        },
        {
            title:'友链增删改查',
            complete:true
        },
        {
            title:'留言处理',
            complete:true
        }
    ]
    //页面
    const fontPages:Array<checkboxRule>=[
        {
            title:'首页',
            complete:true
        },
        {
            title:'博客列表',
            complete:true
        },
        {
            title:'博客详情',
            complete:true
        },
        {
            title:'其他',
            complete:true
        }
    ]
    //前端技术相关
    const fontSelfEvaluationTechnology:Array<Descriptions>=[
        {
            title:'框架',
            content:'next.js',
        },{
            title:'版本',
            content:'v12.2.3',
        },{
            title:'UI库',
            content:'Ant Design'
        },{
            title:'其他技术',
            content:'typeScript eslint 等',
        }]
    //后端技术相关
    const backSelfEvaluationTechnology:Array<Descriptions>=[
        {
            title:'框架',
            content:'express.js',
        },{
            title:'版本',
            content:'v14.18.0',
        },{
            title:'其他技术',
            content:'jwt typescript 等',
        }]
    return {
        props: {
            fontFunctionPoint:fontFunctionPoint,
            fontPages:fontPages,
            fontSelfEvaluationTechnology:fontSelfEvaluationTechnology,
            backSelfEvaluationTechnology:backSelfEvaluationTechnology,
            backFunctionPoint:backFunctionPoint
        }
    }
}
export default Friend
