const initialState = {
  movieList: {},
  movieDetails: {}

}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_MOVIES':
      return Object.assign({}, state, {
        currentRequest: '',
        movieList: {
          data: {},
          hasError: false,
          isLoading: true
        }
      });

    case 'GET_MOVIES_SUCCESS':
      return Object.assign({}, state, {
        currentRequest: 'getMovieList',
        movieList: {
          data: action.payload,
          hasError: false,
          isLoading: false
        }
      });

    case 'GET_MOVIES_FAILURE':
      return Object.assign({}, state, {
        currentRequest: 'getMovieList',
        movieList: {
          data: action.payload.data,
          hasError: true,
          isLoading: false
        }
      });

    case 'RESET_MOVIES':
      return Object.assign({}, state, {
        currentRequest: '',
        movieList: {}
      });

    case 'GET_MOVIES_DETAIL':
      return Object.assign({}, state, {
        currentRequest: '',
        movieDetails: {
          data: {},
          hasError: false,
          isLoading: true
        }
      });

    case 'GET_MOVIES_DETAIL_SUCCESS':
      return Object.assign({}, state, {
        currentRequest: 'movieDetail',
        movieDetails: {
          data: action.payload,
          hasError: false,
          isLoading: false
        }
      });

    case 'GET_MOVIES_DETAIL_FAILURE':
      return Object.assign({}, state, {
        currentRequest: '',
        movieDetails: {
          data: action.payload,
          hasError: false,
          isLoading: false
        }
      });
    
      case 'RESET_MOVIES_DETAIL':
          return Object.assign({}, state, {
            currentRequest: '',
            movieDetails: {
              data: {},
              hasError: false,
              isLoading: false
            }
        });

    default:
      return state;
  }
};

export default reducer;
