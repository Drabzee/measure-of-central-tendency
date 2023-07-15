import { TMeasureOfCentralTendency } from "../../types";
import style from './style.module.css';

type TableProps = {
    centralTendencyData: {
        [key: number]: TMeasureOfCentralTendency
    },
    propertyLabel: string,
}

const Table = ({ centralTendencyData, propertyLabel }: TableProps) => {

    const printDataValues = (data:number | number[]) => {
        if (Array.isArray(data)) {
            return data.join(', ');
        }

        return data;
    }

    // Array of all params used to measure central tendency
    const measureParams = Object.keys(Object.values(centralTendencyData)[0]) as (keyof TMeasureOfCentralTendency)[];

    return (
        <table className={style.table}>
            <thead>
                <tr>
                    <th>Measure</th>
                    {
                        Object.keys(centralTendencyData)
                              .map((key) => <th key={key}>Class {key}</th>)
                    }
                </tr>
            </thead>
            <tbody>
                { measureParams.map(param => (
                    <tr>
                        <th>{propertyLabel} {param}</th>
                        {
                            Object.keys(centralTendencyData)
                                .map((key) => (
                                    <td key={key}>
                                        { printDataValues(centralTendencyData[+key][param])}
                                    </td>
                                )
                            )    
                        }
                    </tr>
                )) }
            </tbody>
        </table>
    )
}

export default Table