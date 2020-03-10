import axios from 'axios';

const api = axios.create({ baseURL: "https://sugoku.herokuapp.com" });

const fetchBoardCompleted = (board) => ({
  type: 'FETCH_BOARD',
  payload: {
    board
  }
});

export const fetchBoard = (difficulty) => {
  return (dispatch) => {
    api
      .get(`/board?difficulty=${difficulty}`)
      .then(({ data }) => {
        const apiBoard = data.board;
        const defaultBoardCoordinates = apiBoard.map(row => {
          return row.map(col => {
            if (col === 0) {
              return { val: "", canChange: true };
            }
            return { val: String(col), canChange: false };
          });
        });
        dispatch(fetchBoardCompleted(defaultBoardCoordinates));
      })
      .catch(err => {
        console.log(err.response);
      });
  };
};
