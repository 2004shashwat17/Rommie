import {Box, Typography, styled} from '@mui/material';

const Image = styled(Box)`
    background: 
        linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
        url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg) center/55% repeat-x;
    width: 100%;
    height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const Heading = styled(Typography)`
    font-size:70px;
    color: #FFFFFF;
    line-height: 1
`
const SubHeading = styled(Typography)`
    font-size: 20px;
    color: #FFFFFF;
    line-height: 1
    backgound: #FFFFFF;
`
const Banner = () => {
  return (
    <Image>
        <Heading>ROOMIES</Heading>
        <SubHeading>The fastest, safest, and free way of finding your next roommate</SubHeading>
    </Image>
  )
}

export default Banner;
