import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import { history } from '_helpers';
import { requestActions } from '_store';

export { Request };

function Request() {
    const dispatch = useDispatch();
    const loanError = useSelector(x => x.loan.error);
    const { user: authUser } = useSelector(x => x.auth);

    // form validation rules 
    const validationSchema = Yup.object().shape({
        amount: Yup.string().required('Amount is required'),
        edate: Yup.string().required('Edate is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;
    const authId = authUser.id;
    function onSubmit({ amount, edate }) {
        return dispatch(requestActions.apply({ amount, edate, authId}));
    }

    return (
        <div className="col-md-6 offset-md-3 mt-5">
            <div className="card">
                <h4 className="card-header">Create a loan Request</h4>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label>Amount</label>
                            <input name="amount" type="text" {...register('amount')} className={`form-control ${errors.amount ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.amount?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Till Date</label>
                            <input name="edate" type="text" {...register('edate')} className={`form-control ${errors.edate ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.edate?.message}</div>
                        </div>
                        <button disabled={isSubmitting} className="btn btn-primary">
                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Apply
                        </button>
                        {loanError &&
                            <div className="alert alert-danger mt-3 mb-0">{loanError.message}</div>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}
