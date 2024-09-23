import React from 'react'
import GetUseContext from '@/components/context/GetUseContext';


interface UserProp {
    useriderf: string
}

const User = ({useriderf}: UserProp) => {

    const { state, dispatch } = GetUseContext()
    const welcome = state.user.filter(user => user.$id === useriderf)

    const userObject = welcome.reduce((acc, user) => {
        return { ...user }; // Extract the single object
    }, {});
    sessionStorage.setItem("username", userObject.name)
    // console.log("testing", userObject.name)


    return (
        <div className='flex items-center space-x-3'>
            <h1>Welcome!</h1>
            <h1>{userObject.name}</h1>
        </div>
    )
}

export default User