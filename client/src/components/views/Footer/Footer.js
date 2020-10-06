import React from 'react';
import {Anchor, Box, Text} from 'grommet';
import {CirclePlay, Instagram, FacebookOption, Twitter} from 'grommet-icons';

function Footer(props) {
    const Media = () => (
        <Box direction="row" gap="xxsmall" justify="center" pad="medium">
            <Anchor
                target="_blank"
                a11yTitle="Share feedback on Github"
                href="https://www.instagram.com/"
                icon={<Instagram />}
            />
            <Anchor
                target="_blank"
                a11yTitle="Chat with us on Slack"
                href="https://www.facebook.com/"
                icon={<FacebookOption />}
            />
            <Anchor
                target="_blank"
                a11yTitle="Follow us on Twitter"
                href="https://twitter.com/"
                icon={<Twitter />}
            />
        </Box>
    );

    return (
        <Box background="brand" pad={{horizontal: '15%'}} direction="row" justify="between" margin="none">
            <Box align="center" direction="row" pad={{vertical: 'medium'}}>
                <Box direction="column">
                    <Box direction="row">
                        <CirclePlay />
                        &nbsp;
                        <Text size="small" weight="bold">
                            모두의 클립 Modu Clip
                        </Text>
                    </Box>
                    <Box pad={{left: 'xxsmall'}} margin={{top: 'xsmall'}}>
                        <Text textAlign="center" size="xsmall">
                            © Modu Clip ALL RIGHTS RESERVED
                        </Text>
                    </Box>
                </Box>
            </Box>
            <Media />
        </Box>
    );
}

export default Footer;