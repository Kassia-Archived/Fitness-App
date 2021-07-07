export interface LiveProps {  
    id: string;
    name: string;
    difficulty: string;
    thumbnail: string;
    datetime: string;
}
export interface ProgramTypesProps {
    key: string;
    title: string;
}
export interface ProgramProps {
    id: string;
    title: string;
    thumbnail: string;
    type: string;
}
export interface LessonProps {
    id: string;
    title: string;
    description: string;
    video: string;
    thumbnail: string;
    programa: string;
}
  