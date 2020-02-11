import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import FormField from '../../utils/form/formField';
import {
  updates,
  generateFormData,
  populateFields
} from '../../utils/form/formActions';
import { adminEditFeeById } from '../../../actions/duefee';
import Alert from '../../alert/Alert';
import UserLayout from '../../../hoc/User';
import Spinner from '../../spinner/Spinner';

class EditFee extends React.Component {
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
            { key: 'January', value: 'January' },
            { key: 'February', value: 'February' },
            { key: 'March', value: 'March' },
            { key: 'April', value: 'April' },
            { key: 'May', value: 'May' },
            { key: 'June', value: 'June' },
            { key: 'July', value: 'July' },
            { key: 'August', value: 'August' },
            { key: 'September', value: 'September' },
            { key: 'October', value: 'October' },
            { key: 'November', value: 'November' },
            { key: 'December', value: 'December' }
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
          placeholder: 'Additional Fee'
        },
        showLabel: false
      },

      gmailLists: {
        element: 'textarea',
        value: '',
        config: {
          name: 'gmailLists',
          label: 'Please input email lists here',
          type: 'text',
          placeholder: 'ex: a@gmail.com, b@gmail.com'
        },
        showLabel: true
      }
    }
  };
  componentDidMount = () => {
    const newFormData = populateFields(this.state.formData, this.props.FeeById);
    this.setState({
      formData: newFormData
    });
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
    this.props.dispatch(
      adminEditFeeById(
        this.props.match.params.fee_id,
        dataToSubmit,
        this.props.history
      )
    );
  };

  render() {
    const formData = this.state.formData;
    return this.props.loading ? (
      <UserLayout>
        <div
          className='column is-10-desktop is-offset-2-desktop is-9-tablet is-offset-3-tablet is-12-mobile'
          style={{
            background: '#fcfcfc',
            paddingLeft: 30,
            paddingRight: 50,
            paddingTop: 30,
            paddingBottom: 30,
            marginTop: 40
          }}
        >
          <div className='py-1'>
            <h1
              style={{
                fontSize: 20,
                paddingBottom: '1rem'
              }}
            >
              Student Due Fee
            </h1>
            <div className='columns'>
              <div className='column'>
                <div className='card has-text-centered'>
                  <header className='card-header'>
                    <p
                      className='card-header-title'
                      style={{
                        backgroundColor: 'whitesmoke'
                      }}
                    >
                      Due Fee Information
                    </p>
                  </header>
                  <div className='card-content'>
                    <div className='card'>
                      <Spinner />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UserLayout>
    ) : (
      <UserLayout>
        <div
          className='column is-10-desktop is-offset-2-desktop is-9-tablet is-offset-3-tablet is-12-mobile'
          style={{
            background: '#fcfcfc',
            paddingLeft: 30,
            paddingRight: 50,
            paddingTop: 30,
            paddingBottom: 30,
            marginTop: 40
          }}
        >
          <div className='py-1'>
            <h1
              style={{
                fontSize: 20,
                paddingBottom: '1rem'
              }}
              className='has-text-weight-bold'
            >
              <i className='fas fa-arrow-circle-right' />
              &nbsp;&nbsp;Edit Exam
            </h1>
            <div className='columns'>
              <div className='column'>
                <div className='card has-text-centered'>
                  <header
                    className='card-header'
                    style={{
                      background: 'whitesmoke'
                    }}
                  >
                    <p className='card-header-title'>Students Due Fee</p>
                  </header>
                  <div className='card-content'>
                    <Alert />
                    <div className='content'>
                      <form onSubmit={event => this.submitForm(event)}>
                        <FormField
                          id={'gmailLists'}
                          formData={formData.gmailLists}
                          change={element => this.updateForm(element)}
                        />
                        <br />
                        <FormField
                          id={'month'}
                          formData={formData.month}
                          change={element => this.updateForm(element)}
                        />
                        <br />
                        <FormField
                          id={'additional'}
                          formData={formData.additional}
                          change={element => this.updateForm(element)}
                        />
                        <br />
                        <FormField
                          id={'amount'}
                          formData={formData.amount}
                          change={element => this.updateForm(element)}
                        />
                        <br />

                        <div className='field is-horizontal'>
                          <div className='field-label'></div>
                          <div className='field-body'>
                            <div className='field'>
                              <div className='control'>
                                <button
                                  type='submit'
                                  className='button is-normal buttonForm is-info is-outlined'
                                >
                                  UPDATE FEE
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className='field-label'></div>
                          <div className='field-body'>
                            <div className='field'>
                              <div className='control'>
                                <Link
                                  to='/admin/view/duefee/lists'
                                  type='submit'
                                  className='button is-normal buttonForm is-info is-outlined'
                                >
                                  CANCEL
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UserLayout>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  fee: state.fee
});
export default connect(mapStateToProps)(withRouter(EditFee));
