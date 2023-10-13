"use client"
import React, {useState, useEffect, useCallback} from 'react';
import {Button, TextField, Container, Autocomplete, Box, Typography } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import {countries} from '../../constants/contries';
import isEmail from 'validator/lib/isEmail';

import ShowCreatedUserCardInterface from '../components/showCreatedUserCardComponent/interface/ShowCreatedUserCardInterface';

interface FormDataObject {
    firstName: string;
    email: string;
    country: string;
    userId: string;
}

type FormDataErrors = Omit<Record<keyof FormDataObject, boolean>, 'country'>;

enum FormDataFields {
    FIRST_NAME = 'firstName',
    EMAIL = 'email',
    COUNTRY = 'country',
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
        firstName: '',
        email: '',
        country: '',
        userId: '',
    });
    
    const [formDataErrors, setFormDataErrors] = useState<FormDataErrors>({
        firstName: false,
        email: false,
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
    
      if(name === FormDataFields.FIRST_NAME && value.length >= 30) {
        if(!isErrorInSpecificField(FormDataFields.FIRST_NAME)) {
            setSpecificError(FormDataFields.FIRST_NAME);
        }
      } else if(name === FormDataFields.EMAIL && !isEmail(value)) {
        if(!isErrorInSpecificField(FormDataFields.EMAIL)) {
            setSpecificError(FormDataFields.EMAIL);
        }
      } else if(name === FormDataFields.USER_ID && value.length === 0) {
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
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(json => {
            if (json._id) {
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
                        Update user here!
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
                    <TextField
                        label="First name"
                        name={FormDataFields.FIRST_NAME}
                        error={formDataErrors.firstName}
                        value={formData.firstName}
                        onChange={handleChange}
                        fullWidth
                        required
                        autoComplete="off"
                        margin="normal"
                        helperText={formDataErrors.firstName ? "First name can't be longer than 30 characters." : ""}
                    />
                    <TextField
                        label="Email"
                        name={FormDataFields.EMAIL}
                        error={formDataErrors.email}
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        required
                        autoComplete="off"
                        margin="normal"
                        helperText={formDataErrors.email ? "Incorrect email." : ""}
                    />
                    <Autocomplete
                      id="country-select-demo"
                      sx={{ width: '100%', marginTop: '16px', marginBottom: '8px'}}
                      options={countries}           
                      autoHighlight
                      getOptionLabel={(option) => option.label}
                      onChange={(event, newValue) => {
                        // console.log('event, newValue', event, newValue)
                        setFormData({
                            ...formData,
                            country: newValue?.label ? newValue?.label : ''
                        })
                      }}
                      renderOption={(props, option) => (
                          <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} key={option.code} {...props}>
                          <img
                              loading="lazy"
                              width="20"
                              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                              alt=""
                          />
                          {option.label} ({option.code}) +{option.phone}
                          </Box>
                      )}
                      renderInput={(params) => (
                          <TextField
                          {...params}
                          label="Choose a country"
                          required
                          inputProps={{
                              ...params.inputProps,
                              autoComplete: 'new-password', // disable autocomplete and autofill
                          }}
                          />
                      )}
                    />
                    <Button type="submit" variant="contained" color="primary" disabled={disableButton}>
                        Update user
                    </Button>
                </form>
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