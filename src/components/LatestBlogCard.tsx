import React from "react";
import {Card} from 'antd';
import BlogAbbreviate from "./BlogAbbreviate";
import Blog from "@/types/Blog";
type props={
    blog:Array<Blog>
}
const LatestBlogCard:React.FC<props> = (props) => {
    const blog=props.blog
    return (
        <div id={"CardLatestBlog"}>
            <Card title={(<div id={"title"}>最新博客</div>)}>
            {blog.map((item)=>{
                return (
                    <BlogAbbreviate key={item.blogTitle} blog={item}/>
                )
            })}
            </Card>
            <style jsx>
                {`
                  #title{
                    font-size: 2rem;
                  }
                  #CardLatestBlog{
                    width: 100%;
                  }
                  #extraText{
                    color: #faad14;
                    font-size: 12px;
                  }
                `}
            </style>
        </div>
    );
};
export default LatestBlogCard;
