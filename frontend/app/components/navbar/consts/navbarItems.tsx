import PeopleIcon from '@mui/icons-material/People';
import UpdateIcon from '@mui/icons-material/Update';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

export const mainNavbarItems = [
    {
        id: 0,
        icon: <PeopleIcon />,
        label: 'Users',
        route: '/users',
    },
    {
        id: 1,
        icon: <GroupAddIcon />,
        label: 'Create new user',
        route: '/create-user',
    },
    {
        id: 2,
        icon: <UpdateIcon />,
        label: 'Update specific user',
        route: '/update-user',
    },
    {
        id: 3,
        icon: <SearchIcon />,
        label: 'User filter',
        route: '/',
    },
    {
        id: 4,
        icon: <HomeIcon />,
        label: 'Home',
        route: '/',
    },
]