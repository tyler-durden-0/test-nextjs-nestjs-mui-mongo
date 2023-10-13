import PeopleIcon from '@mui/icons-material/People';
import ImageIcon from '@mui/icons-material/Image';
import UpdateIcon from '@mui/icons-material/Update';

export const mainNavbarItems = [
    {
        id: 0,
        icon: <PeopleIcon />,
        label: 'Create new user',
        route: '/create-user',
    },
    {
        id: 1,
        icon: <UpdateIcon />,
        label: 'Update specific user',
        route: '/update-user',
    },
    {
        id: 2,
        icon: <ImageIcon />,
        label: 'Home',
        route: '/',
    },
]