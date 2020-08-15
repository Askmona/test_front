export default {
  color: {
    primary: "#2C2E7B",
    secondary: "#E66E6E",
  }
}

export const breakpoints = {
  xl: '1440px',
  l: '1170px',
  special: '930px',
  m: '768px',
  s: '490px',
  xs: '375px',
};

export const mediaQueries = key => {
  return style => `@media only screen and (max-width: ${breakpoints[key]}) { ${style} }`
};
