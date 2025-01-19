export const semesterOptions = [
  { label: "Fall", value: "01" },
  { label: "Spring", value: "02" },
  { label: "Summer", value: "03" },
];

const currentYear = new Date().getFullYear();

export const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  label: String(currentYear + number),
  value: String(currentYear + number),
}));
