import React, {useEffect, useState} from 'react';
import axios from 'axios';

import {Box} from 'grommet';

import {SUBSCRIBE_SERVER} from '../../../config';
import '../../../css/subscribe_button.sass';

function Subscribe(props) {

    const [subscribeNumber, setSubscribeNumber] = useState(0);
    const [subscribed, setSubscribed] =  useState(false);

    const subscribeOrNot = () => {

        let subscribeVariable = {
            userTo: props.userTo,
            userFrom: props.userFrom
        };

        if (subscribed) {
            // 구독 중 - 구독 취소 하기
            axios
                .post(`${SUBSCRIBE_SERVER}/unSubscribe`, subscribeVariable)
                .then(response => {
                    if (response.data.success) {
                        setSubscribeNumber(subscribeNumber - 1);
                        setSubscribed(!subscribed);
                    }
                    else {alert('구독 취소를 할 수 없습니다.');}
                });
        } else {
            // 아직 구독 중이 아님 - 구독 하기
            axios
                .post(`${SUBSCRIBE_SERVER}/subscribe`, subscribeVariable)
                .then(response => {
                    if (response.data.success) {
                        setSubscribeNumber(subscribeNumber + 1);
                        setSubscribed(!subscribed);
                    }
                    else {alert('구독을 할 수 없습니다.');}
                });
        }
    };

    useEffect(() => {

        const variable = {userTo: props.userTo, userFrom: props.userFrom};

        axios
            .post(`${SUBSCRIBE_SERVER}/subscribeNumber`, variable)
            .then(response => {
                if (response.data.success) {
                    setSubscribeNumber(response.data.subscribeNumber);
                }
                else {
                    alert('구독자 정보를 가져올 수 없습니다.');
                }
            });

        let subscribedVariable = {userTo: props.userTo, userFrom: localStorage.getItem('userId')};

        axios
            .post(`${SUBSCRIBE_SERVER}/subscribed`, subscribedVariable)
            .then(response => {
                if (response.data.success) {
                    setSubscribed(response.data.subscribed);
                }
                else {
                    alert('정보를 가져올 수 없습니다.');
                }
            });

    }, []);

    return (
        <Box>
            <button
                className={subscribed ? 'subscribed' : 'notSubscribed'}
                onClick={subscribeOrNot}
            >
                {subscribeNumber} {subscribed ? '구독중' : '구독'}
            </button>
        </Box>
    );
}

export default Subscribe;