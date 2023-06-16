import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import cities from './cities.json';
import { makeStyles } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import Apiconfigs from '../Apiconfig/Apiconfig';

const useStyles = makeStyles({
  table: {
    borderCollapse: 'collapse',
    width: '100%',
    border: '1px solid #ddd',
    backgroundColor: '#f2f2f2',
    marginTop:"2rem"
  },
  

})
const Polygon = () => {

  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchdata, setSearchdata] = useState('');

  const [countryCoordinates, setCountryCoordinates] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [mapZoom, setMapZoom] = useState(2);
  let latitude='';
  let longitute='';
  const handleSearch = () => {
    
let findCountry = cities.find((obj)=>
obj.name ==searchQuery)
if(findCountry){
 latitude = findCountry.latitude;
 longitute = findCountry.longitude;
console.log(latitude,'latitude')
setSearchdata([findCountry.name,findCountry.latitude,findCountry.longitude])
console.log(searchdata,'searchdatra')
}
console.log(latitude,'latitude----------')
    const newCoordinates = { lat: latitude, lng: longitute };
    setCountryCoordinates(newCoordinates);
    console.log(countryCoordinates,'findCountry.latitude----------')
    setMapCenter(newCoordinates);
    setMapZoom(12);
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
const[details,setDetails]= useState();
console.log(details)
  const getdetailsOfCountry= async ()=>{
    try{
      const res = await axios({
method:'POST',
url:Apiconfigs.getCountrydetails,
data:{
  country:searchQuery
}
      })
      if(res.error === 'false'){
        setDetails(res.data)
      }
    }
    catch(error){
      console.log(error)
    }
  }
  const [selectedLocation, setSelectedLocation] = useState(null);




  //for click map and get marker with coordinates
  const handleMapClick = (event) => {
    // console.log(event,'event')
    const { lat, lng } = event;
    console.log(lat,'event-')
    const clickedLocation = cities.find((location) => location.latitude == lat && location.longitude == lng);
console.log('condition',cities.find((location) => location.latitude == lat && location.longitude == lng))
// console.log(cities.latitude,'clicked')
    if (clickedLocation) {
      setSelectedLocation(clickedLocation);
    console.log(selectedLocation,'cdewdewdewdew')
    }
  };



  


  return (
    <div>
     <div style={{marginTop:"1rem", marginBottom:"2rem"}}>
     <input
        type="text"
        placeholder="Search for a country..."
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>

      <TableContainer component={Paper} style={{width:"50%", marginTop:"2rem"}}>
      <Table>
        <TableHead  className={classes.table}>
          <TableRow>
            <TableCell>Country</TableCell>
            
            <TableCell>Latitude</TableCell>
            <TableCell>Longitude</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         
            <TableRow >
              <TableCell>{searchdata[0]}</TableCell>
             
              <TableCell>{searchdata[1]}</TableCell>
              <TableCell>{searchdata[2]}</TableCell>
            </TableRow>
        
        </TableBody>
      </Table>
    </TableContainer>
      
     </div>

      <div style={{ height: '600px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDzyw5KWbJbWeZjpEGKybR8aIcNKlGiuts' }}
          center={mapCenter}
          zoom={mapZoom}
          onClick={handleMapClick}
        >


          {countryCoordinates && (
            <Polygon
            paths={{countryCoordinates}}
            options={{
              fillColor: '#FF0000',
              fillOpacity: 0.35,
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 2,
            }}
          />
           
          )}
          {selectedLocation && (
          <Marker lat={selectedLocation.latitude} lng={selectedLocation.longitude} />
        )}
        </GoogleMapReact>
       
      </div>
    </div>
  );
};

const Marker = ({ lat, lng }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: lat,
        left: lng,
        width: '20px',
        height: '20px',
        background: 'red',
        borderRadius: '50%',
        cursor: 'pointer',
      }}
    />
  );
};



export default Polygon;