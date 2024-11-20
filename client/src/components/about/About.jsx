
import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Instagram, Email, LinkedIn } from '@mui/icons-material';

const Banner = styled(Box)`
    background-image: url(https://www.wallpapertip.com/wmimgs/23-236943_us-wallpaper-for-website.jpg);
    width: 100%;
    height: 50vh;
    background-position: left 0px bottom 0px;
    background-size: cover;
`;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
`;

const About = () => {

    return (
        <Box>
            <Banner/>
            <Wrapper>
                <Typography variant="h3">Shashwat Saxena</Typography>
                <Text variant="h5">Hi 👋, I'm Shashwat Saxena
                A passionate Full Stack Web Devloper from India
                Built websites, UI/UX design's<br />
                If you are interested, you can view some of my favorite projects here
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://github.com/2004shashwat17" color="inherit" target="_blank"><GitHub /></Link>
                    </Box>
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://github.com/2004shashwat17" color="inherit" target="_blank"><LinkedIn/></Link>
                    </Box>
                </Text>
                <Text variant="h5">
                    Need something built or simply want to have chat? Reach out to me on
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://www.instagram.com/shashwats500/" color="inherit" target="_blank">
                            <Instagram />
                        </Link>
                    </Box>  
                        or send me an Email 
                        <Link href="mailto:shashwats500@gmail.com?Subject=This is a subject" target="_blank" color="inherit">
                            <Email />
                        </Link>.
                </Text>
            </Wrapper>
        </Box>
    )
}

export default About;