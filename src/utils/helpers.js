// helper functions
import url from "./URL";
export function flattenProducts(data) {
  return data.map(item => {
    // claudinary
    let image = item.image.url;
    // local setup
    //let image = `${url}${item.image.url}`;
    return { ...item, image };
  });
}

export function featuredProducts(data) {
  return data.filter(item => {
    return item.featured === true;
  });
}
