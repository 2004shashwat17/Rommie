
import React, { useState, useEffect, useContext } from 'react';

import { TextField, Box, Button, Typography, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const Component = styled(Box)`
    width: 450px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Image = styled('img')({
    width: 150,
    display: 'flex',
    margin: 'auto',
    padding: '50px 0 0'
});

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: black;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`

const loginInitialValues = {
    username: '',
    password: ''
};

const signupInitialValues = {
    name: '',
    username: '',
    password: '',
};

const Login = ({ isUserAuthenticated }) => {
    const [login, setLogin] = useState(loginInitialValues);
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, showError] = useState('');
    const [account, toggleAccount] = useState('login');

    const navigate = useNavigate();
    const { setAccount } = useContext(DataContext);

    const imageURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARIAAAC4CAMAAAAYGZMtAAAA/1BMVEX///8iGBYAAAAhGRb//v////0iGRQjGBQjFxe1tbQhFxX8/PwgGBUhGhQiFxX29PMQAAAXBwBsaGdIQj49ODYbEQ16dnTQzcwMAAAcEApNR0TJxsTw7vDd2ti+vbslGxkqJCGIg4StqqqdmJj/+P/lBRVmYmGHhYH4//n3////8PHZAADOAADnABDjAAASCQQvKidYVFPZ1dSopKEdDg9zb23t/vr//fT2ydDgqbPisrP/4+LbrbPrub/La2i1AADKABLkoKPNFC3LLzjmhI7/r7DIFyL2AAzRRk/MOULaCRfCAADoBhfuAybvlqHbVWTPXGPnfX7/7ub+5O00MC37l70IAAAQ2klEQVR4nO1bC1vjyLFttdSWUMuSDcgWtmT5ATaGYeQXmUk2yW6SvdnNLDdP/v9vuVXVkm3J8iww+y13Qp+PHcC0+nG66lRVt5YxDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ2N/25Y1lxcC0vMLfzGrOtrweaW9drTek0AJRL4+M38Uv5GXsrL+TV8MhevPa3XhPggLudziwkh5/P59SWYyOXl9fVrT+s1AZSwufz42999w6T49+9+/4cb4ES8cSthlzd//Pb29rs/ffj453fvbv/yzfyNO84cVOT7d+9/uHv46X/+enV1+8P7H2/m89ee1atCXM9v/vbD3adPV5+urq4+fXq4++mjfOMR53Ie/OXuCqh4uHq4u/vfh6tvPwr51ikRP77/9HB19YAAav76n/nbpgRj799vr+6ucny6+8fNG0/VBKRmN+A5dygkIK9333203ra6EiXzP3x3d/cAvgNq8v57YVlvOy+xLPAc8adb4uPh6v0/b+T8TbsNAMq9S4t9/+7TFTBy++ONBBt5y0aCyTxQcmmJf/10dXd3+7d/i7mU129UTMQO+Kv1/e3d+3/857Vn9arIySgomYt/vfvxm9ee1OuCqJhMJMutRIjf3og3LKxSoo4kPc7Pu5CtSRavEsQqee2ZvRoksBDMeGg4G94JmGQjngN+fpuAdffPeeoahuG2FgPGZq2G03Qa9vDNUsKCe74xXMM0jdQI+SlYjGM2Dccbkk+9KUiGhyHWSbvlOI7vp67dsG2j3e6FYDCG76You19D1Qc7Nzm9R5yuQRbZF8wZbSCZct9HRlwjNW27YRoGMQJeRJSwr4ASWMg9byP4CBf1ckqAXLkOs9RIgRMj5VHYaDSMLb4eSmAhnbaPc259ESUSlrvqcc+DtRuG0+Ljk6zlmV8lJQwoMXJKXuw4YCACI6+JduE6Lp/GTIDOhiYx9HVRAui0vpgSeKq/iJqgp0hJhLEXzab/yF3DV5T4b4wSFne41wTtsO00pAwNlq9ytoucEqN9ivnr10KJi4heQoklKdsYpy0PCUl9A/P4PYC+uI7vNprNRtRYC8XV0d7EfhGtpiKqqHvwKW2guqi2UdOpPoPyunEQSl6PjLJtjsmHJS2GX4I2XbB4yV03BQux3TafyMqMJrwFeoIG5PGzhMqeY4wcpwS/yaPL/TnaLII8bCNVt6qDvXkVQ8nShULxlCg1V+uxcBCSZqRkwjcpJPBgJW60rKwZKx7IVULDB8IML+STgH3uYI3mEcRJUFCCvIsgjpM4lrtJHTzF8ClAII+1QYNWjYJtP5Z6LlGfbactLbF9prQYSM2T7mDQTQLGtoNAYtcZ3fdHYybv0UEE64JnUOQ1zai5rk5HUpuTRWT4vuF6psnP+nXnBCLOwcTJ1OS8S0qMpIhkfXregqrR6XUGMatZLu5yd7QcYmk5XE5Wcp90EeQdS2x0lmGb03HAFOWiO+s58FH0OF0nijVCMZu40BFaVzyeDlUFu7g/iZmyC0DSP1/FaU8Ohmta7jTC5AMY8fh9XK8TggUdHjrYyDSz87pL0OA8NDHTvRf3PIOuuqRrWEJOW7y9cYFPN2zzxSxmpY3D30SwPuPRxnUhZ3bDiPfWgu00YMCbOEGegHtHIWyKu2nzxzEZ8wo+Uqqx2fCsE2+fglTNVxFnOwiLZybP4HmEl/EF2Dt9jgz2WNCbJqeTGa32FBK9JjwehQMmjggFLm3BHTAl2w57Vk3YAUo8kPj2fYe7qesqSmCLp7yV+rtsL4yyCSuVjxjqFzx0dzmhGfLH7q7NgDcweLTXw8w1PAPogf4gKoqAjXnmu1iQqZos8vpFr50WERXl8op7uA4jt8ixwARcgy/6hQPGPSteDjq97n1Oid1ouj4fYeS9rqME1BjYBMlxXZsoqbUSlen6Ia7cySkZ8MxNfV/tjOlDrQAG1ItLYUCOOFZRRRswJxNIme1ZiaoqWtgKmfNS10t9fgq6bxqOr540HCc1PD7ONxCDsLISkhUIKqe82TT2OAFWNnxSUHJmJcuAr5NlQQlQH62YlLmQS5Z/Kyhheb6/QIkNz5S+HFgJrgu+GlBAO6glAubsQaaX2hCtGhjiQaJhm7PhiuW+B54VLKGIgCWBMePKfGjke0DcVIqCksLGwEQBQJoPZZjRmsKIUKLaCq4DLUzeVypbpGozysuFCJYgDzaYF8ghnXvgL74LZSE1D9ZWMmYncUyUEiWGO9zZxLHERrDehW2b4ZnI1apCieM30AExlhMlbM1xq3zft7egDQ/TBC1PxQOYK+0yNjSoKbWBkkKotxS2lBh5Pz7JhOFufLRAegI/JdLCYVChRO30NHJxImBSXgrko0Xj9hp8UtpcqexAUZIy1u3MAB0QLfhhNAKxqnKSUyLrKfEVJXS2gpT0uWMoiUBhjaKw0JQ0fAxYbiQdbirFgwAPYakduqoV2MmMiQolBjUpunFV7yDIUStM84+iGTukBF0sFysPQxaqLO4dmAsf5GQQG7nyEyVekxy/1WrxwOrzCH+oUiKeQAlWjTDqZrNicRq6dDgHqzNPJ+NJrxV5pt9o+GkadXKFPuGp8hgz44+d9brzCPHKxEMJeGrAypR4/HwyXk+zjIwKFDLF57LpejxacDPX7wWxvUcJOE6XK0M0vSg8Hff7J50QpoKDmOGwWKYsvgpKTBoboiAPWB9+gGT4mVayQUrsRuryThendR+lpJrNbDFWRpFAJIe9AfOFIE0ZZzwkzoAUvszLiP4ZN4HZZtMLzwNIPHJK0AOzE2oRL4kTdB+vyU9pmtYkUmZg836FEkh6UeeQdy+aBPl0Z8gJTC/lo8Mj5T1KwC8VJbbzfEpIS6ADiOWYfa+41zAwHETTOE/IwSgil8QgzZak5DOeKrfha5W1Yn45g9gA8FKOidPWSlx+ggoERcMHyIFyZYBYLDDVl2zUomhiq1Rk30rAFH1yxdDrqqiL2W0/80i0/E18wMkeJY7d8IgS2Eo3CqpR5SlWkkIclFhZ3EdmEzTPzKYfRO6i8C+wjZx4Hl9BH8HQd1LyrHVRAWHQVJykbngu9ygJz0l8sI4CR1CUgCgRjRi5hj7aib1ZWhVKrCX4tJF6mD9KxTuwkgd3x6ko7I6SpqIETPoDzLvZsN0ofh4lpCWQtUiKWQGsHZTD8IbBtil+PuF4xu2aIINQJ3AQBKAEa3jFCQ0jelmDzjjBvWROiW9E61x/oFkvNMlIIlgOmp9SVBspuXiECZQoSVpgJCYE6EmpvGSnFx4S6z5iZCutZ4+SC9ISCBUNaPpcSshKnBYuFTZjwDHG+QZYu9xRAoZxFuZ7DkZ4n2EmanrDuNzdKjcMzLRwN1F/HF7cNqLDURECftPd7fAJp7DqhUHJSizYBRt9E8NciZKEk6u51PEhJS46TjQcpmmGjkM/PNdKUEscoID+Mmvh/CAF2atr6RWmdWSodDphwWNIlKDF7HUH/tXLeTvboyQLdpScqADjZcnuwW5OCa9SAgtESlozdOA9iIVSZHD1GiuB6oVZeckJyytKz+dbiY/pI4ayM2xquDCPMiUiUemJCw1jTmHDwL0uUzKOckVVPo+UbB73KOnnlJh75pUgJZDeUPKw5ziwWUgJBLBeBUOV2JAg11Cyqa6fHcamJ2hJTgljwwvcshSNpkyJeFQWANKgVBJ0JSh3J+Evara4vIKS82I+0LabU7InVEcpiTOXrMR0w00ZeR7ZPq2jBDofV7EOWAVPthKww4ysGG2hQknhFKCMuNd4aOBVupNWrNwcvGvrOJuzJ1HiHVLCc0qgpnRKyDPAi2Wd4xjNJo8g5+Y7RPwlWlJYicga5DjkE2VKlltKBhwLX9SxcncWUOJTJYvKt6WkaPJsSryCEqMOZvsYJViE2tQGpgkp18siTmElzPOxEPP5oDwYBNU85HB0HBrMzSqnvRKW55cdx7bDLSXsM5QYNY4TbSmpwFD/tDqsUtnnlDTxyqKh2jZekqrtaQmkW+cbOtkBWyidwFhWoA4BMBdNUF7BgMEWSm0whNOKPC6REjA3277YOg4wDpRQNXVAie+bB/I69GhZHsDGwyhMFvGXhqcA+Uql+CdKTCyxYZTcyVReUmHkGVYCKUcbT7qczbK8AxYWUDC9lIIw1IVEybjEG+QxM7WicMjqKGHPooQtM7XTw8WwFlG/lhJfHUJshecFZd+elgAlY069GLz8Ohcm+ui/pourmWbkOWGvctsScBUM2h0Kwl9mJWwUESXhsrqe3SbUUILHlFUcHA48w0qkiEkNfCM7zY8i1FrYKjMpPcumDNM2T+nKCdZFeR0E32dIm6s+/3JKIBlHv8GEYHdEioVpd7Wi/w4OnBUlxnpSRVBNTJ6el6jAAu5Bx6HFVQKexYO4OnQ6gAlLknn4ApgZDhO2o4R1M2LK9VsoZ19MSfBI8uq5NEphGMBUjtHB/2NElGAl/LN4evZK1VpqYvltRuPifgUPWiP0TkjP8EBQYLmMSzOzx70CZpVm6oys1RGizkqepyUWVkR0ThUu4m2Vw5JhqGIJT2Sdljhh+gRK2NMjDqx3mXlq3rw4shTdBbgNmqSRV6VgJlTymiEfF4c7Ex7Su4OGHyV41EjR56VWQocnIOOeCRtkZnycNxeDzQavN71GdC9knZVA590ngFKKiyfIK36yamHMwTiWRZ2TVdJdq7N40/HTcJGnIiNuqANokz/O+knSnyzUWUDq45HB9qDx5ZTQW82g9TgTMInzCY3S4x7mGlB/bmpe51VB2ONPAF1AHaWklKpRUY6qQdmOSotDlZIYPhb1+ZXTWRujP3TbDKlRFBbpYngeyF+CEtSPZcsHX2x4Jp154yg4ERs1bX3ISHGqpg6Fa1PeHPkZ9zFKNhVKJJvShjcaTY+OEyEryjlBt1HqYiX5PZ8anq7HXLKSkCfil6EEa6Zh6NJxtJpHcWfkG7xTd+lPlBg0GayL6OvgO/6oPPzJVgLJyZRD7HMbNvROkYU4oXSxWBzk7ikeLsMC8Q4e6MCGUPOF2SrPFw4peYa8kpVAwE2GOEqx8epfWBM/ZXWX4IoSI7fXz8D4vJVUtQTVYgTqsbtyVLMJ1S3lFjH4tWvv5oCMuNH51sW/3ErwfRoYxUz36hvYGjDEUf0d+D4l5PnH8DOUbCqUUKwbDHcvuxElIT/rlrNFS474/hQMugSPaa4vcByvlhKJo2RlSvhwIGTNsRAD634mzmspWeR/3VJC71KzeNbim9zK6BWGdSDKqRH8spry1gVef+JRAQjgskv2PJ8rShQeS46jkJUoyYGU3BdpWP6uGmaAMAq9jJHbKp8FdOF5cN8LWdzJMzGoMzaZ/3F8UAYE42W7WMH94MhLXcnkccv4qBwWk3He9e4lIxbvPtumo3Exg0DuFtUtGcHeKL3Die5x8mzUUvK5/oNVfzAY9BO2vYiu6TDoQptBd+/loGNDlF8cq+tNHv17rEYJPvNqJpVZ8jlgteuXu54OBlBeJvIXPerIU43IB9DvS5TIbdd7U94vEstr2d51q3YHbzRSvYEvRx59C7FeXz6Hn2l+8Ge5qyuO0Mnk7p3Gp4wn63/eUXZsbkLsnzvXjPXr4ehyn9nmvwjFLfmXtvmFJmL9KmM9aSZPaPOrzOP/BScaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaL8f/AdQMj816pQVuAAAAAElFTkSuQmCC';

    useEffect(() => {
        showError(false);
    }, [login])

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }

    const loginUser = async () => {
        let response = await API.userLogin(login);
        if (response.isSuccess) {
            showError('');

            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
            setAccount({ name: response.data.name, username: response.data.username });
            
            isUserAuthenticated(true)
            setLogin(loginInitialValues);
            navigate('/');
        } else {
            showError('Something went wrong! please try again later');
        }
    }

    const signupUser = async () => {
        let response = await API.userSignup(signup);
        if (response.isSuccess) {
            showError('');
            setSignup(signupInitialValues);
            toggleAccount('login');
        } else {
            showError('Something went wrong! please try again later');
        }
    }

    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }

    return (
        <Component>
              {/* <Overlay /> */}
            <Wrapper>
                <Image src={imageURL} alt="blog" />
                {
                    account === 'login' ?
                        <Wrapper>
                            <TextField variant="standard" value={login.username} onChange={(e) => onValueChange(e)} name='username' label='Enter Username' />
                            <TextField variant="standard" value={login.password} onChange={(e) => onValueChange(e)} name='password' label='Enter Password' />

                            {error && <Error>{error}</Error>}

                            <LoginButton variant="contained" onClick={() => loginUser()} >Login</LoginButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <SignupButton onClick={() => toggleSignup()} style={{ marginBottom: 50 }}>Create an account</SignupButton>
                        </Wrapper> :
                        <Wrapper>
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='name' label='Enter Name' />
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='username' label='Enter Username' />
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='password' label='Enter Password' />

                            <SignupButton onClick={() => signupUser()} >Signup</SignupButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <LoginButton variant="contained" onClick={() => toggleSignup()}>Already have an account</LoginButton>
                        </Wrapper>
                }
            </Wrapper>
        </Component>
    )
}

export default Login;
