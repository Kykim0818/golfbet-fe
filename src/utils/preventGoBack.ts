export function preventGoBack() {
  // change start
  window.history.pushState(null, "", window.location.href);
  // change end
  console.log("prevent go back!");
}
