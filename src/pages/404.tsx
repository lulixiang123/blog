import Head from 'next/head'
import type {NextPage} from 'next'
import styles from '@/styles/Home.module.css'

const NotFound: NextPage = () => {
    return (
        <div id={styles.home}>
            <Head>
                <title>这是哪里?</title>
                <meta name="home" content="欢迎大佬" />
                <link rel="icon" href="/chook.svg" />
            </Head>
            <div id={styles.content} style={{fontSize:"3rem",fontWeight:"bold",height:"100vh",lineHeight:"100vh"}}>
                呃呃,这里是404页面,你这是怎么进来的?
            </div>
        </div>
    )
}
export default NotFound