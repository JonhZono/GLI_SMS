import React from 'react';
import { connect } from 'react-redux';
import UserLayout from '../../../hoc/User';
import { getPostById } from '../../../actions/post';
import Spinner from '../../spinner/Spinner';
import RenderPostArticle from './RenderPostArticle';

class ViewPost extends React.Component {
  componentDidMount = () => {
    const post_id = this.props.match.params.post_id;
    this.props.dispatch(getPostById(post_id));
  };
  render() {
    const post = this.props.post;
    return post.postById === null ? (
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
              <i className='fas fa-arrow-circle-right' />
              &nbsp;&nbsp;News Letter
            </h1>
            <div className='columns'>
              <div className='column'>
                <div className='card'>
                  <RenderPostArticle  post={post.postById} />
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
  post: state.post
});

export default connect(mapStateToProps)(ViewPost);
