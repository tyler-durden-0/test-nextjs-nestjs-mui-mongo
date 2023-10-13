/* eslint-disable @next/next/no-img-element */
'use client'
import {useState, useEffect, useCallback} from 'react';
import {Button, TextField, Container, Autocomplete, Box, Typography } from '@mui/material';
import {countries} from '../../constants/contries';
import isEmail from 'validator/lib/isEmail';
import ShowCreatedUserCard from '../components/showCreatedUserCardComponent/ShowCreatedUserCardComponents';
import ShowCreatedUserCardInterface from '../components/showCreatedUserCardComponent/interface/ShowCreatedUserCardInterface';

interface FormDataObject {
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    country: string;
}

type FormDataErrors = Omit<FormDataObject, "country">

enum FormDataFields {
    FIRST_NAME = 'firstName',
    LAST_NAME = 'lastName',
    AGE = 'age',
    EMAIL = 'email',
    COUNTRY = 'country',
}

export default function CreateUser() {
    const [formData, setFormData] = useState<FormDataObject>({
        firstName: '',
        lastName: '',
        age: 0,
        email: '',
        country: '',
    });
    
    const [formDataErrors, setFormDataErrors] = useState({
        firstName: false,
        lastName: false,
        age: false,
        email: false,
    });

    const [disableButton, setDisableButton] = useState<boolean>(true);
    const [responseData, setResponseData] = useState<ShowCreatedUserCardInterface | null>(null);
    const [showCard, setShowCard] = useState<boolean>(true);

    const handleCardCloseClicked = () => {
        setShowCard((prev) => !prev);
    }
    
    const handleChange = (event: any) => {
      const { name, value } = event.target;
    
      if(name === FormDataFields.FIRST_NAME && value.length >= 30) {
        if(!isErrorInSpecificField(FormDataFields.FIRST_NAME)) {
            setSpecificError(FormDataFields.FIRST_NAME);
        }
      } else if(name === FormDataFields.LAST_NAME && value.length >= 30) {
        if(!isErrorInSpecificField(FormDataFields.LAST_NAME)) {
            setSpecificError(FormDataFields.LAST_NAME);
        }
      } else if(name === FormDataFields.AGE && (+value <= 0 || +value > 120 || isNaN(+value))) {
        if(!isErrorInSpecificField(FormDataFields.AGE)) {
            setSpecificError(FormDataFields.AGE);
        }
      } else if(name === FormDataFields.EMAIL && !isEmail(value)) {
        if(!isErrorInSpecificField(FormDataFields.EMAIL)) {
            setSpecificError(FormDataFields.EMAIL);
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

    useEffect(() => {
        setShowCard(true);
    }, [responseData])

    const handleSubmit = (event: any) => {
        event.preventDefault();
        fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        }).then(response => response.json()).then(json => {
            setResponseData(json);
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
                        Create user here!
                    </Typography>
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
                        label="Last name"
                        name={FormDataFields.LAST_NAME}
                        error={formDataErrors.lastName}
                        value={formData.lastName}
                        onChange={handleChange}
                        fullWidth
                        required
                        autoComplete="off"
                        margin="normal"
                        helperText={formDataErrors.lastName ? "Last name can't be longer than 30 characters." : ""}
                    />
                    <TextField
                        label="Age"
                        name={FormDataFields.AGE}
                        error={formDataErrors.age}
                        value={formData.age }
                        onChange={handleChange}
                        fullWidth
                        required
                        autoComplete="off"
                        margin="normal"
                        helperText={formDataErrors.age ? "Incorrect age." : ""}
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
                          <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
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
                        Create user
                    </Button>
                </form>
                {responseData && showCard ? <ShowCreatedUserCard data={{...responseData, onClick: handleCardCloseClicked}}/> : ''}
            </Container>
        </>
    )

    
}
