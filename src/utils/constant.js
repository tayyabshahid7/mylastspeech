// BASE URL
export const baseUrl = "http://127.0.0.1:8000/";
// export const baseUrl =1 "http://api.mylastspeech.com/";

export const registerURL = baseUrl + "api/v1/auth/registration/";
export const loginURL = baseUrl + "api/v1/auth/custom-login/";
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
export const updateCloseContactEmailUrl = baseUrl + "api/v1/update-close-contact/";
export const getUsersListUrl = baseUrl + "api/v1/retreive-mls-users/";
export const searchedUserSecuirtyQuestionUrl = baseUrl + "api/v1/retreive-user-security-questions/";
export const userAccessCheckUrl = baseUrl + "api/v1/user-access-check/";
export const getUserSpeechUrl = baseUrl + "api/v1/get-user-speech/";
export const checkSecurityQuestionUrl = baseUrl + "api/v1/check-security-question/";
export const changeNotificationSettingsUrl = baseUrl + "api/v1/change-notification-settings/";
export const getPaymentAccessTokenUrl = baseUrl + "api/v1/get-payment-token/";

export const spotifyAccessTokenUrl = "https://accounts.spotify.com/api/token";
export const spotifySongSearchUrl = "https://api.spotify.com/v1/search/";


