import React from 'react';
import {Box, Nav, Heading, Text, TextInput, Grommet} from 'grommet';
import { grommet } from 'grommet/themes'
import { deepMerge } from 'grommet/utils';
import { Search } from 'grommet-icons';

import RightMenu from './Sections/RightMenu';

const myCustomTheme = (grommet, {
    global: {
        colors: {
            border: "brand"
        },
        control: {
            border: {
                radius: "7px"
            }
        },
        focus: {
            shadow: {
                size: "none"
            }
        },
        font: {
            size: '0.8rem'
        }
    }
});

function NavBar(props) {
    return (
        <Nav width="100%" height="100%" pad={{horizontal: '15%', vertical: 'small'}}>
            <Box direction="row" justify="between" align="center">
                <Box
                    direction="column"
                    align="center"
                    pad="small"
                    onClick={() => {window.location.replace('/');}}
                    focusIndicator={false}
                >
                    <Text color="dark-3" size="small">모두의 클립</Text>
                    <Heading margin="none" level={2} color="brand">Modu Clip</Heading>
                </Box>
                <Box>
                    <Grommet theme={deepMerge(myCustomTheme)}>
                        <TextInput icon={<Search />} placeholder="search ..." />
                    </Grommet>
                </Box>
                <Box>
                    <RightMenu />
                </Box>
            </Box>
        </Nav>
    );
}

export default NavBar;