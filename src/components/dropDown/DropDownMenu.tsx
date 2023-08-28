import { FC, useState, useEffect } from "react";
import cn from 'classnames';

import { DropList} from "./dropList/DropList";
import { ItemList} from "./item/ItemList";

interface DropDownMenuI {
    data: any;
    label: string;
    text: string;
    setData: (data: string) => void;
    numberLine: number;
    showSearch: boolean;
}

export const DropDownMenu:FC<DropDownMenuI> = ({data, text, label, setData, numberLine, showSearch}) => {

    const [open, setOpen] = useState<boolean>(false)
    const [value, setValue] = useState<string>(text)

    useEffect(() => {
        if(value !== text)
            setData(value)
        setOpen(!open)
    }, [value])

    return(
        <div className={cn(
            "relative flex flex-col md:w-[328px] w-full"
        )}>
            <div className="text-c_grey-white text-[16px] font-inter font-medium leading-[22.4px] mb-[12px]">
                {label}
            </div>
            <ItemList
                defaultText={text}
                item={value}
                open={open}
                setOpen={setOpen}
            />
            <DropList
                data={data}
                open={open}
                setOpen={setOpen}
                value={value}
                setValue={setValue}
                numberLine={numberLine}
                showSearch={showSearch}
            />
        </div>
    )
}