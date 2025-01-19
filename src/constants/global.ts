const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const monthsOptions = months.map((month) => ({
  label: month,
  value: month,
}));

export const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const bloodGroupOptions = bloodGroups.map((group) => ({
  label: group,
  value: group,
}));
