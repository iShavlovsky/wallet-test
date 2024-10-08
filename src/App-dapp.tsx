import { useRoutes } from 'react-router';

import Error404 from '@views/Error404.tsx';

import routes from './router/index-dapp.tsx';

function AppDapp() {
    const views = useRoutes(routes);
    return views ?? <Error404 />;
}

export default AppDapp;
