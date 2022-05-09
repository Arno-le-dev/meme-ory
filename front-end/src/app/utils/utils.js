export function parseUrl() {
    let url = window.location;
    let query = url.href.split("?")[1] || "";
    const delimiter = "&";
    let result = {};
  
    var parts = query.split(delimiter);
  
    return parts
      .map((items) => {
        return items.split("=");
      })
      .reduce((result, kv) => {
        result[kv[0]] = kv[1];
        return result;
      }, {})
  }