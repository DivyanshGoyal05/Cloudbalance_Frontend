export const saveIamRoleInfo = (data) => {
  // Validate data before dispatching
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

// export const resetOnboarding = () => ({
//   type: 'RESET_ONBOARDING'
// });

export const clearOnboardingData = () => ({
  type: "CLEAR_ONBOARDING_DATA",
});
