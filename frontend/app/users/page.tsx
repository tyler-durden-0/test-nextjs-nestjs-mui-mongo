"use client"
import React, {useState, useEffect} from 'react';
import {Container, Typography } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

import ShowCreatedUserCardInterface from '../components/showCreatedUserCardComponent/interface/ShowCreatedUserCardInterface';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const UpdateUserPage = () => {


    const [responseData, setResponseData] = useState<Array<ShowCreatedUserCardInterface> | null>(null);
    const [loading, setLoadin] = useState<boolean>(true);
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

    useEffect(() => {
        console.log('responseData', responseData)
    }, [responseData])

    useEffect(() => {
        requestUsersData();

        return () => {
            setLoadin(true);
        }
    }, [])

    const requestUsersData = () => {
        fetch('http://localhost:3001/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(json => {
            console.log('json', json)
            setResponseData(json);
            setLoadin(false);
            // setLoadin(true);
        })
        .catch((err) => {
            console.log('err', err);
        }) 
    }

    return (
        <>
            <Container maxWidth="xl" style={{
                marginBottom: 15,
            }}>
                <Typography align="left" variant="h2" gutterBottom>
                    Users
                </Typography>
                {
                    loading ?   
                        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <Skeleton variant='rectangular' sx={{height: '50px'}}/>
                            <Skeleton variant='rectangular' sx={{height: '50px'}}/>
                            <Skeleton variant='rectangular' sx={{height: '50px'}}/>
                            <Skeleton variant='rectangular' sx={{height: '50px'}}/>
                            <Skeleton variant='rectangular' sx={{height: '50px'}}/>
                            <Skeleton variant='rectangular' sx={{height: '50px'}}/>
                        </Box> : 
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                <TableRow>
                                    <TableCell>First name</TableCell>
                                    <TableCell align="right">Last name</TableCell>
                                    <TableCell align="right">Age</TableCell>
                                    <TableCell align="right">Email</TableCell>
                                    <TableCell align="right">Country</TableCell>
                                    <TableCell align="right">_id</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {responseData ? responseData.map((user) => (
                                    <TableRow
                                    key={user._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell component="th" scope="row">
                                        {user.firstName}
                                    </TableCell>
                                    <TableCell align="right">{user.lastName}</TableCell>
                                    <TableCell align="right">{user.age}</TableCell>
                                    <TableCell align="right">{user.email}</TableCell>
                                    <TableCell align="right">{user.country}</TableCell>
                                    <TableCell align="right">{user._id}</TableCell>
                                    </TableRow>
                                )) : ''}
                                </TableBody>
                            </Table>
                        </TableContainer>
                }
                    
                <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={responseData ? "success" : "error"} sx={{ width: '100%' }}>
                        {responseData ? 'You sucessfully updated user!' : 'Error while updating user!'}
                    </Alert>
                </Snackbar>
            </Container>
        </>
    )
}

export default UpdateUserPage;