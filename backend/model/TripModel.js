export default class TravelModel {
  #fullName;
  #phoneNumber;
  #emailAddress;
  #selectTrip;
  #approxDate;
  #tripLength;
  #numberOfAdults;
  #numberOfChildren;
  #tourType;
  #hotelType;
  #estimatedBudget;
  #guideLanguage;
  #moreInfo;
  #whereDidYouFindUs;

  constructor(
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
    whereDidYouFindUs
  ) {
    this.#fullName = fullName;
    this.#phoneNumber = phoneNumber;
    this.#emailAddress = emailAddress;
    this.#selectTrip = selectTrip;
    this.#approxDate = approxDate;
    this.#tripLength = tripLength;
    this.#numberOfAdults = numberOfAdults;
    this.#numberOfChildren = numberOfChildren;
    this.#tourType = tourType;
    this.#hotelType = hotelType;
    this.#estimatedBudget = estimatedBudget;
    this.#guideLanguage = guideLanguage;
    this.#moreInfo = moreInfo;
    this.#whereDidYouFindUs = whereDidYouFindUs;
  }

  getFullName() {
    return this.#fullName;
  }

  getPhoneNumber() {
    return this.#phoneNumber;
  }

  getEmailAddress() {
    return this.#emailAddress;
  }

  getSelectTrip() {
    return this.#selectTrip;
  }

  getApproxDate() {
    return this.#approxDate;
  }

  getTripLength() {
    return this.#tripLength;
  }

  getNumberOfAdults() {
    return this.#numberOfAdults;
  }

  getNumberOfChildren() {
    return this.#numberOfChildren;
  }

  getTourType() {
    return this.#tourType;
  }

  getHotelType() {
    return this.#hotelType;
  }

  getEstimatedBudget() {
    return this.#estimatedBudget;
  }

  getGuideLanguage() {
    return this.#guideLanguage;
  }

  getMoreInfo() {
    return this.#moreInfo;
  }

  getWhereDidYouFindUs() {
    return this.#whereDidYouFindUs;
  }

  setFullName(fullName) {
    this.#fullName = fullName;
  }

  setPhoneNumber(phoneNumber) {
    this.#phoneNumber = phoneNumber;
  }

  setEmailAddress(emailAddress) {
    this.#emailAddress = emailAddress;
  }

  setSelectTrip(selectTrip) {
    this.#selectTrip = selectTrip;
  }

  setApproxDate(approxDate) {
    this.#approxDate = approxDate;
  }

  setTripLength(tripLength) {
    this.#tripLength = tripLength;
  }

  setNumberOfAdults(numberOfAdults) {
    this.#numberOfAdults = numberOfAdults;
  }

  setNumberOfChildren(numberOfChildren) {
    this.#numberOfChildren = numberOfChildren;
  }

  setTourType(tourType) {
    this.#tourType = tourType;
  }

  setHotelType(hotelType) {
    this.#hotelType = hotelType;
  }

  setEstimatedBudget(estimatedBudget) {
    this.#estimatedBudget = estimatedBudget;
  }

  setGuideLanguage(guideLanguage) {
    this.#guideLanguage = guideLanguage;
  }

  setMoreInfo(moreInfo) {
    this.#moreInfo = moreInfo;
  }

  setWhereDidYouFindUs(whereDidYouFindUs) {
    this.#whereDidYouFindUs = whereDidYouFindUs;
  }
}
