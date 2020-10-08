import React, {useEffect, useState} from 'react';
import axios from 'axios';

import {Like, Dislike} from 'grommet-icons';

import '../../../css/likeDislikes.css';

function LikeDislikes(props) {
    let variable = {
    };

    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [myLikeAction, setMyLikeAction] = useState(null);
    const [myDislikeAction, setMyDislikeAction] = useState(null);

    if (props.video) {
        variable = {
            videoId : props.video._id,
            userId: props.userId
        };
    } else {
        variable = {
            commentId : props.commentId,
            userId: props.userId
        }
    }

    useEffect(() => {
        axios
            .post('/api/like/getLikes', variable)
            .then(response => {
                if (response.data.success) {
                    // 얼마나 많은 좋아요를 받았는가?
                    setLikes(response.data.likes.length);

                    // 내가 좋아요를 이미 눌렀는가?
                    response.data.likes.map(like => {
                        if (like.userId === props.userId) {
                            setMyLikeAction('liked');
                        }
                    });
                }
                else {
                    console.log('정보를 가져오는데 실패했습니다.');
                }
            });

        axios
            .post('/api/like/getDislikes', variable)
            .then(response => {
                if (response.data.success) {
                    // 얼마나 많은 좋아요를 받았는가?
                    setDislikes(response.data.likes.length);

                    // 내가 좋아요를 이미 눌렀는가?
                    response.data.likes.map(like => {
                        if (like.userId === props.userId) {
                            setMyDislikeAction('disliked');
                        }
                    });
                }
                else {
                    console.log('정보를 가져오는데 실패했습니다.');
                }
            });
    }, []);

    const onLike = () => {
        if (myLikeAction === null) {
            axios
                .post('/api/like/uplike', variable)
                .then(response => {
                    if (response.data.success) {
                        setLikes(likes + 1);
                        setMyLikeAction('liked');

                        if (myDislikeAction !== null) {
                            setMyDislikeAction(null);
                            setDislikes(dislikes - 1);
                        }
                    } else {
                        alert('좋아요를 올리지 못했습니다.');
                    }
                });
        } else if (myLikeAction === 'liked') {
            axios
                .post('/api/like/unLike', variable)
                .then(response => {
                    if (response.data.success) {
                        setLikes(likes - 1);
                        setMyLikeAction(null);
                    } else {
                        alert('좋아요를 취소하지 못했습니다.');
                    }
                });
        }
    };

    const onDislike = () => {
        if (myDislikeAction === null) {
            axios
                .post('/api/like/upDislike', variable)
                .then(response => {
                    if (response.data.success) {
                        setDislikes(dislikes + 1);
                        setMyDislikeAction('disliked');

                        if (myLikeAction !== null) {
                            setMyLikeAction(null);
                            setLikes(likes - 1);
                        }
                    } else {
                        alert('싫어요를 올리지 못했습니다.');
                    }
                });
        } else if (myDislikeAction === 'disliked') {
            axios
                .post('/api/like/unDislike', variable)
                .then(response => {
                    if (response.data.success) {
                        setDislikes(dislikes - 1);
                        setMyDislikeAction(null);
                    } else {
                        alert('싫어요를 취소하지 못했습니다.');
                    }
                });
        }
    };

    return (
        <div className="likeDislikeContainer">
            <span className="likeAndDislike" onClick={onLike}>
                <Like size="small" color={myLikeAction === 'liked' ? 'red' : 'plain'} />
                <span> {likes} </span>
            </span>
            <span className="likeAndDislike" onClick={onDislike}>
                <Dislike size="small" color={myDislikeAction === 'disliked' ? 'red' : 'plain'} />
                <span> {dislikes} </span>
            </span>
        </div>
    );
}

export default LikeDislikes;