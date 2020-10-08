import React from 'react';
import {Box, Button, Nav, Text} from 'grommet';
import {Youtube} from 'grommet-icons';

import RightMenu from './Sections/RightMenu';

function NavBar(props) {
    return (
        <Nav width="100%" height="100%" pad={{left: 'large', right: 'small', vertical: 'small'}}>
            <Box direction="row" justify="stretch" align="center">
                <Box width="15%">
                    <Button icon={<Youtube />} label="모두의 클립" plain href="/" />
                </Box>
                <Box width="85%" align="end">
                    <RightMenu />
                </Box>
            </Box>
        </Nav>
    );
}

export default NavBar;