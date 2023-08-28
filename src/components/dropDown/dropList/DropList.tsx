import { FC, useState, useEffect } from "react";
import cn from 'classnames'

import useSymbolIterator from "../../../hooks/useSimbolIterator";
import {Search} from "../search/Search";

interface DropListI {
    open: boolean;
    setOpen: (open: boolean) => void;
    value: string;
    setValue: (value: string) => void;
    numberLine: number;
    data: any;
    showSearch: boolean;
}
export const DropList:FC<DropListI> = ({open, setOpen, value, setValue, numberLine, data, showSearch}) => {

    const [search, setSearch] = useState<string[]>([])

    useEffect(() => {
        setSearch([])
    }, [open]);


    const cities = ["Тель-авив", "Акко", "Ариэль", "Москва", "Санкт-Петербург", "Оттава", "Ванкувер"]

    return(
        <div
            className={cn(
                // "absolute z-[1000] top-[100%]",
                "bg-c_grey-section w-full rounded-[8px] mb-[8px] transition-all h-auto overflow-auto duration-500 border-[1px] border-c_grey-border",
                open ? "max-h-0 border-none" : (numberLine === 1 ? "max-h-[176px]" : "max-h-[216px]"),
            )}
        >
            <div className={cn("flex flex-col px-[16px] py-[18px]")}>
                { showSearch ?
                    <Search
                        search={search}
                        setSearch={setSearch}
                        cities={cities}
                    />
                    : null
                }
                {
                    useSymbolIterator(
                        search.length === 0?
                            showSearch ?
                                cities.length : data.length : search.length
                    ).map((item, index) => (
                        <div
                            key={index}
                            className={cn(
                                "text-c_grey-white text-[14px] leading-[19.6px] font-mont",
                                "py-[10px] hover:opacity-70 duration-500 cursor-pointer"
                            )}
                            onClick={() => setValue(search.length === 0 ? showSearch ? cities[item] : data[item] : search[item])}
                        >
                            {search.length === 0 ? showSearch ? cities[item] : data[item] : search[item]}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}