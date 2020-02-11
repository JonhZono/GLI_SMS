import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../../spinner/Spinner';
import NewsTableLists from './NewsTableLists';
import { clearViewPost } from '../../../../actions/post';

class NewsLists extends Component {
  renderNews = post =>
    !this.props.loading && post.length > 0 ? (
      post.map(post => <NewsTableLists key={post._id} {...post} />)
    ) : post.length === 0 ? (
      <Spinner />
    ) : (
      <div>No post available</div>
    );

  componentWillUnmount = () => {
    this.props.dispatch(clearViewPost());
  };
  render() {
    return (
      <table className='table is-striped fixed_header'>
        <thead>
          <tr>
            <td style={{ color: 'grey', fontSize: '14px' }}>題名</td>
            <td style={{ color: 'grey', fontSize: '14px' }}>で作成</td>
            <td
              className='has-text-centered'
              style={{ color: 'grey', fontSize: '14px' }}
            >
              投稿ステータス
            </td>
            <td style={{ color: 'grey', fontSize: '14px' }}>投稿タイプ</td>
          </tr>
        </thead>
        <tbody>{this.renderNews(this.props.post)}</tbody>
      </table>
    );
  }
}

export default connect()(NewsLists);
