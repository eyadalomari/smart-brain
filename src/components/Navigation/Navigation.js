import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
    
        if(isSignedIn){
            return (
                <nav style={{display: 'flex', justifyContent: 'flex-end'}} className=''>
                    <p onClick={() => onRouteChange('signout')} className='f3 link dim blak underline pa3 pointer'>Sign out</p>
                </nav>
            );
        } else{
            return (
                <nav style={{display: 'flex', justifyContent: 'flex-end'}} className=''>
                    <p onClick={() => onRouteChange('signin')} className='f3 link dim blak underline pa3 pointer'>Sign In</p>
                    <p onClick={() => onRouteChange('register')} className='f3 link dim blak underline pa3 pointer'>Register</p>
                </nav>
            );
        }
        
    
}

export default Navigation;