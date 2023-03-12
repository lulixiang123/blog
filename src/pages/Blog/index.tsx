import type {GetStaticProps, NextPage} from 'next'
import Head from 'next/head'
import {Card, Input, Timeline} from 'antd';
import styles from '../../styles/Blog.module.css'
import React, {useEffect, useState} from "react";
import BlogAbbreviate from "../../components/BlogAbbreviate";
import Blog from "@/types/Blog";
import debounce from "@/utils/debounce";
import rawBlogHandle from "@/utils/rawBlogHandle";

type props={
   blog : Array<Blog>
}
const Blogs: NextPage<props> = (props:props) => {
    const [blog,setBlog]=useState(props.blog)
    //使用防抖包裹
    const searchBlog=debounce(function (value :string){
        if (value===""){
            setBlog(props.blog)
        }
        else {
            const blogArray=[]
            for (let blogElement of props.blog) {
                if (blogElement.blogTitle.search(value)!==-1){
                    blogArray.push(blogElement)
                }
            }
            setBlog(blogArray)
        }
    },500)
    //博客排序
    useEffect(()=>{
        blog.sort((x,y)=>{
            const xTime=x.blogCompletionTime.split('.')
            const xY=xTime[0]
            const xM=Number(xTime[1])<10?'0'+xTime[1]:xTime[1]
            const xD=Number(xTime[2])<10?'0'+xTime[2]:xTime[2]
            const yTime=y.blogCompletionTime.split('.')
            const yY=yTime[0]
            const yM=Number(yTime[1])<10?'0'+yTime[1]:yTime[1]
            const yD=Number(yTime[2])<10?'0'+yTime[2]:yTime[2]
            return Number(xY+xM+xD)>Number(yY+yM+yD)?-1:1
        })
        setBlog([...blog])
    },[])
    return (
        <div className={styles.container}>
            <Head>
                <title>Hydration Error 的博客</title>
                <meta name="home" content="Hydration Error 的博客" />
                <link rel="icon" href="/chook.svg" />
            </Head>
            <Card className={styles.main} title={(<span id={styles.blogTitle}>我的博客</span>)}>
                <Input id={styles.searchInput} placeholder={"请输入博文关键字"} onChange={(e)=>{searchBlog(e.target.value)}}/>
                <Timeline>
                    {
                        blog.map((item)=>{
                            return (
                                <Timeline.Item key={item.blogTitle}>
                                    <div className={styles.blogTop}>
                                        <div className={styles.blogCompletionTime}>最后更新时间 {item.blogCompletionTime.substring(0,10)}</div>
                                    </div>
                                    <BlogAbbreviate blog={item}/>
                                </Timeline.Item>
                            )
                        })
                    }
                </Timeline>
            </Card>
        </div>
    )
}
export const getStaticProps:GetStaticProps=async ()=>{
    //获取博客列表
    let blogList = await fetch(process.env.BLOG_STORE_HOUSE+"blog",{
        headers:{
            'Authorization':'token github_pat_'+process.env.GETHUB_API_ACCESS_TOKEN
        }
    }).then((resp)=>{
        return resp.json()
    }).then((result)=>{
        const list= result.map((item: any) => {
            return item.name
        })
        list.pop()
        return list
    })
    //获取博客信息
    const blog=[]
    for (let i = 0; i < blogList.length; i++) {
        const result= await fetch(process.env.BLOG_STORE_HOUSE+"blog/"+blogList[i],{
            headers:{
                'Authorization':'token github_pat_'+process.env.GETHUB_API_ACCESS_TOKEN
            }
        }).then((resp)=>{
            return resp.json()
        }).then((result)=>{
            return rawBlogHandle(result)
        })
        blog.push(result)
    }

    return {
        props: {
            blog:blog
        },
        revalidate:3600
    }
}
export default Blogs
