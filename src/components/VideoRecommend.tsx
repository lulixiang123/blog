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
                            <div key={item.videoUrl} className={"carouselItem"}>
                                <Link href={item.videoUrl}>
                                    <Image src={item.imgUrl} alt={"头像"} layout="fill"/>
                                </Link>
                            </div>
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