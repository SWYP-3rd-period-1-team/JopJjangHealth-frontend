export const findPasswordUrl = '/api/members/find-password';
export const findIdUrl = '/api/members/find-id';
export const fetchHospitalInfoUrl ='/api/hospitals/members/bookmarks'
export const fetchHospitalDeleteInfoUrl = (hospitalId:string) => `/api/hospitals/${hospitalId}/bookmarks`
export const changePasswordUrl = '/api/members/change-password';
export const fetchDiseaseListUrl = '/api/survey/list'
export const fetchDiseaseListDeleteUrl = (surveyId:number) => `/api/survey/delete/${surveyId}`;
export const changeUserProfileImageUrl = '/api/profile/update'
export const uploadProfileImageUrl = '/api/profile/upload'
export const deleteUserProfileImageUrl = '/api/profile/delete'
export const fetchUserInfoUrl ='/api/members/my-page';
export const changeUserNicknameUrl = '/api/members/change-nickname'
export const sendEmailVerificationForMyPageUrl = `/api/members/verify-email`;
export const saveHealthSurveyUrl ='/api/survey/save';
export const signUpUrl ='/api/members/join';
export const loginUrl ='/login';
export const sendEmailVerificationUrl = (email:string) => `/api/emails/verification-requests?email=${email}`
export const verifyEmailCodeUrl = (email: string, code: string) => `/api/emails/verifications?email=${email}&code=${code}`
export const logoutUrl = `/api/members/logout`
