import { useState } from 'react';

const usePostModule = () => {
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [commentVisible, setCommentVisible] = useState(false);
  const [comment, setComment] = useState("");
  const [postedComments, setPostedComments] = useState([]);

  const handleLikeClick = () => {
    setLiked((prev) => !prev);
  };

  const handleFavoriteClick = () => {
    setFavorited((prev) => !prev);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSendComment = (name) => {
    if (comment) {
      setPostedComments([...postedComments, { name, text: comment }]);
      setComment("");
    }
  };

  return {
    liked,
    favorited,
    commentVisible,
    setCommentVisible,
    comment,
    postedComments,
    handleLikeClick,
    handleFavoriteClick,
    handleCommentChange,
    handleSendComment,
  };
};

export default usePostModule;
