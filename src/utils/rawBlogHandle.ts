import blog from "@/types/Blog";
interface rawBlog{
  name:string
  content:string
}
async function rawBlogHandle(rawBlog:rawBlog):Promise<blog>{
  const blogName=rawBlog.name.split(' ')[1]
  const blogSubtitle=blogName.split('-')[0]
  const blogTitle=blogName.split('-')[1].split('.')[0]
  const blogCompletionTime=rawBlog.name.split(' ')[0]
  const blogContent=new Buffer(rawBlog.content,'base64').toString('utf-8')
  const blogContentLength=blogContent.length
  const blogImg=await fetch("https://api.github.com/repos/lulixiang123/blogStoreHouse/contents/img/"+blogTitle+".webp",{
    headers:{
      'Authorization':'token github_pat_'+process.env.GETHUB_API_ACCESS_TOKEN
    }
  }).then((resp)=>{
    return resp.json()
  }).then((result)=>{
    try{
      return 'data:image/' + result.name.split('.')[result.name.split('.').length-1] + ';base64,' + result.content
    }catch (e){
      return "/default.png"
    }
  })
  return {
    blogTitle,
    blogSubtitle,
    blogCompletionTime,
    blogContent,
    blogContentLength,
    blogImg
  }
}
export default rawBlogHandle
