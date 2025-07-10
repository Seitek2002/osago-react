export interface IPassport {
  surname: string;
  name: string;
  patronymic: string;
  gender: string;
  birthDate: string; // Формат YYYY-MM-DD
  personalNumber: string;
  series: string;
  number: string;
  issueDate: string; // Формат YYYY-MM-DD
  expiryDate: string; // Формат YYYY-MM-DD
  birthPlace: string;
  authority: string;
  ethnicity: string;
}

export interface IVehicleRegistrationCertificate {
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
  engineCapacity: string | null;
  enginePower: string | null;
  unladenMass: string;
  maxPermissibleMass: number;
  authority: string;
  registrationDate: string; // Формат YYYY-MM-DD
}

export interface IInsuranceData {
  passport: IPassport;
  vehicleRegistrationCertificate: IVehicleRegistrationCertificate;
  unlimitedDrivers: boolean;
  purpose: number;
  endDate: string; // Формат YYYY-MM-DD
  phoneNumber: string;
  technicalInspection: boolean;
  vehicleTypeCoefficient?: string;
  technicalInspectionNumber?: string;
  technicalInspectionIssuingDate?: string;
}
