// Hack to temporary fix google-maps-react `Cannot read property 'setMap' of undefined` error
// https://github.com/fullstackreact/google-maps-react/issues/59#issuecomment-272813058
// Remove when https://github.com/fullstackreact/google-maps-react/issues/69 is solved

export const camelize = function(str) {
  return str.split(' ').map(function(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join('');
}
