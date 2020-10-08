import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import moment from 'moment';

import {Box, Button, Form, FormField, grommet, Grommet, Heading, MaskedInput} from 'grommet';
import {deepMerge} from "grommet/utils";
import validator from 'validator/es';

import {signUpUser} from '../../../_actions/user_actions';
import axios from "axios";
import {USER_SERVER} from "../../config";

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

function SignUpPage(props) {

    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [isDup, setIsDup] = useState(false);

    const validEmail = () => {
        return validator.isEmail(email);
    };

    const onEmailCheck = async (email) => {
        let result = false;

        await axios
            .post(`${USER_SERVER}/checkEmail`, {email: email})
            .then(response => {
                if (response.data.isExist) {
                    result = true;
                } else {
                    result = false;
                }
            });
        setIsDup(result);
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
                        onSubmit={({value, touched}) => {
                            setTimeout(() => {
                                let dataToSubmit = {
                                    name: name,
                                    email: email,
                                    password: password,
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
                            onChange={event => {
                                setName(event.currentTarget.value);
                            }}
                            validate={name => {
                                if (name && name.length <= 1) return {message: '이름은 2글자 이상이어야 합니다.', status: 'error'}
                            }}
                        >
                        </FormField>

                        <FormField
                            label="이메일"
                            type="email"
                            name="email"
                            required
                            onChange={event => {
                                setEmail(event.currentTarget.value);
                            }}
                            validate={(email) => {
                                onEmailCheck(email);
                            }}
                            error={isDup ? '이미 사용중인 이메일 입니다.' : undefined}
                        >
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
                            onChange={event => {
                                setPassword(event.currentTarget.value);
                            }}
                            validate={password => {
                                if (password && password.length <= 7) {
                                    return {message: '비밀번호는 8자 이상이어야 합니다.', status: 'error'}
                                }
                            }}
                        >
                        </FormField>

                        <FormField
                            label="비밀번호 확인"
                            name="confirm"
                            type="password"
                            required
                            onChange={event => {
                                setConfirm(event.currentTarget.value);
                            }}
                            validate={value => {
                                if (value !== password) {
                                    return {message: '비밀번호가 일치하지 않습니다.', status: 'error'}
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