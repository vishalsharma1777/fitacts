import React from 'react';
import { useState, useEffect } from 'react';
import { validate } from 'react-email-validator';
import passwordValidator from 'password-validator';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useSelector } from 'react-redux';
import SignupButton from '../components/userAuthentication/SignupButton';

var schema = new passwordValidator();
schema
  .is()
  .min(8, 'password should have atleast 8 characters')
  .is()
  .max(100)
  .has()
  .uppercase(1, 'password should have atleast 1 Uppercase char')
  .has()
  .lowercase(1, 'password should have atleast 1 Lowercase char')
  .has()
  .digits(1, 'password should have atleast 1 Digit')
  .has()
  .not()
  .spaces(0, 'it should not have spaces');

function SignUpPage({setAlignment}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    weight: '',
    height: '',
    password: '',
    confirmPassword: '',
    favactivities:{},
    timeline:{},
    following:{},
  });
  const signUpState = useSelector((state) => state.signUp);
  const handleChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };
  let passwordValidationMessage = schema.validate(formData.password, {
    details: true
  });
  let passwordValidation = schema.validate(formData.password);

  let disableButton = true;
  if (
    formData.name.length > 0 &&
    formData.email.length > 0 &&
    formData.mobile.length == 10 &&
    formData.height !== 0 &&
    formData.weight !== 0 &&
    formData.password.length > 0 &&
    formData.confirmPassword.length > 0 &&
    validate(formData.email) &&
    formData.password === formData.confirmPassword &&
    passwordValidation
  ) {
    disableButton = false;
  }

  useEffect(() => {
    document.title = 'Fit Acts | Sign Up ';
  }, []);

  return (
    <>
      <form className='form-control'>
        <FormControl
          sx={{
            marginBottom: '10px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Input
            placeholder='Name'
            sx={{
              width: '90%'
            }}
            onChange={handleChange('name')}
          />
          <FormHelperText sx={{ color: 'red', width: '90%', height: '10px' }}>
            {formData.name.length > 0 &&
              formData.name.length < 2 &&
              'Please enter a valid name.'}
          </FormHelperText>
        </FormControl>
        <FormControl
          sx={{
            marginBottom: '10px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Input
            placeholder='Email'
            sx={{
              width: '90%'
            }}
            onChange={handleChange('email')}
            error={formData.email.length > 0 && !validate(formData.email)}
          />
          <FormHelperText sx={{ color: 'red', width: '90%', height: '10px' }}>
            {formData.email.length > 0 &&
              !validate(formData.email) &&
              'Please enter a valid email.'}
            {formData.email.length > 0 &&
              validate(formData.email) &&
              signUpState.signupLoading ==false&&
              signUpState.signupError.response.status === 409 &&
              signUpState.signupError.response.data.message}
          </FormHelperText>
        </FormControl>
        <FormControl
          sx={{
            marginBottom: '10px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Input
            placeholder='Mobile Number'
            sx={{
              width: '90%'
            }}
            type='number'
            onChange={handleChange('mobile')}
            error={formData.mobile.length > 0 && formData.mobile.length < 10}
          />
          <FormHelperText sx={{ color: 'red', width: '90%', height: '10px' }}>
            {formData.mobile.length > 0 &&
              formData.mobile.length < 10 &&
              'Please enter a valid mobile number.'}
          </FormHelperText>
        </FormControl>
        <FormControl
          sx={{
            marginBottom: '10px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Input
            id='outlined-adornment-weight'
            onChange={handleChange('weight')}
            sx={{
              width: '90%'
            }}
            autoComplete='off'
            error={formData.weight.length > 0 && formData.weight == 0}
            placeholder='Weight'
            endAdornment={<InputAdornment position='end'>Kgs.</InputAdornment>}
          />
          <FormHelperText sx={{ color: 'red', width: '90%', height: '10px' }}>
            {formData.weight.length > 0 &&
              formData.weight == 0 &&
              'Please enter a valid weight.'}
          </FormHelperText>
        </FormControl>
        <FormControl
          sx={{
            marginBottom: '10px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Input
            id='outlined-adornment-height'
            onChange={handleChange('height')}
            sx={{
              width: '90%'
            }}
            autoComplete='off'
            error={formData.height.length > 0 && formData.height == 0}
            placeholder='Height'
            endAdornment={<InputAdornment position='end'>Cms.</InputAdornment>}
          />
          <FormHelperText
            sx={{ color: 'red', width: '90%', height: '10px' }}
          >
            {formData.height.length > 0 && formData.height == 0 && 'Please enter a valid height.'}
          </FormHelperText>
        </FormControl>
        <FormControl
          sx={{
            marginBottom: '10px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Input
            id='outlined-adornment-password'
            type={showPassword ? 'text' : 'password'}
            onChange={handleChange('password')}
            sx={{
              width: '90%'
            }}
            autoComplete='off'
            error={formData.password.length > 0 && !passwordValidation}
            placeholder='Password'
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText sx={{ color: 'red', width: '90%', height: '10px' }}>
            {formData.password.length > 0 &&
              !passwordValidation &&
              passwordValidationMessage[0].message}
          </FormHelperText>
        </FormControl>
        <FormControl
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Input
            id='outlined-adornment-confirm-password'
            type={showConfirmPassword ? 'text' : 'password'}
            onChange={handleChange('confirmPassword')}
            sx={{
              width: '90%'
            }}
            autoComplete='off'
            placeholder='Confirm Password'
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownConfirmPassword}
                  edge='end'
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText sx={{ color: 'red', width: '90%', height: '10px' }}>
            {formData.password !== formData.confirmPassword &&
            formData.confirmPassword.length > 0
              ? 'Both should be same.'
              : ''}
          </FormHelperText>
        </FormControl>
        <SignupButton formdata={formData} setAlignment={setAlignment} disabled={disableButton} />
      </form>
    </>
  );
}

export default SignUpPage;
