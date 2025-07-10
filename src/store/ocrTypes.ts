export interface PassportData {
  surname: string;
  name: string;
  patronymic: string;
  gender: 'MALE' | 'FEMALE';
  birthDate: string;
  series: string;
  number: string;
  expiryDate: string;
  authority: string;
  issueDate: string;
  birthPlace: string;
  personalNumber: string;
  ethnicity: string;
}

export interface DriverLicenseCategory {
  category: string;
  issuingDate: string;
}

export interface DriverLicenseData {
  surname: string;
  name: string;
  patronymic?: string;
  birthDate: string;
  birthPlace: string;
  issueDate: string;
  expiryDate: string;
  authority: string;
  personalNumber: string;
  licenceNumber: string;
  residence: string;
  categories: string;
  category: DriverLicenseCategory;
}

export interface VehicleRegistrationCertificateData {
  number: string;
  vin: string;
  ownerFullName: string;
  personalNumber: string;
  ownerAddress: string;
  brand: number;
  car_model: number;
  steeringLocation: string;
  engineType: string;
  yearOfManufacture: string;
  color: string;
  carBodyChassisNumber: string;
  carBodyType: string;
  vehicleCategory: string;
  fuelType: string | null;
  engineCapacity: string;
  enginePower: string | null;
  unladenMass: string;
  maxPermissibleMass: string;
  authority: string;
  registrationDate: string;
}

export interface OcrResult {
  phoneNumber?: string;
  referralCode?: string;
  endDate?: string;
  unlimitedDrivers?: boolean;
  purpose?: number;
  technicalInspection?: boolean;
  passport?: PassportData;
  driverLicense?: DriverLicenseData;
  vehicleRegistrationCertificate?: VehicleRegistrationCertificateData;
}
