import styled from 'styled-components';
import {useState} from 'react';
import CommentUserItem from './CommentUserItem';
import {useMutation} from '@tanstack/react-query';
import {
    deleteHospitalComment,
    postHospitalReCommnet,
    reportsHospitalComment,
    updateHospitalComment,
} from '../../api/Hospital';
import {CommentDto} from '../../types/server/hospital';
import {useQuery_UserInfo} from '../../hooks/react-query';

const Container = styled.div<{$depth: number; $firstitem?: boolean}>`
    padding-left: ${props => `${props.$depth * 48}px`};
    border-top: ${props =>
        props.$depth === 0 && !props.$firstitem ? '1px solid #dadada' : 'none'};
    margin-top: 16px;
`;
const CommentListItem = styled.li`
    display: flex;
    width: 100%;
    padding: 16px 0;
    align-items: flex-start;
    position: relative;
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
const CommentMenuButton = styled.button<{
    $borderright?: boolean;
    $active?: boolean;
}>`
    background-color: transparent;
    border: none;
    color: ${props => (props.$active ? 'black' : '#999999')};
    cursor: pointer;
    padding: 0 16px;
    border-right: ${props =>
        props.$borderright ? '2px solid #dadada' : 'none'};
`;
const FormContainer = styled.form`
    margin-top: 12px;
    width: 100%;
`;
const TextAreaContainer = styled.div`
    display: flex;
    background-color: white;
    border: 1px solid #dadada;
    padding: 12px 16px;
    align-items: center;
    margin-top: 12px;
`;
const InputView = styled.textarea`
    width: 100%;
    background: transparent;
    border: none;
    resize: none;
    min-height: 60px;
    &:focus {
        outline: none;
    }
`;
const SubmitButton = styled.button`
    width: 60px;
    border-radius: 6px;
    background-color: #dadada;
    border: none;
    padding: 8px;
`;
const ReportView = styled.div`
    position: absolute;
    right: -200px;
    width: 200px;
    background-color: white;
`;
const RepostItem = styled.div`
    cursor: pointer;
    box-sizing: border-box;
    padding: 16px 8px;
    color: #666666;
    &:hover {
        background-color: #f3f3f3;
    }
`;
const MoreButton = styled.button`
    border: none;
    background-color: transparent;
