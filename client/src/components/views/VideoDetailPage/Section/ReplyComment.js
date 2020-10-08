import React, {useEffect, useState} from 'react';

import SingleComment from './SingleComment';

function ReplyComment(props) {
    const [childCommentQuantity, setChildCommentQuantity] = useState(0);

    const [openReplyComments, setOpenReplyComments] = useState(false);

    useEffect(() => {
        let howManyComments = 0;

        props.commentList.map((comment) => {
            if (comment.responseTo === props.parentCommentId) {
                howManyComments ++;
            }
        });

        setChildCommentQuantity(howManyComments);
    }, [props.commentList]); // commentList가 바뀔 때마다 useEffect()를 다시 실행한다.

    let renderReplyComment = (parentCommentId) => props.commentList.map((comment, index) => (
            <React.Fragment key={index}>
                {
                    comment.responseTo === parentCommentId &&
                    <div id="reply_depth">
                        <SingleComment refreshFunction={props.refreshFunction} postId={props.videoId} comment={comment} />
                        <ReplyComment
                            refreshFunction={props.refreshFunction}
                            commentList={props.commentList}
                            parentCommentId={comment._id}
                            postId={props.videoId}
                        />
                    </div>
                }
            </React.Fragment>
        ));

    const handleChange = () => {
        setOpenReplyComments(!openReplyComments);
    };

    return (
        <div>
            {childCommentQuantity > 0 &&
                <p id="moreComments" onClick={handleChange}>
                    {childCommentQuantity}개의 댓글 더보기
                </p>
            }
            {
                openReplyComments && renderReplyComment(props.parentCommentId)
            }
        </div>
    );
}

export default ReplyComment;