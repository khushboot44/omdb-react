export const getNews = (searchItem) => ({

  type: 'GET_MOVIES',
  payload: searchItem
});

export const resetMovies = () => ({

  type: 'RESET_MOVIES'

});

export const getMovieDetail = (imdbID) => ({
  type: 'GET_MOVIES_DETAIL',
  payload: imdbID
});


export const resetMovieDetail = () => ({
  type: 'RESET_MOVIES_DETAIL'
});


