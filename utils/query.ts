function buildQueryString(params: any) {
  const urlParams = new URLSearchParams();
  if (params) {
    Object.keys(params).forEach((key) => {
      urlParams.append(key, params[key]);
    });
  }
  return urlParams.toString();
}
export default buildQueryString;
