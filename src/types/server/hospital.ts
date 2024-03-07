export interface Param_Post_HospitalComment {
    hospitalId: string;
    content: string;
    star: number;
}

export interface Response_Get_Hospital {
    success: boolean;
    data: {
        commentDTOList: CommentDto[];
    };
}

export interface CommentDto {
    children: any[];
    content: string;
    hospitalCommentId: number;
    memberId: number;
    reportCount: number;
    star: number;
    lastModifyDate: string;
}
