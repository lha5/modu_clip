import React, {useEffect, useState} from 'react';
import axios from 'axios';
import moment from 'moment';

import {Box, Grommet, Heading} from 'grommet';

import {VIDEO_SERVER} from '../../config';

import {customBreakpoints, rows, Responsive} from '../ResponsiveGridConfig';
import '../../css/landingPage.css';

function LandingPage() {
    const [clips, setClip] = useState([]);

    useEffect(() => {
        axios.get(`${VIDEO_SERVER}/getVideos`)
            .then(response => {
                if (response.data.success) {
                    setClip(response.data.videos);
                } else {
                    alert('영상을 로드할 수 없습니다.');
                }
            });
    }, []);

    const renderCards = clips.map((video, index) => {
        let minutes = Math.floor(video.duration / 60);
        let seconds = Math.floor((video.duration - minutes * 60));

        return (
            <div className="clips">
                <div id="imgContainer" key={video._id}>
                    <a href="/">
                        <img alt={video.title} src={`http://localhost:5000/${video.thumbnail}`} />
                        <span id="runningTime">{minutes} : {seconds}</span>
                    </a>
                </div>
                <div className="videoInfo">
                    <div className="avatar">
                        <img src={video.writer.image} alt={video.writer.name} />
                    </div>
                    <div className="information">
                        <div><span>{video.title}</span></div>
                        <div className="info_style">{video.writer.name}</div>
                        <div className="info_style">
                            조회수
                            <span> {video.views}</span>
                            <span><b> · </b></span>
                            <span>
                                {moment(video.createdAt).startOf('hour').fromNow()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <Grommet theme={customBreakpoints}>
            <Box
                pad="large"
                align="center"
            >
                <Heading level={3} alignSelf="start">Recommended</Heading>
                <Responsive gap="medium" rows={rows}>
                    {renderCards}
                </Responsive>
            </Box>
        </Grommet>
    );
}

export default LandingPage;