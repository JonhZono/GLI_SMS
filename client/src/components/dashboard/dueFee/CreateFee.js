import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import DueFeeFormField from '../../utils/form/dueFeeFormField';
import { updates, generateFormData } from '../../utils/form/formActions';
import { adminCreateDueFee } from '../../../actions/duefee';
import Alert from '../../alert/Alert';

class CreateFee extends React.Component {
  state = {
    formData: {
      amount: {
        element: 'input',
        value: '',
        config: {
          name: 'amount',
          type: 'text',
          placeholder: 'Total Amount'
        },
        showLabel: false
      },
      month: {
        element: 'select',
        value: '',
        config: {
          options: [
            {key: 'January', value: 'January'},
            {key: 'February', value: 'February'},
            {key: 'March', value: 'March'},
            {key: 'April', value: 'April'},
            {key: 'May', value: 'May'},
            {key: 'June', value: 'June'},
            {key: 'July', value: 'July'},
            {key: 'August', value: 'August'},
            {key: 'September', value: 'September'},
            {key: 'October', value: 'October'},
            {key: 'November', value: 'November'},
            {key: 'December', value: 'December'},
          ],
          name: 'month',
          type: 'text'
        },
        showLabel: false
      },
      additional: {
        element: 'input',
        value: '',
        config: {
          name: 'additional',
          type: 'text',
          placeholder: 'Additional Price'
        },
        showLabel: false
      },

      gmailLists: {
        element: 'textarea',
        value: '',
        config: {
          name: 'gmailLists',
          type: 'text',
          placeholder: 'ex: a@gmail.com, b@gmail.com'
        },
        showLabel: false
      }
    }
  };

  updateForm = element => {
    //target form input
    const newFormData = updates(element, this.state.formData, 'CreateDueFee');
    this.setState({
      formData: newFormData
    });
  };

  submitForm = event => {
    event.preventDefault();
    let dataToSubmit = generateFormData(this.state.formData, 'CreateDuefee');
    this.props.dispatch(adminCreateDueFee(dataToSubmit));
  };

  render() {
    const formData = this.state.formData;
    return (
      <Fragment>
        <div className='columns has-text-center'>
          {/*Create User Popup Window Form*/}

          <div className='container'>
            <div className='modal'>
              <div
                className='modal-background'
                style={{ background: '#fcfcfc' }}
              ></div>
              <div className='modal-content'>
                {/*Any other Bulma elements you want*/}
                <Alert />
                <form onSubmit={e => this.submitForm(e)}>
                  <div className='field' style={{ marginTop: '1rem' }}>
                    <DueFeeFormField
                      id={'gmailLists'}
                      formData={formData.gmailLists}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className='field' style={{ marginTop: '1rem' }}>
                    <DueFeeFormField
                      id={'additional'}
                      formData={formData.additional}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className='field' style={{ marginTop: '1rem' }}>
                    <DueFeeFormField
                      id={'amount'}
                      formData={formData.amount}
                      change={element => this.updateForm(element)}
                    />
                  </div>

                  <div className='field' style={{ marginTop: '1rem' }}>
                    <DueFeeFormField
                      id={'month'}
                      formData={formData.month}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className='field-body' style={{ marginTop: '1rem' }}>
                    <div className='field'>
                      <div className='control'>
                        <button
                          className='button buttonAddDueFee is-outlined'
                          type='submit'
                        >
                          NOTIFIED USER
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <button className='modal-close' />
            </div>
          </div>
        </div>
        <div className='control has-icons-left'>
          <input
            className='input is-small buttonCardHeader'
            type='text'
            placeholder='Enter student name...'
            style={{
              borderRadius: '1px',
              fontSize: '0.9rem'
            }}
          />
          <span
            className='icon is-left'
            style={{
              paddingTop: '25px',
              paddingLeft: '25px',
              textAlign: 'center',
              color: 'smoke'
            }}
          >
            <i className='fas fa-search-plus' />
          </span>
        </div>
        &nbsp;
        <button
          id='showModal'
          className='button is-small is-outlined buttonCardHeader'
          style={{
            borderRadius: '1px',
            fontSize: '0.9rem'
          }}
        >
          <i className='fas fa-plus-circle' />
          &nbsp; Generate Receipt
        </button>
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  fee: state.fee
});
export default connect(mapStateToProps)(CreateFee);
