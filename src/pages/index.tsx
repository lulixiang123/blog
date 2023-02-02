import Head from 'next/head'
import type {GetStaticProps, NextPage} from 'next'
import styles from '@/styles/Home.module.css'
import PersonalInfoCard from "../components/PersonalInfoCard";
import RelateInfoCard from "../components/RelateInfoCard";
import CollectionCard from "../components/CollectionCard";
import LatestBlogCard from "../components/LatestBlogCard";
import RecommendBlogCard from "../components/RecommendBlogCard";
import PersonInfo from "@/types/PersonInfo";
import Dictum from "@/types/Dictum";
import Relate from "@/types/Relate";
import Collection from "@/types/Collection";
import Blog from "@/types/Blog";
import VideoRecommend from "@/components/VideoRecommend";
import Video from "@/types/Video";

type props={
  personInfo : PersonInfo,
  dictum : Array<Dictum>,
  relate : Array<Relate>,
  collection : Array<Collection>,
  recommendBlog : Array<Blog>
  newestBlog : Array<Blog>
  recommendVideo:Array<Video>
}

const Home: NextPage<props> = (props:props) => {
  const personInfo=props.personInfo
  const dictum=props.dictum
  const relate=props.relate
  const collection=props.collection
  const recommendBlog=props.recommendBlog
  const newestBlog=props.newestBlog
  const recommendVideo=props.recommendVideo
  return (
      <div id={styles.home}>
        <Head>
          <title>欢迎大佬</title>
          <meta name="home" content="欢迎大佬" />
          <link rel="icon" href="/chook.svg" />
        </Head>
        <div id={styles.content}>
          <div id={styles.left}>
            <VideoRecommend video={recommendVideo}/>
            <PersonalInfoCard personInfo={personInfo} dictum={dictum}/>
            <RelateInfoCard relate={relate}/>
            <CollectionCard collection={collection}/>
          </div>
          <div id={styles.right}>
            <RecommendBlogCard blog={recommendBlog}/>
            <LatestBlogCard blog={newestBlog}/>
          </div>
        </div>
      </div>
  )
}
export const getStaticProps: GetStaticProps = async () => {
  //获取用户信息
  let personInfo = await fetch(process.env.API+`user`).then((resp)=>{
    return resp.json()
  })
  //获取名言警句
  let dictum = await fetch(process.env.API+`dictum`).then((resp)=>{
    return resp.json()
  })
  //获取联系方式
  let relate = await fetch(process.env.API+`relate`).then((resp)=>{
    return resp.json()
  })
  //获取个人收藏
  let collection = await fetch(process.env.API+`collection`).then((resp)=>{
    return resp.json()
  })
  //获取推荐博客信息
  let recommendBlog = await fetch(process.env.API+`blog/recommend`).then((resp)=>{
    return resp.json()
  })
  //获取最新博客信息
  let newestBlog = await fetch(process.env.API+`Blog/newest`).then((resp)=>{
    return resp.json()
  })
  //获取推荐视频
  let recommendVideo = await fetch(process.env.API+`video`).then((resp)=>{
    return resp.json()
  })
  return {
    props: {
      personInfo:personInfo,
      dictum:dictum,
      relate:relate,
      collection:collection,
      recommendBlog:recommendBlog,
      newestBlog:newestBlog,
      recommendVideo:recommendVideo
    },
    revalidate:600
  }
};
export default Home