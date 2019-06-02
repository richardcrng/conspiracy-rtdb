import React from 'react'
import classes from './CentreBottom.module.css'

function CentreBottom({ children }) {
  return (
    <div className={classes.CentreBottom}>
      {children}
    </div>
  )
}

export default CentreBottom;