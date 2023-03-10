import React from "react";
import {Card, Carousel} from 'antd';
import Image from "next/image";
import Video from "@/types/Video";
import Link from "next/link";
type props={
    video:Array<Video>
}
const VideoRecommend:React.FC<props> = (props) => {
    const video=props.video
    return (
        <div id={"VideoRecommend"}>
            <Card title={(<div id={"title"}>推荐视频
            </div>)}>
                <Carousel autoplay>
                    {video.map((item)=>{
                        return (
                            <Link key={item.videoUrl} href={item.videoUrl} className={"carouselItem"}>
                                <div className={"carouselItem"}>
                                    <Image src={item.imgUrl} alt={"推荐图片"} fill sizes="100%"/>
                                </div>
                            </Link>
                        )
                    })}
                </Carousel>
            </Card>
            <style jsx>
                {`
                  .carouselItem{
                    width: 100%;
                    aspect-ratio:16/9;
                    position: relative;
                  }
                `}
            </style>
        </div>
    );
};
export default VideoRecommend;