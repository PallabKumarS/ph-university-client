export const semesterRegistrationStatus = ["UPCOMING", "ONGOING", "ENDED"];

export const RegistrationStatusOptions = semesterRegistrationStatus.map(
  (status) => ({
    label: status.charAt(0).toUpperCase() + status.slice(1).toLowerCase(),
    value: status,
  })
);
