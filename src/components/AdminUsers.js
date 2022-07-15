import React, {  } from 'react';
import AdminUserItem from './AdminUserItem';
import { List } from '@mui/material';
import { useAuth } from './context/AuthContext';

export default function AdminUsers(params) {
    

    // Auth Context
    const { users } = useAuth();

    return(
        <List sx={{ pb: 0 }}>
            {users.map((el, i) =>
                <AdminUserItem
                user={el}
                key={i}
                />
            )}
        </List>
    )
};
