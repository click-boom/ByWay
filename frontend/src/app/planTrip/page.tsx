"use client";
import Axios from "axios";
import { useEffect, useState } from "react";
import "./planTrip.css";
import Footer from "@/Components/Footer";
import HeaderTab from "@/Components/Header";



interface TravelData {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  selectTrip: string;
  approxDate: string;
  tripLength: string;
  numberOfAdults: string;
  numberOfChildren: string;
  tourType: string;
  hotelType: string;
  estimatedBudget: string;
  guideLanguage: string;
  moreInfo: string;
 
  whereDidYouFindUs: string;
}

function PlanTrip() {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [selectTrip, setTrip] = useState("");
  const [approxDate, setApproxDate] = useState("");
  const [tripLength, setTripLength] = useState("");
  const [numberOfAdults, setNumberOfAdults] = useState("");
  const [numberOfChildren, setNumberOfChildren] = useState("");
  const [tourType, setTourType] = useState("");
  const [hotelType, setHotelType] = useState("");
  const [estimatedBudget, setEstimatedBudget] = useState("");
  const [guideLanguage, setGuideLanguage] = useState("");
  const [moreInfo, setMoreInfo] = useState("");

  const [whereDidYouFindUs, setWhereDidYouFindUs] = useState("");
  const [travelList, setTravelList] = useState<TravelData[]>([]);

  const [formErrors, setFormErrors] = useState({
    
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    selectTrip:'',
    approxDate:'',
    tripLength:'',
    numberOfAdults:'',numberOfChildren:'',tourType:'',hotelType:'',estimatedBudget:'',guideLanguage:'',moreInfo:'',whereDidYouFindUs:'',
    
  });

  useEffect(() => {
    Axios.get("http://localhost:8081/planTrip/gettrip").then((response) => {
      setTravelList(response.data);
      // console.log(response.data);
    });
  }, []); // Empty dependency array

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...formErrors };

    if (!fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
      valid = false;
    } else {
      newErrors.fullName = '';
    }
    if (!phoneNumber.trim()) {
      // Phone number is empty
      newErrors.phoneNumber = '';
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      // Valid 10-digit phone number is required
      newErrors.phoneNumber = 'Valid 10-digit phone number is required.';
      valid = false;
    } else {
      newErrors.phoneNumber = '';
    }
 
    

    // Validate email address (you might want to improve this validation)
    if (!emailAddress.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress)) {
      newErrors.emailAddress = 'Valid email address is required.';
      valid = false;
    } else {
      newErrors.emailAddress = '';
    }

    if (!selectTrip) {
      newErrors.selectTrip = 'Select Trip is required.';
      valid = false;
    } else {
      newErrors.selectTrip = '';
    }
    if (!approxDate) {
      newErrors.approxDate = 'Approximate Date is required.';
      valid = false;
    } else {
      newErrors.approxDate = '';
    }
    if (!tripLength) {
      newErrors.tripLength = 'Trip Length is required.';
      valid = false;
    } else {
      newErrors.tripLength = '';
    }
    if (!numberOfAdults) {
      newErrors.numberOfAdults = 'Number of Adults is required.';
      valid = false;
    } else {
      newErrors.numberOfAdults = '';
    }
    if (!numberOfChildren) {
      newErrors.numberOfChildren = 'Number of Children is required.';
      valid = false;
    } else {
      newErrors.numberOfChildren = '';
    }
    if (!tourType) {
      newErrors.tourType = 'Tour Type is required.';
      valid = false;
    } else {
      newErrors.tourType = '';
    }
    if (!hotelType) {
      newErrors.hotelType = 'Hotel Type is required.';
      valid = false;
    } else {
      newErrors.hotelType = '';
    }
    if (!estimatedBudget) {
      newErrors.estimatedBudget = 'Estimated Budget is required.';
      valid = false;
    } else {
      newErrors.estimatedBudget = '';
    }
  
    if (!guideLanguage) {
      newErrors.guideLanguage = 'Guide Language is required.';
      valid = false;
    } else {
      newErrors.guideLanguage = '';
    }
   
   
    
    if (!whereDidYouFindUs) {
      newErrors.whereDidYouFindUs = 'Where did you find us is required.';
      valid = false;
    } else {
      newErrors.whereDidYouFindUs = '';
    }
    setFormErrors(newErrors);
    return valid;
  };


  const submit = () => {
    if (validateForm()) {
      // Proceed with the submission
      Axios.post("http://localhost:8081/planTrip/inserttrip", {
        fullName,
        phoneNumber:null || phoneNumber,
        emailAddress,
        selectTrip,
        approxDate,
        tripLength,
        numberOfAdults,
        numberOfChildren,
        tourType,
        hotelType,
        estimatedBudget,
        guideLanguage,
        moreInfo:moreInfo || null,
        whereDidYouFindUs,
      });
  
      setTravelList([
        ...travelList,
        {
          fullName,
          phoneNumber,
          emailAddress,
          selectTrip,
          approxDate,
          tripLength,
          numberOfAdults,
          numberOfChildren,
          tourType,
          hotelType,
          estimatedBudget,
          guideLanguage,
          moreInfo,
          whereDidYouFindUs,
        },
      ]);
  
      
  
      setFullName("");
    setPhoneNumber("");
    setEmailAddress("");
    setTrip("");
    setApproxDate("");
    setTripLength("");
    setNumberOfAdults("");
    setNumberOfChildren("");
    setTourType("");
    setHotelType("");
    setEstimatedBudget("");
    setGuideLanguage("");
    setMoreInfo("");
    setWhereDidYouFindUs("");
    }
  };

  
  return (
    <>
    <HeaderTab/>
      <div className="container-1">
        <div className="page-banner ">
          <div className="page-title">
            <h1 className="customizeH1">Plan Your Trip</h1>
          </div>
        </div>
      </div>
      <div className="common-box" role="main">
        <div className="container">
          <div className="col-lg-12">
            <div className="standard-form booking-form common-module bg-white shadow">
              <h3 className="details">Trip Details</h3>
              <div className="inner-box">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group ">
                      <label className="required">Select Trip</label>
                      <div className="custom_select">
                        <select
                          className={`form-control ${
                            formErrors.selectTrip && "border-red-500"
                          }`}
                          value={selectTrip}
                          required
                          onChange={(e) => {
                            setTrip(e.target.value);
                          }}
                        >
                          <option value="">Select Trip</option>
                          <option value="12 Days Everest Base Camp Trek">
                            12 Days Everest Base Camp Trek
                          </option>
                          <option value="Annapurna Base Camp Helicopter Tour">
                            Annapurna Base Camp Helicopter Tour
                          </option>
                          <option value="Annapurna Base Camp Trek">
                            Annapurna Base Camp Trek
                          </option>
                          <option value="Annapurna Base Camp Trek with Helicopter Return">
                            Annapurna Base Camp Trek with Helicopter Return
                          </option>
                          <option value="Everest Base Camp Helicopter Tour">
                            Everest Base Camp Helicopter Tour
                          </option>
                        </select>{" "}
                        {formErrors.selectTrip && (
                          <p className="error-message">
                            {formErrors.selectTrip}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group ">
                      <label className="required">Approx. Date of Travel</label>
                      <div className="calendar">
                        <input
                          type="date"
                          className={`form-control ${
                            formErrors.approxDate && "border-red-500"
                          }`}
                          value={approxDate}
                          required
                          // data-type="date"
                          autoComplete=""
                          onChange={(e) => {
                            setApproxDate(e.target.value);
                          }}
                        />
                        {formErrors.approxDate && (
                          <p className="error-message ">
                            {formErrors.approxDate}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group ">
                      <label className="required">Length of Trip</label>
                      <input
                        type="number"
                        className={`form-control ${
                          formErrors.tripLength && "border-red-500"
                        }`}
                        min="1"
                        value={tripLength}
                        required
                        onChange={(e) => {
                          setTripLength(e.target.value);
                        }}
                      />
                      {formErrors.tripLength && (
                        <p className="error-message ">
                          {formErrors.tripLength}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group ">
                      <label className="required">Number of Adults </label>
                      <input
                        type="number"
                        className={`form-control ${
                          formErrors.numberOfAdults && "border-red-500"
                        }`}
                        min="1"
                        value={numberOfAdults}
                        required
                        onChange={(e) => {
                          setNumberOfAdults(e.target.value);
                        }}
                      />
                      {formErrors.numberOfAdults && (
                        <p className="error-message ">
                          {formErrors.numberOfAdults}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group ">
                      <label className="required">Number of Children</label>
                      <input
                        type="number"
                        className={`form-control ${
                          formErrors.numberOfChildren && "border-red-500"
                        }`}
                        min="1"
                        value={numberOfChildren}
                        required
                        onChange={(e) => {
                          setNumberOfChildren(e.target.value);
                        }}
                      />
                      {formErrors.numberOfChildren && (
                        <p className="error-message ">
                          {formErrors.numberOfChildren}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group ">
                      <label className="required">Tour Type </label>
                      <div className="custom_select">
                        <select
                          className={`form-control ${
                            formErrors.tourType && "border-red-500"
                          }`}
                          required
                          onChange={(e) => {
                            setTourType(e.target.value);
                          }}
                          value={tourType}
                        >
                          <option value="">---Select One Option---</option>
                          <option value="Trek and Hiking">
                            Trek and Hiking
                          </option>
                          <option value="Tour and Sightseeing">
                            Tour and Sightseeing
                          </option>
                          <option value="Day Tour">Day Tour</option>
                        </select>
                        {formErrors.tourType && (
                          <p className="error-message ">
                            {formErrors.tourType}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group ">
                      <label className="required">Hotel type</label>
                      <div className="custom_select">
                        <select
                          className={`form-control ${
                            formErrors.hotelType && "border-red-500"
                          }`}
                          required
                          onChange={(e) => {
                            setHotelType(e.target.value);
                          }}
                          value={hotelType}
                        >
                          <option value="">---Select One Option---</option>
                          <option value="5-star">5-star</option>
                          <option value="Normal Hotel">Normal Hotel</option>
                          <option value="Medium Hotel">Medium Hotel</option>
                        </select>
                        {formErrors.hotelType && (
                          <p className="error-message ">
                            {formErrors.hotelType}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group ">
                      <label className="required">Estimated Budget </label>
                      <div className="custom_select">
                        <select
                          className={`form-control ${
                            formErrors.estimatedBudget && "border-red-500"
                          }`}
                          required
                          onChange={(e) => {
                            setEstimatedBudget(e.target.value);
                          }}
                          value={estimatedBudget}
                        >
                          <option value="">---Estimated Budget---</option>
                          <option value="$1-$500">$1 - $500</option>
                          <option value="$500-$1000">$500 - $1000</option>
                          <option value="$1500-$2000">$1500 - $2000</option>
                          <option value="$2000-$3000">$2000 - $3000</option>
                          <option value="$3000-$4000">$3000 - $4000</option>
                          <option value="$4000-$5000">$4000 - $5000</option>
                          <option value="Above $5000">Above $5000</option>
                        </select>{" "}
                        {formErrors.estimatedBudget && (
                          <p className="error-message ">
                            {formErrors.estimatedBudget}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-group ">
                  <label className="required">Guide Language </label>
                  <div className="custom_select pr-3">
                    <select
                      className={`form-control ${
                        formErrors.guideLanguage && "border-red-500"
                      }`}
                      required
                      onChange={(e) => {
                        setGuideLanguage(e.target.value);
                      }}
                      value={guideLanguage}
                    >
                      <option value="">Select your guide language</option>
                      <option value="English">English</option>
                      <option value="Chinese">Chinese</option>
                      <option value="Japanese">Japanese</option>
                      <option value="French">French</option>
                    </select>
                    {formErrors.guideLanguage && (
                      <p className="error-message ">
                        {formErrors.guideLanguage}
                      </p>
                    )}
                  </div>
                </div>
                <div className="form-group ">
                  <label>More information </label>
                  <textarea
                    className={"form-control"}
                    onChange={(e) => {
                      setMoreInfo(e.target.value);
                    }}
                    value={moreInfo}
                    rows={8}
                    style={{
                      height: "199px",
                      fontSize: "16px",
                      color: "black",
                    }}
                  />
                </div>

                <div className="Personal-info">
                  <h2>Personal information</h2>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="required"> Full Name</label>
                      <input
                        type="text"
                        className={`form-control ${
                          formErrors.fullName && "border-red-500"
                        }`}
                        value={fullName}
                        required
                        onChange={(e) => {
                          setFullName(e.target.value);
                        }}
                      />
                      {formErrors.fullName && (
                        <p className="error-message ">{formErrors.fullName}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label> Phone Number</label>
                      <input
                        className={`form-control ${
                          formErrors.phoneNumber && "border-red-500"
                        }`}
                        value={phoneNumber}
                        onChange={(e) => {
                          setPhoneNumber(e.target.value);
                        }}
                      />{" "}
                      {formErrors.phoneNumber && (
                        <p className="error-message ">
                          {formErrors.phoneNumber}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="required"> Email Address</label>
                      <input
                        type="text"
                        className={`form-control ${
                          formErrors.emailAddress && "border-red-500"
                        }`}
                        value={emailAddress}
                        required
                        onChange={(e) => {
                          setEmailAddress(e.target.value);
                        }}
                      />
                      {formErrors.emailAddress && (
                        <p className="error-message ">
                          {formErrors.emailAddress}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="required"> Where did you find us</label>
                      <div className="custom_select pr-3 ">
                        <select
                          className={`form-control ${
                            formErrors.whereDidYouFindUs && "border-red-500"
                          }`}
                          value={whereDidYouFindUs}
                          required
                          onChange={(e) => {
                            setWhereDidYouFindUs(e.target.value);
                          }}
                        >
                          <option value={""}>Where did you find us</option>
                          <option value="Facebook">Facebook</option>
                          <option value="Friends">Friends</option>
                          <option value="Google">Google</option>
                        </select>
                        {formErrors.whereDidYouFindUs && (
                          <p className="error-message ">
                            {formErrors.whereDidYouFindUs}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
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
      </div>
      <Footer/>
    </>
  );
}

export default PlanTrip;
