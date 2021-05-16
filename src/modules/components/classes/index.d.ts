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


export interface GradingResultProps {
    isDirect: string,
    studentNum: string,
    result: number,
    point: number,
    count: {
        deductedPoint: number,
    } | undefined,
    delay: {
        deductedPoint: number,
    } | undefined,
    compile: {
        deductedPoint: number,
    } | undefined,
    oracle: {
        deductedPoint: number,
    } | undefined,
    classes: {
        deductedPoint: number,
    } | undefined,
    packages: {
        deductedPoint: number,
    } | undefined,
    customException: {
        deductedPoint: number,
    } | undefined,
    customStructure: {
        deductedPoint: number,
    } | undefined,
    inheritInterface: {
        deductedPoint: number,
    } | undefined,
    inheritSuper: {
        deductedPoint: number,
    } | undefined,
    overriding: {
        deductedPoint: number,
    } | undefined,
    overloading: {
        deductedPoint: number,
    } | undefined,
    thread: {
        deductedPoint: number,
    } | undefined,
    javadoc: {
        deductedPoint: number,
    } | undefined,
    encapsulation: {
        deductedPoint: number,
    } | undefined,
}