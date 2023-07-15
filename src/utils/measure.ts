import { TMeasureOfCentralTendency, TWine } from "../types";

const roundTo3Descimals = (num: number) => Math.round(num * 1000) / 1000;

const calculateMean = (arr: number[]) => (arr.reduce((num, acc) => acc + num, 0)) / arr.length;

const calculateMedian = (arr: number[]) => {
    const len = arr.length;
    const midPoint = len/2;

    // Mean for odd length array
    if (len % 2 === 1) {
        return arr[Math.floor(midPoint)];
    }

    // Mean for even length array
    return (arr[midPoint - 1] + arr[midPoint]) / 2;
}

// This function calculates Mode using relation which will be time efficient
const calculateModeUsingRelation = (mean: number, median: number) => (3*median) - (2*mean);

// This function calculates Mode using usual method
const calculateMode =  (arr: number[]) => {
    let mode:number[] = [arr[0]];
    let maxFrequncy:number = 1;
    let currentFrequency:number = 1;

    for(let i=1 ; i < arr.length ; i++) {
        if(arr[i-1] === arr[i]) {
            currentFrequency++;
        } else {
            currentFrequency = 1;
        }

        if (currentFrequency === maxFrequncy) {
            mode.push(arr[i]);
        } else if (currentFrequency > maxFrequncy) {
            maxFrequncy = currentFrequency;
            mode = [arr[i]];
        }
    }

    return mode.length === arr.length ? [-1] : mode;
}

const calculateCentralTendency = (arr: number[]): TMeasureOfCentralTendency => {
    const sortedArray = [...arr].sort();

    return {
        mean: roundTo3Descimals(calculateMean(sortedArray)),
        median: roundTo3Descimals(calculateMedian(sortedArray)),
        mode: calculateMode(sortedArray),
    };
}

// Function return class-wise array of property values
const mapDatasetByClassesAndProperty = (dataSet: TWine[], property: keyof TWine) => {
    const mappedObj: { [key:number]: number[] } = {};

    dataSet.forEach((val) => {
        if(!mappedObj[val.Alcohol]) {
            mappedObj[val.Alcohol] = [];
        }
        
        mappedObj[val.Alcohol].push(+val[property]);
    });

    return mappedObj;
}

export const calculateMeasureOfCetralTendency = (dataSet: TWine[], property: keyof TWine) => {
    const classWiseMappedPropertyData = mapDatasetByClassesAndProperty(dataSet, property);
    
    const classWiseCentralTendency: {
        [key: number]: TMeasureOfCentralTendency
    } = {};

    for(let className in classWiseMappedPropertyData) {
        classWiseCentralTendency[className] = calculateCentralTendency(classWiseMappedPropertyData[className]);
    }

    return classWiseCentralTendency;
}

export const populateGammaFieldInDataset = (dataSet: TWine[]) => {
    dataSet.forEach(val => {
        let gamma = ((+val.Ash) * (+val.Hue)) / (+val.Magnesium);
        val.Gamma = roundTo3Descimals(gamma);
    });
}