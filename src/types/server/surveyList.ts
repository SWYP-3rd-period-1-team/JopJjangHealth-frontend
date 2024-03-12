export interface DiseaseItem {
    surveyId: string;
    nickname: string;
    dateTime: string;
    department: string;
    targetBody: string;
    diagnosisPart: string;
    presentedSymptom: string;
    disease: string;
    // isLinked: boolean; // todo : 캘린더 연동?
}
