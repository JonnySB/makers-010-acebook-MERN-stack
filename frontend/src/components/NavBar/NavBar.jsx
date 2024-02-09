import React, { useState } from 'react';
import logo from '../../assets/acebookLogo.svg';
import searchIcon from '../../assets/searchIcon.svg';
import notifications from '../../assets/notifications.svg';
import logoOut from  '../../assets/logOut.svg';
import { Link } from 'react-router-dom';

const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/dapj3ww2j/image/upload/profile/";



const NavBar = (props) => {

    const [showSearchBar, setShowSearchBar] = useState(false);


    const toggleShowSearchBar = (e) => {
        setShowSearchBar((prev) => !prev);
    }
    return (
        <>
            <nav className="sticky top-0 bg-white border-gray-200 dark:bg-gray-900 ">
                <div className=" flex flex-wrap justify-between mx-auto p-2 shadow-md">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer">
                        <img src={logo} className="h-10 md:h-10" alt="Acebook Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
                        <button onClick={toggleShowSearchBar} className="p-2 rounded-full bg-gray-100 ">
                            <img src={searchIcon} className="h-6 md:h-6 md:w-auto cursor-pointer" alt="notification" />
                        </button>
                        {showSearchBar && (
                            <input
                            className="bg-gray rounded-md text-m focus:outline-none "
                            type="search" name="search" placeholder="Search Acebook"/>
                        )}
                    </div>
                    <div role='feed-page' className="items-center justify-center md:w-auto cursor-pointer" id="navbar-user">
                        
                        <Link to='/posts'>
                            <div className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                                <svg 
                                    viewBox="0 0 24 24" 
                                    width="24" height="24" 
                                    fill="currentColor" 
                                    className='fill-[#0079FC]'
                                    >
                                    <path d="M9.464 1.286C10.294.803 11.092.5 12 .5c.908 0 1.707.303 2.537.786.795.462 1.7 1.142 2.815 1.977l2.232 1.675c1.391 1.042 2.359 1.766 2.888 2.826.53 1.059.53 2.268.528 4.006v4.3c0 1.355 0 2.471-.119 3.355-.124.928-.396 1.747-1.052 2.403-.657.657-1.476.928-2.404 1.053-.884.119-2 .119-3.354.119H7.93c-1.354 0-2.471 0-3.355-.119-.928-.125-1.747-.396-2.403-1.053-.656-.656-.928-1.475-1.053-2.403C1 18.541 1 17.425 1 16.07v-4.3c0-1.738-.002-2.947.528-4.006.53-1.06 1.497-1.784 2.888-2.826L6.65 3.263c1.114-.835 2.02-1.515 2.815-1.977zM10.5 13A1.5 1.5 0 0 0 9 14.5V21h6v-6.5a1.5 1.5 0 0 0-1.5-1.5h-3z"></path>
                                </svg>
                            </div>
                        </Link>
                    </div>
                    
                    <div className="flex items-center md:order-2 space-x-3 md:space-x-4 rtl:space-x-reverse">
                        <div className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300">
                            <img src={notifications} className="h-6 md:h-6 md:w-auto" alt="notification" />
                            <span className="absolute -mt-8 ml-5 rounded-full bg-danger px-[0.70em] py-[0.35em] text-[0.6rem] font-bold leading-none bg-red-500 text-white">
                                1
                            </span>
                        </div>
                        <div role='profile-page' className="bg-gray-200 border-slate-800 hover:bg-gray-300 hover:fill-[#EBEBEB] rounded-full cursor-pointer">
                            <Link aria-label='test' to={`/profile/${props.userID}`} >
                            {/* <svg
                                fill="currentColor"
                                viewBox="0 0 16 16"
                                height="1.5em"
                                width="1.5em"
                                className='fill-[#ffffff]'
                                >
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 100-6 3 3 0 000 6z" />
                            </svg> */}
                            <img className="object-fill h-9 w-9" src={CLOUDINARY_BASE_URL + props.userID + '.png'} />

                            </Link>
                            
                        </div>
                        <button onClick={props.handleLogout} role='logout-button' className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full cursor-pointer" >
                            {/* <Link to='/'> */}
                                <img src={logoOut} className="h-6 md:h-6 md:w-auto" alt="notification" />
                            {/* </Link> */}
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default NavBar;