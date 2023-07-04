import React from 'react';
import { Container} from '@material-ui/core';

import { BrowserRouter,  Routes, Route, Navigate } from 'react-router-dom';
import Home from './component/Home/Home';
import Auth from './component/Auth/Auth';
import PostDetails from './component/PostDetails/PostDetails';
import Verify from './component/Verify/Verify';
import Reset from './component/Reset/Reset'
import Forgot from './component/ForgotPass/Forgot'

const App =() => {
    const user = JSON.parse(localStorage.getItem('profile'));

    return (
      <BrowserRouter>
        <Container maxidth="xl">
            
                <Routes>
                    <Route path="/" element={<Navigate to="/posts" />} />
                    <Route path="/posts/:id" element={<Home />} />
                    <Route path="/posts" element={<Home />} />
                    <Route path="/posts/search" element={<Home />} />
                    <Route path="/posts/get/:id" element={<PostDetails />} />
                    <Route
                        path="/auth"
                        element={!user ? <Auth /> : <Navigate to="/posts" />}
                    />
                    <Route path='/verify' element= {<Verify />}/>
                    <Route path='/reset/:token' element= {<Reset />}/>
                    <Route path='/reset' element= {<Forgot />}/>
                </Routes>
           
        </Container>
       </BrowserRouter>  
    )
}

export default App;