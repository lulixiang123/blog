import type {GetStaticPaths, GetStaticProps, NextPage} from 'next'
import Head from 'next/head'
import styles from '../../styles/BlogContent.module.css'
import {Card} from "antd";
import React, {useEffect, useRef, useState} from "react";
import showdown from "showdown";
import showdownHighlight from "showdown-highlight";
import Blog from "@/types/Blog";
type props={
    blogItem:{
        blogId: string,
        blogTitle: string,
        blogSubtitle: string,
        blogCompletionTime: string,
        blogUrl:string,
        blogImgUrl:string,
        blogContentLength:number
    }
    blogContent:string
}
const BlogItem: NextPage<props> = (props:props) => {
    //获取markdown,转化为html格式,以及高亮设置
    const [blogContent,setBlogContent]=useState("")
    const highLight = useRef(null)
    useEffect(()=>{
        const converter = new showdown.Converter({
            extensions: [showdownHighlight()]
        });
        setBlogContent(converter.makeHtml(props.blogContent))
    },[blogContent])
    const blogItem=props.blogItem
    return (
        <div className={styles.container}>
            <Head>
                <title>欢迎大佬</title>
                <meta name="home" content="欢迎大佬" />
                <link rel="icon" href="/chook.svg" />
            </Head>
            <Card id={styles.blog} title={(
                <div id={styles.blogInfo}>
                    <span id={styles.blogTitle}>
                        {blogItem.blogTitle}
                        <span id={styles.blogContentLength}>大约字数: {blogItem.blogContentLength}</span>
                    </span>

                    <span id={styles.blogCompletionTime}>最后更新时间 : {blogItem.blogCompletionTime.substring(0,10)}</span>
                </div>
            )}>
             <div id={styles.blogContent}>
                 <span dangerouslySetInnerHTML={{__html: blogContent}} ref={highLight}/>
             </div>
            </Card>
        </div>
    )
}

export const getStaticPaths:GetStaticPaths=async ()=>{
    let blog = await fetch(process.env.API+'v1/blog')
    const blogArray:Array<Blog>=await blog.json()
    const paths = blogArray.map((blog) => ({
        params: { blogId: String(blog.blogId) },
    }))
    return {
        paths,
        fallback:false
    }
}
export const getStaticProps:GetStaticProps=async (context:any)=>{
    let blog:any=null
    let blogContent=null
    try {
        blog= await (await fetch(process.env.API + 'v1/blogItem?id=' + context.params.blogId)).json()
        blogContent = await (await fetch(process.env.NEXT_PUBLIC_BLOG + blog.blogUrl)).text()
    }catch (e) {
        console.log(e)
    }
    return {
        props:{
            blogItem: blog,
            blogContent:blogContent
        },
        revalidate:600,
        notFound:!(blog&&blogContent)
    }
}

export default BlogItem
