export const updateCSSVar = (name, value) => {
  document.documentElement.style.setProperty(name, value);
};
