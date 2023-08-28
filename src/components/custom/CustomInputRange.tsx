import { FC } from 'react'

interface CustomI {
    type: string;
    debounceValue: number;
    setDebounceValue: (debounceValue: number) => void;
    related?: number;
}

export const CustomRangeInput:FC<CustomI> = ({type, debounceValue, setDebounceValue, related = "1"}) => {

    const handlerValueInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(e.target.value);
        return setDebounceValue(newValue)
    }

    return (
        <input
            id={"idRange"}
            type={"range"}
            className={`range-input thumb-red absolute z-[100] bottom-[12px] left-0 h-[2px] w-full appearance-none border-transparent cursor-pointer`}
            value={debounceValue}
            onChange={handlerValueInput}
            step={type === "contribution" ? `${+related/100}` : "1"}
            min={type === 'contribution' ? +related/4 : type === "payment" ? 2654 : 4}
            max={type === 'time' ? 30 : type === "payment" ? 51130 : +related}
        />
    );
};