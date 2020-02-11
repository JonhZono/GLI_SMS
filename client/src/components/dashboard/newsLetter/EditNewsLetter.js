import React, { Component } from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import EditPost from './EditPost';
import { getPostById, clearEditPost } from '../../../actions/post';
import Spinner from '../../spinner/Spinner';
import UserLayout from '../../../hoc/User';

class EditNewsLetter extends Component {
  componentDidMount() {
    const post_id = this.props.match.params.post_id;
    this.props.dispatch(getPostById(post_id));
  }

  componentWillUnmount = () => {
    this.props.dispatch(clearEditPost());
  };

  render() {
    $(document).ready(function() {
      $('#showModal').click(function() {
        $('.modal').addClass('is-active');
      });

      $('.modal-close').click(function() {
        $('.modal').removeClass('is-active');
      });
      $('.toggler').on('click', function() {
        $('.menu-container').toggleClass('active');
      });
      $('.nav-toggler').on('click', function() {
        $('.navbar-toggler').toggleClass('is-active');
        $('.navbar-menu').toggleClass('is-active');
      });
    });
    return this.props.post.postById === null ? (
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
              Edit News Letter
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
                      Edit News Letter Form
                    </p>
                  </header>
                  <Spinner />
                </div>
              </div>
            </div>
          </div>
        </div>
      </UserLayout>
    ) : (
      <EditPost
        post_id={this.props.match.params.post_id}
        postById={this.props.post.postById}
        loading={this.props.post.loading}
      />
    );
  }
}

const mapStateToProps = state => ({
  post: state.post
});
export default connect(mapStateToProps)(EditNewsLetter);
