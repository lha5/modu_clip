import React from 'react';
import {Box, Button, Nav} from 'grommet';
import {CirclePlay} from 'grommet-icons';

import RightMenu from './Sections/RightMenu';
import LeftMenu from './Sections/LeftMenu';

function NavBar(props) {
    return (
        <Nav width="100%" height="100%" pad={{left: 'medium' ,right: 'small', vertical: 'small'}}>
            <Box direction="row" justify="stretch" align="center">
                <Button icon={<CirclePlay />} plain label="Modu Clip" />
                <Box width="100%" direction="row" justify="between" margin="none">
                    <LeftMenu />
                    <RightMenu />
                </Box>
            </Box>
        </Nav>
    );
}

export default NavBar;