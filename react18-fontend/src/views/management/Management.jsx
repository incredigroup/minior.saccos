import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { history } from '_helpers';
import { loanActions } from '_store';

export { Management };

function Management() {
    const dispatch = useDispatch();
    const { loans } = useSelector(x => x.loan);
    const { user: authUser } = useSelector(x => x.auth);
    const authId = authUser.id;
    useEffect(() => {
        dispatch(loanActions.getAll());
    }, []);

    function addLoan() {
        history.navigate('/request');
    }

    function approveLoan(loanId) {
        dispatch(loanActions.approveLoan({loanId, authId}));
    }

    return (
        <div>
            <h2 className="text-center">Loans List</h2>
            <div className = "row">
                <button className="btn btn-primary" onClick={addLoan}> Loan Request</button>
            </div>
            <br></br>
            <div className = "row">
                <table className = "table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th> No</th>
                            {/* <th> Applicant Name</th> */}
                            <th> Email </th>
                            <th> Role </th>
                            <th> Amount</th>
                            <th> Create Date</th>
                            <th> Till Date</th>
                            <th> Approved number</th>
                            <th> Status</th>
                            <th> Action</th>
                        </tr>
                    </thead>
                    {loans.length && 
                        <tbody>
                            {loans.map((loan, index) =>
                                <tr key = {loan.id}>
                                        <td> {index+1} </td>   
                                        {/* <td> {loan.lastName}</td>    */}
                                        <td> {loan.emailId} </td>   
                                        <td> {loan.roleName} </td>
                                        <td> {loan.amount}$</td>
                                        <td> {loan.rdate}</td>
                                        <td> {loan.edate}</td>
                                        <td> {loan.approve_number}</td>
                                        <td> {(loan.number - loan.approve_number) > 0?'Pending Approval':'Approved'}</td>
                                        {loan.user_id - authId?<td><button onClick={() => approveLoan(loan.id)} className="btn btn-info">Approve </button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.rejectloan(loan.id)} className="btn btn-danger">Reject </button>
                                        </td>:''}
                                </tr>
                            )}
                        </tbody>
                    }
                </table>
            </div>
        </div>
    )
}
