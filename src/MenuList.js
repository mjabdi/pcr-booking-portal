
import HomeIcon from '@material-ui/icons/Home';

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import ColorizeIcon from '@material-ui/icons/Colorize';
import TodayIcon from '@material-ui/icons/Today';

import BookingsPreview from './BookingsPreview';
import ChangePassword from './ChangePassword';
import DashboardPreview from './DashboardPreview';


import NewBooking from './NewBooking';





export const MenuList = [
    {index: 0, id:`home`, title: `Home`, icon : <HomeIcon style={{fontSize:"1.9rem"}}/>}, 
    {index: 1, id:`booknewtest`, title: `Book a New Appointment`, icon : <TodayIcon style={{fontSize:"1.9rem"}}/>}, 
    {index: 2, id:`mytests`, title: `My Appointments`, icon : <ColorizeIcon style={{fontSize:"1.9rem"}}/>},
    {index: 3, id:`changepassword`, title: `Change Password` , icon : <LockOutlinedIcon style={{fontSize:"1.9rem"}}/>},

  ];

  export const getMenuContent = (index) =>
  {
      switch (index) {
        case 0:
          return <DashboardPreview/>;
        case 1:
          return <NewBooking/>;
        case 2:
          return <BookingsPreview />;
        case 3:
          return <ChangePassword/>;
        default:
          return `Page Not Found!`;
      }   
  }

  export const getMenuId = (index) =>
  {
      for (var i=0; i < MenuList.length; i++)
      {
          if (MenuList[i].index === index)
          {
              return MenuList[i].id;
          }
      }

      return (`Page Not Found!`); 
  }



  export const getMenuIndex = (id) =>
  {
      for (var i=0; i < MenuList.length; i++)
      {
          if (MenuList[i].id === id)
          {
              return MenuList[i].index;
          }
      }

      return -1;
  }




