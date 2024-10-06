import { Link } from 'react-router-dom';

interface Props404 {
    title?: string;
}

export default function Error404({ title = 'Page not found' }: Props404) {
    return (
        <div>
            <h1>{title}</h1>
            <hr />
            <Link to="/">Try start from main page</Link>
        </div>
    );
}
