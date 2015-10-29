// Based on http://stackoverflow.com/questions/11582512/how-to-get-url-parameters-with-javascript
exports.getURLParameter = function (urlString, name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(urlString)||[,""])[1].replace(/\+/g, '%20'))||null
}

exports.getSubURI = function (urlString) {
  return (new RegExp('/([^/&\?]+)').exec(urlString)||[,""])[1]||null
}