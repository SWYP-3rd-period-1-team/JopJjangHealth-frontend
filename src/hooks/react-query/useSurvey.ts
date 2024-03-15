import {saveHealthSurvey} from '../../api/Survey';
import {useMutation, useQuery} from '@tanstack/react-query';
import {fetchDiseaseList} from '../../api/MyPage';
import {DiseaseItem} from '../../types/server/surveyList';

export const useSaveHealthSurvey = () => {
    const { mutate } = useMutation({
        mutationFn: (surveyOption:object) => saveHealthSurvey(surveyOption),
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
