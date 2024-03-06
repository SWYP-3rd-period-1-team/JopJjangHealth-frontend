import styled from 'styled-components';
import CommentUserItem from '../../../../components/ListItem/CommentUserItem';
import CommentItem from '../../../../components/ListItem/CommentItem';
import {useMutation} from '@tanstack/react-query';
import {useState} from 'react';
import {
    deleteHospitalComment,
    postHospitalComment,
    updateHospitalComment,
} from '../../../../api/Hospital';
import {CommentDto} from '../../../../types/server/hospital';
import {useQuery_UserInfo} from '../../../../hooks/react-query';
import {useRouter} from 'next/router';

const Title = styled.h3`
    width: 100%;
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
const CommentListView = styled.ul`
    width: 100%;
    padding: 0;
`;
const NotLoginButton = styled.button`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    border: none;
    background-color: #00a241;
    padding: 26px 20px;
    color: white;
    border-radius: 16px;
    cursor: pointer;
`;
const NotLoginTitle = styled.p`
    font-size: 12px;
    margin: 0;
`;
const NotLoginContent = styled(NotLoginTitle)`
    font-weight: 700;
`;

interface Props {
    hospitalId: string;
    commentList?: CommentDto[];
    refetchComment?: () => void;
}
const CommentView = ({hospitalId, commentList, refetchComment}: Props) => {
    const router = useRouter();

    const [score, setScore] = useState(5);
    const [comment, setComment] = useState('');

    const {data: userData} = useQuery_UserInfo();
    const userInfo = userData?.data?.data;

    const {mutate: postComment} = useMutation({
        mutationFn: postHospitalComment,
        onSuccess: () => {
            refetchComment?.();
        },
    });

    const onTextHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(event.target.value);
    };

    const onSubmitSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        postComment({
            hospitalId: hospitalId,
            content: comment,
            star: score,
        });
        setComment('');
    };

    return (
        <>
            <Title>병원 리뷰</Title>
            {!!userInfo ? (
                <FormContainer onSubmit={onSubmitSearch}>
                    <CommentUserItem score={score} setScore={setScore} />
                    <TextAreaContainer>
                        <InputView
                            placeholder="최대 100자 이하"
                            value={comment}
                            onChange={onTextHandler}
                        />
                        <SubmitButton type="submit">등록</SubmitButton>
                    </TextAreaContainer>
                </FormContainer>
            ) : (
                <NotLoginButton onClick={() => router.push('/Login')}>
                    <NotLoginTitle>
                        로그인 후 이용 가능한 서비스 입니다
                    </NotLoginTitle>
                    <NotLoginContent>로그인 하러가기</NotLoginContent>
                </NotLoginButton>
            )}

            <CommentListView>
                {commentList &&
                    commentList.length > 0 &&
                    commentList.map((item, index) => (
                        <CommentItem
                            hospitalId={hospitalId}
                            commentId={item.hospitalCommentId}
                            refetchList={() => refetchComment?.()}
                            key={item.hospitalCommentId}
                            content={item.content}
                            score={item.star}
                            depth={0}
                            firstItem={index === 0}
                            childComment={item.children}
                            createDt={item.lastModifyDate}
                            userId={userInfo?.memberId}
                            commentUserId={item.memberId}
                        />
                    ))}
            </CommentListView>
        </>
    );
};

export default CommentView;
