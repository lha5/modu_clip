import React, {useState} from 'react';
import {Box, Button, Form, FormField, grommet, Grommet, Heading, Image, Select, TextArea, TextInput} from 'grommet';
import Dropzone from 'react-dropzone';
import {Upload} from 'grommet-icons';
import {deepMerge} from "grommet/utils";
import axios from 'axios';

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
    const defaultValue = {
        videoTitle: '',
        description: '',
        show: 1,
        category: 'VLOG',
    };

    const [value, setValue] = useState(defaultValue);

    const onDrop = (files) => {
        let formData = new FormData;
        const config = {
            header: {'content-type': 'multipart/form-data'}
        };
        formData.append("file", files[0]);

        axios.post('/api/video/uploadfiles', formData, config)
            .then(response => {
                if (response.data.success) {
                    console.log('success');
                }
                else {
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
                        value={value}
                        onChange={nextValue => {
                            setValue(nextValue);
                        }}
                        onSubmit={({value, touched}) => {
                            console.log('input value:', value, touched);
                        }}
                    >
                        <Box direction="row" gap="small" justify="center">
                            <Dropzone
                                onDrop={onDrop}
                                multiple={false}
                                maxSize={100000000}
                            >
                                {({getRootProps, getInputProps}) => (
                                    <Box border={{color: 'dark-2', size: '3px'}} align="center" pad="xlarge" {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <Upload />
                                    </Box>
                                )}
                            </Dropzone>
                            <Box border pad="xlarge">
                                썸네일
                            </Box>
                        </Box>
                        <Box pad="large">
                            <FormField label="제목" htmlFor="text-area" name="videoTitle">
                                <TextInput name="videoTitle" />
                            </FormField>
                            <br />
                            <FormField label="영상 설명" name="description">
                                <TextArea name="description" />
                            </FormField>
                            <br />
                            <FormField label="공개 여부" name="show" width="25%">
                                <Select options={[0, 1]} id="show" name="show" />
                            </FormField>
                            <br />
                            <FormField label="분류" name="category" width="25%">
                                <Select options={['VLOG', '애니메이션']} id="category" name="category" />
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