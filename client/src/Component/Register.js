import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import {saveUsers} from './_requests';

const initialValues = {
  name: "",
  email: "",
  password: "",
  cpassword: "",
  image: ""
}

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [imgPre, setImgPre] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    let registrationSchema = Yup.object().shape({
      name: Yup.string()
      .min(3, 'Minimum 3 characters')
      .max(50, 'Maximum 50 characters')
      .required('Name is required'),         
      email: Yup.string()
      .email('Wrong email format')
      .min(3, 'Minimum 3 characters')
      .max(50, 'Maximum 50 characters')
      .required('Email is required'),
      password: Yup.string()
      .required('Password is required')
      .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"),
      cpassword: Yup.string()
      .required('Password is required')
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    });

    const formik = useFormik({
      initialValues,
      validationSchema: registrationSchema,
      onSubmit: async (values, {setStatus, setSubmitting, resetForm}) => {
        setLoading(true)
        try {   
          var formData = new FormData();
          formData.append('name', values.name);
          formData.append('email', values.email);
          formData.append('password', values.cpassword);
          formData.append('image', imageFile);

          const saveUserData = await saveUsers(formData)
  
          if(saveUserData.status == 200) {                
              setLoading(false);
              toast.success('Success!', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });  
              resetForm();
              setImageFile(null);
              setImagePreview(null);
              setImgPre(false);
              navigate('/');           
          } else {
            return;
          }  
        } catch (error) {
          console.error(error)
          toast.error('Something went wrong!', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setStatus('The registration details is incorrect')
          setSubmitting(false)
          setLoading(false)
        }
      },
  })

  const isValidFileUploaded=(file)=>{
    const validExtensions = ['png','jpeg','jpg']
    const fileExtension = file.type.split('/')[1]
    return validExtensions.includes(fileExtension)
  }

const handleImagePreview = (e) => {
    if(e.target.files[0].size > 2097152){
        toast.warn('File size should be below 2MB!', {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        document.getElementById('image').value = '';
        return;
      } else {
        const file = e.target.files[0];
        if(isValidFileUploaded(file)){
            let image_as_base64 = URL.createObjectURL(e.target.files[0]);
            let image_as_files = e.target.files[0];        
            setImageFile(image_as_files);
            setImagePreview(image_as_base64);
            setImgPre(true);
       } else { 
        document.getElementById('image').value = '';   

       }  
      }
}
  
    const handleSubmit = (e) => {
      e.preventDefault();
    //   localStorage.setItem('userName', userName);
      //sends the username and socket ID to the Node.js server
    //   socket.emit('newUser', { userName, socketID: socket.id });
    //   navigate('/chat');
    }
  return (
    <div className='d-flex justify-content-center align-items-center h-100vh background_img'>
      <div className='card br-15 bs-10'>
        <form className="reg_form card-body" noValidate onSubmit={formik.handleSubmit}>
          <div className='d-flex justify-content-center'>
            <h2 className="home__header text-center">Sign up <span className='text_primary'>To</span> Chat</h2>
            <div className='chat-logo' >
              <img src='/to-chat.png' className='w-100' />
            </div>
          </div>
          <div className='row'>
            <div className='col-8 form-group fv-row mb-3'>
              <label htmlFor="image">Profile Image</label>
              <input
                type="file" onChange={(e) => handleImagePreview(e)}
                id="image"
                className="form-control"
              />              
            </div>
            <div className='col-4 d-flex justify-content-center'>
              <div className='prof_img_pre border'>
                <img src={imagePreview} className='profile_image w-100'/>
              </div>
            </div>
          </div>
          <div className='form-group fv-row mb-3'>
            <label htmlFor="name">Name</label>
            <input
              type="text" {...formik.getFieldProps('name')}
              name="name"
              id="name"
              className="form-control"
            />
            {formik.touched.name && formik.errors.name && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert' className='text-danger'>{formik.errors.name}</span>
                </div>
              </div>
            )}
          </div>
          <div className='form-group fv-row mb-3'>
            <label htmlFor="email">Email</label>
            <input
              type="email" {...formik.getFieldProps('email')}
              id="email"
              className="form-control"
            />
            {formik.touched.email && formik.errors.email && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert' className='text-danger'>{formik.errors.email}</span>
                </div>
              </div>
            )}
          </div>
          <div className='form-group fv-row mb-3'>
            <label htmlFor="password">Password</label>
            <input
              type="password" {...formik.getFieldProps('password')}
              id="password"
              className="form-control"
            />
            {formik.touched.password && formik.errors.password && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert' className='text-danger'>{formik.errors.password}</span>
                </div>
              </div>
            )}
          </div>
          <div className='form-group fv-row mb-3'>
            <label htmlFor="cpassword">Confirm Password</label>
            <input
              type="password" {...formik.getFieldProps('cpassword')}
              id="cpassword"
              className="form-control"
            />
            {formik.touched.cpassword && formik.errors.cpassword && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert' className='text-danger'>{formik.errors.cpassword}</span>
                </div>
              </div>
            )}
          </div>          
          <div className='w-100 text-center'>
            <button type='submit' className="btn btn_primary">              
              {!loading && <span className='indicator-label'>SIGN UP</span>}
              {loading && (
                  <span className='indicator-progress' style={{ display: 'block' }}>
                      Please Wait...{' '}
                      <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
              )}
              </button>
          </div>
          <Link to='/' className='fs-8' >back to login</Link>
        </form>
      </div>
    </div>
  );
};

export default Register;