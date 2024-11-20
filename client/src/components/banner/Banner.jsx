
import { styled, Box, Typography } from '@mui/material';

const Image = styled(Box)`
    background: 
        linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), 
        url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg) center/55% repeat-x;
    width: 100%;
    height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const Heading = styled(Typography)`
    font-size: 70px;
    color: #FFFFFF;
    line-height: 1
`;

const SubHeading = styled(Typography)`
    margin: 7px;
    font-size: 15px;
    background: #FFFFFF;
`;

const Banner = () => {
    
    return (
        <Image>
            <Heading>ROMMIE🤝</Heading>
            <SubHeading>Finding comfort in the chaos of roommate life.</SubHeading>
        </Image>
    )
}

export default Banner;