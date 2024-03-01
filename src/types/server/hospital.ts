export interface Param_Post_HospitalComment {
    hospitalId: string;
    content: string;
    star: number;
}

export interface Response_Get_Hospital {
    success: boolean;
    data: {
        commentDTOList: {
            children: any[];
            content: string;
            hospitalCommentId: number;
            memberId: number;
            reportCount: number;
            star: number;
        }[];
    };
}
