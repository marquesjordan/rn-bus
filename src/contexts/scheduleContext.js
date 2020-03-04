import createDataContext from '../contexts/createDataContext';
import busesApi from '../api/buses';

const scheduleReducer = (state, action) => {
    switch (action.type) {
        case 'add_error': 
            return { ...state, errorMessage: action.payload }
        case 'get_routes':
            return { ...state, routes: action.payload}
        default:
            return state
    }
}

const getStopTimes = (dispatch) => {
    return async (stopList) => {
        try {
            const response = await busesApi.post('/api/routes', stopList);
            dispatch({type:'get_routes', payload: response.data});

        } catch (err) {
            dispatch({type: 'add_error', payload: 'Error getting bus stop data.'})
        }
    }
}

export const { Provider, Context } = createDataContext(
    scheduleReducer,
    {getStopTimes},
    { routes: [], errorMessage: ''}
)