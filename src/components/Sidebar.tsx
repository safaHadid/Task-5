import { useState, useRef, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLElement | null>(null);
  const [activeLink, setActiveLink] = useState('Products');

  const navigate = useNavigate();

  const hundleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/signin");
}

  const links = [
    { id: 1, name: 'Products', icon: '/assets/Vector.svg' , link: '/'},
    { id: 2, name: 'Favorites', icon: '/assets/bookmark.svg' },
    { id: 3, name: 'Order List', icon: '/assets/bookmark.svg' },
  ];

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event: Event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };


  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <button 
        onClick={toggleSidebar} 
        aria-controls="default-sidebar" 
        type="button" 
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg 
          className="w-6 h-6" 
          aria-hidden="true" 
          fill="currentColor" 
          viewBox="0 0 20 20" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            clipRule="evenodd" 
            fillRule="evenodd" 
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>

      <aside 
        ref={sidebarRef} 
        id="default-sidebar" 
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0 bg-custom-bg`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto relative">
          <ul className="space-y-2 font-medium">
            <li>
                <div className="flex justify-center items-center my-5">
                <img src="/assets/Logo.png" alt="Logo" className="w-[97.23px] h-auto" />
                </div>
            </li>
            <li>
            <div className="flex flex-col justify-center items-center my-5">
                <img src="/assets/profile.png" alt="" className="rounded-full mt-5 w-[140px] h-auto" />
                <p className="font-montserrat mt-4 text-[17px] font-bold leading-[20.72px] text-left">
                    {localStorage.getItem("firstName")} {localStorage.getItem("lastName")}
                </p>
            </div>
            </li>
            <li>
            <div className="flex flex-col justify-center items-center mt-[50px]">
                {links.map(link => (
                    <div 
                    key={link.id} 
                    className={`flex justify-center items-center p-[12px] px-[45px] rounded my-2 cursor-pointer 
                        ${activeLink === link.name ? 'bg-[#FEAF00]' : ''}`} 
                    onClick={() => setActiveLink(link.name)}
                    >
                    <img src={link.icon} alt={link.name} className='mr-3' />
                    <p className='text-[14px]'>{link.name}</p>
                    </div>
                ))}
                </div>
            </li>
            <li>
            <div className="absolute left-1/2 transform -translate-x-1/2 my-8 flex justify-center items-center bottom-0 hover:cursor-pointer" onClick={hundleLogOut}>
                <p>logout</p>
                <img src="/assets/logout.svg" alt="" className='ml-5'/>
            </div>

            </li>
          </ul>
        </div>
      </aside>
      <div className="p-4 sm:ml-64">
         <Outlet /> 
      </div>
    </div>

  );
};

export default Sidebar;


