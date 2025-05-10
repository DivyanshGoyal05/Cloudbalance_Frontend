export const saveIamRoleInfo = (data) => {
 
  const payload = {
    roleARN: data.roleARN?.trim() || '',
    accountName: data.accountName?.trim() || '',
    accountId: data.accountId?.trim() || ''
  };

  return {
    type: 'SAVE_IAM_ROLE_INFO',
    payload
  };
};

export const completeOnboarding = (responseData) => ({
  type: 'COMPLETE_ONBOARDING',
  payload: responseData
});



export const clearOnboardingData = () => ({
  type: "CLEAR_ONBOARDING_DATA",
});
