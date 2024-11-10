import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import HomePage from './HomePage.jsx';
import ListingPage from './ListingPage.jsx';
import SearchPage from './SearchPage.jsx';
import LoginPage from './LoginPage.jsx';
import SignUpPage from './SignUpPage.jsx';
import ListYourProperty from './ListYourProperty.jsx';
import Contact from './Contact.jsx';
import Terms from './Terms.jsx';
import Aboutus from './Aboutus.jsx';
import PropertyList from './PropertyList.jsx';
import './App.css';
import PrivacyPolicy from './PrivacyPolicy.jsx';

// import Axios from "axios"
function App() {
  // console.log("hello");
  
  // let getData=async ()=>{
  //   let response=await Axios.get("http://localhost:1026/data")
  //   console.log(response);
    
  //   useEffect(()=>{
  //     getData()
  //   })
  //       }
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/listing/:id" element={<ListingPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/list-your-property" element={<ListYourProperty />} />
            <Route path='/about' element={<Aboutus/>}></Route>
            <Route path='/privacy' element={<PrivacyPolicy/>}></Route>
            <Route path='/contact' element={<Contact/>}></Route>
            <Route path='/terms' element={<Terms/>}></Route>
            <Route path="/properties" element={<PropertyList />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App;

// import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import Axios from "axios"

// function App() {
//   const [data, setData] = useState("loading") 

//   let getData = async () => {
//     try {
//       let response = await Axios.get("http://localhost:1026/data")
//       console.log(response.data)
//       setData(response.data) 
//     } catch (error) {
//       console.error("Error fetching data:", error)
//       setData("Error loading data") 
//     }
//   }

//   useEffect(() => {
//     getData() 
//   }, []) 

//   return (
//     <>
//       {data}
//     </>
//   )
// }

// export default App
