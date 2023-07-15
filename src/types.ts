export type TWine = {
    Alcohol: number,
    "Malic Acid": number,
    Ash: any,
    "Alcalinity of ash": number,
    Magnesium: number,
    "Total phenols": number,
    Flavanoids: number | string,
    "Nonflavanoid phenols": number | string,
    Proanthocyanins: string,
    "Color intensity": number | string,
    Hue: number,
    "OD280/OD315 of diluted wines": number | string,
    Unknown: number,
    Gamma?: number,
}

export type TMeasureOfCentralTendency = {
    mean: number,
    median: number,
    mode: number[],
}