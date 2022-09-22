import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { userActions } from '_store';

export { Home };

function Home() {
    const dispatch = useDispatch();
    const { user: authUser } = useSelector(x => x.auth);
    const { users } = useSelector(x => x.users);
    useEffect(() => {
        dispatch(userActions.getAll());
    }, []);

    return (
        <div>
            <h1>Hi {authUser.firstName} {authUser.lastName}!</h1>
            <h4>Welcom to this platform</h4>
            <br/>
            <h5>SACCO Admin List from secure api end point:</h5>
            {users.length &&
                <ul>
                    {users.map(user =>
                        <li key={user.id}>{user.firstName} {user.lastName}</li>
                    )}
                </ul>
            }
            {users.loading && <div className="spinner-border spinner-border-sm"></div>}
            {users.error && <div className="text-danger">Error loading users: {users.error.message}</div>}
        </div>
    );
}
