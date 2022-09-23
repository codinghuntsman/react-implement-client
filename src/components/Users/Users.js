import React, { useEffect, useState } from 'react';

const Users = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const user = { name, email };

        fetch('http://localhost:5000/user', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                const newUser = [...users, data]
                setUsers(newUser);
            })

    };
    return (
        <div>
            <h1>Total users: {users.length}</h1>
            {/* ----------------------------------------- */}

            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder='Your name' />
                <input type="email" name="email" placeholder='Email' />
                <input type="submit" value="Submit" />
            </form>

            {
                users.map(user => <h3 key={user.id}>Id: {user.id}, Name: {user.name}, Email: {user.email}</h3>)
            }
        </div>
    );
};

export default Users;