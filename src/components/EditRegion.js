import React, { useState} from 'react'

const EditRegion = ({UpdateRegion ,setEditing,CurrentRegion}) => {
    // init Data
    const [Region, setRegion] = useState(CurrentRegion)

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setRegion({ ...Region, [name]: value })
    }

    return (
        <form   
        onSubmit={event => {
            event.preventDefault()        
            UpdateRegion(Region)
          }}
          >
        <input  name="PK_RegionID" defaultValue={Region.PK_RegionID} hidden/>
        <label>Name</label>

        <input  
           type="text"
           name="Name"
           value={Region.Name}
           onChange={handleInputChange}
    />
        <button>Edit Region</button>
        <button
        onClick={() => setEditing(false)}
        className="button muted-button"
      >
        Cancel
      </button>
      </form>
    )
}

export default EditRegion
