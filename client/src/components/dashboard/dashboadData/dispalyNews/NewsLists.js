import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../../spinner/Spinner';
import NewsTableLists from './NewsTableLists';

class NewsLists extends Component {
  renderNews = post =>
    !this.props.loading && post.length > 0 ? (
      post.map(post => <NewsTableLists key={post._id} {...post} />)
    ) : post.length === 0 ? (
      <Spinner />
    ) : (
      <div>No post available</div>
    );

  render() {
    return (
      <table className='table is-striped fixed_header'>
        <thead></thead>
        <tbody>{this.renderNews(this.props.post)}</tbody>
      </table>
    );
  }
}

export default connect()(NewsLists);
