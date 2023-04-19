import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import { initFlowbite } from 'flowbite';
// import { Link } from 'react-router-dom';
// import logo from '../../assets/images/emkop-logo-transparent-landscape.png';
import user1 from '../../assets/images/people/user-1.png';
import { useEffect } from 'react';

export default function NavbarBlock() {
    useEffect(() => {
        initFlowbite();
    });

    return (
        <Navbar
            fluid={true}
            rounded={true}
        >
            <Navbar.Brand href="#">
                {/* <img
                    src={logo}
                    className="mr-3 h-6 sm:h-9 sm:hidden"
                    alt={logo}
                />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                Flowbite
              </span> */}
            </Navbar.Brand>
            <div className="flex md:order-2">
                <Dropdown
                    arrowIcon={false}
                    inline={true}
                    label={<Avatar alt={user1} img={user1} rounded={true} />}
                >
                    <Dropdown.Header>
                        <span className="block text-sm">
                            Angkasa
                        </span>
                        <span className="block truncate text-sm font-medium">
                            akbar@emkop.co.id
                        </span>
                    </Dropdown.Header>
                    <Dropdown.Item>
                        Dashboard
                    </Dropdown.Item>
                    <Dropdown.Item>
                        Settings
                    </Dropdown.Item>
                    <Dropdown.Item>
                        Earnings
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>
                        Sign out
                    </Dropdown.Item>
                </Dropdown>
            </div>
        </Navbar>
    )
}
