import React, { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IconContext } from 'react-icons';
import { FaShoppingBasket } from 'react-icons/fa'; // Import the shopping basket icon
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import Submenu from './Submenu';
import { useCount } from '../Pages/Orders/CountContext'; 
const Nav = styled.div`
    display: flex;
    justify-content: space-between; /* Adjust as per your layout */
    align-items: center;
    height: 3rem;
    background-color: #94a3b8;
    padding: 0 1rem; 
`;

const SidebarNav = styled.div<{ sidebar: boolean }>`
    width: 250px;
    height: 100vh;
    background-color: #94a3b8;
    position: fixed;
    top: 0;
    left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
    transition: 350ms;
    z-index: 999;
`;

const NavIcon = styled(Link)`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    font-size: 2rem;
    color: #fff;
`;

const Sidebar: FC = () => {
    const { count } = useCount();
    const SidebarWrap = styled.div``;
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    return (
        <IconContext.Provider value={{ color: '#fff' }}>
            <Nav>
                <NavIcon to="#" onClick={showSidebar}>
                    <AiOutlineMenu />
                </NavIcon>
                {/* Shopping basket icon */}
                <NavIcon to="/shoppingcart"> {/* Adjust the route for shopping cart */}
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span >{count}</span>
                        <FaShoppingBasket style={{ marginLeft: '5px' }} />
                     
                    </div>
                </NavIcon>
            </Nav>
            <SidebarNav sidebar={sidebar}>
                <SidebarWrap>
                    <NavIcon to="#" onClick={showSidebar}>
                        <AiOutlineClose />
                    </NavIcon>
                    {SidebarData.map((item, index) => {
                        return <Submenu item={item} key={index} />;
                    })}
                </SidebarWrap>
            </SidebarNav>
        </IconContext.Provider>
    );
};
export default Sidebar;