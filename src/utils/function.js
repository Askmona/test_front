/**
 * Check if website data from API is a good like or not
 * @param {web} string data from API: sitweb
 * @return {bool} Return true if the string contains no text and is a valid link
 */
export const checkIfLink = web => {
  if(web !== undefined) {
    const isLink = (web.includes('https://') || web.includes('www.') || web.includes('https')) && web.indexOf(' ') === -1;;

    return isLink;
  }
};

/**
 * Check if website data from API contains http or https
 * @param {web} string data from API: sitweb
 * @return {string} Return a correct link
 */
export const checkIfGoodLink = web => {
  if (web !== undefined){
    return web.includes('http://') || web.includes('https://')? web : 'http://'+web;
  }
}