// import React, { useEffect, useState, useContext, createContext } from 'react';
// import { Typography, Card, CardContent } from '@material-ui/core';
// import { AuthContext } from '../../AuthProvider';
// import axios from 'axios';
// import jwt_decode from 'jwt-decode';
// import ProductItem from '../amenitiesComponent/ProductItem';

// function HomePage() {
//   let authPayload = useContext(AuthContext);
//   const decoded = jwt_decode(authPayload.token);
//   const Id = decoded.id;
//   const state = createContext();
//   const [cart, setCart] = useState([]);
//   const styles = `
//     .app-bar {
//       background-color: #333;
//     }
//     .card {
//       max-width: 600px;
//       padding: 1rem;
//       background-color: #f2f2f2;
//     }
//     .card-title {
//       margin-bottom: 1rem;
//       color: #333;
//     }
//     .card-body {
//       color: #555;
//     }
//     .content {
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       height: calc(100vh - 64px);
//     }
//     .slideshowContainer: {
//       alignItems: 'center',
//       justifyContent: 'center',
//       maxWidth: '80%',
//       marginTop: '4%',
//       marginLeft:'10%',
//       placeItems: 'center',
      
//     }
//     .slide: {
      
//       height: '600px',
//       backgroundSize: 'cover',
//       backgroundPosition: 'center',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       color: 'rgba(255,255,255, 0.6)', 
//       fontSize: '48px',
//       fontWeight: 'bold',
//       textShadow: '2px 2px 4px #000000',
//     }
    
//   `;

//   const calcTotal = () => {
//     let total = 0;
//     if (cart && Array.isArray(cart)) 
//     {
//        cart.forEach((item) => { total += item.fee; });
//        }
    
//     return `Total: Rs.${total}`;
//   };
//   // const calcTotal = () => {
//   //   let total = 0;
   
//   //   if (total === 0) {
//   //     return 'empty';
//   //   } else {
//   //     cart.forEach(item => {
//   //       total += item.fee;
//   //     });
//   //     return `Total: Rs.${total}`;
      
//   //   }
//   // };

//   console.log(calcTotal());
//   const inCart = true;
//   useEffect(() => {
//     const getCart = async () => {
//       const res = await axios.get(`/customer/getCart?id=${Id}`);
//       setCart(res.data);
//     };

//     getCart();
//   }, [Id]);

//   return (
//     <div>
//       <div className="content">
//         <Card className="card">
//           <CardContent>
//             <Typography variant="h5" component="h2" className="card-title">
//               Welcome to Wescott Apartment Web Site
//             </Typography>
//           </CardContent>
//         </Card>
//         {calcTotal()}
//       </div>
//       {cart && cart.length ? (
//         <div className="products">
//           {cart.map(product => {
//             return (
//               <ProductItem
//                 key={product._id}
//                 product={product}
//                 state={state}
//                 inCart={inCart}
//               />
//             );
//           })}
//         </div>
//       ) : (
//         <h3>You can add amenities to this page</h3>
//       )}
//     </div>
//   );
// }

// export default HomePage;
import React, { useEffect, useState, useContext, createContext } from 'react';
import { Typography, Card, CardContent } from '@material-ui/core';
import { AuthContext } from '../../AuthProvider';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import ProductItem from '../amenitiesComponent/ProductItem';

export default function HomePage() {
  let authPayload = useContext(AuthContext);
  const decoded = jwt_decode(authPayload.token);
  const Id = decoded.id;
  const state = createContext();
  const [cart, setCart] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [greeting, setGreeting] = useState('');

  const styles = `
    .app-bar {
      background-color: #333;
    }
    .card {
      max-width: 100%;
      padding: 1rem;
      background-color: #f2f2f2;
    }
    .card-title {
      margin-bottom: 1rem;
      color: #333;
    }
    .card-body {
      color: #555;
    }
    .content {
      display: flex;
      justify-content: center;
      align-items: center;
      height: calc(100vh - 64px);
    }
    .slideshowContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      maxWidth: '80%',
      marginTop: '4%',
      marginLeft:'10%',
      placeItems: 'center',
      
    }
    .slide: {
      
      height: '600px',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'rgba(255,255,255, 0.6)', 
      fontSize: '48px',
      fontWeight: 'bold',
      textShadow: '2px 2px 4px #000000',
    }
    
  `;


  const calcTotal = () => {
    let total = 0;
    if (cart && Array.isArray(cart)) {
      cart.forEach((item) => {
        total += item.fee;
      });
    }

    return (
      <Typography variant="h6" component="p" style={{ color: 'green',fontWeight:'bold'}} >
        Total: Rs.{total}
      </Typography>
    );
  };

  const inCart = true;
  useEffect(() => {
    const getCart = async () => {
      const res = await axios.get(`/customer/getCart?id=${Id}`);
      setCart(res.data);
    
    }
  })

  // const calcTotal = () => {
  //   let total = 0;
  //  cart.forEach(item => {
  //     total += item.fee;
  //   }); 
  //   return total;
  // };
  // const calcTotal = () => {
  //   let total = 0;
  //   cart.forEach(item => {
  //     total += item.fee;
  //   });
  
  //   if (total === 0) {
  //     return 'Empty';
  //   } else {
  //     return `Total: Rs.${total}`;
  //   }
  // };

  // console.log(calcTotal());
  // const inCart = true;
  // useEffect(() => {
  //   const getCart = async () => {
  //     const res = await axios.get(`/customer/getCart?id=${Id}`);
  //     setCart(res.data);
  //   };


  //   getCart();
  // }, [Id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/customer/getCustomer/${Id}`);

        const cus = data.customerModle;
       
        
        setCustomer(cus);
      } catch (error) {
        console.log('Error fetching customer data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentDateTime(now.toLocaleString());
      const currentHour = now.getHours();

      if (currentHour >= 5 && currentHour < 12) {
        setGreeting('Good Morning !');
      } else if (currentHour >= 12 && currentHour < 17) {
        setGreeting('Good Afternoon !');
      } else {
        setGreeting('Good Evening !');
      }
    }, 1000); // Update every 1 second

    return () => {
      clearInterval(interval);
    };
  }, []);


  return (
    <div>
      <div className="content">
       
        
        <Card className="card" style={{display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CardContent>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center',padding:'10px' }}>
              <Typography variant="h5" component="h2" className="card-title" style={{alignItems: 'center', justifyContent: 'center',paddingLeft:'340px'}}>
                  Welcome to Wescott Apartment Web Site          
              </Typography> 
              
                <Typography variant="h5" component="h2" className="card-title" style={{flexDirection:'row',alignItems:'end',justifyContent:'end',paddingLeft:'100px'}}>
                  {currentDateTime}
                </Typography>
              
            </div>

           <Typography variant="h5" component="h2" className="card-title" style={{display: 'flex', alignItems: 'center', justifyContent: 'center',padding:'10px' , fontWeight:'bold' }}>
         
                {greeting} {customer.name}

            </Typography>

          </CardContent>
        </Card>
        {/* {calcTotal()} */}
      </div>
      {cart && cart.length ? (
        <div className="products">
          {cart.map((product) => {
            return (
              <ProductItem
                key={product._id}
                product={product}
                state={state}
                //inCart={inCart}
              />
            );
          })}
        </div>
      ) : (
        <h3>You can add amenities to this page</h3>
      )}
    </div>
  );
}


