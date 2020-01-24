import React, { useEffect } from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import { getAllPosts } from '../../../actions/post';
import ViewPosts from './ViewPosts';
import UserLayout from '../../../hoc/User';
import Spinner from '../../spinner/Spinner';

/**
 * Parent Post
 */

const Posts = ({ getAllPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getAllPosts();
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
  }, [getAllPosts]);
  return loading ? (
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
            <i class='fas fa-arrow-circle-right' />
            &nbsp;&nbsp;News Letter
          </h1>
          <div className='columns'>
            <div className='column'>
              <div className='card has-text-centered'>
                <Spinner />
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
            <i class='fas fa-arrow-circle-right' />
            &nbsp;&nbsp;News Letter
          </h1>
          <div className='columns'>
            <div className='column'>
              <div className='card has-text-centered'>
                {posts.length > 0
                  ? posts.map((item, i) => <ViewPosts key={i} posts={item} />)
                  : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getAllPosts })(Posts);
