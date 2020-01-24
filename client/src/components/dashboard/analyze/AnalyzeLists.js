import React, { Component } from 'react';
import $ from 'jquery';
import UserLayout from '../../../hoc/User';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AnalyzeTableListInfo from './AnalyzeTableListInfo';
import { adminGetStatistics, clearStatistic } from '../../../actions/analysis';
import Spinner from '../../spinner/Spinner';
import CreateAnalyze from './CreateAnalyze';

class AnalyzeLists extends Component {
  componentDidMount = () => {
   
    this.props.dispatch(adminGetStatistics());
  };

  componentWillUnmount = () => {
    this.props.dispatch(clearStatistic());
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
    const analysis = this.props.analysis;
    if (analysis.loading && analysis.performanceLists === null) {
      return (
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
                &nbsp;&nbsp; Analysis
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
                      <p className='card-header-title'>
                        Performance Lists
                      </p>
                      <CreateAnalyze />
                    </header>
                    <Spinner />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </UserLayout>
      );
    }
    return (
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
              <i class='fas fa-arrow-circle-right' />
              &nbsp;&nbsp; Analysis
            </h1>
            <div className='columns'>
              <div className='column'>
                <div className='card has-text-centered'>
                  <header
                    className='card-header'
                    style={{
                      backgroundColor: 'whitesmoke'
                    }}
                  >
                    <p className='card-header-title'>Performance Lists</p>
                    <CreateAnalyze />
                  </header>
                  <AnalyzeTableListInfo
                    lists={this.props.analysis.performanceLists}
                  />
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
  analysis: state.analysis,
  user: state.user
});

export default connect(mapStateToProps)(AnalyzeLists);
