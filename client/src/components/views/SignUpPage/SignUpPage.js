import React from 'react';
import {useDispatch} from 'react-redux';
import {Box, Button, Form, FormField, grommet, Grommet, Heading, MaskedInput} from 'grommet';
import moment from 'moment';

import {signUpUser} from '../../../_actions/user_actions';
import {deepMerge} from "grommet/utils";

function SignUpPage(props) {

    const dispatch = useDispatch();

    const defaultValue = {
        name: '',
        email: '',
        password: '',
        comfirm: '',
    };

    const [value, setValue] = React.useState(defaultValue);

    let pass = value.password;

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
                        <Heading level={2} color="dark-2">회원 가입</Heading>
                    </Box>
                    <Form
                        validate="blur"
                        value={value}
                        onChange={nextValue => {
                            setValue(nextValue);
                        }}
                        onSubmit={({value, touched}) => {
                            setTimeout(() => {
                                let dataToSubmit = {
                                    name: value.name,
                                    email: value.email,
                                    password: value.password,
                                    lastname: '',
                                    image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`
                                };

                                dispatch(signUpUser(dataToSubmit))
                                    .then(response => {
                                        if (response.payload.success) {
                                            alert('회원 가입을 환영합니다 :D');
                                            props.history.push("/login");
                                        }
                                        else {alert('회원 가입을 할 수 없습니다.');}
                                    })
                            }, 500);
                        }}
                    >
                        <FormField
                            label="이름"
                            name="name"
                            required
                            validate={name => {
                                if (name && name.length <= 1) {return '이름은 2글자 이상이어야 합니다.'}
                            }}
                        >
                        </FormField>

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
                            validate={password => {
                                if (password && password.length <= 7) {
                                    return {message: '비밀번호는 8자 이상이어야 합니다.', status: 'info'}
                                }
                                return undefined;
                            }}
                        >
                        </FormField>

                        <FormField
                            label="비밀번호 확인"
                            name="confirm"
                            type="password"
                            required
                            validate={value => {
                                if (value !== pass) {
                                    return {message: '비밀번호가 일치하지 않습니다.', status: 'info'}
                                }
                                return undefined;
                            }}
                        >
                        </FormField>

                        <Box align="center" pad="medium" margin={{top: 'medium'}}>
                            <Button type="submit" label="회원 가입" primary />
                        </Box>
                    </Form>
                </Box>
            </Box>
        </Grommet>
    );
}

export default SignUpPage;