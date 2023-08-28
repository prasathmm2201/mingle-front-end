import { config } from "../config";

  export const multiFileUpload = (data) => {
    return new Promise((resolve, reject) => {
      try {
        let uploaded_file =  URL.createObjectURL(data)
        resolve(uploaded_file)
      } catch (error) {
         reject(error)
      }
    });
  };
  export const getCoords = async () => {
    const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const lat = pos.coords.latitude;
    const long = pos.coords.longitude;

    const result = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${config.googleMapApiKey}&libraries=places`)
        .then(data => data.json())
        .then(({ results }) => {
            if (Array.isArray(results)) {
                const [info] = results;
                let city = info?.address_components?.find(comp => comp?.types?.includes("locality"));
                let location = info?.address_components?.find(comp => comp?.types?.includes("administrative_area_level_1"));
                let _obj = {};
                _obj["address"] = `${city?.long_name}, ${location?.long_name}`;
                _obj["latitude"] = lat;
                _obj["longitude"] = long;
                _obj["city"] = city?.long_name;
                _obj["location"] = location?.long_name;
                return (_obj)

            }
        }).catch((err) => {
            console.log(err);
            return null
        });

    return result
};

export const getTime=(date)=>{
  let d = new Date(date);
d = (d.getHours() > 12 ? d.getHours() - 12 : d.getHours())+':'+d.getMinutes()+' '+(d.getHours() >= 12 ? "PM" : "AM");

return d

}