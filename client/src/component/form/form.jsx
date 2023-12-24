import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import './form.scss';


function Form() {
  return (
      <MDBCard className='text-black m-auto' style={{borderRadius: '25px'}}>
        <MDBCardBody className='body'>
          <MDBRow>
            <MDBCol md='6' lg='10' className='order-2 order-lg-1 d-flex flex-column align-items-center content'>

              <p classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Register For Qr Code</p>

              <div className="d-flex flex-row align-items-center mb-4 ">
                <MDBIcon fas icon="user me-3" size='lg'/>
                <MDBInput label='Your Name' id='form1' type='text' className='w-100'/>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size='lg'/>
                <MDBInput label='Your Email' id='form2' type='email'/>
              </div>     

              <MDBBtn className='mb-2 ' size='lg'>Register</MDBBtn>

            </MDBCol>

          </MDBRow>
        </MDBCardBody>
      </MDBCard>

  );
}

export default Form;