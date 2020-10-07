import React from 'react';
import {Box, Button} from 'grommet';

function LeftMenu(props) {
    return (
        <Box justify="center">
            <Button size="small" label="구독" href="/subscription" />
        </Box>
    );
}

export default LeftMenu;