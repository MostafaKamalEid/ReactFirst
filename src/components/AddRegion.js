import React, { useState} from 'react'



const AddRegion = ({addRegion}) => {
    // init Data
    const initialRegion = { PK_RegionID: null, Name: '' }
    const [Region, setRegion] = useState(initialRegion)

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setRegion({ ...Region, [name]: value })
    }
    return (
        <form   
        onSubmit={event => {
            event.preventDefault()        
            addRegion(Region)
            setRegion(initialRegion)

          }}
          >
        <input hidden name="PK_RegionID"/>
        <label>Name</label>

        <input  
           type="text"
           name="Name"
           value={Region.Name}
           onChange={handleInputChange}
    />
        <button>Add new Region</button>
      </form>
    )
}

export default AddRegion
