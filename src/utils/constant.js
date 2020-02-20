// BASE URL
 export const baseUrl = "http://127.0.0.1:8000/";
// export const baseUrl = "http://13.58.231.218/";

export const registerURL = baseUrl + "api/v1/auth/registration/";
export const loginURL = baseUrl + "api/v1/auth/login/";
export const passwordResetUrl = baseUrl + "api/v1/auth/password/reset/";
export const passwordResetConfirmUrl = baseUrl + "api/v1/auth/password/reset/confirm/";

export const confirmCodeUrl = baseUrl + "api/v1/auth/registration/verify-email/";
export const resendCodeUrl = baseUrl + "api/v1/auth/send-confirmation-email/";
export const passwordChangeUrl = baseUrl + "api/v1/auth/password/change/";
export const logoutUrl = baseUrl + "api/v1/auth/logout/";
export const deleteAccountUrl = baseUrl + "api/v1/delete-account/";

export const secuirtyQuestionUrl = baseUrl + "api/v1/security-questions/";
export const closeContactsUrl = baseUrl + "api/v1/close-contacts/";
export const updateProfileUrl = baseUrl + "api/v1/update-profile/";
export const addRetrieveSpeechUrl = baseUrl + "api/v1/speech/";






