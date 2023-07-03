import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux"
import {fetchPosts} from "../../redux/reducers/postReducer";
import {fetchComment} from "../../redux/reducers/commentReducer";
import  CommentList from "../ComponentList/CommentList";

const PostList = () => {
    const dispatch = useDispatch()
    const [postShow, setPostShow] = useState({})
    const onSubmit = () => dispatch(fetchPosts())

    const posts = useSelector(state => state.posts.posts)
    const {comments} = useSelector(state => state.comments)
    const getComments = (id) => {
        setPostShow({...postShow, [id]: !postShow[id]})
        dispatch(fetchComment(id))
    }

    return(
        <div>
            <button onClick={onSubmit}>post</button>
            {
                posts &&
                <>
                <h1>Posts</h1>
                <ul>
                    {
                        posts?.map(item => <li key={item?.id}>
                            <button onClick={() => getComments(item?.id)}> {item?.title}</button>
                            {postShow[item?.id] && comments.length > 0 && (
                                <CommentList comments={comments}/>
                            )}
                        </li>)
                    }
                </ul>
                </>
            }
        </div>
    );
};
export default PostList;