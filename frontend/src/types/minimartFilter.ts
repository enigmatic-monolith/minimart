export type MinimartFilter = {
    category: string[];
    title: string;
    pointsRequired: { min: number; max: number };
};