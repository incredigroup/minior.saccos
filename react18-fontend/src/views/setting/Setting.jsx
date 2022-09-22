import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { roleActions } from '_store';

export { Setting };
function Setting() {
    const dispatch = useDispatch();
    const { roles } = useSelector(x => x.role);
    useEffect(() => {
        dispatch(roleActions.getRoles());
    }, []);

    function setting() {
        dispatch(roleActions.setting());
    }

    return (
        <div>
            <h2 className="text-center">Loans Setting</h2>
            <div className = "row">
                <button className="btn btn-primary" onClick={setting}> Setting</button>
            </div>
            <br></br>
            <div className = "row">
                <table className = "table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th> No</th>
                            <th> Role Name </th>
                            <th> Required Number </th>
                        </tr>
                    </thead>

                    {roles.length && 
                        <tbody>
                            {roles.map((role, index) =>
                                <tr key = {role.id}>
                                        <td> {index+1} </td>   
                                        <td> {role.role_name}</td>
                                        <td> {role.number}</td>
                                </tr>
                            )}
                        </tbody>
                    }
                </table>
            </div>
        </div>
    )
}
