const toTitleCase = str => {
  str = str.replace(/_/g, " ").toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
  }
  return str.join(' ');
}

export default toTitleCase;