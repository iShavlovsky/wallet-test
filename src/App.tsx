import { useRoutes } from 'react-router';

import Error404 from '@views/Error404.tsx';

import routes from './router';

function App() {
    const views = useRoutes(routes);
    return views ?? <Error404 />;
}

export default App;
