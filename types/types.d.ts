
/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
    params: { [key: string]: string };
    searchParams: { [key: string]: string | string[] | undefined };
};
  
declare type Gender = "Male" | "Female" | "Other";
declare type Status = "pending" | "in progress" | "complete";
  
declare interface CreateUserParams {
    username: string | undefined;
    email: string;
    password: string;
}
declare interface User extends CreateUserParams {
    $id: string;
}
  
// declare interface RegisterUserParams extends CreateUserParams {
//     userId: string;
//     birthDate: Date;
//     gender: Gender;
//     address: string;
//     occupation: string;
//     emergencyContactName: string;
//     emergencyContactNumber: string;
//     primaryPhysician: string;
//     insuranceProvider: string;
//     insurancePolicyNumber: string;
//     allergies: string | undefined;
//     currentMedication: string | undefined;
//     familyMedicalHistory: string | undefined;
//     pastMedicalHistory: string | undefined;
//     identificationType: string | undefined;
//     identificationNumber: string | undefined;
//     identificationDocument: FormData | undefined;
//     privacyConsent: boolean;
// }
  
declare type CreateTaskParams = {
    userId: string | null;
    task: string;
    description: string;
    assignTo: string;
    assignDate: Date | null;
    submissionDate: Date | null;
    status: string
    category: string
};

// declare type UpdateAppointmentParams = {
//     appointmentId: string;
//     userId: string;
//     appointment: Appointment;
//     type: string;
// };