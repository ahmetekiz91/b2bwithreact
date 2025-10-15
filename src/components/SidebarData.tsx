import {
    AiFillCaretDown,
    AiFillCaretUp,
    AiOutlineHistory,
    AiOutlineHome,
    AiOutlineMoneyCollect,
    AiOutlineUser
} from 'react-icons/ai';
import { FaCog, FaOpencart } from 'react-icons/fa';
import { SidebarItem } from '../models/SidebarItem';



export const SidebarData: SidebarItem[] = [
    {
        title: 'Anasayfa',
        path: '/',
        icon: <AiOutlineHome />,
        iconClosed: <AiFillCaretDown />,
        iconOpened: <AiFillCaretUp />,
        subnav: [
            {
                title: 'Users',
                path: '/overview/users',
                icon: <AiOutlineUser />
            },
            {
                title: 'Revenue',
                path: '/overview/revenue',
                icon: <AiOutlineMoneyCollect />
            }
        ]
    },
    {
        title: 'Category',
        path: '/category',
        icon: <FaOpencart />
    },
    {
        title: 'Product',
        path: '/product',
        icon: <AiOutlineUser />
    },
    {
        title: 'Users',
        path: '/Users',
        icon: <AiOutlineHistory />
    },
    {
        title: 'Customer',
        path: '/Customer',
        icon: <AiOutlineHistory />
    },
    {
        title: 'Order',
        path: '/order',
        icon: <AiOutlineHistory />
    },
    {
        title: 'Logout',
        path: '/logout',
        icon: <AiOutlineHistory />
    },
];