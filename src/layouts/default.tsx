import { Outlet } from 'react-router';

import NavBar from '@components/NavBar';

function LayoutDefault() {
    return (
        <>
            <main>
                <Outlet />
            </main>
            <NavBar />
        </>
    );
}

export default LayoutDefault;
