const sql = {
    //用户信息
    queryPersonInfo:'SELECT * FROM user',
    //总字数
    queryFontCount:'UPDATE user SET fontCount = (SELECT SUM(blogContentLength) FROM blog),blogCount = (SELECT COUNT(*) FROM blog)',
    //名言警句
    queryRandomDictum:'SELECT * FROM dictum',
    //获取所有练习方式
    queryRelate:'SELECT * FROM relate',
    //获取所有收藏
    queryCollection:'SELECT * from collection',
    //获取推荐博客
    queryRecommendBlog:'SELECT * from blog Where isRecommend=1',
    //获取推荐视频
    queryRecommendVideo:'SELECT * from video',
    //获取最新博客
    queryNewestBlog:'SELECT * from blog ORDER BY blogCompletionTime DESC limit 5',
    //获取所有博客
    queryBlog:'SELECT * from blog',
    //获取某个博客
    queryBlogItem:'SELECT * from blog WHERE blogId = ?'
};
export default sql