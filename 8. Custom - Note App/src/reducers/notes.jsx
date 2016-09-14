const actions = {
    NOTE_CREATE:"NOTE_CREATE",
    NOTE_SELECT:"NOTE_SELECT",
    NOTE_CLEAR:"NOTE_CLEAR",
    NOTE_DELETE:"NOTE_DELETE"
};

const initialState = {
    actualIndex: null,
    list: [],
};

export default function notes(state = initialState, action = {}) {
    switch (action.type) {
        case actions.NOTE_CREATE:
            return {
                ...state,
                list:[
                    ...state.list,
                    {
                        ...action.data,
                    }
                ]
            };
        case actions.NOTE_SELECT: {
            return {
                ...state,
                actualIndex: action.index
            };
        }
        case actions.NOTE_CLEAR: {
            return {
                ...state,
                actualIndex: null
            };
        }
        case actions.NOTE_DELETE:
            return {
                actualIndex: null,
                list:[
                    ...state.list.slice(0, action.index),
                    ...state.list.slice(action.index+1),
                ]
            };
        default:
            return state
    }
}
