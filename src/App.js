import './App.css';
import React, {
  useState,
  useEffect
} from 'react'
import RegionTable from './components/RegionTable.js';
import AddRegion from './components/AddRegion.js';
import EditRegion from './components/EditRegion';

import axios from 'axios';
import qs from 'qs';

function App() {

  // get Regions and add it on the opening of the website 
  useEffect(() => {
    const getRegions = async () => {
      const res = await fetch('https://localhost:44382/Region/GetAll')
      const data = await res.json()
      setRegion(data)
    }
    getRegions();
  }, [])

  const addRegion = (Region) => {
    var data = qs.stringify({
      'Name': Region.Name
    });
    var config = {
      method: 'post',
      url: 'https://localhost:44382/Region/Add',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: data
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setRegion([...Regions, response.data])

      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  const OnDelete =(PK_RegionID) => { 
    var data = qs.stringify({
      'PK_RegionID': PK_RegionID
    });
    var config = {
      method: 'post',
      url: 'https://localhost:44382/Region/Delete',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: data
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setRegion(Regions.filter((Region) => Region.PK_RegionID !== PK_RegionID))

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const [Regions, setRegion] = useState([])
  // to know edit mode or Add Mode
  const [editing, setEditing] = useState(false)
  const initialRegion = { PK_RegionID: null, Name: '' }
  const [CurrentRegion, setCurrentRegion] = useState(initialRegion)

  const GetEditRegion = (Region) => {
    setEditing(true)
  
    setCurrentRegion({ PK_RegionID: Region.PK_RegionID, Name: Region.Name })
  }
  const UpdateRegion = (Region) => {
    var data = qs.stringify({
      'Name': Region.Name,
      'PK_RegionID': Region.PK_RegionID
    });
    var config = {
      method: 'post',
      url: 'https://localhost:44382/Region/Edit',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: data
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setRegion(Regions.map((Region) => (Region.PK_RegionID !== response.data.PK_RegionID ? Region : response.data)))
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  return (
    <div className="container ">
      <div className="flex-row">
        <div className="flex-large">
          <h2>Add Region</h2>
          {editing ?(
                    <EditRegion CurrentRegion ={CurrentRegion} setEditing = {setEditing} UpdateRegion={UpdateRegion} />
                    )
                    :
                    <AddRegion addRegion ={addRegion}/>
                  }

        </div>
        <div className="flex-large">
          <h2>View Regions</h2>
          <RegionTable Regions= {Regions} OnDelete={OnDelete} OnEdit={GetEditRegion} />
        </div>
      </div>
    </div>
  );
}

  export default App;