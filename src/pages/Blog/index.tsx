import type {GetStaticProps, NextPage} from 'next'
import Head from 'next/head'
import {Card, Input, Timeline} from 'antd';
import styles from '../../styles/Blog.module.css'
import React, {useState} from "react";
import BlogAbbreviate from "../../components/BlogAbbreviate";
import Blog from "@/types/Blog";
type props={
   blog : Array<Blog>
}
const Blogs: NextPage<props> = (props:props) => {
    const [blog,setBlog]=useState(props.blog)
    const searchBlog=function (value :string){
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
    }
    return (
        <div className={styles.container}>
            <Head>
                <title>欢迎大佬</title>
                <meta name="home" content="欢迎大佬" />
                <link rel="icon" href="/chook.svg" />
            </Head>
            <Card className={styles.main} title={(<span id={styles.blogTitle}>我的博客</span>)}>
                <Input id={styles.searchInput} placeholder={"请输入博文关键字"} onChange={(e)=>{searchBlog(e.target.value)}}/>
                <Timeline>
                    {
                        blog.map((item)=>{
                            return (
                                <Timeline.Item key={item.blogId}>
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
    let blog = await fetch(process.env.API+'blog').then((resp)=>{
        return resp.json()
    })
    return {
        props: {
            blog:blog
        },
        revalidate:600
    }
}
export default Blogs
