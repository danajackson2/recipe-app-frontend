import React, { useEffect, useState } from 'react'
import {Container, Carousel} from 'react-bootstrap'
import FeedCard from './feed_components/FeedCard'

const UserView = ({ selected_user_id, user, routerProps }) => {

    const [selUser, setSelUser] = useState({})

    useEffect(() => {
        fetchUser()
    },[])

    const fetchUser = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/users/${selected_user_id}`)
        .then(res => res.json())
        .then(data => setSelUser(data))
    }

    const isItMe = () => {
        return !!user.user_id && selUser.id === user.user_id
    }

    return (
        <Container id='user-view-div'>
            <h1 id='user-view-header'>{selUser.username}</h1>
            <div>
                <h3>{isItMe() ? 'My' : `${selUser.username}'s`} {'Recipes'}</h3>
                <div className='d-flex justify-content-center flex-wrap'>
                    {selUser.my_recipes?.map(r => <FeedCard routerProps={routerProps} recipe={r}/>)}
                </div>
            </div>
            <div>
                <h3>{'Recipes '}{isItMe() ? "I've" : `${selUser.username} has`}{' liked'}</h3>
                <Carousel>
                    {selUser.liked_recipes?.map(r => {
                        return (
                            <>
                                <Carousel.Item>
                                    <img src={r.img} className='d-block w-100'/>
                                </Carousel.Item>

                            </>
                        )
                    })}
                </Carousel>
            </div> 
        </Container>
    )
}

export default UserView