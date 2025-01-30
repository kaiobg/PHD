export const updateCSSVar = (name, value) => {
  document.documentElement.style.setProperty(name, value);
};

export const invertLikertScaleValue = (value) => {
  return 6 - value;
};

export const isMoreThanThreeMonths = (date1, date2) => {
  const THREE_MONTHS_MS = 1000 * 60 * 60 * 24 * 30 * 3;
  return Math.abs(date1 - date2) > THREE_MONTHS_MS;
};

export const showLoading = () => {
  document.querySelector('#loading').classList.remove('display-none');
};

export const hideLoading = () => {
  document.querySelector('#loading').classList.add('display-none');
};
