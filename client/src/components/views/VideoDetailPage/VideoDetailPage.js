import React, {useEffect, useState} from 'react';
import axios from 'axios';
import moment from 'moment';

import {Avatar, Box, Button, Grommet, Video} from 'grommet';
import {Like, Dislike} from 'grommet-icons';

import {Responsive, customBreakpoints} from '../../responsiveConfig/ResponsiveGridConfig';
import {VIDEO_SERVER} from '../../config';
import SideVideo from "./Section/SideVideo";
import Subscribe from './Section/Subscribe';

import '../../css/videoDetailPage.css';

const columns = {
    small: ['auto'],
    medium: ['auto', 'auto'],
    large: ['auto', 'auto'],
    xlarge: ['auto', 'auto'],
};

const rows = {
    small: ['auto', 'auto'],
    medium: ['auto'],
    large: ['auto'],
    xlarge: ['auto'],
};

function VideoDetailPage(props) {
    const videoId = props.match.params.videoId;

    const videoVariable = {videoId: videoId};

    const [video, setVideo] = useState([]);

    useEffect(() => {
        axios.post(`${VIDEO_SERVER}/getVideo`, videoVariable)
            .then(response => {
                if (response.data.success) {
                    setVideo(response.data.video);
                }
                else {
                    alert('영상 정보를 가져오지 못했습니다.');
                }
            });
    }, []);

    if (video.writer) {
        return (
            <Grommet theme={customBreakpoints}>
                <Box pad={{horizontal: 'large'}} align="center">
                    <Responsive gap="small" rows={rows} columns={columns}>
                        <Box direction="column" gap="small" style={{maxWidth: "750px", minWidth: "400px", height: "auto"}}>
                            <Video controls="over" fit="contain">
                                <source key="video" src={`http://localhost:5000/${video.filePath}`} />
                            </Video>
                            <Box pad="small">
                                <span id="video_title">{video.title}</span>
                            </Box>
                            <Box direction="row" justify="between" pad={{horizontal: "small"}}>
                                <Box justify="center">
                                    <span id="video_view_date">
                                        조회수 {video.views} <b>·</b> {moment(video.createdAt).format('YYYY[.] MM[.] DD[.]')}
                                    </span>
                                </Box>
                                <Box direction="row" justify="center" gap="medium">
                                    <Button icon={<Like />} label="0" plain />
                                    <Button icon={<Dislike />} label="0" plain />
                                    <Subscribe userTo={video.writer._id} userFrom={localStorage.getItem('userId')} />
                                </Box>
                            </Box>
                            <Box pad="small" direction="row" gap="medium">
                                <Avatar src={video.writer && video.writer.image} size="medium" />
                                <Box>{video.writer.name}</Box>
                            </Box>
                            <Box pad={{left: 'large'}}>{video.description}</Box>
                            <Box>
                                코멘트
                            </Box>
                        </Box>
                        <Box margin={{left: 'small'}}>
                            <SideVideo />
                        </Box>
                    </Responsive>
                </Box>
            </Grommet>
        );
    } else {
        return (
            <Box>
                Loading...
            </Box>
        );
    }
}

export default VideoDetailPage;