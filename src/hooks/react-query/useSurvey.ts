import {saveHealthSurvey} from '../../api/Survey';
import {useMutation, useQuery} from '@tanstack/react-query';
import {fetchDiseaseList} from '../../api/MyPage';
import {DiseaseItem} from '../../types/server/surveyList';

export const useSaveHealthSurvey = () => {
    const { mutate } = useMutation({
        mutationFn: (surveyOption:object) => saveHealthSurvey(surveyOption),
        onError: (error) => {
            console.error('Save Health Survey Error:', error);
            alert("건강 설문조사 저장 중 에러가 발생했습니다. 잠시 후 시도 해주세요.")
        }
    });
    
    return { mutate };
};

export const useQuery_DiseaseList = () => {
    return useQuery({
        queryKey: ['diseaseList'],
        queryFn: fetchDiseaseList,
        select: (response): DiseaseItem[] => response.data.data.map((item: { dateTime: string; }) => ({
            ...item,
            dateTime: item.dateTime.split('T')[0],
        })),
    });
};
