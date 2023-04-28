import React from 'react'
import Add_Complain from '../../../Components/client_comps/Add_Complain/Add_Complain'
import View_All_Complain from '../../../Components/admin_comps/view_complain/View_complain'
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Complain = () => {
  return (
    <div>   
      <View_All_Complain />
      
    </div>
  )
}

export default Complain
