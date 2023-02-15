import React from "react";
import {Card} from 'antd';
import Image from "next/image";
import {useRouter} from "next/router";
import Blog from "@/types/Blog";
type props={
    blog:Array<Blog>
}
const RecommendBlogCard:React.FC<props> = (props) => {
    const blog=props.blog
    const router=useRouter()
    return (
        <div id={"CardRecommendBlog"}>
            <Card title={(<div id={"title"}>推荐博客</div>)}>
                <div id={"blogList"}>
                    {blog.map((item)=>{
                        return (
                            <div key={item.blogId} className={"blogItem"} onClick={()=>{router.push("/Blog/"+item.blogId)}}>
                                <div className={"blogImage"}>
                                    <Image src={process.env.NEXT_PUBLIC_IMG+item.blogImgUrl} alt={"博文配图"} sizes="100%" fill/>
                                </div>
                                <div className={"blogTitle"}>{item.blogTitle}</div>
                            </div>
                        )
                    })}
                </div>
            </Card>
            <style jsx>
                {`
                 #title{
                   font-size: 2rem;
                 }
                  #CardRecommendBlog{
                  
                    width: 100%;
                    margin:0 0 10px;
                  }  
                  #blogList{
                    display: flex;
                  }
                  .blogItem{
                    flex: 1;
                    margin: 0 20px;
                    cursor: pointer;
                  }
                  .blogItem:hover .blogTitle{
                    color: #1677ff;
                  }
                  .blogImage{
                    width: 100%;
                    aspect-ratio:16/9;
                    margin: 0 auto;
                    position: relative;
                  }
                  .blogTitle{
                    padding: 10px 0 0;
                    text-align: center;
                    font-weight: bold;
                    color: #666666;
                    font-family: "微软雅黑 Light",serif;
                  }
                  @media (max-width: 1000px) {  
                        #blogList{
                          display: block;
                        }
                        .blogItem {
                          padding: 20px 0;
                        }
                      }
                `}
            </style>
        </div>
    );
};
export default RecommendBlogCard;