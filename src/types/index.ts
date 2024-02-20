export interface IOption {
	id: number;
	stage: number;
	targetBodyPart?: string;
	diagnosisPart?: string;
	presentedSymptom?: string;
	disease?: string;
	department?: string;
	image: string;
}

export interface Location {
	latitude: number;
	longitude: number;
}
