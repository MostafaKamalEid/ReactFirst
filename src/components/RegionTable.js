const RegionTable = ({Regions,OnDelete,OnEdit}) => {

    return (
<table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
    {
      Regions.length > 0 ? 
        Regions.map((Region) =>
          <tr key={Region.PK_RegionID}>
          <td>{Region.Name}</td>
          <td>
            <button className="button muted-button" onClick={()=>OnEdit(Region)}>Edit</button>
            <button className="button muted-button" onClick={()=>OnDelete(Region.PK_RegionID)}>Delete</button>
          </td>
        </tr>


        ):
        <tr>       
           <td>nothing</td> 
        </tr>
        
      }

      
    </tbody>
  </table>
    )
}
export default RegionTable