`;

interface Props {
    hospitalId: string;
    commentId: number;
    refetchList: () => void;
    depth: number;
    firstItem?: boolean;
    content: string;
    score?: number;
    childComment?: CommentDto[];
    createDt?: string;
    userId?: number;
    commentUserId?: number;
    nickName: string;
    imageUrl?: string;
}
const CommentItem = ({
    hospitalId,
    commentId,
    refetchList,
    depth,
    firstItem,
    content,
    score,
    childComment,
    createDt,
    userId,
    commentUserId,
    nickName,
    imageUrl,
}: Props) => {
    const [toggleUpdate, setToggleUpdate] = useState(false);
    const [updateText, setUpdateText] = useState(content);
    const [toggleReComment, setToggleReComment] = useState(false);
    const [reCommentText, setReCommentText] = useState('');
    const [toggleReport, setToggleReport] = useState(false);
    const [toggleMore, setToggleMore] = useState(false);

    const onTextHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUpdateText(event.target.value);
    };

    const {mutate: deleteComment} = useMutation({
        mutationFn: deleteHospitalComment,
        onSuccess: () => {
            refetchList();
        },
    });
    const {mutate: updateComment} = useMutation({
        mutationFn: updateHospitalComment,
        onSuccess: () => {
            refetchList();
        },
    });
    const {mutate: reportComment} = useMutation({
        mutationFn: reportsHospitalComment,
        onSuccess: () => {
            refetchList();
            setToggleReport(false);
        },
    });

    const onUpdateCommentHandler = (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        updateComment({
            hospitalId,
            commentId,
            content: updateText,
        });
        setToggleUpdate(false);
    };

    const {mutate: postReComment} = useMutation({
        mutationFn: postHospitalReCommnet,
        onSuccess: () => {
            setReCommentText('');
            setToggleReComment(false);
            refetchList();
        },
    });

    const onPostReCommentHandler = (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        postReComment({
            hospitalId,
            commentId,
            content: reCommentText,
        });
        setToggleUpdate(false);
    };

    const onTextReCommentHandler = (
        event: React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
        setReCommentText(event.target.value);
    };

    const onClickReport = () => {
        reportComment({
            hospitalId,
            commentId,
        });
    };

    const {data: userData} = useQuery_UserInfo();
    const userInfo = userData?.data;

    return (
        <Container $depth={depth} $firstitem={firstItem}>
            <CommentListItem>
                <CommentContent>
                    <CommentUserItem
                        imageUrl={imageUrl}
                        nickName={nickName}
                        score={score}
                        createDt={createDt}
                    />
                </CommentContent>
                <CommentMenu>
                    {!(depth > 0) && !!userId && (
                        <CommentMenuButton
                            onClick={() => setToggleReComment(prev => !prev)}
                            $borderright
                            $active={toggleReComment}
                        >
                            리댓
                        </CommentMenuButton>
                    )}
                    {userId === commentUserId && (
                        <>
                            <CommentMenuButton
                                onClick={() => setToggleUpdate(prev => !prev)}
                                $borderright
                                $active={toggleUpdate}
                            >
                                수정
                            </CommentMenuButton>
                            <CommentMenuButton
                                onClick={() =>
                                    deleteComment({
                                        hospitalId,
                                        commentId,
                                    })
                                }
                                $borderright
                            >
                                삭제
                            </CommentMenuButton>
                        </>
                    )}
                    {!!userId && (
                        <CommentMenuButton
                            onClick={() => setToggleReport(prev => !prev)}
                            $active={toggleReport}
                        >
                            신고
                        </CommentMenuButton>
                    )}
                </CommentMenu>
                {toggleReport && (
                    <ReportView>
                        {REPORT_ITEM.map(item => (
                            <RepostItem key={item} onClick={onClickReport}>
                                {item}
                            </RepostItem>
                        ))}
                    </ReportView>
                )}
            </CommentListItem>

            {toggleUpdate ? (
                <FormContainer onSubmit={onUpdateCommentHandler}>
                    <TextAreaContainer>
                        <InputView
                            placeholder="최대 100자 이하"
                            value={updateText}
                            onChange={onTextHandler}
                        />
                        <SubmitButton type="submit">등록</SubmitButton>
                    </TextAreaContainer>
                </FormContainer>
            ) : (
                <CommentListText>{content}</CommentListText>
            )}
            {toggleReComment && (
                <FormContainer onSubmit={onPostReCommentHandler}>
                    <CommentUserItem
                        nickName={userInfo?.nickname ?? ''}
                        imageUrl={userInfo?.profileImage}
                    />
                    <TextAreaContainer>
                        <InputView
                            placeholder="최대 100자 이하"
                            value={reCommentText}
                            onChange={onTextReCommentHandler}
                        />
                        <SubmitButton type="submit">등록</SubmitButton>
                    </TextAreaContainer>
                </FormContainer>
            )}
            {!!childComment &&
                childComment.length > 0 &&
                (toggleMore ? childComment : childComment.slice(0, 1)).map(
                    item => (
                        <CommentItem
                            key={item.hospitalCommentId}
                            hospitalId={hospitalId}
                            commentId={item.hospitalCommentId}
                            refetchList={refetchList}
                            content={item.content}
                            depth={1}
                            childComment={item.children}
                            createDt={item.lastModifyDate}
                            userId={userId}
                            commentUserId={item.memberId}
                            nickName={item.nickName}
                            imageUrl={item.imageUrl}
                        />
                    ),
                )}
            {!toggleMore && !!childComment && childComment.length > 1 && (
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <MoreButton onClick={() => setToggleMore(true)}>{`답글(${
                        childComment.length - 1
                    }) 더보기`}</MoreButton>
                </div>
            )}
        </Container>
    );
};

const REPORT_ITEM = [
    '부정확한 정보',
    '광고글',
    '도배글',
    '욕설과 비방',
    '외설적인 내용',
    '다른 주제의 글',
];

export default CommentItem;
