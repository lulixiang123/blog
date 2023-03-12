import Head from 'next/head'
import type {GetStaticProps, NextPage} from 'next'
import styles from '@/styles/Home.module.css'
import PersonalInfoCard from "../components/PersonalInfoCard";
import RelateInfoCard from "../components/RelateInfoCard";
import CollectionCard from "../components/CollectionCard";
import LatestBlogCard from "../components/LatestBlogCard";
import RecommendBlogCard from "../components/RecommendBlogCard";
import UserInfo from "@/types/UserInfo";
import Dictum from "@/types/Dictum";
import ContactInformation from "@/types/ContactInformation";
import Collection from "@/types/Collection";
import Blog from "@/types/Blog";
import VideoRecommend from "@/components/VideoRecommend";
import Video from "@/types/Video";
import rawBlogHandle from "@/utils/rawBlogHandle";
interface props{
  userInfo:UserInfo
  avatar:string
  dictum : Array<Dictum>
  relate : Array<ContactInformation>
  collection : Array<Collection>
  video:Array<Video>
  recommendBlog : Array<Blog>
  newestBlog : Array<Blog>
}
//通过 observer 把函数组件变为响应式
const Home: NextPage<props> = (props:props) => {
  const dictum=props.dictum
  const relate=props.relate
  const collection=props.collection
  const recommendBlog=props.recommendBlog
  const newestBlog=props.newestBlog
  const video=props.video
  const userInfo=props.userInfo
  const avatar=props.avatar
  return (
      <div id={styles.home}>
        <Head>
          <title>Hydration Error 的博客</title>
          <meta name="home" content="Hydration Error 的首页" />
          <link rel="icon" href="/chook.svg" />
        </Head>
        <div id={styles.content}>
          <div id={styles.left}>
            <VideoRecommend video={video}/>
            <PersonalInfoCard userInfo={userInfo} dictum={dictum} avatar={avatar}/>
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
  //用户信息
  let userInfo=await fetch(process.env.BLOG_STORE_HOUSE+"user/config.json",{
    headers:{
      'Authorization':'token github_pat_'+process.env.GETHUB_API_ACCESS_TOKEN
    }
  }).then((resp)=>{
    return resp.json()
  }).then((result)=>{
    const buffer=new Buffer(result.content,'base64')
    return JSON.parse(buffer.toString('utf-8')).userInfo
  })

  //base64格式头像
  let avatar=await fetch(process.env.BLOG_STORE_HOUSE+"user/avatar.webp",{
    headers:{
      'Authorization':'token github_pat_'+process.env.GETHUB_API_ACCESS_TOKEN
    }
  }).then((resp)=>{
    return resp.json()
  }).then((result)=>{
    return 'data:image/' + result.name.split('.')[result.name.split('.').length-1] + ';base64,' + result.content
  })

  //名人格言
  let dictum = await fetch(process.env.BLOG_STORE_HOUSE+"dictum/config.json",{
    headers:{
      'Authorization':'token github_pat_'+process.env.GETHUB_API_ACCESS_TOKEN
    }
  }).then((resp)=>{
    return resp.json()
  }).then((result)=>{
    const buffer=new Buffer(result.content,'base64')
    return JSON.parse(buffer.toString('utf-8')).dictum
  })

  //获取联系方式
  let relate = await fetch(process.env.BLOG_STORE_HOUSE+"relate/config.json",{
    headers:{
      'Authorization':'token github_pat_'+process.env.GETHUB_API_ACCESS_TOKEN
    }
  }).then((resp)=>{
    return resp.json()
  }).then((result)=>{
    const buffer=new Buffer(result.content,'base64')
    return JSON.parse(buffer.toString('utf-8')).relate
  })


  //获取个人收藏
  let collection = await fetch(process.env.BLOG_STORE_HOUSE+"collection/config.json",{
    headers:{
      'Authorization':'token github_pat_'+process.env.GETHUB_API_ACCESS_TOKEN
    }
  }).then((resp)=>{
    return resp.json()
  }).then((result)=>{
    const buffer=new Buffer(result.content,'base64')
    return JSON.parse(buffer.toString('utf-8')).collection
  })

  //获取推荐视频
  let video = await fetch(process.env.BLOG_STORE_HOUSE+"video/config.json",{
    headers:{
      'Authorization':'token github_pat_'+process.env.GETHUB_API_ACCESS_TOKEN
    }
  }).then((resp)=>{
    return resp.json()
  }).then((result)=>{
    const buffer=new Buffer(result.content,'base64')
    return JSON.parse(buffer.toString('utf-8')).video
  })


  //获取博客信息
  let blogInfo = await fetch(process.env.BLOG_STORE_HOUSE+"blog/config.json",{
    headers:{
      'Authorization':'token github_pat_'+process.env.GETHUB_API_ACCESS_TOKEN
    }
  }).then((resp)=>{
    return resp.json()
  }).then((result)=>{
    const buffer=new Buffer(result.content,'base64')
    return JSON.parse(buffer.toString('utf-8'))
  })

  //获取推荐博客信息
  const recommendBlog=[]
  for (let i = 0; i < blogInfo.recommend.length; i++) {
    const result= await fetch(process.env.BLOG_STORE_HOUSE+"blog/"+blogInfo.recommend[i],{
      headers:{
        'Authorization':'token github_pat_'+process.env.GETHUB_API_ACCESS_TOKEN
      }
    }).then((resp)=>{
      return resp.json()
    }).then((result)=>{
      return rawBlogHandle(result)
    })
    recommendBlog.push(result)
  }
  //获取最新博客
  const newestBlog=[]
  for (let i = 0; i < blogInfo.newest.length; i++) {
    const result= await fetch(process.env.BLOG_STORE_HOUSE+"blog/"+blogInfo.newest[i],{
      headers:{
        'Authorization':'token github_pat_'+process.env.GETHUB_API_ACCESS_TOKEN
      }
    }).then((resp)=>{
      return resp.json()
    }).then((result)=>{
      return rawBlogHandle(result)
    })
    newestBlog.push(result)
  }
  return {
    props: {
      userInfo,
      avatar,
      dictum,
      relate,
      collection,
      video,
      recommendBlog,
      newestBlog,
    },
    revalidate:3600
  }
};

export default Home
