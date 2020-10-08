import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import axios from "axios";

import {Button, Comment, Form} from 'semantic-ui-react';
import LikeDislikes from "./LikeDislikes";

function SingleComment(props) {

    const user = useSelector(state => state.user);

    let propsForComment = props.comment;

    const [openReply, setOpenReply] = useState(false);
    const [commentValue, setCommentValue] = useState('');

    const onClickReplyOpen = () => {
        setOpenReply(!openReply);
    };

    const onHandleChange = (event) => {
        setCommentValue(event.currentTarget.value);
    };

    const onSubmitReply = (event) => {
        event.preventDefault();

        const variables = {
            content: commentValue,
            writer: user.userData,
            postId: props.postId,
            responseTo: props.comment._id,
        };

        axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    console.log('singleComment.js', response.data);
                    setCommentValue('');
                    setOpenReply(false);
                    props.refreshFunction(response.data.result);
                }
                else {
                    alert('댓글을 작성할 수 없습니다.');
                }
            });
    };

    return (
        <div className="eachComment">
            <Comment.Group>
                <Comment>
                    <Comment.Avatar src={propsForComment.writer.image} />
                    <Comment.Content>
                        <Comment.Author>{propsForComment.writer.name}</Comment.Author>
                        <Comment.Metadata>
                            <div>{propsForComment.createdAt}</div>
                        </Comment.Metadata>
                        <Comment.Text as='p'>{propsForComment.content}</Comment.Text>
                        <Comment.Actions>
                            <Comment.Action>
                                <span onClick={onClickReplyOpen} key="comment-basic-reply-to">대댓글</span>
                            </Comment.Action>
                            <Comment.Action>
                                <LikeDislikes userId={localStorage.getItem('userId')} commentId={props.comment._id} />
                            </Comment.Action>
                        </Comment.Actions>
                        {
                            openReply &&
                            <Form reply onSubmit={onSubmitReply}>
                                <Form.TextArea
                                    onChange={onHandleChange}
                                    value={commentValue}
                                />
                                <Button content='작성하기' primary />
                            </Form>
                        }
                    </Comment.Content>
                </Comment>
            </Comment.Group>
        </div>
    );
}

export default SingleComment;