import React, {useState} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';

import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';

import {Box, Button, Form, FormField, Grommet, TextArea} from 'grommet';
import {Divider} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'

import '../../../css/commentStyle.css';
import {deepMerge} from "grommet/utils";

const customTheme = {
    formField : {
        border : undefined
    },
    textArea : {
        extend: () => `
            font-size: 1rem;
            font-weight: normal;
        `
    }
};

function Comment(props) {
    const user = useSelector(state => state.user);
    const videoId = props.postId;

    const [commentValue, setCommentValue] = useState('');

    const handleClick = (event) => {
        setCommentValue(event.currentTarget.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();

        const variables = {
            content: commentValue,
            writer: user.userData,
            postId: videoId,
        };

        axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    console.log('comment.js', response.data);
                    setCommentValue('');
                    props.refreshFunction(response.data.result);
                }
                else {
                    alert('댓글을 작성할 수 없습니다.');
                }
            });
    };

    return (
        <div className="commentContainer">
            <Box>
                <div id="commentHeader">
                    댓글
                </div>
                <Divider />
                <div className="commentArea">
                    {props.commentList && props.commentList.map((comment, index) => (
                        (!comment.responseTo &&
                            <React.Fragment key={index}>
                                <SingleComment refreshFunction={props.refreshFunction} postId={videoId} comment={comment} />
                                <ReplyComment
                                    refreshFunction={props.refreshFunction}
                                    commentList={props.commentList}
                                    parentCommentId={comment._id}
                                    postId={videoId}
                                />
                            </React.Fragment>
                        ))
                    )}
                </div>

                <div className="commentArea">
                    <Grommet theme={deepMerge(customTheme)}>
                        <Form onSubmit={onSubmit}>
                            <Box direction="row" gap="xsmall">
                                <Box width="80%">
                                    <TextArea
                                        name="comment"
                                        onChange={handleClick}
                                        value={commentValue}
                                        fill
                                    />
                                </Box>
                                <Box width="20%">
                                    <Button type="submit" fill label="작성하기" primary />
                                </Box>
                            </Box>
                        </Form>
                    </Grommet>
                </div>
            </Box>
        </div>
    );
}

export default Comment;