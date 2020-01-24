import React from 'react';
import { ReactComponent as Logo } from '../../assets/headerLogo.svg';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/user';
import Alert from '../alert/Alert';
import PropTypes from 'prop-types';

class Login extends React.Component {
  state = {
    email: '',
    password: ''
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;
    this.props.dispatch(loginUser(email, password));
  };

  render() {
    if (this.props.user.isAuth) {
      return <Redirect to='/user/dashboard' />;
    }
    const { email, password } = this.state;
    return (
      <section
        className='hero is-fullheight'
        style={{ backgroundColor: '#f9f7f1' }}
      >
        <div className='hero-body'>
          <div className='container has-text-centered'>
            <div className='column is-6 is-offset-3'>
              <Logo className='Logo' />
              <div className='has-text-centered'>
                <Logo style={{ width: '80%', height: 'auto', margin: '1rem' }} />
              </div>

              <div className='box' style={{ borderRadius: '1px' }}>
                <Alert />
                <br />
                <form onSubmit={e => this.onSubmit(e)}>
                  <div className='field' style={{ marginTop: '1rem' }}>
                    <p className='control has-icons-left'>
                      <input
                        className='input'
                        name='email'
                        value={email}
                        onChange={e => this.onChange(e)}
                        placeholder='Email'
                        style={{ marginBottom: '0.5rem' }}
                      />
                      <span className='icon is-small is-left'>
                        <i className='fas fa-envelope'></i>
                      </span>
                    </p>
                  </div>
                  <div className='field'>
                    <p className='control has-icons-left'>
                      <input
                        className='input'
                        type='password'
                        name='password'
                        value={password}
                        onChange={e => this.onChange(e)}
                        placeholder='Password'
                      />
                      <span className='icon is-small is-left'>
                        <i className='fas fa-lock'></i>
                      </span>

                      {/* <p className='help is-danger'>Password is required!</p> */}
                    </p>
                  </div>
                  <div className='field'>
                    <p className='control has-text-centered'>
                      <button
                        className='button buttonLanding is-info is-outlined'
                        type='submit'
                      >
                        LOGIN
                      </button>
                    </p>
                  </div>
                  <br />
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func
};
const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps)(Login);
