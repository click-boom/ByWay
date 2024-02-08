"use client"
import Axios from 'axios';
import { useEffect, useState } from 'react';
import App from './ReviewApp';
import './reviewForm.css';

interface ReviewData {
  title: string;
  fullName: string;
  date: string;
  selectCountry: string;
  reviewDetails: string;
}

function PlanTrip() {
  const [fullName, setFullName] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [selectCountry, setSelectCountry] = useState('');
  const [reviewDetails, setReviewDetails] = useState('');
  const [reviewList, setReviewList] = useState<ReviewData[]>([]);
  const [formErrors, setFormErrors] = useState({
    fullName: '',
    title: '',
    date: '',
    selectCountry: '',
    reviewDetails: '',
  });

  useEffect(() => {
    Axios.get('http://localhost:8081/planTrip/getreview').then((response) => {
      setReviewList(response.data);
      console.log(response.data);
    });
  }, []); // Empty dependency array

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...formErrors };

    if (!fullName) {
      newErrors.fullName = 'Full Name is required.';
      valid = false;
    } else {
      newErrors.fullName = '';
    }

    if (!title) {
      newErrors.title = 'Title is required.';
      valid = false;
    } else {
      newErrors.title = '';
    }

    if (!date) {
      newErrors.date = 'Date is required.';
      valid = false;
    } else {
      newErrors.date = '';
    }

   
    if (!reviewDetails) {
      newErrors.reviewDetails = 'Review Details are required.';
      valid = false;
    } else {
      newErrors.reviewDetails = '';
    }

    setFormErrors(newErrors);
    return valid;
  };

  const submit = () => {
    if (validateForm()) {
      Axios.post('http://localhost:8081/planTrip/insertreview', {
        fullName: fullName,
        selectCountry: selectCountry || null, 
        date: date,
        title: title,
        reviewDetails: reviewDetails,
      });

      setReviewList([
        ...reviewList,
        {
          fullName: fullName,
          selectCountry: selectCountry,
          date: date,
          title: title,
          reviewDetails: reviewDetails,
        },
      ]);

      // Clear form fields after submission
      setFullName('');
      setTitle('');
      setDate('');
      setSelectCountry('');
      setReviewDetails('');
    }
  };

  return (
    <>
      <div className="container-1">
        <div className="page-banner ">
          <div className="page-title">
            <h1 className="customizeH1">Write a review</h1>
          </div>
        </div>
      </div>

      <div className="common-box" role="main">
        <div className="container">
          <div className="col-lg-12">
            <div className="standard-form booking-form common-module bg-white shadow">
              <div className="form-group">
                <label className="required"> Title of your review</label>
                <input
                  className={`form-control ${formErrors.title && 'border-red-500'}`}
                  name="title"
                  id="title"
                  max="15"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {formErrors.title && <p className="error-message ">{formErrors.title}</p>}
              </div>

              <div className="row">
                <div className="col-md-6 ml-3">
                  <div className="form-group ">
                    <label className="required"> Full Name</label>
                    <input 
                      type="text"
                      className={`form-control ${formErrors.fullName && 'border-red-500'}`}
                      name="fullName"
                      id="fullName"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                    {formErrors.fullName && <p className="error-message">{formErrors.fullName}</p>}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label className="required"> Date</label>
                    <input
                      className={`form-control ${formErrors.date && 'border-red-500'}`}
                      type="date"
                      
                      max="15"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                    {formErrors.date && <p className="error-message">{formErrors.date}</p>}
                  </div>
                </div>
              </div>


              <div className="form-group ">
                <label className="required">Your review details </label>
                <textarea
                  className={`form-control ${formErrors.reviewDetails && 'border-red-500'}`}
                  name="comments"
                  id="comments"
                  required
                  value={reviewDetails}
                  onChange={(e) => setReviewDetails(e.target.value)}
                  rows={8}
                  style={{
                    height: '199px',
                    fontSize: '16px',
                    color: 'black',
                  }}
                />
                {formErrors.reviewDetails && (
                  <p className="error-message">{formErrors.reviewDetails}</p>
                )}
              </div>

              <div className="button-submit">
                <button className="btn" onClick={submit}>
                  SUBMIT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <App />
      </div>
    </>
  );
}

export default PlanTrip;
