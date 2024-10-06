import { Outlet } from 'react-router';

import Footer from '@components/Footer';
import NavBar from '@components/NavBar';

function LayoutDefault() {
    return (
        <>
            <NavBar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default LayoutDefault;
