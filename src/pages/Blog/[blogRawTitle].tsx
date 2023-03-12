import type {GetStaticPaths, GetStaticProps, NextPage} from 'next'
import Head from 'next/head'
import styles from '../../styles/BlogContent.module.css'
import {Card} from "antd";
import React, {useEffect, useRef, useState} from "react";
import showdown from "showdown";
import showdownHighlight from "showdown-highlight";
import Blog from "@/types/Blog";
import rawBlogHandle from "@/utils/rawBlogHandle";
interface props{
    blogItem:Blog
}
const BlogItem: NextPage<props> = (props:props) => {
    //获取markdown,转化为html格式,以及高亮设置
    const [blogContent,setBlogContent]=useState("")
    const highLight = useRef(null)
    useEffect(()=>{
        const converter = new showdown.Converter({
            extensions: [showdownHighlight()]
        });
        setBlogContent(converter.makeHtml(props.blogItem.blogContent))
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
    let blogList = await fetch("https://api.github.com/repos/lulixiang123/blogStoreHouse/contents/blog",{
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
    const paths = blogList.map((item:string) => {
        return {
            params: {
                blogRawTitle: item
            }
        }
    })
    return {
        paths,
        fallback:false
    }
}
export const getStaticProps:GetStaticProps=async (context:any)=>{
    let blog:any=null
    try {
        blog=await fetch(process.env.BLOG_STORE_HOUSE+"blog/"+context.params.blogRawTitle,{
            headers:{
                'Authorization':'token github_pat_'+process.env.GETHUB_API_ACCESS_TOKEN
            }
        }).then((resp)=>{
            return resp.json()
        }).then((result)=>{
            return rawBlogHandle(result)
        })
    }catch (e) {
        console.log(e)
    }
    return {
        props:{
            blogItem: blog
        },
        revalidate:3600,
        notFound:!(blog)
    }
}

export default BlogItem
