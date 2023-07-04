import { CREATE,DELETE,UPDATE,FETCH_ALL,LIKE,FETCH_POST, COMMENT, SHARE } from '../constants/actionTypes';
export default (posts = [], action) => {
    switch (action.type){
        case UPDATE:
        case LIKE:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post)
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...posts, action.payload];
        case DELETE:
            return posts.filter((post) => post._id !== action.payload);
        case FETCH_POST:
            return { ...posts, post: action.payload}
        case SHARE:
            return action.payload;
        case COMMENT:
            return posts.map((post) => {
                if(post._id === action.payload._id) return action.payload;

                return post;
            })
        default:
            return posts;
    }
}