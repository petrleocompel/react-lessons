const actions = {
    ITEM_CREATE:"ITEM_CREATE",
    ITEM_DELETE:"ITEM_DELETE",
    ITEM_TOGGLE:"ITEM_TOGGLE"
};

/**
 * Výchozí stav reduceru
 * @type {{list: Array}}
 */
const initialState = {
    list: [],
};

/**
 * Reducer
 * - vykonává akce dle typu
 * - vrací vždy nový objek storu pokud se něco změní
 * - jinak vrací původní objekt
 */
export default function todoStore(state = initialState, action = {}) {
    switch (action.type) {
        case actions.ITEM_CREATE:
            return {
                list:[
                    ...state.list,
                    {
                        text: action.value,
                        done: false
                    }
                ]
            };
        case actions.ITEM_TOGGLE: {
            const {list} = state;
            return {
                list:[
                    ...list.slice(0, action.index),
                    {
                        ...list[action.index],
                        done: !list[action.index].done
                    },
                    ...list.slice(action.index+1)
                ]
            };
        }
        case actions.ITEM_DELETE:
            return {
                list:[
                    ...state.list.slice(0, action.index),
                    ...state.list.slice(action.index+1),
                ]
            };
        default:
            return state
    }
}
