// import React, { useState } from "react";
// import "./styles.css";
// import cities from './cities.json';
// import GoogleMapReact from "google-map-react";
// import MyMarker from "./MyMarker";

// // implementation of this function is needed for codesandbox example to work
// // you can remove it otherwise
// const distanceToMouse = (pt, mp) => {
//   if (pt && mp) {
//     // return distance between the marker and mouse pointer
//     return Math.sqrt(
//       (pt.x - mp.x) * (pt.x - mp.x) + (pt.y - mp.y) * (pt.y - mp.y)
//     );
//   }
// };

// // const points = [
// //   { id: 1, title: "Round Pond", lat: 51.506, lng: -0.184 },
// //   { id: 2, title: "The Long Water", lat: 51.508, lng: -0.175 },
// //   { id: 3, title: "The Serpentine", lat: 51.505, lng: -0.164 }
// // ];



// export default function Polygon() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [countryCoordinates, setCountryCoordinates] = useState([0, 0]);
//   const [mapZoom, setMapZoom] = useState(2);
//   let latitude;
//   let longitute;
//   const handleSearch = () => {
    
// let findCountry = cities.find((obj)=>
// obj.name ==searchQuery)
// if(findCountry){
//  latitude = findCountry.lat;
//  longitute = findCountry.lng;
// console.log(latitude,'latitude')
// }

//     // // Example data - Paris, France
//     setCountryCoordinates({latitude, longitute});
//     setMapZoom(12);
//     console.log(countryCoordinates.latitude,'latitude')
//   };

//   const handleInputChange = (event) => {
//     setSearchQuery(event.target.value);
//   };
//   return (
//     <div className="App">
//        <input
//         type="text"
//         placeholder="Search for a country..."
//         value={searchQuery}
//         onChange={handleInputChange}
//       />
//       <button onClick={handleSearch}>Search</button>
//       <GoogleMapReact
//         bootstrapURLKeys={{
//           // remove the key if you want to fork
//           key: "AIzaSyDzyw5KWbJbWeZjpEGKybR8aIcNKlGiuts",
//           language: "en",
//           region: "US"
//         }}
//         defaultCenter={{countryCoordinates}}
//         defaultZoom={mapZoom}
//         distanceToMouse={distanceToMouse}
//       >
//            {countryCoordinates && (
//             <div
//               lat={countryCoordinates.latitude}
//               lng={countryCoordinates.longitute}
//               style={{
//                 color: 'red',
//                 width: '10px',
//                 height: '10px',
//                 borderRadius: '50%',
//                 backgroundColor: 'red',
//               }}
//             />
//           )}
//         {/* {cities.map(({ lat, lng, name, title }) => {
//           return (
//             <MyMarker key={name} lat={lat} lng={lng} text={name} tooltip={title} />
//           );
//         })} */}
//       </GoogleMapReact>
//     </div>
//   );
// }

import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import cities from './cities.json';
const Polygon = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [countryCoordinates, setCountryCoordinates] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [mapZoom, setMapZoom] = useState(2);
  let latitude='';
  let longitute='';
  const handleSearch = () => {
    
let findCountry = cities.find((obj)=>
obj.country ==searchQuery)
if(findCountry){
 latitude = findCountry.latitude;
 longitute = findCountry.longitute;
console.log(latitude,'latitude')
}
console.log(latitude,'latitude----------')
    const newCoordinates = { lat: latitude, lng: longitute };
    setCountryCoordinates(newCoordinates);
    console.log(findCountry.latitude,'findCountry.latitude----------')
    setMapCenter(newCoordinates);
    setMapZoom(12);
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>

      <div style={{ height: '400px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDzyw5KWbJbWeZjpEGKybR8aIcNKlGiuts' }}
          center={mapCenter}
          zoom={mapZoom}
        >
          {countryCoordinates && (
            <div
              lat={countryCoordinates.lat}
              lng={countryCoordinates.lng}
              style={{
                color: 'red',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: 'red',
              }}
            />
          )}
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default Polygon;

