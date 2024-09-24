import React, {useEffect, useState} from 'react'
import appwriteService from '../Appwrite/config'
import { Container, PostCard} from '../components'
import { Link } from 'react-router-dom'

function Home() {
    const [posts, setPosts] = useState([])


    useEffect(()=>{
        appwriteService.getPosts([]).then((posts)=>{
            if(posts){
                setPosts(posts.documents)
            }
        })
    },[])

        

    if (posts.length === 0) {
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <div className='flex flex-wrap'>
                        <div className='p-2 w-full'>
                            <Link to="/login">
                                <h1 className='text-2xl font-bold hover:text-purple-800'>
                                    Login To Read posts
                                </h1>
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    else{
        return( 
        <div className='w-full py-8'>
            <Container>
                <div className='columns-2 md:columns-3 lg:columns-4 gap-6'>
                {posts.map((post)=>(
                    <div key={post.$id} className='break-inside-avoid mt-6'>
                        <PostCard {...post}/>
                    </div>
                ))}
                </div>
            </Container>
        </div>)
    }

}
export default Home
