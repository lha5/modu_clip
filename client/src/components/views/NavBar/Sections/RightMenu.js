import React from 'react';
import axios from 'axios';

import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {Box, Button} from 'grommet';

import { USER_SERVER } from '../../../config';

function RightMenu(props) {
    const user = useSelector(state => state.user);

    const logoutHandler = () => {
        axios
            .get(`${USER_SERVER}/logout`)
            .then(response => {
                if (response.status === 200) {
                    window.localStorage.removeItem('userId');
                    props.history.push('/');
                }
                else {
                    alert('로그아웃 실패:(');
                }
            });
    };

    if (user.userData && !user.userData.isAuth) {
        return (
            <Box direction="row" gap="small" pad="small">
                <Button size="small" href="/login" label="Sign In" primary />
                <Button size="small" href="/signup" label="Sign Up" />
            </Box>
        );
    } else {
        return (
            <Box direction="row" gap="small" pad="small">
                <Button size="small" href="/video/upload" label="upload" />
                <Button size="small" label="구독" href="/subscription"/>
                <Button size="small" onClick={logoutHandler} label="Sign Out" />
            </Box>
        );
    }
}

export default withRouter(RightMenu);