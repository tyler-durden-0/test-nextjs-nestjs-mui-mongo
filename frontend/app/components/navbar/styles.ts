export const navbarStyles = {
    drawer: {
        '& .MuiDrawer-paper': {
            position: 'relative',
            boxSizing: 'border-box',
            backgroundColor: '#101F33',
            color: 'rgba(255, 255, 255, 0.7)',
        },
        '& .Mui-selected': {
            color: 'red',
        },
        '& li:hover': {
            backgroundColor: '#3CC3DB',
            transition: "background-color .5s linear"
        },
    },
    icons: {
        color: 'rgba(255, 255, 255, 0.7)!important',
        marginLeft: '20px',
    },
    text: {
        '& span': {
            marginLeft: '-10px',
            fontWeight: '600',
            fontSize: '16px',
            cursor: 'default',
        }
    },
};