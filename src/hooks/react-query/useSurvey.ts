import {saveHealthSurvey} from '../../api/Survey';
import {useMutation} from '@tanstack/react-query';

export const useSaveHealthSurvey = () => {
    const { mutate } = useMutation({
        mutationFn: (surveyOption:object) => saveHealthSurvey(surveyOption),
    });
    
    return { mutate };
};
