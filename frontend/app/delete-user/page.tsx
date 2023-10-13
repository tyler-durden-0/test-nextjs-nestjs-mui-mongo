"use client"
import React, {useState, useEffect, useCallback} from 'react';
import {Button, TextField, Container, Autocomplete, Box, Typography } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import ShowCreatedUserCardInterface from '../components/showCreatedUserCardComponent/interface/ShowCreatedUserCardInterface';

interface FormDataObject {
    userId: string;
}

type FormDataErrors = Omit<Record<keyof FormDataObject, boolean>, 'country'>;

enum FormDataFields {
    USER_ID = 'userId',
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const UpdateUserPage = () => {
    const [formData, setFormData] = useState<FormDataObject>({
        userId: '',
    });
    
    const [formDataErrors, setFormDataErrors] = useState<FormDataErrors>({
        userId: false,
    });

    const [disableButton, setDisableButton] = useState<boolean>(true);
    const [responseData, setResponseData] = useState<ShowCreatedUserCardInterface | null>(null);

    const [open, setOpen] = React.useState(false);
  
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
    
    const handleChange = (event: any) => {
      const { name, value } = event.target;

      if(name === FormDataFields.USER_ID && value.length === 0) {
        if(!isErrorInSpecificField(FormDataFields.USER_ID)) {
            setSpecificError(FormDataFields.USER_ID);
        }
      } else {
        if(isAnyError()) {
            const errorField: Array<string> = getErrorFields();
            if (errorField.includes(name)) {
                removeSpecificError(name);
            }
        }
      }

      setFormData({
        ...formData,
        [name]: value,
      });

    };

    const getErrorFields = (): Array<string> => {
        const result: Array<string> = [];
        for (const key in formDataErrors) {
            if (formDataErrors[key as keyof typeof formDataErrors] === true) {
                result.push(key);
            }
        }
        return result
    }

    const isAnyError = useCallback((): boolean => {
        return Object.values(formDataErrors).some(value => value === true);
    }, [formDataErrors])

    const isAnyFieldFalsy = useCallback((): boolean => {
        return Object.values(formData).some(value => Boolean(value) === false);
    }, [formData])

    const isErrorInSpecificField = (field: keyof FormDataErrors): boolean => {
        return formDataErrors[field];
    }

    const setSpecificError = (fieldError: string) => {
        setFormDataErrors((prevErrors) => ({
            ...prevErrors,
            [fieldError]: true,
        }));
    }

    const removeSpecificError = (fieldError: string) => {
        setFormDataErrors((prevErrors) => ({
            ...prevErrors,
            [fieldError]: false,
        }));
    }

    useEffect(() => {  
        //check disable button for request
        if(!isAnyFieldFalsy() && !isAnyError()) {
          setDisableButton(false);
        } else {
          setDisableButton(true);
        }
    }, [formData, isAnyError, isAnyFieldFalsy])

    const handleSubmit = (event: any) => {
        event.preventDefault();
        fetch(`http://localhost:3001/users/${formData.userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(json => {
            if (json.acknowledged) {
                setResponseData(json);
            } else {
                setResponseData(null);
            }
            setOpen(true);
        })
        .catch((err) => {
            console.log('err', err);
            setResponseData(null);
            setOpen(true);
        }) 
      };

    return (
        <>           
            <Container maxWidth="sm" style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 50,
                overflow: 'auto'
            }}>
                <form onSubmit={handleSubmit}>
                    <Typography align="center" variant="h2" gutterBottom>
                        Delete user here!
                    </Typography>
                    <TextField
                        label="User _id"
                        name={FormDataFields.USER_ID}
                        error={formDataErrors.userId}
                        value={formData.userId}
                        onChange={handleChange}
                        fullWidth
                        required
                        autoComplete="off"
                        margin="normal"
                        helperText={formDataErrors.userId ? "User _id can't be empty." : ""}
                    />
                    <Button type="submit" variant="contained" color="primary" disabled={disableButton}>
                        Delete user
                    </Button>
                </form>
                <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={responseData ? "success" : "error"} sx={{ width: '100%' }}>
                        {responseData ? 'You sucessfully deleted user!' : 'Error while updating user!'}
                    </Alert>
                </Snackbar>
            </Container>
        </>
    )
}

export default UpdateUserPage;