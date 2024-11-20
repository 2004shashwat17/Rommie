import { useState, useEffect, useContext } from 'react';
import { Box, TextareaAutosize, Button, styled } from '@mui/material';
import { DataContext } from '../../../context/DataProvider';
import { API } from '../../../service/api';

//components
import Comment from './Comment';

const Container = styled(Box)`
    margin-top: 100px;
    display: flex;
`;

const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius: '50%',
});

const StyledTextArea = styled(TextareaAutosize)`
    height: 100px !important;
    width: 100%;
    margin: 0 20px;
`;

const initialValue = {
    name: '',
    postId: '',
    date: new Date(),
    comments: '',
};

const Comments = ({ post }) => {
    const url = 'https://static.thenounproject.com/png/12017-200.png';

    const [comment, setComment] = useState(initialValue);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);

    const { account } = useContext(DataContext);

    // Fetch comments when component mounts or when the toggle changes
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await API.getAllComments(post._id);
                if (response && response.isSuccess) {
                    setComments(response.data);
                } else {
                    console.error("Failed to fetch comments:", response?.message || "Unknown error");
                }
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };
        getData();
    }, [toggle, post]);

    // Handle changes in the text area input
    const handleChange = (e) => {
        setComment({
            ...comment,
            name: account.username,
            postId: post._id,
            comments: e.target.value,
        });
    };

    // Add a new comment
    const addComment = async () => {
        try {
            const response = await API.newComment(comment);
            if (response.isSuccess) {
                setComment(initialValue);
                setToggle((prev) => !prev); // Trigger re-fetch of comments
            } else {
                console.error("Failed to add comment:", response.message || "Unknown error");
            }
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    // Remove a comment
    const removeComment = async (commentId) => {
        try {
            const response = await API.deleteComment(commentId);
            if (response.isSuccess) {
                setToggle((prev) => !prev); // Trigger re-fetch of comments
            } else {
                console.error("Failed to remove comment:", response.message);
            }
        } catch (error) {
            console.error("Error removing comment:", error);
        }
    };

    return (
        <Box>
            <Container>
                <Image src={url} alt="dp" />
                <StyledTextArea
                    rowsMin={5}
                    placeholder="what's on your mind?"
                    onChange={(e) => handleChange(e)}
                    value={comment.comments}
                />
                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    style={{ height: 40 }}
                    onClick={addComment}
                >
                    Post
                </Button>
            </Container>
            <Box>
                {comments && comments.length > 0 && comments.map((comment) => (
                    <Comment
                        key={comment._id}
                        comment={comment}
                        setToggle={setToggle}
                        removeComment={removeComment}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default Comments;
