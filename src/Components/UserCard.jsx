import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { memo } from 'react';
import { useEffect } from 'react';

// Components
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

// Icons
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonIcon from '@mui/icons-material/Person';

const UserCard = ({ user }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [allergies, setAllergies] = useState(null);
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const actions = [
        { label: 'Edit email', link: '/update-email' },
        { label: 'Edit phone', link: '/update-phone' },
        { label: 'Edit allergies', link: '/update-allergies' },
    ];

    useEffect(() => {
        if(user.allergies.length) {
            setAllergies(user.allergies.map(e => e.label).join(', '))
        }
    }, [user.allergies])

    return (
        <Card className='!w-full !sm:w-auto sm:max-w-[380px]'>
            <CardHeader
                sx={{
                    '& .MuiCardHeader-title': {
                        fontSize: '24px'
                    }
                }}
                avatar={
                    <Avatar aria-label='recipe'>
                        <PersonIcon />
                    </Avatar>
                }
                action={
                    <div>
                        <IconButton aria-label='settings' onClick={handleClick}>
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            {actions.map((action) => (
                                <MenuItem
                                    onClick={() => navigate(`${action.link}/${user.id}`)}
                                    key={action.link}
                                >
                                    {action.label}
                                </MenuItem>
                            ))}
                        </Menu>
                    </div>
                }
                title={user.name}
            />
            <CardContent>
                <div className='flex flex-col gap-3'>
                    <span><strong>Email: </strong>{user.email || '-'}</span>
                    <span><strong>Phone: </strong>{user.phone || '-'}</span>
                    <span><strong>Allergies: </strong>{allergies || '-'}</span>
                    <span><strong>ID: </strong>{user.id}</span>
                </div>
            </CardContent>
        </Card>
    );
};

export default memo(UserCard);
