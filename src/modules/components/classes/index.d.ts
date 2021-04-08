export interface RouteParamsProps {
    id: string,
    token?: string,
}

export interface ClassDataProps {
    grading?: Object,
}


export interface ClassroomProps {
    token: string,
    className: string,
    instructor: string,
    createDate: string,
}

export interface ClassroomInstProps {
    itoken: string,
    className: string,
    instructor: string,
    createDate: string,
}