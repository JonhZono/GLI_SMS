<div className='columns is-variable is-desktop p-1'>
      <div className='column'>
        <div className='columns is-variable is-desktop'>
          {/* START ARTICLE FEED*/}
          <section className='articles'>
            <div className='column is-8 is-offset-2'>
              {/* START ARTICLE */}
              <div className='card article'>
                <div className='card-content'>
                  <div className='media'>
                    {role === 'admin' && (
                      <Fragment>
                        <div className='level-item is-narrow'>
                          <Link
                            to={`/admin/edit/post/${_id}`}
                            className='tag is-primary'
                            style={{ margin: '3px' }}
                          >
                            <i className='fas fa-pencil-alt' />
                            &nbsp;&nbsp;
                            <span>Edit</span>
                          </Link>
                        </div>
                        &nbsp;
                        <div className='level-item is-narrow'>
                          <button
                            onClick={e => adminDeletePost(_id)}
                            className='tag is-danger'
                            style={{ margin: '3px' }}
                          >
                            <span>
                              <i className='fas fa-times' />
                            </span>
                            &nbsp;&nbsp;
                            <span>Delete</span>
                          </button>
                        </div>
                      </Fragment>
                    )}
                    <div className='media-content has-text-centered'>
                      <div className='title article-title'>
                        <i className='fa fa-bell'></i>&nbsp; {title}
                      </div>
                      <div className='tags has-addons level-item'>
                        <span className='tag is-rounded is-info'>@{name}</span>
                        <span className='tag is-rounded'>
                          Posted On :<Moment format='YYYY/MM/DD'>{date}</Moment>
                        </span>
                      </div>
                    </div>
                  </div>
                  <section className='hero is-info is-bold is-small promo-block'>
                    {image.map(item => (
                      <figure className='image is-5by3'>
                        <img key={item.public_id} src={item.url} />
                      </figure>
                    ))}
                  </section>
                  <br />
                  <div className='content article-body'>
                    <p>{descriptions}</p>
                  </div>
                </div>
              </div>

              <nav className='level py-1'>
                <div className='level-item is-narrow'>
                  <button
                    onClick={() => addInterest(_id)}
                    className='button buttonInterest is-link is-outlined is-small'
                  >
                    <i className='far fa-thumbs-up' />
                    {likes.length > 0 && <span>&nbsp;{likes.length}</span>}
                    &nbsp; Interest
                  </button>
                </div>
                <div className='level-item is-narrow'>
                  <button
                    onClick={() => removeInterest(_id)}
                    className='button buttonNotInterest is-danger is-outlined is-small'
                  >
                    <i className='far fa-thumbs-down' />
                    &nbsp; Not Interest
                  </button>
                </div>
                <div className='level-item is-narrow'>
                  <Link
                    to={`/post/comment/${_id}`}
                    className='button buttonDiscussion is-success is-outlined is-small'
                  >
                    <i className='far fa-comment-dots' />
                    {comments.length > 0 && (
                      <span>&nbsp;{comments.length}</span>
                    )}{' '}
                    &nbsp; Discussion
                  </Link>
                </div>
              </nav>
            </div>
          </section>
          {/* END ARTICLE */}
        </div>
      </div>
    </div>