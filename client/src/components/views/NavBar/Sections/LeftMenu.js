import React from 'react';
import {Box, Button, Nav, Sidebar} from 'grommet';
import {Projects, StatusInfoSmall, Clock, Configure, Split} from 'grommet-icons';

function LeftMenu(props) {
    const SidebarButton = ({ icon, label, ...rest }) => (
        <Box pad="small">
            <Button
                gap="xsmall"
                alignSelf="start"
                plain
                icon={icon}
                label={label}
                {...rest}
            />
        </Box>
    );

    return (
        <Box height={{min: '100%'}} width="20%" align="center">
            <Sidebar
                responsive={true}
                pad={{vertical: 'large', horizontal: 'medium'}}
                margin="none"
                width="100%"
            >
                <Nav>
                    <SidebarButton icon={<StatusInfoSmall />} label="Focus" />
                    <SidebarButton icon={<Projects />} label="Services" />
                    <SidebarButton icon={<Clock />} label="Glances" />
                    <SidebarButton icon={<Split />} label="Flows" />
                    <SidebarButton icon={<Configure />} label="Configure" />
                </Nav>
            </Sidebar>
        </Box>
    );
}

export default LeftMenu;