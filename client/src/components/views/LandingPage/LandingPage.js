import React from 'react';
import {Box} from 'grommet';

import LeftMenu from '../NavBar/Sections/LeftMenu';

function LandingPage() {
    return (
        <Box direction="row" gap="none">
            <LeftMenu />
            <Box margin="none" pad="medium" width="100%">
                메인 화면
            </Box>
        </Box>
    );
}

export default LandingPage;