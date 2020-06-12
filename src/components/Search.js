import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Input, Tabs, Modal } from 'antd';
import { getNews, resetMovies, getMovieDetail, resetMovieDetail } from '../actions'
import ResultList from './ResultList';

const { TabPane } = Tabs;

let styles = {
  backgroundColor: 'HotPink',
  width: '250px',
  height: '100px',
  borderRadius: '100px',
  display: 'block',
  margin: '50px auto',
  fontSize: '25px',
  border: '3px solid '
}

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      showModal: false
    };

    this.onChange = this.onChange.bind(this);
    this.sendQuery = this.sendQuery.bind(this);
    this.onTabChange = this.onTabChange.bind(this);
    this.showMovieDetails = this.showMovieDetails.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }


  onChange({ target: { value } }) {

    this.setState({ searchText: value })
    const search = _.debounce(this.sendQuery, 3000);

    if (value) {
      search(value);
    }

  };

  sendQuery(searchData) {
    this.props.getNews(searchData)
  }

  onTabChange() {
    this.props.resetMovies();
    this.setState({ searchText: '' })
  }

  showMovieDetails(imdbId) {
    this.props.getMovieDetail(imdbId);
    this.setState({ showModal: true })

  }

  closeModal() {
    this.setState({
      showModal: false
    }, () => {
      this.props.resetMovieDetail()
    });
  }

  render() {
    return (
      <div>

        <h1 className="searchHeading">OMDB Movie Search</h1>
        <Tabs defaultActiveKey="1" type="card" size="large" onChange={this.onTabChange}>
          <TabPane tab="Search Movies and get Details" key="1">
            <Input
              className="SearchBarInput"
              type="text"
              value={this.state.searchText}
              placeholder="Enter Movie Title"
              onChange={this.onChange}
            />

            <ResultList
              movieList={this.props.movieList}
              showDetails={true}
              showMoreDetails={this.showMovieDetails}
            />
          </TabPane>
          <TabPane tab="Search Movies" key="2">
            <Input
              className="SearchBarInput"
              type="text"
              value={this.state.searchText}
              placeholder="Enter Movie Title"
              onChange={this.onChange}
            />

            <ResultList movieList={this.props.movieList} />
          </TabPane>

        </Tabs>

        <Modal
          visible={this.state.showModal}
          footer={false}
          onCancel={this.closeModal}
        >
          <div>
          <div>
           {
             this.props.movieDetails && this.props.movieDetails.isLoading === true && (
               <div>Loading Details....</div>
             )
           }
           </div>

           <div>
            {
              this.props.movieDetails 
              && this.props.movieDetails.data 
              && this.props.movieDetails.isLoading === false
              && this.props.movieDetails.hasError === false
              && (
                <ul>
                  <li><b>Movie Title :</b> {this.props.movieDetails.data.Title}</li>
                  <li><b>Released :</b> {this.props.movieDetails.data.Released}</li>
                  <li> <b>boxoffice :</b> { this.props.movieDetails.data.imdbRating && 
                  this.props.movieDetails.data.imdbRating >7 ?  'hit' : 'flop'}</li>
                </ul>
              )
            }
           </div>

           
          </div>
        </Modal>
      </div>


    );
  }

};

const mapStateToProps = state => {
  return {
    movieList: state.movieList,
    movieDetails: state.movieDetails
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getNews: (searchData) => {
      dispatch(getNews(searchData));
    },
    resetMovies: () => {
      dispatch(resetMovies());
    },
    getMovieDetail: (imdbId) => {
      dispatch(getMovieDetail(imdbId));
    },
    resetMovieDetail: () => {
      dispatch(resetMovieDetail());
    }
  };
};

Search = connect(mapStateToProps, mapDispatchToProps)(Search);

export default Search;
