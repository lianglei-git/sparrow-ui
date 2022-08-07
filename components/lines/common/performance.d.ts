
export interface PerformanceMark {
	readonly name: string;
	readonly startTime: number;
}

export function mark(name: string): void;

/**
 * Returns all marks, sorted by `startTime`.
 */
export function getMarks(): PerformanceMark[];
