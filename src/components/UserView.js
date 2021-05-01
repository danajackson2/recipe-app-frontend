import React, { useEffect, useState } from 'react'

const UserView = ({ user_id }) => {

    const [selUser, setSelUser] = useState({})

    useEffect(() => {
        fetchUser()
    }, [selUser])

    const fetchUser = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/users/${user_id}`)
        .then(res => res.json())
        .then(data => setSelUser(data))
    }

    return (
        <div>
            <p>{selUser.username}</p>
            <p>{selUser.id}</p>
            <p>{selUser.liked_recipes.map(r => r.name).join(', ')}</p>
            <p>{selUser.my_recipes.map(r => r.name).join(', ')}</p>
        </div>
    )
}

export default UserView