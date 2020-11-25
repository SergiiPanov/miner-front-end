import React from "react";
import ComposedComponent from "../../../../utils/requireAuth"

export default ComposedComponent(({children}) => {
    return(
        <div>{children}</div>
    )
})