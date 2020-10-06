import React, {useState} from 'react';
import {
    Box,
    Button,
    Form,
    FormField,
    grommet,
    Grommet,
    Heading,
    Image,
    Select,
    Text,
    TextArea,
    TextInput
} from 'grommet';
import Dropzone from 'react-dropzone';
import {Upload} from 'grommet-icons';
import {deepMerge} from "grommet/utils";
import axios from 'axios';
import {useSelector} from "react-redux";

import {VIDEO_SERVER} from "../../config";

const customFormFieldTheme = {
    global: {
        font: {
            size: '14px',
        },
        input: {
            weight: 100
        },
    },
    formField: {
        label: {
            color: 'dark-3',
            size: 'small',
            margin: { vertical: '0', bottom: 'small', horizontal: '0' },
            weight: 600,
        },
        border: false,
        margin: '0',
    },
};

function VideoUploadPage(props) {
    const user = useSelector(state => state.user);

    const [videoTitle, setVideoTitle] = useState('');
    const [description, setDescription] = useState('');
    const [privacy, setPrivacy] = useState(1);
    const [category, setCategory] = useState('VLOG');
    const [filePath, setFilePath] = useState('');
    const [duration, setDuration] = useState('');
    const [thumbnailPath, setThumbnailPath] = useState('');

    const privacyOptions = [
        {
            label: '공개',
            value: 1
        },
        {
            label: '비공개',
            value: 0
        }
    ];

    const categoryOptions = [
        {
            label: 'VLOG',
            value: 0
        },
        {
            label: '애니메이션',
            value: 0
        },
        {
            label: 'Music',
            value: 0
        },
        {
            label: '반려동물',
            value: 0
        },
        {
            label: '기타',
            value: 0
        }
    ];

    const onDrop = (files) => {
        let formData = new FormData();

        const config = {
            header: {'content-type': 'multipart/form-data'}
        };

        formData.append("file", files[0]);

        axios.post('/api/video/uploadfiles', formData, config)
            .then(response => {
                if (response.data.success) {
                    let variable = {
                        url: response.data.url,
                        fileName: response.data.fileName
                    };
                    setFilePath(response.data.url);

                    axios.post('/api/video/thumbnail', variable)
                        .then(response => {
                            if (response.data.success) {
                                console.log('썸네일 response data', response.data);
                                setDuration(response.data.fileDuration);
                                setThumbnailPath(response.data.url);
                            } else {
                                alert('영상 썸네일 생성을 할 수 없습니다.');
                            }
                        });
                }
                else {
                    alert('영상을 저장 할 수 없습니다.');
                }
            });
    };

    const onSubmit = (event) => {

        event.preventDefault();

        if (user.userData && !user.userData.isAuth) {
            return alert('로그인 정보가 없습니다.');
        }

        const dataToSubmit = {
            writer: user.userData._id,
            title: videoTitle,
            description: description,
            privacy: privacy,
            filePath: filePath,
            category: category,
            duration: duration,
            thumbnail: thumbnailPath,
        }

        axios.post(`${VIDEO_SERVER}/uploadVideo`, dataToSubmit)
            .then(response => {
                if (response.data.success) {
                    alert('영상을 성공적으로 업로드 하였습니다.');
                    props.history.push('/');
                } else {
                    alert('영상 업로드를 할 수 없습니다.');
                }
            });
    };

    return (
        <Grommet theme={deepMerge(grommet, customFormFieldTheme)}>
            <Box gap="small" margin="none" pad="medium" width="100%" align="center">
                <Box align="center" width="55%">
                    <Heading level={2} color="dark-2">영상 업로드</Heading>
                </Box>
                <Box width="55%">
                    <Form
                        onSubmit={onSubmit}
                        validate="submit"
                    >
                        <Box direction="row" gap="small" justify="center">
                            <Dropzone
                                onDrop={onDrop}
                                multiple={false}
                                maxSize={100000000}
                            >
                                {({getRootProps, getInputProps}) => (
                                    <Box border={{color: 'dark-2', size: '3px'}} justify="center" align="center" width="240px" height="240px" {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <Upload />
                                    </Box>
                                )}
                            </Dropzone>
                            <Box border={{color: 'dark-2',size: '3px'}} align="center" width="320px" height="240px">
                                {!thumbnailPath && <Text color="light-4" size="xsmall">썸네일이 여기에 표시됩니다</Text>}
                                {thumbnailPath && <Image src={`http://localhost:5000/${thumbnailPath}`} />}
                            </Box>
                        </Box>
                        <Box pad="large">
                            <FormField
                                label="제목"
                                htmlFor="text-area"
                                name="videoTitle"
                                required
                            >
                                <TextInput
                                    name="videoTitle"
                                    value={videoTitle}
                                    onChange={event => setVideoTitle(event.target.value)}
                                />
                            </FormField>
                            <br />
                            <FormField label="영상 설명" name="description" required>
                                <TextArea
                                    name="description"
                                    value={description}
                                    onChange={event => setDescription(event.target.value)}
                                />
                            </FormField>
                            <br />
                            <FormField label="공개 여부" name="privacy" width="25%">
                                <Select
                                    options={privacyOptions}
                                    id="privacy"
                                    name="privacy"
                                    labelKey="label"
                                    value={privacy}
                                    valueKey={{ key: 'value', reduce: true }}
                                    onChange={event => setPrivacy(event.value)}
                                />
                            </FormField>
                            <br />
                            <FormField label="분류" name="category" width="25%">
                                <Select
                                    options={categoryOptions}
                                    id="category"
                                    name="category"
                                    labelKey="label"
                                    value={category}
                                    valueKey={{ key: 'label', reduce: true }}
                                    onChange={event => setCategory(event.value)}
                                />
                            </FormField>
                        </Box>
                        <Box align="center" margin={{bottom: 'medium'}}>
                            <Button label="업로드" type="submit" primary />
                        </Box>
                    </Form>
                </Box>
            </Box>
        </Grommet>
    );
}

export default VideoUploadPage;