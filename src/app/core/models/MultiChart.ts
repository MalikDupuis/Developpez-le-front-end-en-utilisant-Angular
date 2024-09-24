export interface MultiChart {
    name: string,
    series: Series[],   
}

interface Series {
    name: string,
    value: number
}