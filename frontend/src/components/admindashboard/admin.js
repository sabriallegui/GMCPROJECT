import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Axios from 'axios';

function AdminDashboard(props) {
    const [users, setUsers] = useState();

    useEffect(() => { Axios.get("http://localhost:3002/user").then(({ data }) => setUsers(data.users)).catch(err => console.error(err)) }, [])
    return (
        <div className='AdminDashboard d-flex flex-column'>
            {users.filter(el => el.firstname != 'admin').map(el => <span>{el.firstname}</span>)}
        </div>
    )
}

AdminDashboard.propTypes = {

}

export default AdminDashboard

