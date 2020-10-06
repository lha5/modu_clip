import React, {useEffect, useState} from 'react';
import {Box} from 'grommet';
import axios from "axios";
import {VIDEO_SERVER} from "../../../config";
import moment from "moment";

function SideVideo(props) {
    const [sideVideos, setSideVideos] = useState([]);

    useEffect(() => {
        axios.get(`${VIDEO_SERVER}/getVideos`)
        .then(response => {
            if (response.data.success) {
                setSideVideos(response.data.videos);
            } else {
                alert('영상을 로드할 수 없습니다.');
            }
        });
    }, []);

    const sideVideoItem  = sideVideos.map((video, index) => {

        let minutes = Math.floor(video.duration / 60);
        let seconds = Math.floor((video.duration - minutes * 60));

        return (
            <Box direction="row" key={index} gap="xsmall">
                <Box justify="center" margin="xsmall">
                    <img id="sideThumbnail" src={`http://localhost:5000/${video.thumbnail}`} alt={video.title} />
                </Box>
                <Box id="sideVideoInfo" direction="column" pad="small">
                    <span>{video.title}</span>
                    <span>{video.writer.name}</span>
                    <span>조회수 {video.views} · {moment(video.createdAt).startOf('hour').fromNow()}</span>
                    <span>{minutes} : {seconds}</span>
                </Box>
            </Box>
        );
    });

    return (
        <React.Fragment>
            {sideVideoItem }
        </React.Fragment>
    );
}

export default SideVideo;