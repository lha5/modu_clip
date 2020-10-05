import React from 'react';
import {withRouter} from 'react-router-dom';
import {loginUser} from '../../../_actions/user_actions';
import {Grommet, Form, Box, FormField, MaskedInput, Button, grommet, Heading, Anchor} from 'grommet';
import {useDispatch} from 'react-redux';
import {deepMerge} from "grommet/utils";

function LoginPage(props) {

    const dispatch = useDispatch();

    const [value, setValue] = React.useState({email: '', password: ''});

    const customFormFieldTheme = {
        formField: {
            label: {
                size: 'small',
                weight: 500,
                color: 'dark-3',
                margin: {top: 'medium', bottom: 'none'}
            },
        },
    };

    return (
        <Grommet theme={deepMerge(grommet, customFormFieldTheme)}>
            <Box fill align="center" justify="center">
                <Box width="medium">
                    <Box align="center">
                        <Heading level={2} color="dark-2">로그인</Heading>
                    </Box>
                    <Form
                        validate="submit"
                        value={value}
                        onChange={nextValue => {
                            setValue(nextValue);
                        }}
                        onSubmit={({value, touched}) => {
                            setTimeout(() => {
                                let dataToSubmit = {
                                    email: value.email,
                                    password: value.password
                                };

                                dispatch(loginUser(dataToSubmit))
                                    .then(response => {
                                        if (response.payload.loginSuccess === true) {
                                            console.log('로그인', response.payload);
                                            props.history.push('/');
                                        } else {
                                            alert('이메일이나 비밀번호를 다시 확인해주세요.');
                                        }
                                    })
                                    .catch(err => {
                                        alert('이메일이나 비밀번호를 다시 확인해주세요.');
                                    });
                            }, 500);
                        }}
                    >
                        <FormField label="이메일" name="email" required>
                            <MaskedInput
                                name="email"
                                mask={[
                                    {regexp: /^[\w\-_.]+$/, placeholder: 'example'},
                                    {fixed: '@'},
                                    { regexp: /^[\w]+$/, placeholder: 'naver' },
                                    { fixed: '.' },
                                    { regexp: /^[\w]+$/, placeholder: 'com' },
                                ]}
                            />
                        </FormField>

                        <FormField
                            label="비밀번호"
                            name="password"
                            type="password"
                            required
                        >
                        </FormField>

                        <Box align="center" pad="medium" margin={{top: 'medium'}}>
                            <Button type="submit" label="로그인" primary />
                        </Box>
                        <Box align="center" pad="medium" margin={{top: 'small'}}>
                            <Anchor href="/" color="light-5" size="small">비밀번호를 잊으셨나요?</Anchor>
                        </Box>
                    </Form>
                </Box>
            </Box>
        </Grommet>
    );
}

export default withRouter(LoginPage);