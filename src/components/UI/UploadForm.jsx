import React from 'react'

const UploadForm = (props) => {
    return(
        <>
            <input type="file" className="form-control" name="file" onChange={props.onFileChange}/>
        </>
    )
}

export default UploadForm
