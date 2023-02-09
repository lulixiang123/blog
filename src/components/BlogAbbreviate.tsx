import React from "react";
import {Card} from "antd";
import {useRouter} from "next/router";
import Blog from "@/types/Blog";
import Image from "next/image";
const { Meta } = Card;
type props={
    blog:Blog
}
const BlogAbbreviate:React.FC<props> = (props) => {
    const blog=props.blog
    const router=useRouter()
    return (
        <div className={"blog"}>
            <Card hoverable
                  cover={(
                      <div className={"blogImgUrl"} style={{position:"relative",height:'200px',width:'100%'}}>
                          <span className={"blogSubtitle"}>{blog.blogSubtitle}</span>
                          <Image src={process.env.NEXT_PUBLIC_IMG+blog.blogImgUrl} alt={"博文配图"} layout="fill" objectFit="cover" />
                      </div>
                      )}
                  onClick={()=>{router.push("/Blog/"+blog.blogId)}}
            >
                <Meta title={(
                    <div className={"blogMessage"}>
                        <div>{blog.blogTitle}</div>
                        <div>文章字数 : {blog.blogContentLength}</div>
                        <div>阅读时长 : {Math.floor(blog.blogContentLength/200)}分钟</div>
                        <div>发布日期 : {blog.blogCompletionTime.substring(0,10)}</div>
                    </div>
                )}  />
            </Card>
            <style jsx>
                {`
                      .blog{
                          margin-bottom:30px;
                      }
                      .blogSubtitle{
                          color: white;
                          background: black;
                          padding:0 10px 5px;
                          font-size: 1.4rem;
                          position: absolute;
                          z-index: 2;
                      }
                      .blogMessage{
                          display: flex;
                          justify-content: space-between;
                          flex-wrap: wrap;
                      }
                      .blogMessage div{
                          margin:0 10px;
                      }
                      .blogClassify{
                          color: white;
                          background: #ff6666;
                          padding: 2px 5px;
                          border-radius: 5px;
                      }
                `}
            </style>
        </div>
    );
};
export default BlogAbbreviate;