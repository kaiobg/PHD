export const updateCSSVar = (name, value) => {
  document.documentElement.style.setProperty(name, value);
};

export const invertLikertScaleValue = (value) => {
  return 6 - value;
};
