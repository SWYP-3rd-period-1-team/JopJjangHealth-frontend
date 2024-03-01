import styled from 'styled-components';
import CommentUserItem from './CommentUserItem';

const CommentListItem = styled.li<{$depth: number; $firstitem?: boolean}>`
    display: flex;
    width: 100%;
    padding: 16px 0;
    align-items: flex-start;
    padding-left: ${props => `${props.$depth * 48}px`};
    border-top: ${props =>
        props.$depth === 0 && !props.$firstitem ? '1px solid #dadada' : 'none'};
`;
const CommentContent = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;
const CommentListText = styled.p`
    margin: 16px 0 0 0;
    font-size: 14px;
    color: #555555;
`;
const CommentMenu = styled.div`
    display: flex;
    align-items: center;
`;
const CommentMenuButton = styled.button`
    background-color: transparent;
    border: none;
    color: #999999;
`;

interface Props {
    depth: number;
    firstItem?: boolean;
}
const CommentItem = ({depth, firstItem}: Props) => {
    return (
        <CommentListItem $depth={depth} $firstitem={firstItem}>
            <CommentContent>
                <CommentUserItem score={5} />
                <CommentListText>댓글 내용</CommentListText>
            </CommentContent>
            <CommentMenu>
                <CommentMenuButton>수정</CommentMenuButton>
                <CommentMenuButton>삭제</CommentMenuButton>
                <CommentMenuButton>신고</CommentMenuButton>
            </CommentMenu>
        </CommentListItem>
    );
};

export default CommentItem;
