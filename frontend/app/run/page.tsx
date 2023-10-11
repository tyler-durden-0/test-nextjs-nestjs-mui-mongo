"use client"
import {useState, useEffect} from 'react';
import {Box, Button, TextField, Typography, Switch} from '@mui/material';


export default function Run() {
    const [clicked, setClicked] = useState<boolean>(false);
    const [checked, setChecked] = useState<boolean>(false);
    const [textInput, setTextInput] = useState<string>('');
    const [color, setColor] = useState<string>('success');

    useEffect(() => {
        console.log('clicked', clicked);
    }, [clicked])

    useEffect(() => {
        console.log('textInput', textInput);
    }, [textInput])

    useEffect(() => {
        console.log('checked', checked);
    }, [checked])

    const changeColor = (color: string) => {
        switch (color) {
            case 'success':
                setColor('secondary');
                break;
            case 'secondary': 
                setColor('success');
                break;
            default: 
                setColor('success');
                break;
        }
    }

    const handleButtonClicked = () => {
        setClicked((prev) => !prev);
        changeColor(color);
    }

    const handleTextInput = (event: any) => {
        setTextInput(event.target.value);
    }

    const handleSwitch = () => {
        setChecked((prev) => !prev);
    }

    return (
        <>
            <Box
                sx={{
                    // width: 300,
                    // height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '50px',

                    // backgroundColor: 'primary.dark',
                    // margin: 'auto auto',
                    // '&:hover': {
                    // backgroundColor: 'primary.main',
                    // opacity: [0.9, 0.8, 0.7],
                    // },
                }}
            >
                <Button
                    variant="contained"
                    size="medium"
                    color={color}
                    onClick={handleButtonClicked}
                    disabled={checked}
                    >My First MUI Button in Nextjs
                </Button>
                <Switch
                    checked={checked}
                    onChange={handleSwitch}
                />
                <TextField
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                    onChange={handleTextInput}
                    disabled={checked}
                />
                <Typography variant="h4" gutterBottom>
                    You text here: {textInput}
                </Typography>
            </Box>
        </>
    )
}