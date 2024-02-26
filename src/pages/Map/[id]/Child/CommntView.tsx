import styled from 'styled-components';
import CommentUserItem from '../../../../components/ListItem/CommentUserItem';
import CommentItem from '../../../../components/ListItem/CommentItem';

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

const CommentView = () => {
    return (
        <>
            <Title>병원 리뷰</Title>
            <FormContainer>
                <CommentUserItem />
                <TextAreaContainer>
                    <InputView placeholder="최대 100자 이하" />
                    <SubmitButton type="submit">등록</SubmitButton>
                </TextAreaContainer>
            </FormContainer>
            <CommentListView>
                <CommentItem depth={0} firstItem />
                <CommentItem depth={0} />
                <CommentItem depth={1} />
                <CommentItem depth={0} />
            </CommentListView>
        </>
    );
};

export default CommentView;
